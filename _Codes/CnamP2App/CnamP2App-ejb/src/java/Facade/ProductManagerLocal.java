
package Facade;

import Entities.Product;
import java.text.ParseException;
import java.util.List;
import javax.ejb.Local;


@Local
public interface ProductManagerLocal {

   public String getProductsTotalRows();
   public List<Product> getProductByKey(int productnum) throws ParseException ;
   public List<Product> getProductsList(String start, String limit) throws ParseException;
   public List<Product> searchProductBy(int productnum,String productName,
                                        String start, String limit) throws ParseException;
   public String getSearchProductsTotalRows (int productnum,String productName)
                                                throws ParseException;;
   public String saveProduct(Product product);
    
}
