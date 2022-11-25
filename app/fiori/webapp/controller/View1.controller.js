// sap.ui.define([
//     "sap/ui/core/mvc/Controller"
// ],
const POST = (cmd,data) => axios.post('/Sgc'+cmd,data);
const GET = (url) => axios.get('/Sgc'+url);
const tCode = "I01T";
const postData = POST('/Response',{
    "tcode": tCode,
    "event": "BACK",
    "value":"123"
});
const getData = GET('/Screen');
let oModel;
let histModel;
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/odata/v4/ODataModel", "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,ODataModel,JSONModel) {
        "use strict";
        return Controller.extend("ns.fiori.controller.View1", {
            onInit: function () {
                this.getView().byId("inp").focus();
                const that = this;
                getData.then(function(result) {
                    const data = result.data.value[0];
                    oModel = new JSONModel(data);
                    that.getView().setModel(oModel);
                }); 
                document.addEventListener("keydown", function(event){
                    if(event.key == "F3"){
                        event.preventDefault();
                        that.onBack();
                    }
                    if(event.key == "F4"){
                        event.preventDefault();
                        that.onNext();
                    }
                });
            },
            onNext(){
                const that = this;
                const event = this.getView().byId("btnNext").getText().slice(3);
                const inpValue = this.getView().byId("inp").getValue();
                const postNewData = POST('/Response',{
                    "tcode": tCode,
                    "event": event,
                    "value": inpValue
                });
                const getNextStep = GET('/Screen');
                getNextStep.then(function(result) {
                    const data = result.data.value[0];
                    if(data.scr_type == ""){
                        that.getView().byId("footer-icon").addStyleClass("hidden"); 
                        that.getView().byId("footer").addStyleClass("hidden"); 
                        data.value = inpValue;
                        oModel.oData = data;  
                        oModel.updateBindings();
                    }
                    if(data.scr_type == "S"){
                        that.getView().byId("footer-icon").removeStyleClass("hidden"); 
                        that.getView().byId("footer").removeStyleClass("hidden"); 
                        that.getView().byId("footer").removeStyleClass("footerRed");
                        that.getView().byId("footer-icon").setSrc("sap-icon://accept");
                        that.getView().byId("footer").addStyleClass("footerGreen");
                        data.value = inpValue;
                        oModel.oData = data;  
                        oModel.updateBindings();
                    }if(data.scr_type == "E"){
                        that.getView().byId("txt").setText(data.scr_texts);
                        that.getView().byId("footer-icon").removeStyleClass("hidden"); 
                        that.getView().byId("footer").removeStyleClass("footerGreen");
                        that.getView().byId("footer").removeStyleClass("hidden"); 
                        that.getView().byId("footer-icon").setSrc("sap-icon://alert");
                        that.getView().byId("footer").addStyleClass("footerRed");
                        data.value = inpValue;
                        oModel.oData = data;  
                        oModel.updateBindings();
                    }
                }); 
                this.getView().byId("inp").setValue("");
            },
            onBack(){
                this.getView().byId("footer-icon").addStyleClass("hidden"); 
                this.getView().byId("footer").addStyleClass("hidden"); 
                const that = this;
                const event = this.getView().byId("btnBack").getText().slice(3);
                const inpValue = this.getView().byId("inp").getValue();
                const postNewData = POST('/Response',{
                    "tcode": tCode,
                    "event": event,
                    "value": inpValue
                });
                const getNextStep = GET('/Screen');
                getNextStep.then(function(result) {
                    const data = result.data.value[0];
                    oModel.oData = data;  
                    oModel.updateBindings();
                })

            },
        });
    });
