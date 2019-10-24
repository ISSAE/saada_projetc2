Ext.define('MyApp.view.MainView', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],
    itemId: 'mainView',
    layout: 'border',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    region: 'center',
                    itemId: 'mainViewContentPanel',
                    layout: 'absolute',
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'form',
                            x: 400,
                            y: 220,
                            itemId: 'mainViewLoginFormPanel',
                            width: 475,
                            bodyPadding: 10,
                            iconCls: 'icon-login',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    height: 144,
                                    width: 454,
                                    layout: 'absolute',
                                    title: 'Fields Marked With \'<font color=red>*</font>\' are  Required',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            x: 0,
                                            y: 20,
                                            width: 300,
                                            fieldLabel: 'UserName<font color=red>*</font>',
                                            labelWidth: 80,
                                            name: 'UserId',
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            x: 0,
                                            y: 50,
                                            width: 300,
                                            fieldLabel: 'Password<font color=red>*</font>',
                                            labelWidth: 80,
                                            name: 'password',
                                            inputType: 'password',
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'icon-arrow-right',
                                            x: 300,
                                            y: 90,
                                            itemId: 'mainViewLoginButton',
                                            text: 'Submit'
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