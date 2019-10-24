
Ext.define('MyApp.controller.MainViewController', {
    extend: 'Ext.app.Controller',
    refs: [
        {
            ref: 'mainPanel',
            selector: '#mainPanel',
            xtype: 'Ext.panel.Panel'
        },        
        {
            ref: 'mainMenuToolbar',
            selector: '#mainMenuToolbar',
            xtype: 'Ext.toolbar.Toolbar'
        },
        {
            ref: 'mainViewLoginFormPanel',
            selector: '#mainViewLoginFormPanel',
            xtype: 'Ext.form.Panel'
        },
        {
            ref: 'mainViewContentPanel',
            selector: '#mainViewContentPanel',
            xtype: 'Ext.panel.Panel'
        }
    ],
    onMainViewClick: function(item, e, eOpts) {
        if (this.getMainViewLoginFormPanel().isValid()) {
            Ext.Ajax.request({
                url: 'LoginController',
                params: this.getMainViewLoginFormPanel().getValues(),
                success: function(resp, opts) {

                    var r = Ext.decode(resp.responseText);
                    if (r.success) {
                        this.getMainViewLoginFormPanel().hide();
                        if (this.getMainPanel()) {
                            this.getMainPanel().show();
                        }
                        else {
                            this.getMainViewContentPanel().add(Ext.create('MyApp.view.MainPanel'));
                        }
                    } else if (r.failure) {
                        Ext.MessageBox.show({
                            title: 'Failed To Login',
                            msg: 'Failed: '
                                    + r.failure,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                    }

                },
                failure: function(resp, opts) {
                    Ext.MessageBox.show({
                        title: 'Failed To Login',
                        msg: 'Failed: '
                                + resp.responseText,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                },
                scope: this
            });
        }
    },
    init: function(application) {
        Ext.Ajax.on('requestexception', function(conn, response, options, eOpts) {

            if (response.status == 401) {
                if (this.getMainPanel()) {
                    this.getMainPanel().hide();
                    Ext.MessageBox.show({
                        title: 'Session Time Out',
                        msg: 'Please Login Again',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
                this.getMainViewLoginFormPanel().getForm().reset();
                this.getMainViewLoginFormPanel().show();
            }


        }, this);
        this.control({
            "#mainViewLoginButton": {
                click: this.onMainViewClick
            }
        });
    }
});
