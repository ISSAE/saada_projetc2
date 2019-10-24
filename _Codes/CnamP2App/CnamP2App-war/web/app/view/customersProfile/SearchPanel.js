//var satellitevalues = Ext.create('Ext.data.Store', {
//        fields: [
//                        {type: 'string', name: 'label'},
//                        {type: 'string', name: 'fieldName'}
//                    ],
//        data : [
//            {"label":"yesvalue", "fieldName":"YES"},
//            {"label":"novalue", "fieldName":"NO"}
//        ]
//    });
//  

Ext.define('MyApp.view.customersProfile.SearchPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.customersProfileSearchPanel',
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
    itemId: 'customersProfileSearchPanel',
    closable: true,
    title: 'Customers Profile',
    iconCls: 'icon-user',
    initComponent: function() {
        var me = this;
        me.statusRenderer = function(v) {
            return v ? 'Active' : 'Inactive';
        };
//        me.lockRenderer = function(v) {
//            return v ? 'Yes' : 'No';
//        };
        me.customerky = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Customer ID',
            name: 'customerky',
            maxLength: 30
        });
        me.firstName = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'First Name',
            name: 'firstName',
            minLength: 3,
            maxLength: 30
        });
        me.mobileNumber = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Mobile Number',
            name: 'mobileNumber',
            minLength: 3,
            maxLength: 30
        });
        me.zone = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Zone',
            name: 'zone',
            maxLength: 10
        });
//        me.satellite = Ext.create('Ext.form.field.ComboBox', {
//            fieldLabel: 'Satellite',
//            store: {fields: [
//                    {type: 'string', name: 'label'},
//                    {type: 'string', name: 'fieldName'}
//                ],
//                data: [
//                    {"label": "yesvalue", "fieldName": "YES"},
//                    {"label": "novalue", "fieldName": "NO"}
//                ]},
//            queryMode: 'local',
//            displayField: 'fieldName',
//            valueField: 'novalue',
//            renderTo: Ext.getBody(),
//            maxLength: 30
//        });

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
                    title: 'Search for Customer',
                    iconCls: 'icon-search',
                    items: [
                        {
                            xtype: 'form',
                            itemId: 'customersProfileSearchFormPanel',
                            width: 300,
                            bodyPadding: 10,
                            url: 'CustomerProfileController',
                            items: [
                                me.customerky,
                                me.firstName,
                                me.mobileNumber,
                                me.zone,                          
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-cross',
                                    itemId: 'customersProfileResetButton',
                                    text: 'Reset',
                                    margin: '0 40 0 10'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-arrow-right',
                                    itemId: 'customersProfileSearchButton',
                                    text: 'Search'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: 'Search Customer Results',
                    iconCls: 'icon-grid',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'customersProfileSearchGridPanel',
                            autoScroll: true,
                            height: 380,
                            store: 'CustomerProfileJsonStore',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'customerky',
                                    text: 'ID',
                                    width: 60
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'firstName',
                                    text: 'First Name',
                                    width: 100
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'lastName',
                                    text: 'Last Name',
                                    width: 100
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'phoneNumber',
                                    text: 'Phone Number',
                                    width: 80
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'mobileNumber',
                                    text: 'Mobile Number',
                                    width: 80
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'address',
                                    text: 'Address',
                                    width: 100
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'region',
                                    text: 'Region',
                                    width: 100
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'zone',
                                    text: 'Zone',
                                    width: 70
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'userstatus',
                                    text: 'Status',
                                    width: 50
                                    //renderer: me.statusRenderer
                                },
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    itemId: 'customersProfileSearchPagingToolbar',
                                    dock: 'top',
                                    displayInfo: true,
                                    store: 'CustomerProfileJsonStore',
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
                                                    itemId: 'customersProfileAddButton',
                                                    iconCls: 'icon-add',
                                                    text: 'Add'
                                                },
                                                {
                                                    xtype: 'button',
                                                    iconCls: 'icon-edit',
                                                    itemId: 'customersProfileEditButton',
                                                    text: 'Edit'
                                                },
                                                {
                                                    xtype: 'button',
                                                    iconCls: 'icon-delete',
                                                    itemId: 'customersProfileDeleteButton',
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