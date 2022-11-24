// sap.ui.define([
//     "sap/ui/core/mvc/Controller"
// ],
const POST = (cmd,data) => axios.post('/Sgc'+cmd,data)
const GET = (url) => axios.get('/Sgc'+url)
const tCode = "I01T";
const postData = POST('/Response',{
    "tcode": tCode,
    "event": "BACK",
    "value":"123"
});
const getData = GET('/Screen');
let oModel;
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/odata/v4/ODataModel", "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,ODataModel,JSONModel) {
        "use strict";
        return Controller.extend("ns.fiori.controller.View1", {
            onInit: function () {
                const that = this
                getData.then(function(result) {
                    const data = result.data.value[0];
                    oModel = new JSONModel(data);
                    that.getView().setModel(oModel);
                }); 
                window.addEventListener("keydown", (event) => {
                    const data = this.getView().getModel();
                    //const buttons = data.oData.NavControlToButtons.results;
                    const btnBack = this.getView().byId("btnBack");
                    const btnNext = this.getView().byId("btnNext");
                    const btns = [btnBack, btnNext]
                    btns.forEach( el => {
                        if (el["Fkey"] == event.key){
                            console.log(el);
                            event.preventDefault();
                            this.sendToDab(el["Event"], this);                     
                        }               
                    })
                });
                this.byId("inp").focus()    
            },
            onNext(){   //get input value -> post - > get
                const that = this;
                const event = this.getView().byId("btnNext").getText();
                const inpValue = this.getView().byId("inp").getValue();
                const postNewData = POST('/Response',{
                    "tcode": tCode,
                    "event": event,
                    "value": inpValue
                });
                const getNextStep = GET('/Screen');
                getNextStep.then(function(result) {
                    console.log();
                    const data = result.data.value[0];
                    data.value = inpValue
                    oModel.oData = data;
                    console.log(data);  
                    oModel.updateBindings();
                }); 
                // if ("asdf") {   //if ok footer -> green
                    
                // }else{ //else red

                // }
                this.getView().byId("inp").setValue("");
            },
            onBack(){
                // post 

            },
        });
    });
