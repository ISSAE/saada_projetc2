
Ext.define('MyApp.view.cardsProfile.SearchPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cardsProfileSearchPanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox',
        'Ext.form.DateField',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.View',
        'Ext.toolbar.Paging',
        'Ext.toolbar.Spacer',
        'Ext.container.ButtonGroup'
    ],
    itemId: 'cardsProfileSearchPanel',
    closable: true,
    title: 'Cards Profile',
    iconCls: 'icon-cards',
    initComponent: function() {
        var me = this;

        me.cardID = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Card ID',
            name: 'cardID',
            maxLength: 30
        });
        
        me.embossing_name = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Embossing Name',
            name: 'embossing_name',
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
                    title: 'Search for Cards',
                    iconCls: 'icon-search',
                    items: [
                        {
                            xtype: 'form',
                            itemId: 'cardsProfileSearchFormPanel',
                            width: 300,
                            bodyPadding: 10,
                            url: 'CardProfileController',
                            items: [
                                me.cardID,
                                me.embossing_name,
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-cross',
                                    itemId: 'cardsProfileResetButton',
                                    text: 'Reset',
                                    margin: '0 40 0 10'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-arrow-right',
                                    itemId: 'cardsProfileSearchButton',
                                    text: 'Search'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: 'Search Cards Results',
                    iconCls: 'icon-grid',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'cardsProfileSearchGridPanel',
                            autoScroll: true,
                            height: 400,
                            store: 'CardProfileJsonStore',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'cardserno',
                                    text: 'Card Serno',
                                    width: 75
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'cardID',
                                    text: 'Card ID',
                                    width: 180
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'embossing_name',
                                    text: 'Embossing Name',
                                    width: 150
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'issue_date',
                                    text: 'Issue date',
                                    width: 150
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'expiry_date',
                                    text: 'Expiry date',
                                    width: 150
                                },
                                
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'card_status',
                                    text: 'Card Status',
                                    width: 100
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'customerid',
                                    text: 'Customer ID',
                                    width: 100
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    itemId: 'cardsProfileSearchPagingToolbar',
                                    dock: 'top',
                                    displayInfo: true,
                                    store: 'CardProfileJsonStore',
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
                                                {
                                                    xtype: 'button',
                                                    itemId: 'cardsProfileAddButton',
                                                    iconCls: 'icon-add',
                                                    text: 'Add'
                                                },
                                                {
                                                    xtype: 'button',
                                                    iconCls: 'icon-edit',
                                                    itemId: 'cardsProfileEditButton',
                                                    text: 'Edit'
                                                },
                                                {
                                                    xtype: 'button',
                                                    iconCls: 'icon-delete',
                                                    itemId: 'cardsProfileDeleteButton',
                                                    text: 'Delete'
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