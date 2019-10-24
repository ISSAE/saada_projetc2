
package Facade;

import Entities.User;
import javax.ejb.Local;


@Local
public interface UserManagerLocal {
    
    public User getUserByUsername(String username);
    public boolean getLogInAuth(String username, String password);
    //public String lostPassword(String userName);
    //public String contactSupport(String subject, String text);
}