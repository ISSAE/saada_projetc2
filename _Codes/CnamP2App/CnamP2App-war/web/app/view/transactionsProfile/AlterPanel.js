
Ext.define('MyApp.view.transactionsProfile.AlterPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.transactionsProfileAlterPanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.DateField',
        'Ext.form.field.Hidden',
        'Ext.button.Button',
        'Ext.data.reader.Json'
    ],
    closable: true,
    itemId: 'transactionsProfileAlterPanel',
    title: 'ADD/ALTER Transaction',
    initComponent: function() {
        var me = this;
        //me.renderDate = Ext.util.Format.dateRenderer('M j, Y H:i:s A');
        renderer = Ext.util.Format.dateRenderer('d-m-Y');
        me.transactionID = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Transaction ID',
            name: 'transactionID',
            readOnly: true,
            hideLabel: true,
            labelWidth: 180,
            hidden: true,
            value: 0
        });
        me.cardID = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Card Number<font color=red>*</font>',
            name: 'cardID',
            allowBlank: false,
            labelWidth: 100,
            maxLength: 50
        });
        me.authorizationID = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Authorization ID<font color=red>*</font>',
            name: 'authorizationID',
            allowBlank: false,
            labelWidth: 180,
            maxLength: 50
        });
        me.trxdate = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'Transaction Date',
            name: 'trxdate',
            allowblank: true,
            hideLabel: true,
            labelWidth: 180,
            hidden: true,
            maxLength: 75
        });
        me.trxamount = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Transction Amount',
            name: 'trxamount',
            labelWidth: 180,
            allowblank: false,
            maskRe: /[0-9.]/,
            maxLength: 75
        });
        me.trxcurrency = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Currency',
            name: 'trxcurrency',
            labelWidth: 180,
            maxLength: 5,
            allowblank: true
        });
        me.merchantname = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Merchant Name',
            name: 'merchantname',
            labelWidth: 180,
            allowblank: true,
            maxLength: 150
        });
        
        me.merchantcountry = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'merchant Country',
            name: 'merchantcountry',
            labelWidth: 180,
            allowBlank: true,
            maxLength: 150
        });
        me.postedOn = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'Posted Date',
            name: 'postedOn',
            allowblank: true,
            readOnly: true,
            hideLabel: true,
            labelWidth: 180,
            hidden: true,
            maxLength: 150
        });
       
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    itemId: 'transactionsProfileAlterForm',
                    bodyPadding: 10,
                    layout: 'column',
                    url: 'TransactionProfileController',
                    waitTitle: 'Loading...',
                    bbar: [{
                            xtype: 'button',
                            iconCls: 'icon-cross',
                            itemId: 'transactionsProfileAlterResetButton',
                            text: 'RESET',
                            margin: '0 120 0 10'
                        },
                        {
                            xtype: 'button',
                            layout: {
                                pack: 'center'
                            },
                            iconCls: 'icon-save',
                            itemId: 'transactionsProfileAlterSubmitButton',
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
                                }, me.transactionID,
                                me.cardID, me.authorizationID,
                                me.trxdate, me.trxamount, me.trxcurrency
                               
                            ]
                        }
                        , {
                            columnWidth: .4,
                            layout: 'form',
                            bodyStyle: 'padding: 3px',
                            items: [, me.merchantname, me.merchantcountry, me.postedOn]
                        }
                    ],
                    reader: {
                        type: 'json',
                        model: 'MyApp.model.TransactionProfileModel',
                        root: 'edit_transactionProfile'
                    }
                }
            ]
        });
        me.callParent(arguments);
    }
});