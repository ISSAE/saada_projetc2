

package Implementations;

import Entities.Card;
import Facade.CardManagerLocal;
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
public class CardManagerImpl implements CardManagerLocal {
      
    @Resource(mappedName = "jdbc/CnamPool")
    private DataSource dataSRC;
    
    @Override
    public String getcardTotalRows(){ 
    return "a";
    }
    
    @Override
    public List<Card> getUserByKey(String cardID) {
        return this.searchCardsBy(cardID, "", "0", "1000");
    }
    
     @Override
    public List<Card> getCardsList(String start, String limit) {
        return this.searchCardsBy("", "",start, limit);
    }
    
    @Override
    public List<Card> searchCardsBy(String cardID,String embossing_name,
                                            String start, String limit) {
        ResultSet rs = null;
        Statement stmt = null;
        Connection conn = null;
        List<Card> obj = new ArrayList();
        try {
            conn = dataSRC.getConnection();
            if (conn == null) {
                throw new SQLException("Could not get a connection in searchCardsBy..");
            }
            //conn.setAutoCommit(true);
            stmt = conn.createStatement();                      
            
            String query = "SELECT cardserno , cardID, embossing_name, issue_date, expiry_date, "
                    + " card_status,customerid,  "
                    + " modifiedBy, modDateLong, "
                    + " count(*) rnum FROM cards where 1=1 ";

            if (!cardID.isEmpty()) {
                query += " and cardID like '%" + cardID + "%' ";
            }
           
            if (!embossing_name.isEmpty()) {
                query += " and lower(embossing_name) like lower('%" + embossing_name + "%')";
            }            

            query += " group by cardserno , cardID, embossing_name, \n" +
"                     issue_date, expiry_date, card_status,customerid,  \n" +
"                     modifiedBy, modDateLong ";
            query +=  "Limit "+ (Integer.parseInt(start) + Integer.parseInt(limit));
            //query += ") where rnum  > " + start;
            System.out.println("searchCardsBy query : "+query);    
            rs = stmt.executeQuery(query);

            while (rs.next()) {
                Card card = new Card(
                        rs.getInt("cardserno"), rs.getString("cardID"), 
                        rs.getString("embossing_name"), rs.getDate("issue_date"), rs.getDate("expiry_date"),
                        rs.getString("card_status"), rs.getInt("customerid"), 
                        rs.getString("modifiedBy"), rs.getDate("modDateLong")
                );
                obj.add(card);
                //System.out.println("FirstName "+rs.getString("firstName"));
            }

        } catch (SQLException ex) {
            System.out.println("Sql Exception in searchCardsBy  = " + ex.getMessage());

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
                System.out.println("APP searchCardsBy : Sqlexception" + e);
            }
        }
        return obj;
    }
    
     @Override
    public String getSearchCardsTotalRows (String cardID,String embossing_name)
        {
        String total = "0";
        ResultSet rs = null;
        Statement stmt = null;
        Connection conn = null;
        try {
            conn = dataSRC.getConnection();
            if (conn == null) {
                throw new SQLException("Could not get a connection in getSearchCardsTotalRows.");
            }
            //conn.setAutoCommit(true);
            stmt = conn.createStatement();

            String query = "SELECT Count(*) COUNT FROM cards Where 1 = 1 ";

            if (cardID != null && !cardID.isEmpty()) {
                 query += " and cardID like '%" + cardID + "%' ";
            }
            if (embossing_name != null && !embossing_name.isEmpty()) {
                query += " and lower(embossing_name) like lower('%" + embossing_name + "%')";
            }

            System.out.print(query);
            rs = stmt.executeQuery(query);
            while (rs.next()) {
                total = String.valueOf(rs.getInt("COUNT"));
            }

        } catch (SQLException ex) {
            System.out.println("Sql Exception in getSearchCardsTotalRows  = " + ex.getMessage());

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
                System.out.println("getSearchCardsTotalRows : Sqlexception" + e);
            }
        }
        return total;
    }
    
    @Override
    public String saveCard(Card card) {
        Connection conn = null;
        CallableStatement cstt = null;
        try {
            
            boolean cardok = true;
            if (cardok) {
                conn = dataSRC.getConnection();
                if (conn == null) {
                    throw new Exception("Could not get a connection in SaveCard");
                }
                System.out.println("card to savecard "+card.getCardID());

                String query = "{CALL SAVECARD(?,?,?,?,?,?,?)}";
                cstt = conn.prepareCall(query); // procedure call
                cstt.setString(1, card.getCardID());
                cstt.registerOutParameter(1, java.sql.Types.INTEGER);                 
                String embName = card.getEmbossing_name();
                cstt.setString(2, embName.substring(0, 1).toUpperCase() + embName.substring(1,embName.length()));
                cstt.setDate(3, ((java.sql.Date)card.getIssue_date()));
                cstt.setDate(4, ((java.sql.Date)card.getExpiry_date()));                                        
                cstt.setString(5,card.getCard_status());               
                cstt.setInt(6,card.getCustomerid());
                cstt.setString(7,card.getModifiedBy());

               cstt.executeUpdate(); 
               
               System.out.println("after updating "+cstt.getInt(1));
     
                if (cstt.getInt(1) != 0) {                    
                    return  embName + " Has Been Saved Succesfully";
                } else {
                    return "Failed to Save Customer " + embName;
                }
            } else {
                return "Failed to Save Card";
            }
        } catch (Exception ex) {
            System.out.println("CENTRAL DATA BASE ERROR Save Card: " + ex.getMessage());
            return "Error in Save Card";
        } finally {
            try {
                if (cstt != null) {
                    cstt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                System.out.println("Exception in Save Card is: " + e.getMessage());
                return "Error in Save Card";
            }
        }
    }
}
