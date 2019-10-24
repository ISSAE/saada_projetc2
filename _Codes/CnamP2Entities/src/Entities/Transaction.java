

package Entities;

import java.util.Date;


public class Transaction {
    private int transactionID;
    private String cardID;
    private String authorizationID;
    private Date  trxdate;           
    private int trxamount;      
    private String trxcurrency;
    private String merchantname;
    private String merchantcountry;
    private Date postedOn;

    public Transaction() {
    }

    public Transaction(String cardID, String authorizationID, Date trxdate, int trxamount, String trxcurrency) {
        this.cardID = cardID;
        this.authorizationID = authorizationID;
        this.trxdate = trxdate;
        this.trxamount = trxamount;
        this.trxcurrency = trxcurrency;
    }

    public Transaction(String cardID, String authorizationID, Date trxdate, int trxamount, String trxcurrency, String merchantname, String merchantcountry, Date postedOn) {
        this.cardID = cardID;
        this.authorizationID = authorizationID;
        this.trxdate = trxdate;
        this.trxamount = trxamount;
        this.trxcurrency = trxcurrency;
        this.merchantname = merchantname;
        this.merchantcountry = merchantcountry;
        this.postedOn = postedOn;
    }

    public Transaction(int transactionID, String cardID, String authorizationID, Date trxdate, int trxamount, String trxcurrency, String merchantname, String merchantcountry, Date postedOn) {
        this.transactionID = transactionID;
        this.cardID = cardID;
        this.authorizationID = authorizationID;
        this.trxdate = trxdate;
        this.trxamount = trxamount;
        this.trxcurrency = trxcurrency;
        this.merchantname = merchantname;
        this.merchantcountry = merchantcountry;
        this.postedOn = postedOn;
    }

    public String getCardID() {
        return cardID;
    }

    public String getAuthorizationID() {
        return authorizationID;
    }

    public Date getTrxdate() {
        return trxdate;
    }

    public int getTrxamount() {
        return trxamount;
    }

    public String getTrxcurrency() {
        return trxcurrency;
    }

    public String getMerchantname() {
        return merchantname;
    }

    public String getMerchantcountry() {
        return merchantcountry;
    }

    public Date getPostedOn() {
        return postedOn;
    }

    public void setCardID(String cardID) {
        this.cardID = cardID;
    }

    public void setAuthorizationID(String authorizationID) {
        this.authorizationID = authorizationID;
    }

    public void setTrxdate(Date trxdate) {
        this.trxdate = trxdate;
    }

    public void setTrxamount(int trxamount) {
        this.trxamount = trxamount;
    }

    public void setTrxcurrency(String trxcurrency) {
        this.trxcurrency = trxcurrency;
    }

    public void setMerchantname(String merchantname) {
        this.merchantname = merchantname;
    }

    public void setMerchantcountry(String merchantcountry) {
        this.merchantcountry = merchantcountry;
    }

    public void setPostedOn(Date postedOn) {
        this.postedOn = postedOn;
    }

    public int getTransactionID() {
        return transactionID;
    }

    public void setTransactionID(int transactionID) {
        this.transactionID = transactionID;
    }



}
