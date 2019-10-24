package Entities;

import java.util.Date;

public class Product {
    private int productnum;
    private String productName;
    private int annualfees;
    private String producttype;
    private String modifiedBy;	
    private Date modDateLong;

    public Product() {
    }

    public Product(int productnum, String productName) {
        this.productnum = productnum;
        this.productName = productName;
    }

    public Product(int productnum, String productName, int annualfees, String producttype, String modifiedBy) {
        this.productnum = productnum;
        this.productName = productName;
        this.annualfees = annualfees;
        this.producttype = producttype;
        this.modifiedBy = modifiedBy;
    }
    
    public Product(int productnum, String productName, int annualfees, String producttype, String modifiedBy,
                   Date modDateLong) {
        this.productnum = productnum;
        this.productName = productName;
        this.annualfees = annualfees;
        this.producttype = producttype;
        this.modifiedBy = modifiedBy;
        this.modDateLong = modDateLong;
    }

    public String getProductName() {
        return productName;
    }


    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public Date getModDateLong() {
        return modDateLong;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public void setModDateLong(Date modDateLong) {
        this.modDateLong = modDateLong;
    }

    public int getAnnualfees() {
        return annualfees;
    }

    public String getProducttype() {
        return producttype;
    }

    public void setAnnualfees(int annualfees) {
        this.annualfees = annualfees;
    }

    public void setProducttype(String producttype) {
        this.producttype = producttype;
    }

    public int getProductnum() {
        return productnum;
    }

    public void setProductnum(int productnum) {
        this.productnum = productnum;
    }

}
