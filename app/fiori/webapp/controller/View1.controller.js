// sap.ui.define([
//     "sap/ui/core/mvc/Controller"
// ],
const POST = (cmd,data) => axios.post('/Sgc'+cmd,data)
const GET = (url) => axios.get('/Sgc'+url)

const postData = POST('/Response',{
    "tcode":"I01T",
    "event": "BACK",
    "value":"123"
});
const getData = GET('/Screen');
let oModel;
//console.log(getData)

sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/odata/v4/ODataModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,ODataModel) {
        "use strict";

        return Controller.extend("ns.fiori.controller.View1", {
            onInit: function () {
                const that = this
                //oModel.oData["viewData"] = []
                getData.then(function(result) {
                    const data = result.data.value[0];
                    oModel = new sap.ui.model.json.JSONModel(data);
                    that.getView().setModel(oModel)
                }); 
            },
            onNext(){
                // post first then get -> new data 
                console.log(this.getView().getModel());
                console.log(this.getView().byId("btnNext"));
            },
            onBack(){
                // post 

            },
        });
    });
