
Ext.define('MyApp.view.MainPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainPanel',
    
    requires: [
        'MyApp.view.MainMenuToolbar',
        'Ext.toolbar.Toolbar',
        'Ext.Img',
        'Ext.tab.Panel'
    ],
    
    itemId: 'mainPanel',
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    region: 'north',
                    height: 150,
                    itemId: 'headerPanel',
                    dockedItems: [
                        {
                            xtype: 'mainMenuToolbar',
                            dock: 'bottom'
                        }
                    ],
                    items: [
                        {
                            xtype: 'image',
                            height: 110,
                            width: 354,
                            src:'images/logo.png'
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    region: 'center',
                    itemId: 'mainPanelTabpanel',
                    toFrontOnShow: false
                }
            ]
        });

        me.callParent(arguments);
    }

});