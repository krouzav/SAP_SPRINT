// sap.ui.define([
//     "sap/ui/core/mvc/Controller"
// ],
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/odata/v4/ODataModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,ODataModel) {
        "use strict";

        return Controller.extend("ns.fiori.controller.View1", {
            onInit: function () {

            },
            onNext(){
                // post 
                var that = this;
                this.getView().getModel().submitBatch("SalesOrderUpdateGroup").then(function(){
                    if (!that.byId("mySimpleForm").getBindingContext().getBinding().hasPendingChanges()){
                        // raise success message
                    }
                });
            },
            onBack(){
                // post 

            },
        });
    });
