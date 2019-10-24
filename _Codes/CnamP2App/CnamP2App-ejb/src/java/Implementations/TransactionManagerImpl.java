package Implementations;

import Entities.Transaction;
import Facade.TransactionManagerLocal;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.sql.DataSource;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;

@Stateless
public class TransactionManagerImpl implements TransactionManagerLocal {

    @Resource(mappedName = "jdbc/CnamPool")
    private DataSource dataSRC;

    @Override
    public String getTransactionsTotalRows() {
        String total = "0";
        ResultSet rs = null;
        Statement stmt = null;
        Connection conn = null;
        try {
            conn = dataSRC.getConnection();
            if (conn == null) {
                throw new SQLException("Could not get a connection in getTransactionTotalRows.");
            }
            stmt = conn.createStatement();

            String query = "SELECT Count(*) COUNT FROM transactions ";

            System.out.print(query);
            rs = stmt.executeQuery(query);
            while (rs.next()) {// test
                total = String.valueOf(rs.getInt("COUNT"));
            }
            System.out.println("total transactions " + total);
        } catch (SQLException ex) {
            System.out.println("Sql Exception in getTransactionTotalRows  = " + ex.getMessage());

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
                System.out.println("getTransactionTotalRows : Sqlexception" + e);
            }
        }
        return total;
    }

    @Override
    public List<Transaction> getTransactionByKey(String transactionID) {
        return this.searchTransactionsBy(transactionID, "", "", "", "", "0", "1000");
    }

    @Override
    public List<Transaction> getTransactionsList(String start, String limit) {
        return this.searchTransactionsBy("", "", "", "", "", start, limit);
    }

    @Override
    public List<Transaction> searchTransactionsBy(String transactionID, String cardID, String authorizationID, String trxamount,
            String trxcurrency, String start, String limit) {
        ResultSet rs = null;
        Statement stmt = null;
        Connection conn = null;
        List<Transaction> obj = new ArrayList();
        try {
            conn = dataSRC.getConnection();
            if (conn == null) {
                throw new SQLException("Could not get a connection in searchTransactionsBy..");
            }
            //conn.setAutoCommit(true);
            stmt = conn.createStatement();

            String query = "SELECT transactionID , cardID, authorizationID, trxdate, trxamount, "
                    + " trxcurrency,merchantname,merchantcountry, "
                    + " postedOn, "
                    + " count(*) rnum FROM transactions where 1=1 ";

            if (!transactionID.isEmpty()) {
                query += " and transactionID = " + transactionID;
            }
            if (!cardID.isEmpty()) {
                query += " and cardID like '%" + cardID + "%' ";
            }
            if (!authorizationID.isEmpty()) {
                query += " and authorizationID = '" + authorizationID + "'";
            }
            if (!trxamount.isEmpty()) {
                query += " and trxamount = " + trxamount;
            }
            if (!trxcurrency.isEmpty()) {
                query += " and trxcurrency = '" + trxcurrency + "'";
            }

            query += " group by transactionID , cardID, authorizationID, \n"
                    + "                     trxdate, trxamount,  \n"
                    + "                     trxcurrency,merchantname,merchantcountry, \n"
                    + "                     postedOn ";
            query += "Limit " + (Integer.parseInt(start) + Integer.parseInt(limit));
            //query += ") where rnum  > " + start;
            System.out.println("searchTransactionsBy query : " + query);
            rs = stmt.executeQuery(query);

            while (rs.next()) {
                Transaction trx = new Transaction(
                        rs.getInt("transactionID"), rs.getString("cardID"),
                        rs.getString("authorizationID"), rs.getDate("trxdate"),
                        rs.getInt("trxamount"), rs.getString("trxcurrency"), rs.getString("merchantname"),
                        rs.getString("merchantcountry"),
                        rs.getDate("postedOn")
                );
                obj.add(trx);
                //System.out.println("FirstName "+rs.getString("firstName"));
            }

        } catch (SQLException ex) {
            System.out.println("Sql Exception in searchTransactionsBy  = " + ex.getMessage());

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
                System.out.println("APP searchTransactionsBy : Sqlexception" + e);
            }
        }
        return obj;
    }

    @Override
    public String getSearchTransactionsTotalRows(String transactionID, String cardID, String authorizationID, String trxamount,
            String trxcurrency) {
        String total = "0";
        ResultSet rs = null;
        Statement stmt = null;
        Connection conn = null;
        try {
            conn = dataSRC.getConnection();
            if (conn == null) {
                throw new SQLException("Could not get a connection in getSearchTransactionsTotalRows.");
            }
            //conn.setAutoCommit(true);
            stmt = conn.createStatement();

            String query = "SELECT Count(*) COUNT FROM transactions Where 1 = 1 ";

            if (!transactionID.isEmpty()) {
                query += " and transactionID = " + transactionID;
            }
            if (!cardID.isEmpty()) {
                query += " and cardID like '%" + cardID + "%' ";
            }
            if (!authorizationID.isEmpty()) {
                query += " and authorizationID = '" + authorizationID + "'";
            }
            if (!trxamount.isEmpty()) {
                query += " and trxamount = " + trxamount;
            }
            if (!trxcurrency.isEmpty()) {
                query += " and trxcurrency = '" + trxcurrency + "'";
            }

            System.out.print(query);
            rs = stmt.executeQuery(query);
            while (rs.next()) {
                total = String.valueOf(rs.getInt("COUNT"));
            }

        } catch (SQLException ex) {
            System.out.println("Sql Exception in getSearchTransactionsTotalRows  = " + ex.getMessage());

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
                System.out.println("getSearchTransactionsTotalRows : Sqlexception" + e);
            }
        }
        return total;
    }

    @Override
    public void generateTransactionReport() {
        Connection conn = null;
                       
        try {
            conn = dataSRC.getConnection();
            if (conn == null) {
                throw new SQLException("Could not get a connection in getSearchTransactionsTotalRows.");
            }
            
            
            String jrxmlFileName = "C:/SaadaCnamP2/transactionList.jrxml";
            String jasperFileName = "C:/SaadaCnamP2/transactionList.jasper";
            String pdfFileName = "C:/SaadaCnamP2/transactionList.pdf";

            JasperCompileManager.compileReportToFile(jrxmlFileName, jasperFileName);
             HashMap hm = new HashMap();
             hm.put("ID", "123");   
            // Generate jasper print
            JasperPrint jprint = (JasperPrint) JasperFillManager.fillReport(jasperFileName, hm, conn);

            // Export pdf file
            JasperExportManager.exportReportToPdfFile(jprint, pdfFileName);

            System.out.println("Done exporting reports to pdf");
        } catch (Exception e) {
            System.out.print("Exceptiion" + e);

        }
    }

}
