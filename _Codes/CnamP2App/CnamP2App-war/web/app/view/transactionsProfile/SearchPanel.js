 Ext.define('MyApp.view.transactionsProfile.SearchPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.transactionsProfileSearchPanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.View',
        'Ext.toolbar.Paging',
        'Ext.toolbar.Spacer',
        'Ext.container.ButtonGroup'
    ],
    itemId: 'transactionsProfileSearchPanel',
    closable: true,
    title: 'Transactions Profile',
    iconCls: 'icon-user',
    initComponent: function() {
        var me = this;

        me.transactionID = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Transaction ID',
            name: 'transactionID',
            maxLength: 30
        });
        me.cardID = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Card ID',
            name: 'cardID',
            maxLength: 30
        });
        me.authorizationID = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Authorization ID',
            name: 'authorizationID',
            maxLength: 30
        });
               
        me.trxamount = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Amount',
            name: 'trxamount',
            maxLength: 10
        });
        
        me.trxcurrency = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Currency',
            name: 'trxcurrency',
            maxLength: 10
        });

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    animCollapse: true,
                    collapseDirection: 'top',
                    collapsed: true,
                    collapsible: true,
                    //autoScroll: true,
                    height: 200,
                    title: 'Search for Transaction',
                    iconCls: 'icon-search',
                    items: [
                        {
                            xtype: 'form',
                            itemId: 'transactionsProfileSearchFormPanel',
                            width: 300,
                            bodyPadding: 10,
                            url: 'TransactionProfileController',
                            items: [
                                me.transactionID, me.cardID,me.authorizationID,
         me.trxamount,me.trxcurrency,                          
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-cross',
                                    itemId: 'transactionsProfileResetButton',
                                    text: 'Reset',
                                    margin: '0 40 0 10'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-arrow-right',
                                    itemId: 'transactionsProfileSearchButton',
                                    text: 'Search'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: 'Search Transaction Results',
                    iconCls: 'icon-grid',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'transactionsProfileSearchGridPanel',
                            autoScroll: true,
                            height: 380,
                            store: 'TransactionProfileJsonStore',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'transactionID',
                                    text: 'ID',
                                    width: 60
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'cardID',
                                    text: 'Card Number',
                                    width: 200
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'authorizationID',
                                    text: 'Authorization ID',
                                    width: 90
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'trxdate',
                                    text: 'Transaction Date',
                                    width: 80
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'trxamount',
                                    text: 'Amount',
                                    width: 80
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'trxcurrency',
                                    text: 'Currency',
                                    width: 100
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'merchantname',
                                    text: 'Merchant Name',
                                    width:100
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'merchantcountry',
                                    text: 'Merchant Country',
                                    width: 100
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'postedOn',
                                    text: 'Posted Date',
                                    width: 80
                                },
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    itemId: 'transactionsProfileSearchPagingToolbar',
                                    dock: 'top',
                                    displayInfo: true,
                                    store: 'TransactionProfileJsonStore',
                                    items: [
                                        {
                                            xtype: 'tbspacer',
                                            width: 20
                                        },
                                        {
                                            xtype: 'buttongroup',
                                            columns: 6,
                                            width: 500,
                                            items: [
//                                                {
//                                                    xtype: 'button',
//                                                    itemId: 'transactionsProfileAddButton',
//                                                    iconCls: 'icon-add',
//                                                    text: 'Add'
//                                                },
                                                {
                                                    xtype: 'button',
                                                    iconCls: 'icon-edit',
                                                    itemId: 'transactionsProfileEditButton',
                                                    text: 'Reports'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    }
});