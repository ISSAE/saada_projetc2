

package Facade;

import Entities.Transaction;
import java.util.List;
import javax.ejb.Local;


@Local
public interface TransactionManagerLocal 
{
   
    public String getTransactionsTotalRows();
    public List<Transaction> getTransactionByKey(String transactionID);
    public List<Transaction> getTransactionsList(String start, String limit);
    public List<Transaction> searchTransactionsBy(String transactionID, String cardID, String authorizationID, String trxamount,
                                             String trxcurrency, String start, String limit);
    public String getSearchTransactionsTotalRows 
        (String transactionID,String cardID,String authorizationID, String trxamount,
                                             String trxcurrency);
    public void generateTransactionReport();
}
