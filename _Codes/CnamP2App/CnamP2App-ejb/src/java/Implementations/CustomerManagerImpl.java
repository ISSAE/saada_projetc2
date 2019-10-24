package Implementations;

import Entities.Customer;
import Facade.CustomerManagerLocal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.sql.DataSource;


@Stateless
public class CustomerManagerImpl implements CustomerManagerLocal {
   @Resource(mappedName = "jdbc/CnamPool")
    private DataSource dataSRC;
   
    @Override
    public String getCustomerTotalRows() {
        String total = "0";
        ResultSet rs = null;
        Statement stmt = null;
        Connection conn = null;
        try {
            conn = dataSRC.getConnection();
            if (conn == null) {
                throw new SQLException("Could not get a connection in getCustomerTotalRows.");
            }
            stmt = conn.createStatement();

            String query = "SELECT Count(*) COUNT FROM customers ";

            System.out.print(query);
            rs = stmt.executeQuery(query);
            while (rs.next()) {// test
                total = String.valueOf(rs.getInt("COUNT"));
            }
             System.out.println("total customers "+total);               
        } catch (SQLException ex) {
            System.out.println("Sql Exception in getCustomerTotalRows  = " + ex.getMessage());

        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (stmt != null) {
                    stmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                System.out.println("getCustomerTotalRows : Sqlexception" + e);
            }
        }
        return total;
    }
    
    @Override
    public List<Customer> getUserByKey(String Customerky) {
        return this.searchCustomersBy(Customerky, "", "", "", "0", "1000");
    }
    
    @Override
    public List<Customer> getCustomersList(String start, String limit) {
        return this.searchCustomersBy("", "", "", "",start, limit);
    }
    
    @Override
    public List<Customer> searchCustomersBy(String customerKy,String firstName,String mobileNumber,String zone,
                                            String start, String limit) {
        ResultSet rs = null;
        Statement stmt = null;
        Connection conn = null;
        List<Customer> obj = new ArrayList();
        try {
            conn = dataSRC.getConnection();
            if (conn == null) {
                throw new SQLException("Could not get a connection in searchCustomersBy..");
            }
            //conn.setAutoCommit(true);
            stmt = conn.createStatement();
            

            String query = "SELECT customerky , firstName, lastName, phoneNumber, mobileNumber, "
                    + " address,region,zone, "
                    + " userstatus, "
                    + " modifiedBy, modDateLong, "
                    + " count(*) rnum FROM customers where 1=1 ";

            if (!customerKy.isEmpty()) {
                query += " and customerky = " + customerKy;
            }
            if (!firstName.isEmpty()) {
                query += " and lower(firstName) like lower('%" + firstName + "%')";
            }
            if (!mobileNumber.isEmpty()) {
                query += " and mobileNumber like '%" + mobileNumber + "%'";
            }
            if (!zone.isEmpty()) {
                query += " and lower(zone) like lower('%" + zone + "%')";
            }

            query += " group by customerky , firstName, lastName, \n" +
"                     phoneNumber, mobileNumber, address,region,zone,  \n" +
"                     userstatus, \n" +
"                     modifiedBy, modDateLong ";
            query +=  "Limit "+ (Integer.parseInt(start) + Integer.parseInt(limit));
            //query += ") where rnum  > " + start;
            System.out.println("searchCustomersBy query : "+query);    
            rs = stmt.executeQuery(query);

            while (rs.next()) {
                Customer customer = new Customer(
                        rs.getInt("customerky"), rs.getString("firstName"), 
                        rs.getString("lastName"), rs.getString("phoneNumber"), rs.getString("mobileNumber"),
                        rs.getString("address"), rs.getString("region"), rs.getString("zone"), 
                        rs.getString("userstatus"),
                        rs.getString("modifiedBy"), rs.getDate("modDateLong")
                );
                obj.add(customer);
                //System.out.println("FirstName "+rs.getString("firstName"));
            }

        } catch (SQLException ex) {
            System.out.println("Sql Exception in searchCustomersBy  = " + ex.getMessage());

        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (stmt != null) {
                    stmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                System.out.println("APP searchCustomersBy : Sqlexception" + e);
            }
        }
        return obj;
    }
    
    @Override
    public String getSearchCustomersTotalRows 
        (String customerKy,String firstName,String mobileNumber,String zone)
        {
        String total = "0";
        ResultSet rs = null;
        Statement stmt = null;
        Connection conn = null;
        try {
            conn = dataSRC.getConnection();
            if (conn == null) {
                throw new SQLException("Could not get a connection in getSearchCustomersTotalRows.");
            }
            //conn.setAutoCommit(true);
            stmt = conn.createStatement();

            String query = "SELECT Count(*) COUNT FROM customers Where 1 = 1 ";

            if (customerKy != null && !customerKy.isEmpty()) {
                query += " and customerKy = " + customerKy ;
            }
            if (firstName != null && !firstName.isEmpty()) {
                query += " and lower(firstName) like lower('%" + firstName + "%')";
            }
            if (mobileNumber != null && !mobileNumber.isEmpty()) {
                query += " and mobileNumber like '%" + mobileNumber + "%')";
            }
            if (zone != null && !zone.isEmpty()) {
                query += " and lower(zone) like lower('%" + zone + "%')";
            }

            System.out.print(query);
            rs = stmt.executeQuery(query);
            while (rs.next()) {
                total = String.valueOf(rs.getInt("COUNT"));
            }

        } catch (SQLException ex) {
            System.out.println("Sql Exception in getSearchCustomersTotalRows  = " + ex.getMessage());

        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (stmt != null) {
                    stmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                System.out.println("getSearchCustomersTotalRows : Sqlexception" + e);
            }
        }
        return total;
    }
    
    @Override
    public String removeCustomer(String customerKy,String deletedBy){        
       Connection conn = null;
        CallableStatement cstt = null;
        try {
            
            boolean customerok = true;
            if (customerok) {
                conn = dataSRC.getConnection();
                if (conn == null) {
                    throw new Exception("Could not get a connection in removeCustomer");
                }

                String query = "{CALL REMOVECUSTOMER(?,?)}";
                cstt = conn.prepareCall(query); // procedure call
                cstt.setInt(1, Integer.parseInt(customerKy));
                cstt.registerOutParameter(1, java.sql.Types.INTEGER);                 
                cstt.setString(2,deletedBy);
                
               cstt.executeUpdate(); 
               
                if (cstt.getInt(1) != 0) {                    
                    return  "Customer Has Been deleted Succesfully";
                } else {
                    return "Failed to delete Customer ";
                }
            } else {
                return "Failed to delete Customer";
            }
        } catch (Exception ex) {
            System.out.println("CENTRAL DATA BASE ERROR delete Customer: " + ex.getMessage());
            return "Error in delete Customer";
        } finally {
            try {
                if (cstt != null) {
                    cstt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                System.out.println("Exception in delete Customer is: " + e.getMessage());
                return "Error in delete Customer";
            }
        }           
    }
    
    @Override
    public String saveCustomer(Customer customer) {
        Connection conn = null;
        CallableStatement cstt = null;
        try {
            
            boolean customerok = true;
            if (customerok) {
                conn = dataSRC.getConnection();
                if (conn == null) {
                    throw new Exception("Could not get a connection in SaveCustomer");
                }
System.out.println("customer id to call savecustomer "+customer.getCustomerky());

                String query = "{CALL SAVECUSTOMER(?,?,?,?,?,?,?,?,?,?)}";
                cstt = conn.prepareCall(query); // procedure call
                cstt.setInt(1, customer.getCustomerky());
                cstt.registerOutParameter(1, java.sql.Types.INTEGER);                 
                String firstName = customer.getFirstName();
                cstt.setString(2, firstName.substring(0, 1).toUpperCase() + firstName.substring(1, firstName.length()));
                String lastName = customer.getLastName();
                cstt.setString(3,lastName.substring(0, 1).toUpperCase() + lastName.substring(1, lastName.length()));
                cstt.setString(4,customer.getPhoneNumber());
                cstt.setString(5,customer.getMobileNumber());
                String custaddress = customer.getAddress();
                cstt.setString(6,custaddress.substring(0, 1).toUpperCase() + custaddress.substring(1, custaddress.length()));
                String custRegion = customer.getRegion();
                cstt.setString(7,custRegion.substring(0, 1).toUpperCase() + custRegion.substring(1, custRegion.length()));
                String custZone = customer.getZone();
                cstt.setString(8,custZone.substring(0, 1).toUpperCase() + custZone.substring(1, custZone.length()));
                System.out.println("statusssssssss "+customer.getUserstatus());
                cstt.setString(9,customer.getUserstatus());
                cstt.setString(10,customer.getModifiedBy());
                
//edit customer--------------------------------
 System.out.println("ID "+customer.getCustomerky());
 System.out.println("firstName "+firstName.substring(0, 1).toUpperCase() + firstName.substring(1, firstName.length()));
 System.out.println("lastName "+lastName.substring(0, 1).toUpperCase() + lastName.substring(1, lastName.length()));
 System.out.println("PhoneNum "+customer.getPhoneNumber());
 System.out.println("MobileNum "+customer.getMobileNumber());
 System.out.println("Address "+custaddress.substring(0, 1).toUpperCase() + custaddress.substring(1, custaddress.length()));
 System.out.println("Region "+customer.getRegion());
 System.out.println("Zone "+customer.getZone());
 System.out.println("Status "+customer.getUserstatus());
 System.out.println("ModifiedBy  "+ customer.getModifiedBy());
 ////end message edit customers------------------------------------- 
               cstt.executeUpdate(); 
               
System.out.println("after updating "+cstt.getInt(1));
     
                if (cstt.getInt(1) != 0) {                    
                    return  firstName + " Has Been Saved Succesfully";
                } else {
                    return "Failed to Save Customer " + firstName;
                }
            } else {
                return "Failed to Save Customer";
            }
        } catch (Exception ex) {
            System.out.println("CENTRAL DATA BASE ERROR Save Customer: " + ex.getMessage());
            return "Error in Save Customer";
        } finally {
            try {
                if (cstt != null) {
                    cstt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                System.out.println("Exception in Save Customer is: " + e.getMessage());
                return "Error in Save Customer";
            }
        }
    }
}