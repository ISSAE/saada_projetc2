

package Facade;

import Entities.Card;
import java.util.List;
import javax.ejb.Local;


@Local
public interface CardManagerLocal {
    
    public String getcardTotalRows();
    public List<Card> getUserByKey(String cardID);
    public List<Card> getCardsList(String start, String limit);
    public List<Card> searchCardsBy(String cardID,String embossing_name,
                                            String start, String limit);
    public String getSearchCardsTotalRows (String cardID,String embossing_name);
    public String saveCard(Card card);
}
