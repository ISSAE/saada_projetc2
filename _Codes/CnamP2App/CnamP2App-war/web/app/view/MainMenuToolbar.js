<%@page import="org.dom4j.Element"%>
<%@page import="java.util.Iterator"%>

Ext.define('MyApp.view.MainMenuToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.mainMenuToolbar',

    requires: [
        'Ext.button.Split',
        'Ext.menu.Menu',
        'Ext.menu.Item',
        'Ext.form.Label'
    ],

    itemId: 'mainMenuToolbar',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
               <%
                 String userName = session.getAttribute("uid").toString(); 
                 System.out.println(" userName : "+userName);
                 Element root = new menu.ApplicationMenu().getAuthorizedMenu(userName).getRootElement();

                 for (Iterator iter = root.elementIterator(); iter.hasNext();) {
                  Element menu = (Element) iter.next();

                  out.println("{xtype: 'splitbutton',text:'<b>" + menu.attributeValue("label") + "</b>',iconCls: '" + menu.attributeValue("icon") + "', menu:{");
                  out.println("xtype: 'menu',items: [");

                   for (Iterator i = menu.elementIterator("menu-item"); i.hasNext();) {
                    Element mi = (Element) i.next();

                    if (mi.attributeValue("id").equals("-")) {
                        out.println("'-'");
                    } else {
                        out.println("{xtype: 'menuitem',text:'<b>" + mi.attributeValue("label") + "</b>',");
                        out.println("iconCls: '" + mi.attributeValue("icon") + "',itemId:'" + mi.attributeValue("itemId") + "'}");
                    }
                    if (i.hasNext()) {
                        out.println(",");
                    }
                   }

                out.println("]}}");
                if (iter.hasNext()) {
                    out.println(",");
                }
             }
        %>,'->',
                {
                    xtype: 'label',
                    text: 'Welcome User: <% out.print(userName);%>'
                }
            ]
        });

        me.callParent(arguments);
    }

});