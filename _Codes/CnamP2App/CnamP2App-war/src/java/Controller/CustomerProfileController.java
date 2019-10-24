package Controller;

import Entities.Customer;
import flexjson.JSONSerializer;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import menu.ApplicationMenu;

public class CustomerProfileController extends HttpServlet {

    private static final String JSON_CT = "application/json";
    private JSONSerializer rcJsoner = new JSONSerializer();
    @EJB
    private Facade.CustomerManagerLocal custManagerFacade;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        if (request.getSession().getAttribute("uid") == null
                || (!new ApplicationMenu().AllowAccess(request.getRequestURI().replace(request.getContextPath() + "/", ""),
                        request.getSession(false).getAttribute("uid").toString()))) {
            response.setStatus(401);
            response.sendError(401);
            return;
        }

        response.setContentType("text/html;charset=UTF-8");
        try {

            String action = request.getParameter("action");
            System.out.println("action "+action);
            //System.out.println("firstname "+request.getParameter("firstName"));
            //System.out.println("satellite "+request.getParameter("satellite"));
            if (action.equals("list")) {
                replyAsJson(rcJsoner, response, "total", custManagerFacade.getCustomerTotalRows(), "customerProfile_grid", custManagerFacade.getCustomersList(request.getParameter("start"), request.getParameter("limit")));
            } 
            else if (action.equals("search")) {
                replyAsJson(rcJsoner, response, "total", custManagerFacade.getSearchCustomersTotalRows(request.getParameter("customerky"), request.getParameter("firstName"), request.getParameter("mobileNumber"), request.getParameter("zone")), "customerProfile_grid",
                       custManagerFacade.searchCustomersBy(request.getParameter("customerky"), request.getParameter("firstName"), request.getParameter("mobileNumber"), request.getParameter("zone"),request.getParameter("start"), request.getParameter("limit")));
            } 
            else if (action.equals("getByID")) {
               replyAsJson(rcJsoner, response, "success", true, "edit_customerProfile", custManagerFacade.getUserByKey(request.getParameter("customerky")));
            } 
            else if (action.equals("alter")) { 
                System.out.println("customer id "+Integer.parseInt(request.getParameter("customerky")));
                String custaddress = request.getParameter("address");
                String custregion = request.getParameter("region");
                String custzone =request.getParameter("zone");
                if (custaddress.isEmpty()) {
                    custaddress = " ";
                }
                if (custregion.isEmpty()) {
                    custregion = " ";
                }
                if (custzone.isEmpty()) {
                    custzone = " ";
                }
                System.out.println("user status "+request.getParameter("userstatus"));
                replyAsJson(rcJsoner, response, "success", true, "msg", custManagerFacade.saveCustomer(
                            new Customer(
                                    Integer.parseInt(request.getParameter("customerky")),
                                    request.getParameter("firstName"),
                                    request.getParameter("lastName"),
                                    request.getParameter("phoneNumber"),
                                    request.getParameter("mobileNumber"),
                                    custaddress,custregion,custzone,       
                                    request.getParameter("userstatus"),
                                    request.getSession(false).getAttribute("uid").toString())));
                
            } else if (action.equals("remove")) {
               
               replyAsJson(rcJsoner, response, "success", "success", "msg", custManagerFacade.removeCustomer(request.getParameter("customerky"), 
                                                request.getSession(false).getAttribute("uid").toString()));
         }
        } catch (Exception e) {
            System.out.println("User Profile Servlet Exception " + e.getMessage());
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

    private void replyAsJson(JSONSerializer jsoner, HttpServletResponse res, String key, Object obj, String key1, Object obj1) throws IOException {
        Map m = new HashMap(1);
        m.put(key, obj);
        m.put(key1, obj1);

        res.setContentType(JSON_CT);
        res.getOutputStream().println(jsoner.serialize(m));
        res.flushBuffer();
    }
}
