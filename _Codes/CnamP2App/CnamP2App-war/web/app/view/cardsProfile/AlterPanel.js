
Ext.define('MyApp.view.cardsProfile.AlterPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cardsProfileAlterPanel',
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
    itemId: 'cardsProfileAlterPanel',
    title: 'ADD/ALTER Cards',
    initComponent: function() {
        var me = this;
        //me.renderDate = Ext.util.Format.dateRenderer('M j, Y H:i:s A');
        me.renderDate = Ext.util.Format.dateRenderer('m-d-Y');
        //renderer = Ext.util.Format.dateRenderer('yyyy');
        me.cardserno = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Card Serno',
            name: 'cardserno',
            readOnly: true,
            labelWidth: 180,
            hidden: true,
            value: 0
        });
        
        me.cardID = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Card ID<font color=red>*</font>',
            name: 'cardID',
            readOnly: true,
            maskRe: /[0-9.]/,
            labelWidth: 180,
        });
           
        me.embossing_name = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Embossing Name',
            name: 'embossing_name',
            //readOnly: true,
            labelWidth: 180,
            hidden: true,
            value: 0
        });
        
        me.issue_date = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'Issue Date',
            name: 'issue_date',
            readOnly: true,
            //hideLabel: true,
            labelWidth: 180
        });
        
        me.expiry_date = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'Expiry Date',
            name: 'expiry_date',
            readOnly: true,
            //hideLabel: true,
            labelWidth: 180
        });

        me.card_status = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Card Status',
            name: 'card_status',
            labelWidth: 10,           
            maxLength: 3
        });

        me.customerid = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Customer ID',
            name: 'customerid',
            allowBlank: false,
            readOnly: true,
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
                    itemId: 'cardsProfileAlterForm',
                    bodyPadding: 10,
                    layout: 'column',
                    url: 'CardProfileController',
                    waitTitle: 'Loading...',
                    bbar: [{
                            xtype: 'button',
                            iconCls: 'icon-cross',
                            itemId: 'cardsProfileAlterResetButton',
                            text: 'RESET',
                            margin: '0 120 0 10'
                        },
                        {
                            xtype: 'button',
                            layout: {
                                pack: 'center'
                            },
                            iconCls: 'icon-save',
                            itemId: 'cardsProfileAlterSubmitButton',
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
                                },me.cardserno,me.cardID,me.embossing_name, me.issue_date,
                                me.expiry_date,me.card_status,me.customerid,
                                me.modifiedBy,
                            ]
                        }
                    ],
                    reader: {
                        type: 'json',
                        model: 'MyApp.model.CardProfileModel',
                        root: 'edit_cardProfile'
                    }
                }
            ]
        });
        me.callParent(arguments);
    }
});