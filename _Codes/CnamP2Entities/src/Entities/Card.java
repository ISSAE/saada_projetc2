
package Entities;

import java.util.Date;


public class Card {
    
    private int cardserno;
    private String cardID;
    private String embossing_name;
    private Date issue_date;
    private Date expiry_date;
    private String card_status;
    private int customerid;
    private String modifiedBy;
    private Date modDateLong;

    public Card() {
    }

    public Card(String cardID, String embossing_name, Date issue_date, Date expiry_date, String card_status, int customerid, String modifiedBy) {
        this.cardID = cardID;
        this.embossing_name = embossing_name;
        this.issue_date = issue_date;
        this.expiry_date = expiry_date;
        this.card_status = card_status;
        this.customerid = customerid;
        this.modifiedBy = modifiedBy;
    }

    public Card(String cardID, String embossing_name) {
        this.cardID = cardID;
        this.embossing_name = embossing_name;
    }

    public Card(int cardserno, String cardID, String embossing_name, Date issue_date, Date expiry_date, String card_status, int customerid, String modifiedBy, Date modDateLong) {
        this.cardserno = cardserno;
        this.cardID = cardID;
        this.embossing_name = embossing_name;
        this.issue_date = issue_date;
        this.expiry_date = expiry_date;
        this.card_status = card_status;
        this.customerid = customerid;
        this.modifiedBy = modifiedBy;
        this.modDateLong = modDateLong;
    }

    
    
    public int getCardserno() {
        return cardserno;
    }

    public String getCardID() {
        return cardID;
    }

    public String getEmbossing_name() {
        return embossing_name;
    }

    public Date getIssue_date() {
        return issue_date;
    }

    public Date getExpiry_date() {
        return expiry_date;
    }

    public String getCard_status() {
        return card_status;
    }

    public int getCustomerid() {
        return customerid;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public Date getModDateLong() {
        return modDateLong;
    }

    public void setCardserno(int cardserno) {
        this.cardserno = cardserno;
    }

    public void setCardID(String cardID) {
        this.cardID = cardID;
    }

    public void setEmbossing_name(String embossing_name) {
        this.embossing_name = embossing_name;
    }

    public void setIssue_date(Date issue_date) {
        this.issue_date = issue_date;
    }

    public void setExpiry_date(Date expiry_date) {
        this.expiry_date = expiry_date;
    }

    public void setCard_status(String card_status) {
        this.card_status = card_status;
    }

    public void setCustomerid(int customerid) {
        this.customerid = customerid;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public void setModDateLong(Date modDateLong) {
        this.modDateLong = modDateLong;
    }     
    
}
