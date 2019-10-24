package Implementations;

import Entities.Product;
import Facade.ProductManagerLocal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.sql.DataSource;

@Stateless
public class ProductManagerImpl implements ProductManagerLocal {

    
    @Resource(mappedName = "jdbc/CnamPool")
    private DataSource dataSRC;
    SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
    
    @Override
   public String getProductsTotalRows() {
    String total = "0";
    ResultSet rs = null;
    Statement stmt = null;
    Connection conn = null;
    try {
            conn = dataSRC.getConnection();
            if (conn == null) {
                throw new SQLException("Could not get a connection in getProductsTotalRows.");
            }
            stmt = conn.createStatement();

            String query = "SELECT Count(*) COUNT FROM products ";

            System.out.print(query);
            rs = stmt.executeQuery(query);
            while (rs.next()) {// test
                total = String.valueOf(rs.getInt("COUNT"));
            }
             System.out.println("total products "+total);               
        } catch (SQLException ex) {
            System.out.println("Sql Exception in getProductsTotalRows  = " + ex.getMessage());

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
                System.out.println("getProductsTotalRows : Sqlexception" + e);
            }
        }
        return total;
};
   @Override
   public List<Product> getProductByKey(int productnum) throws ParseException 
   {
       //SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        //Date newdate = (Date) format.parse("20990101");
     return this.searchProductBy(productnum, "", "0", "1000"); 
   }
   
   @Override
   public List<Product> getProductsList(String start, String limit) throws ParseException{
       //SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        //Date parsed = format.parse("20990101");
        //java.sql.Date newdate = new java.sql.Date(parsed.getTime());
       return this.searchProductBy(0, "",start, limit);
   }
   
   @Override
   public List<Product> searchProductBy(int productnum,String productName, String start, String limit)
   throws ParseException{
       ResultSet rs = null;
        Statement stmt = null;
        Connection conn = null;
        List<Product> obj = new ArrayList();
        try {
            conn = dataSRC.getConnection();
            if (conn == null) {
                throw new SQLException("Could not get a connection in searchProductBy..");
            }
            stmt = conn.createStatement();

            String query = "SELECT productnum , productName, annualfees, producttype,"
                    + " modifiedBy, modDateLong, "
                    + " count(*) rnum FROM products where 1=1 ";

            if (productnum != 0) {
                query += " and productnum = " + productnum;
            }
            if (!productName.isEmpty()) {
                query += " and lower(productName) like lower('%" + productName + "%')";
            }
            
            //Date parsed = format.parse("20990101");
            //java.sql.Date newdate = new java.sql.Date(parsed.getTime());
            //java.sql.Date monthUnitDate = new java.sql.Date(monthUnit.getTime());
            

            query += " group by productnum , productName,annualfees, producttype, "
                    +" modifiedBy, modDateLong ";
            query +=  "Limit "+ (Integer.parseInt(start) + Integer.parseInt(limit));
            
            System.out.println("searchProductBy query : "+query);    
            rs = stmt.executeQuery(query);
            System.out.println("after execute query");
            //date_format(priceMonth,_utf8'%m/%d/%Y')
            while (rs.next()) {
                Product product = new Product(
                        rs.getInt("productnum"), rs.getString("productName"), 
                        rs.getInt("annualfees"), rs.getString("producttype"),
                        rs.getString("modifiedBy"), rs.getDate("modDateLong")
                );
                System.out.println("product num "+rs.getInt("productnum"));
                System.out.println("annualfees "+rs.getInt("annualfees"));
                obj.add(product);
            }

        } catch (SQLException ex) {
            System.out.println("Sql Exception in searchProductBy  = " + ex.getMessage());

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
                System.out.println("APP searchProductBy : Sqlexception" + e);
            }
        }
        return obj;
   }
   
   @Override
   public String getSearchProductsTotalRows (int productnum,String productName)
                    throws ParseException{
       
        String total = "0";
        ResultSet rs = null;
        Statement stmt = null;
        Connection conn = null;
        try {
            conn = dataSRC.getConnection();
            if (conn == null) {
                throw new SQLException("Could not get a connection in getSearchProductsTotalRows.");
            }
            stmt = conn.createStatement();

            String query = "SELECT Count(*) COUNT FROM products Where 1 = 1 ";

            if (productnum != 0) {
                query += " and productnum = " + productnum ;
            }
            if (productName != null && !productName.isEmpty()) {
                query += " and lower(productName) like lower('%" + productName + "%')";
            }
            
            
            System.out.print(query);
            rs = stmt.executeQuery(query);
            while (rs.next()) {
                total = String.valueOf(rs.getInt("COUNT"));
            }

        } catch (SQLException ex) {
            System.out.println("Sql Exception in getSearchProductsTotalRows  = " + ex.getMessage());

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
                System.out.println("getSearchProductsTotalRows : Sqlexception" + e);
            }
        }
        return total;
   }
   
   @Override
   public String saveProduct(Product product){
       Connection conn = null;
        CallableStatement cstt = null;
        try {
            
            boolean customerok = true;
            if (customerok) {
                conn = dataSRC.getConnection();
                if (conn == null) {
                    throw new Exception("Could not get a connection in SaveProduct");
                }
System.out.println("product Save") ;
                String query = "{CALL SAVEPRODUCT(?,?,?,?,?,?)}";
                cstt = conn.prepareCall(query); // procedure call
                cstt.setInt(1,0);
                cstt.setInt(2, product.getProductnum());
                cstt.registerOutParameter(1, java.sql.Types.INTEGER);                 
                String productName = product.getProductName();
                cstt.setString(3, productName.substring(0, 1).toUpperCase() + productName.substring(1, productName.length()));
                cstt.setInt(4,product.getAnnualfees());                
                cstt.setString(5, product.getProducttype());               
                cstt.setString(6,product.getModifiedBy());
             
               cstt.executeUpdate(); 
               System.out.println("product Save "+cstt.getInt(1)) ;
              
                if (cstt.getInt(1) != 0) {                    
                    return  productName + " Has Been Saved Succesfully";
                } else {
                    return "Failed to Save Product " + productName;
                }
            } else {
                return "Failed to Save Product";
            }
        } catch (Exception ex) {
            System.out.println("CENTRAL DATA BASE ERROR Save Product: " + ex.getMessage());
            return "Error in Save Product";
        } finally {
            try {
                if (cstt != null) {
                    cstt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                System.out.println("Exception in Save Product is: " + e.getMessage());
                return "Error in Save Product";
            }
        }
   }
    
   
}
