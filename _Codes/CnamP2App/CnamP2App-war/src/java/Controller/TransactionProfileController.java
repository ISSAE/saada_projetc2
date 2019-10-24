package Controller;

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

public class TransactionProfileController extends HttpServlet {

    private static final String JSON_CT = "application/json";
    private JSONSerializer rcJsoner = new JSONSerializer();
    @EJB
    private Facade.TransactionManagerLocal trxManagerFacade;

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
                    replyAsJson(rcJsoner, response, "total", trxManagerFacade.getTransactionsTotalRows(), "transactionProfile_grid", trxManagerFacade.getTransactionsList(request.getParameter("start"), request.getParameter("limit")));
                    break;
                case "search":
                    String trxid = request.getParameter("transactionID");
                    System.out.println("trx id "+trxid);
                    String cardnum = request.getParameter("cardID");
                    String authid = request.getParameter("authorizationID");
                    if (cardnum.isEmpty()) {
                        cardnum = " ";
                    } 
                    if (authid.isEmpty()) {
                        authid = " ";
                    }
                    
                    replyAsJson(rcJsoner, response, "total", trxManagerFacade.getSearchTransactionsTotalRows(request.getParameter("transactionID"),                            
                            cardnum, authid,
                            request.getParameter("trxamount"), request.getParameter("trxcurrency")), "transactionProfile_grid",
                            
                            trxManagerFacade.searchTransactionsBy(request.getParameter("transactionID"), request.getParameter("cardID"), request.getParameter("authorizationID"),
                                    request.getParameter("trxamount"), request.getParameter("trxcurrency"),request.getParameter("start"), request.getParameter("limit")));
                    break;
                case "getByID":
                    replyAsJson(rcJsoner, response, "success", true, "edit_transactionProfile", trxManagerFacade.getTransactionByKey(request.getParameter("transactionID")));
                    break;
                case "alter":
                    action = request.getParameter("action");
                    System.out.println("action "+action);
                    System.out.println("generate reports");
                    trxManagerFacade.generateTransactionReport();
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
