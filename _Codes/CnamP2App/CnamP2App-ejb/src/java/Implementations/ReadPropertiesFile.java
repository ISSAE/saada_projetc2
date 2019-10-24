

package Implementations;
import java.util.Enumeration;
import java.util.Properties;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;
import java.io.FileInputStream;

public class ReadPropertiesFile {

      public Properties getProperties(String filename){
        try {
                ResourceBundle bdl = new PropertyResourceBundle(new FileInputStream(getLocalDirName() + filename));
                Properties p = new Properties();
                Enumeration keys = bdl.getKeys();

                while(  keys.hasMoreElements( ) ) {
                    String prop = (String)keys.nextElement( );
                    String val = bdl.getString(prop);
                    p.setProperty(prop, val);
                }
                return p;
            }
            catch(Exception e) {
                    System.out.println("Coudln't read properties files" + e);
                    return null;
            }


    }

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
}
