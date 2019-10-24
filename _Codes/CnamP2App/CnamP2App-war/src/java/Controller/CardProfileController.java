package Controller;

import Entities.Card;
import flexjson.JSONSerializer;
import java.io.IOException;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import menu.ApplicationMenu;

public class CardProfileController extends HttpServlet {

    private static final String JSON_CT = "application/json";
    private JSONSerializer rcJsoner = new JSONSerializer();
    @EJB
    private Facade.CardManagerLocal cardManagerFacade;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        if (request.getSession().getAttribute("uid") == null
                || (!new ApplicationMenu().AllowAccess(request.getRequestURI().replace(request.getContextPath() + "/", ""),
                        request.getSession(false).getAttribute("uid").toString()))) 
        {
            response.setStatus(401);
            response.sendError(401);
            return;
        }

        response.setContentType("text/html;charset=UTF-8");
        try {

            String action = request.getParameter("action");
            System.out.println("action "+action);
            
            switch (action) {
                case "list":
                    replyAsJson(rcJsoner, response, "total", cardManagerFacade.getcardTotalRows(), "cardProfile_grid", cardManagerFacade.getCardsList(request.getParameter("start"), request.getParameter("limit")));
                    break;
                    
                case "search":
                    System.out.println("Search card ");
                    System.out.println("card "+request.getParameter("cardID"));
                    replyAsJson(rcJsoner, response, "total", cardManagerFacade.getSearchCardsTotalRows(request.getParameter("cardID"), request.getParameter("embossing_name")), "cardProfile_grid",
                            cardManagerFacade.searchCardsBy(request.getParameter("cardID"), request.getParameter("embossing_name"),request.getParameter("start"), request.getParameter("limit")));
                    break;
                    
                case "getByID":
                    System.out.println("card "+request.getParameter("cardID"));
                    replyAsJson(rcJsoner, response, "success", true, "edit_cardProfile", cardManagerFacade.getUserByKey(request.getParameter("cardID")));
                    break;
                    
                case "alter":
                    System.out.println("card id "+Integer.parseInt(request.getParameter("cardID")));
                    String embname = request.getParameter("embossing_name");
                    if (embname.isEmpty()) {
                        embname = " ";
                    }   //SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
                    //Date parsed = format.parse("20990101");
                    //java.sql.Date newdate = new java.sql.Date(parsed.getTime());
                    replyAsJson(rcJsoner, response, "success", true, "msg", cardManagerFacade.saveCard(
                            new Card(
                                    request.getParameter("cardID"),
                                    request.getParameter("embossing_name"),
                                    Date.valueOf(request.getParameter("issue_date")),
                                    Date.valueOf(request.getParameter("expiry_date")),
                                    request.getParameter("card_status"),       
                                    Integer.parseInt(request.getParameter("customerid")),
                                    request.getSession(false).getAttribute("uid").toString())));
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
