package Facade;

import Entities.Customer;
import java.util.List;
import javax.ejb.Local;

@Local
public interface CustomerManagerLocal {
    
   public String getCustomerTotalRows();
   public List<Customer> getUserByKey(String Customerky);
   public List<Customer> getCustomersList(String start, String limit);
   public List<Customer> searchCustomersBy(String customerKy,String firstName,String mobileNumber,String zone,String start, String limit);
   public String getSearchCustomersTotalRows (String customerKy,String firstName,String mobileNumber,String zone);
   public String saveCustomer(Customer customer);
   public String removeCustomer(String customerKy,String deletedBy);
}
