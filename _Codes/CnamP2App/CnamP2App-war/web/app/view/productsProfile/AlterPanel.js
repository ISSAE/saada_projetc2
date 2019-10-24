
Ext.define('MyApp.view.productsProfile.AlterPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.productsProfileAlterPanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.RadioGroup',
        'Ext.form.field.Date',
        'Ext.form.field.Radio',
        'Ext.form.field.Hidden',
        'Ext.button.Button',
        'Ext.data.reader.Json'
    ],
    closable: true,
    itemId: 'productsProfileAlterPanel',
    title: 'ADD/ALTER Products',
    initComponent: function() {
        var me = this;
        //me.renderDate = Ext.util.Format.dateRenderer('M j, Y H:i:s A');
        me.renderDate = Ext.util.Format.dateRenderer('m-d-Y');
        //renderer = Ext.util.Format.dateRenderer('yyyy');
        
        me.productnum = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Product Number',
            name: 'productnum',
            maskRe: /[0-9.]/,
            allowBlank: false,
            maxLength: 50,
            labelWidth: 180
        });

        me.productName = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Product Name<font color=red>*</font>',
            name: 'productName',
            allowBlank: false,
            labelWidth: 100,
            minLength: 3,
            maxLength: 50
        });

        me.annualfees = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Annual Fees<font color=red>*</font>',
            name: 'annualfees',
            maskRe: /[0-9.]/,
            allowBlank: false,
            labelWidth: 180,
            maxLength: 50
        });

        me.producttype = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Product Type<font color=red>*</font>',
            name: 'producttype',
            allowBlank: false,
            labelWidth: 100,
            minLength: 1,
            maxLength: 2
        });

        me.modifiedBy = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Modified By',
            name: 'modifiedBy',
            labelWidth: 180,
            readOnly: true
        });

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    itemId: 'productsProfileAlterForm',
                    bodyPadding: 10,
                    layout: 'column',
                    url: 'ProductProfileController',
                    waitTitle: 'Loading...',
                    bbar: [{
                            xtype: 'button',
                            iconCls: 'icon-cross',
                            itemId: 'productsProfileAlterResetButton',
                            text: 'RESET',
                            margin: '0 120 0 10'
                        },
                        {
                            xtype: 'button',
                            layout: {
                                pack: 'center'
                            },
                            iconCls: 'icon-save',
                            itemId: 'productsProfileAlterSubmitButton',
                            text: 'SUBMIT'
                        }],
                    items: [
                        {
                            columnWidth: .4,
                            layout: 'form',
                            bodyStyle: 'padding: 3px',
                            items: [{
                                    xtype: 'hiddenfield',
                                    name: 'action',
                                    value: 'alter'
                                }, me.productnum, me.productName,
                                me.annualfees, me.producttype,
                                me.modifiedBy
                            ]
                        }
                    ],
                    reader: {
                        type: 'json',
                        model: 'MyApp.model.ProductProfileModel',
                        root: 'edit_productProfile'
                    }
                }
            ]
        });
        me.callParent(arguments);
    }
});