
package Implementations;


import Entities.User;
import Facade.UserManagerLocal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;
import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.sql.DataSource;

@Stateless
public class UserManagerImpl implements UserManagerLocal {

    @Resource(mappedName = "jdbc/CnamPool")
    private DataSource dataSRC;
    ReadPropertiesFile readfile = new ReadPropertiesFile();

    Properties properties = readfile.getProperties("/config.properties");
    /*private final String JDBC = properties.getProperty("JDBC");
    private final String mailhost = properties.getProperty("host");
    private final String mailport = properties.getProperty("port");
    private final String adminEmail = properties.getProperty("adminEmail");*/
   
    public UserManagerImpl() {
    }

    @Override
    public User getUserByUsername(String username) {
        ResultSet rs = null;
        Statement stmt = null;
        Connection conn = null;
        User user = null;
        try {
            conn = dataSRC.getConnection();
            if (conn == null) {
                throw new SQLException("Could not get a connection..");
            }
            //conn.setAutoCommit(true);
            stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
            // get the list...
            String query = "SELECT userKy, username, firstName, lastName, password "
                    + "FROM userlist WHERE userstatus = 1 and username = '" + username + "'";
            System.out.println("query "+query);            
            rs = stmt.executeQuery(query);
            if (rs.first()) {
                user = new User(
                        rs.getInt(1),
                        rs.getString(2),
                        rs.getString(3),
                        rs.getString(4),
                        rs.getString(5)
                );
            }
        } catch (SQLException ex) {
            System.out.println(" getUserByUsername Sql Exception  = " + ex.getMessage());

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
                System.out.println(" getUserByUsername Sqlexception" + e.getMessage());
            }
        }
        return user;
    }
    
    @Override
    public boolean getLogInAuth(String username, String password)
    {
        return true;
    }
    
    private boolean changePassword(final String username) {
        ResultSet rs = null;
        Connection conn = null;
        CallableStatement cstt = null;
        try {
            conn = dataSRC.getConnection();
            if (conn == null) {
                throw new Exception("Could not get a connection..");
            }
            conn.setAutoCommit(true);
            String query = " begin LOGINPKG.CHANGEPASSWORD(?); end; ";
            cstt = conn.prepareCall(query); // procedure call
            cstt.registerOutParameter(1, java.sql.Types.VARCHAR);
            cstt.setString(1, username);
            cstt.executeUpdate();
            if (cstt.getString(1).equals("OK")) {
                return true;
            } else {
                return false;
            }
        } catch (Exception ex) {
            System.out.println("CONNECTION ERROR TO CENTRAL DATA BASE in resetPassword: " + ex.getMessage());
            return false;
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (cstt != null) {
                    cstt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                System.out.println("Exception on reset password is: " + e.getMessage());
                return false;
            }
        }

    }

//    private String generatePassword() {
//
//        String password = "";
//        String numeric = "[0-9]";
//        int passlen = this.passwordPolicyManager.getPasswordConfiguration().getMinPasswdLen();
//        char ch[] = {
//            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
//            'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
//            'u', 'v', 'w', 'x', 'y', 'z'
//        };
//        for (int i = 0; i < passlen; i++) {
//            int c = (int) Math.round(Math.random() * 35D);
//            password = password + ch[c];
//        }
//
//        if (!Pattern.compile(numeric).matcher(password).find()) {
//            password = password.substring(0, password.length() - 1) + "9";
//        }
//        return password;
//    }

   

//    @Override
//    public String contactSupport(String subject, String text) {
//        try {
//            if (generateEmail(adminEmail, subject, text, adminEmail, adminEmail, adminEmail /* CC */)) {
//                return "Message Sent to Merchant Support";
//            } else {
//                return "Message Not Sent Server Under Maintenance.Please Retry Soon";
//            }
//        } catch (Exception ex) {
//            System.out.println("Contact Support Sql Exception  = " + ex.getMessage());
//            return "Error in Contact Support";
//        }
//    }
}  