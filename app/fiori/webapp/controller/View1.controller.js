// sap.ui.define([
//     "sap/ui/core/mvc/Controller"
// ],

const GET = (url) => axios.get('/Sgc'+url)
const POST = (cmd,data) => axios.post('/Sgc'+cmd,data)

//KROV test to delete
//const data = GET('/Screen')
//console.log(data)

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
