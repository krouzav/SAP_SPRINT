module.exports = (srv) => {

  // define main core class to handle SMS logic
  class sgcCore {
    constructor(iv_tcode) {
      // constructor save transaction to be processed and prepare first transaction set
      this.tcode = iv_tcode;
      this.setFirstStep();
    }

    setFirstStep() {
      // test data
      this.stepno = 10;
      this.buildScreen();        //prepare current data to class attributes to describe screen
    }

    processEvent(iv_event, iv_value) {
      // test process - it simulates 3-steps transaction logic
      // 1. screen is for entering mateial number
      // 2. screen is for set quantity - there is one test error handling - quantity has to be greather than 100
      // 3. screen is to confirm process
      this.scr_type = "";
      this.scr_texts = "";
      if (iv_event == "NEXT") {
        switch (this.stepno) {
          case 10:
            this.stepno += 10;
            this.matnr = iv_value;
            break;
          case 20:
            if (iv_value <= 100) {
              this.scr_type = "E";
              this.scr_texts =
                "Value " + iv_value + " is not greather than 100";
            } else {
              this.menge = iv_value;
              this.scr_texts = this.stepno += 10;
            }
            break;
          case 30:
            this.scr_type = "S";
            this.scr_texts =
              "Material " +
              this.matnr +
              " with quantity " +
              this.menge +
              " processed successfully.";
            this.stepno = 10;
            break;
        }
      } else {
        if (this.stepno > 10) {
          this.stepno -= 10;
        }
      }
      this.buildScreen();
    }

    buildScreen() {
      //test process
      //there are 3 screens, this method prepares text description for each screen based on current transaction step
      this.screen_btn1_text = "BACK";
      this.screen_btn2_text = "NEXT";
      switch (this.stepno) {
        case 10:
          this.screen_title = "Enter material";
          break;
        case 20:
          this.screen_title = "Enter quantity greather than 100";
          if (this.scr_texts != "") {
            this.scr_texts += "\n";
          }
          this.scr_texts += "Material: " + this.matnr;
          break;
        case 30:
          this.screen_title = "Confirm process?";
          this.scr_texts =
            "Material: " + this.matnr + ", Qunatity:" + this.menge;
          break;
      }
    }
  }

   // service init data
  let go_sgc;
  let gv_screen_title = "Transaction is not running";
  let gv_screen_btn1_text = "";
  let gv_screen_btn2_text = "";
  let gv_screen_type = "";
  let gv_screen_texts = "";

  /************************************************************************************ */
  // Application handling events
  // Receive event from user
  srv.before("CREATE", "Response", async (req) => {
    const resp = req.data;
    if (go_sgc == null) {
      go_sgc = new sgcCore(resp.tcode);
    } else {
      //go_sgc.setNextTitle();
      go_sgc.processEvent(resp.event, resp.value);
    }

    // set current screen information from core
    gv_screen_title = go_sgc.screen_title;
    gv_screen_btn1_text = go_sgc.screen_btn1_text;
    gv_screen_btn2_text = go_sgc.screen_btn2_text;
    gv_screen_type = go_sgc.scr_type;
    gv_screen_texts = go_sgc.scr_texts;
    //return req.error (400, resp.event);
  });

  // Send current core data to
  srv.on("READ", "Screen", () => [
    {
      title: gv_screen_title,
      btn1_text: gv_screen_btn1_text,
      btn2_text: gv_screen_btn2_text,
      scr_type: gv_screen_type,
      scr_texts: gv_screen_texts,
    },
  ]);
};
