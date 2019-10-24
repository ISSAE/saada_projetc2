
Ext.define('MyApp.view.customersProfile.AlterPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.customersProfileAlterPanel',
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
    itemId: 'customersProfileAlterPanel',
    title: 'ADD/ALTER Customer',
    initComponent: function() {
        var me = this;
        //me.renderDate = Ext.util.Format.dateRenderer('M j, Y H:i:s A');
        renderer = Ext.util.Format.dateRenderer('d-m-Y');
        me.customerky = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Customer Key',
            name: 'customerky',
            readOnly: true,
            hideLabel: true,
            labelWidth: 180,
            hidden: true,
            value: 0
        });
        me.firstName = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'First Name<font color=red>*</font>',
            name: 'firstName',
            allowBlank: false,
            labelWidth: 100,
            maxLength: 50
        });
        me.lastName = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Last Name<font color=red>*</font>',
            name: 'lastName',
            allowBlank: false,
            labelWidth: 180,
            maxLength: 50
        });
        me.phoneNumber = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Phone Number',
            name: 'phoneNumber',
            maskRe: /[0-9.]/,
            allowblank: true,
            labelWidth: 180,
            maxLength: 75
        });
        me.mobileNumber = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Mobile Number',
            name: 'mobileNumber',
            labelWidth: 180,
            allowblank: true,
            maskRe: /[0-9.]/,
            maxLength: 75
        });
        me.address = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Address',
            name: 'address',
            labelWidth: 180,
            maxLength: 150,
            allowblank: true
        });
        me.region = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Region',
            name: 'region',
            labelWidth: 180,
            allowblank: true,
            maxLength: 150
        });
        me.zone = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Zone',
            name: 'zone',
            labelWidth: 180,
            allowBlank: true,
            maxLength: 75
        });
        
    
    /*    me.generatorRadiogrp = Ext.create("Ext.form.RadioGroup", {
            fieldLabel: 'Generator',
            name: 'generator',
            labelWidth: 180,
            column: 1,
            items: [
                {boxLabel: 'NABIL', name: 'generator', inputValue: 'NABIL'},
                {boxLabel: 'BOUTROS', name: 'generator', inputValue: 'BOUTROS'}]
              ,
           setValue: function (value) {
            if (!Ext.isObject(value)) {
                var obj = new Object();
                obj[this.name] = value;
                value = obj;
            }
            Ext.form.RadioGroup.prototype.setValue.call(this, value);
        } });*/
        
        me.statusRadiogrp = /*Ext.create("Ext.form.RadioGroup", {*/
                new Ext.form.RadioGroup({
                    fieldLabel: 'Status',
                    name: 'userstatus',
                    labelWidth: 180,
                    column: 1,
                    items: [
                        {boxLabel: 'ACTIVE', name: 'userstatus', inputValue: 'ACTIVE'},
                        {boxLabel: 'INACTIVE', name: 'userstatus', inputValue: 'INACTIVE'}]
                ,
           setValue: function (value) {
            if (!Ext.isObject(value)) {
                var obj = new Object();
                obj[this.name] = value;
                value = obj;
            }
            Ext.form.RadioGroup.prototype.setValue.call(this, value);
        } });
        
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
                    itemId: 'customersProfileAlterForm',
                    bodyPadding: 10,
                    layout: 'column',
                    url: 'CustomerProfileController',
                    waitTitle: 'Loading...',
                    bbar: [{
                            xtype: 'button',
                            iconCls: 'icon-cross',
                            itemId: 'customersProfileAlterResetButton',
                            text: 'RESET',
                            margin: '0 120 0 10'
                        },
                        {
                            xtype: 'button',
                            layout: {
                                pack: 'center'
                            },
                            iconCls: 'icon-save',
                            itemId: 'customersProfileAlterSubmitButton',
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
                                }, me.customerky,
                                me.firstName, me.lastName,
                                me.phoneNumber, me.mobileNumber, me.address,
                                me.region, me.zone
                            ]
                        }
                        , {
                            columnWidth: .4,
                            layout: 'form',
                            bodyStyle: 'padding: 3px',
                            items: [,me.statusRadiogrp,  me.modifiedBy]
                        }
                    ],
                    reader: {
                        type: 'json',
                        model: 'MyApp.model.CustomerProfileModel',
                        root: 'edit_customerProfile'
                    }
                }
            ]
        });
        me.callParent(arguments);
    }
});