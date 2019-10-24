package menu;

import Facade.UserManagerLocal;
import Implementations.ReadPropertiesFile;
import java.io.File;
import java.util.Iterator;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;


public class ApplicationMenu {
    
        UserManagerLocal userManager= lookupUserManagerImplLocal();
	private File menuFile;
	private Document menuDocument;
        Properties properties = new ReadPropertiesFile().getProperties("/config.properties");
	private boolean SecurityOnMenu = Boolean.parseBoolean(properties.getProperty("SecurityOnMenu"));               
 
        public ApplicationMenu() {
    
        }
	public void setMenuFile(File menuFile) {
		this.menuFile = menuFile;
	}
	
	public void init() throws IllegalArgumentException {
		SAXReader sr = new SAXReader();
		try {
            this.menuDocument = sr.read(getLocalDirName()+ "/menu.xml"); 
		} catch (Exception e) {
            System.out.println("Failed loading application");
		}


	}
	
	public Document getMenu() {
		return this.menuDocument;
	}
	
	public Document getAuthorizedMenu(String UserName) {
        init();
		if (menuDocument == null) {
			return null;
		}

        //****************************
		// Fetch current user's menu roles
   //             List<UserMenu> roles = null;
   //             try {
   //                 roles = userManager.getMenuConfiguration(UserName);//method return list
   //             } catch (Exception e) {
    //                System.out.println("No Security available, can't proceed. " + e.getMessage());
   //                 e.printStackTrace();
   //                 return null;
    //            }
		
		// Work on a clone copy, since we will detach nodes
		Document filteredDocument = (Document) menuDocument.clone();		
		Element root = filteredDocument.getRootElement();		
		
		// Filter the menu based on given credentials. The 'id' attribute in each xml element
		// will act as the security object against which we will check. 
		for (Iterator iter = root.elementIterator(); iter.hasNext();) {
			Element menu = (Element) iter.next();
			String id = menu.attributeValue("id");
	  	
       //     if (!isAuthorized(id, roles)) {
          //      menu.detach();
            //    continue;
          //  }

	  	
			for (Iterator i = menu.elementIterator("menu-item"); i.hasNext();) {
				Element mi = (Element) i.next();
				id = mi.attributeValue("id");
				
				if (id.equals("-")) continue;

              //  if (!isAuthorized(id, roles)) {
             //       mi.detach();
              //  }


			}
		}
		return filteredDocument;
	}


//    private boolean isAuthorized(String elem, List<UserMenu> roles) {
//        boolean authorized = false;
//        if (!SecurityOnMenu) return true;
//        if (roles != null) {
//            Iterator rolesList = roles.iterator();
//            UserMenu userMenu;
//            while (rolesList.hasNext()) {
//                userMenu = (UserMenu) rolesList.next();
//                if (elem.equals(userMenu.getFormName())) {
//                    authorized = true;
//                    break;
//                }
//            }
//        }
//        return authorized;
//    }

	public boolean AllowAccess(String url,String username) {return true;}
//        if (!SecurityOnMenu) return true;
//        // to lower to adapt with db case sensitive
//      	url = url.toLowerCase();
//        return (userManager.getUrlInvocation(username,url));
//    }

 public String getLocalDirName()
       {
          String localDirName;

          //Use that name to get a URL to the directory we are executing in
          java.net.URL myURL = this.getClass().getResource(getClassName());  //Open a URL to the our .class file

          //Clean up the URL and make a String with absolute pathname
          localDirName = myURL.getPath();  //Strip path to URL objectout
          localDirName = myURL.getPath().replaceAll("%20", " ");  //change %20 chars to spaces

          //Get the current execution directory
          localDirName = localDirName.substring(0,localDirName.lastIndexOf("/"));  //clean off the filename

          return localDirName;
       }

    public String getClassName()
       {
          String thisClassName;

          //Build a string with executing class's name
          thisClassName = this.getClass().getName();
          thisClassName = thisClassName.substring(thisClassName.lastIndexOf(".") + 1,thisClassName.length());
          thisClassName += ".class";  //this is the name of the bytecode file that is executing

          return thisClassName;
       }

    private UserManagerLocal lookupUserManagerImplLocal() {
        try {
            Context c = new InitialContext();
            return (UserManagerLocal) c.lookup("java:global/CnamP2App/CnamP2App-ejb/UserManagerImpl!Facade.UserManagerLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }



}