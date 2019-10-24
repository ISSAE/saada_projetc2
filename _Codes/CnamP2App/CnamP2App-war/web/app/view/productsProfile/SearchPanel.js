
Ext.define('MyApp.view.productsProfile.SearchPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.productsProfileSearchPanel',
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
    itemId: 'productsProfileSearchPanel',
    closable: true,
    title: 'Products Profile',
    iconCls: 'icon-products',
    initComponent: function() {
        var me = this;

        me.productnum = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Product Number',
            name: 'productnum',
            maxLength: 50
        });

        me.productName = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Product Name',
            name: 'productName',
            maxLength: 10
        });

        me.annualfees = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Annual Fees',
            name: 'annualfees',
            maxLength: 30
        });

         me.producttype = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Product Type',
            name: 'producttype',
            maxLength: 2
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
                    title: 'Search for Products',
                    iconCls: 'icon-search',
                    items: [
                        {
                            xtype: 'form',
                            itemId: 'productsProfileSearchFormPanel',
                            width: 300,
                            bodyPadding: 10,
                            url: 'ProductProfileController',
                            items: [
                                me.productnum,
                                me.productName,
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-cross',
                                    itemId: 'productsProfileResetButton',
                                    text: 'Reset',
                                    margin: '0 40 0 10'
                                },                            
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-arrow-right',
                                    itemId: 'productsProfileSearchButton',
                                    text: 'Search'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: 'Search Products Results',
                    iconCls: 'icon-grid',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'productsProfileSearchGridPanel',
                            autoScroll: true,
                            height: 400,
                            store: 'ProductProfileJsonStore',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'productnum',
                                    text: 'Product Num',
                                    width: 150
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'productName',
                                    text: 'Product Name',
                                    width: 150
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'annualfees',
                                    text: 'Annual Fees',
                                    width: 150
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'producttype',
                                    text: 'Product Type',
                                    width: 100
                                },
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    itemId: 'productsProfileSearchPagingToolbar',
                                    dock: 'top',
                                    displayInfo: true,
                                    store: 'ProductProfileJsonStore',
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
                                                    itemId: 'productsProfileAddButton',
                                                    iconCls: 'icon-add',
                                                    text: 'Add'
                                                },
                                                {
                                                    xtype: 'button',
                                                    iconCls: 'icon-edit',
                                                    itemId: 'productsProfileEditButton',
                                                    text: 'Edit'
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