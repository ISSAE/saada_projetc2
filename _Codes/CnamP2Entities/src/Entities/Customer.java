
package Entities;

import java.util.Date;


public class Customer {
private int    customerky; 	
private String firstName;	
private String lastName;	
private String phoneNumber;	
private String mobileNumber;
private String address;		
private String region;		
private String zone; 	
private String userstatus;
private String modifiedBy;	
private Date   modDateLong;	

    public Customer() {
    }
    
    public Customer(int customerky, String firstName, String lastName, 
            String phoneNumber, String mobileNumber, String address, String region,  
            String zone,String userstatus, String modifiedBy) {
        this.customerky = customerky;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.mobileNumber = mobileNumber;
        this.address = address;
        this.region = region;
        this.zone = zone;
        this.userstatus = userstatus;
        this.modifiedBy = modifiedBy;
    }
    
    public Customer(int customerky, String firstName, String lastName, 
            String phoneNumber, String mobileNumber, String address, String region, String zone, 
            String userstatus) {
        this.customerky = customerky;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.mobileNumber = mobileNumber;
        this.address = address;
        this.region = region;
        this.zone = zone;
        this.userstatus = userstatus;
    }
    
    public Customer(int customerky, String firstName, String lastName, 
            String phoneNumber, String mobileNumber, String address, String region, String zone, 
            String userstatus,String modifiedBy, Date modDateLong) {
        this.customerky = customerky;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.mobileNumber = mobileNumber;
        this.address = address;
        this.region = region;
        this.zone = zone;
        this.userstatus = userstatus;
        this.modifiedBy = modifiedBy;
        this.modDateLong = modDateLong;
    }

    public int getCustomerky() {
        return customerky;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public String getAddress() {
        return address;
    }

    public String getRegion() {
        return region;
    }

    public String getZone() {
        return zone;
    }

    public String getUserstatus() {
        return userstatus;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public Date getModDateLong() {
        return modDateLong;
    }

    public void setCustomerky(int customerky) {
        this.customerky = customerky;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }

    public void setUserstatus(String userstatus) {
        this.userstatus = userstatus;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public void setModDateLong(Date modDateLong) {
        this.modDateLong = modDateLong;
    }
    
}
