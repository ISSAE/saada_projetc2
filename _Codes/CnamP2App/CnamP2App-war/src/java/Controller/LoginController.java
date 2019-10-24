
package Controller;

import Entities.User;
import flexjson.*;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


public class LoginController extends HttpServlet {

    private static final String JSON_CT = "application/json";
    private JSONSerializer rcJsoner = new JSONSerializer();

    @EJB
    private  Facade.UserManagerLocal userManager;
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        System.out.println("inside LoginController process");
        //Logout User 
        if( request.getParameter("action") != null && request.getParameter("action").equals("logout")){
            request.getSession().invalidate();
            System.out.print("User Logged out{");
            return;
        }
        User dbuser = null;
        try {
              String userId = request.getParameter("UserId").trim();
              String passWd = request.getParameter("password").trim();
              System.out.println("Username "+userId);     
              System.out.println("Password "+passWd);
              
              // get user details from database
              dbuser = userManager.getUserByUsername(userId);
              System.out.println("First name "+dbuser.getFirstName());
              
              Integer userstatus = 1; // 0 = inactive : 1 = active
              //check login info
              if (userManager.getLogInAuth(userId, passWd) && (userstatus == 1)) { // Log In authentication returns true or false
                       HttpSession session = request.getSession(true);
                       session.setAttribute("uid", userId);
                       session.setAttribute("UserFName", dbuser.getFirstName());
                       session.setAttribute("UserLName", dbuser.getLastName());
                       replyAsJson(rcJsoner, response, "success", "success");
              } else {
                replyAsJson(rcJsoner, response, "failure", "Please verify your User Name/Password");
              }         
        } catch (Exception e) {
            System.out.println("User Servlet Exception " + e.getMessage());
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    private void replyAsJson(JSONSerializer jsoner, HttpServletResponse res, String key, Object obj) throws IOException {
        Map m = new HashMap(1);
        m.put(key, obj);

        res.setContentType(JSON_CT);
        res.getOutputStream().println(jsoner.serialize(m));
        res.flushBuffer();
    }    
}