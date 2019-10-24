utils = function() {
    return {
        submitItem: function(formPanel, pagingToolbar) {
            var myMask = new Ext.LoadMask(formPanel, {msg: "Please wait on progress..."});
            myMask.show();
            formPanel.submit({
                clientValidation: true,
                success: function(form, action) {
                    myMask.hide();
                    Ext.Msg.alert('Info', action.result.msg);
                    if (pagingToolbar)
                        pagingToolbar.doRefresh();
                },
                failure: function(form, action) {
                    myMask.hide();
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Failure', 'Ajax communication failed');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Failure', action.result.msg);
                    }
                }
            });

        },
        deleteItem: function(cfg, pagingToolbar) {

            var s = cfg.grid.getSelectionModel().getSelection()[0];

            Ext.MessageBox.show({
                title: 'Removing',
                msg: 'Sure to remove ' + cfg.itemName + ' ?',
                buttons: Ext.MessageBox.OKCANCEL,
                icon: Ext.MessageBox.QUESTION,
                scope: this,
                fn: function(btn) {
                    if (btn == 'ok') {
                        Ext.Ajax.request({
                            url: cfg.url,
                            params: {action: 'remove'},
                            success: function(resp, opts) {

                                var r = Ext.decode(resp.responseText);
                               
                                if (r.success) {
                                    
                                    Ext.MessageBox.show({
                                        title: 'Deleted',
                                        msg: r.msg,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.WARNING
                                    });
                                    if(pagingToolbar)
                                     pagingToolbar.doRefresh();
                                }

                            },
                            failure: function(resp, opts) {
                                Ext.MessageBox.show({
                                    title: 'Failed',
                                    msg: 'Failed: '
                                            + resp.responseText,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                            },
                            scope: cfg.grid
                        });
                    }// end btn ok
                }// end function
            });
        },
            generateFile: function(cfg, pagingToolbar) {

            var s = cfg.grid.getSelectionModel().getSelection()[0];

            Ext.MessageBox.show({
                title: 'Reports ',
                msg: 'Sure to generate report ?',
                buttons: Ext.MessageBox.OKCANCEL,
                icon: Ext.MessageBox.QUESTION,
                scope: this,
                fn: function(btn) {
                    if (btn == 'ok') {
                        Ext.Ajax.request({
                            url: cfg.url,
                            params: {action: 'alter'},
                            success: function(resp, opts) {

                                var r = Ext.decode(resp.responseText);
                               
                                if (r.success) {
                                    
                                    Ext.MessageBox.show({
                                        title: 'Reports',
                                        msg: r.msg,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.WARNING
                                    });
                                    if(pagingToolbar)
                                     pagingToolbar.doRefresh();
                                }

                            },
                            failure: function(resp, opts) {
                                Ext.MessageBox.show({
                                    title: 'Failed',
                                    msg: 'Failed: '
                                            + resp.responseText,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                            },
                            scope: cfg.grid
                        });
                    }// end btn ok
                }// end function
            });
        },
    };
}();
