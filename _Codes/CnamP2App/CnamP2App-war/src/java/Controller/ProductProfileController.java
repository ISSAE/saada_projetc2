package Controller;

import Entities.Product;
import flexjson.JSONSerializer;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import menu.ApplicationMenu;


public class ProductProfileController extends HttpServlet {

    private static final String JSON_CT = "application/json";
    private JSONSerializer rcJsoner = new JSONSerializer();
    @EJB
    private Facade.ProductManagerLocal prodManagerFacade;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        if (request.getSession().getAttribute("uid") == null
                || (!new ApplicationMenu().AllowAccess
                               (request.getRequestURI().replace(request.getContextPath() + "/", ""),
                        request.getSession(false).getAttribute("uid").toString()))) {
            response.setStatus(401);
            response.sendError(401);
            return;
        }

        response.setContentType("text/html;charset=UTF-8");
        try {

            String action = request.getParameter("action");
            System.out.println("action " + action);
               SimpleDateFormat format = new SimpleDateFormat("yyyy-MM"); 
               
            switch (action) {
                case "list":
                    replyAsJson(rcJsoner, response, "total", 
                            prodManagerFacade.getProductsTotalRows(), 
                            "productProfile_grid", 
                            prodManagerFacade.getProductsList(request.getParameter("start"), request.getParameter("limit")));
                    break;
                    
                case "search":
                    replyAsJson(rcJsoner, response, "total", prodManagerFacade.getSearchProductsTotalRows(Integer.parseInt(request.getParameter("productnum")), request.getParameter("productName")), "productProfile_grid",
                            prodManagerFacade.searchProductBy(Integer.parseInt(request.getParameter("productnum")), request.getParameter("productName"),request.getParameter("start"), request.getParameter("limit")));
                    break;
                case "getByID":
                    replyAsJson(rcJsoner, response, "success", true, "edit_productProfile", prodManagerFacade.getProductByKey(Integer.parseInt(request.getParameter("productnum"))));
                    break;
                case "alter":
                    System.out.println("product id " + Integer.parseInt(request.getParameter("productnum")));
                    replyAsJson(rcJsoner, response, "success", true, "msg", prodManagerFacade.saveProduct(
                            new Product(
                                    Integer.parseInt(request.getParameter("productnum")),
                                    request.getParameter("productName"),
                                    Integer.parseInt(request.getParameter("annualfees")),
                                    request.getParameter("producttype"),
                                    request.getSession(false).getAttribute("uid").toString())));
                    //} else if (action.equals("remove")) {
                    // replyAsJson(rcJsoner, response, "success", "success", "msg", custManagerFacade.removeCustomer(request.getParameter("userKy"), request.getSession(false).getAttribute("uid").toString()));                
                    break;
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
