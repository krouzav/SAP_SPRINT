module.exports = (srv) => {

  class sgcCore {

    constructor(iv_tcode) {
      this.tcode = iv_tcode;
      this.setFirstStep();
    }

    setFirstStep() {
      // test data
      this.stepno = 10;
      this.buildScreen();
    }

    processEvent(iv_event, iv_value) {
      // test process
      this.scr_type = "";
      this.scr_texts = "";
      if (iv_value <= 100) {

      }
      else {
        switch (iv_event) {
          case "NEXT":
            if (this.stepno < 30) {
              this.stepno += 10;
            }
            break;
          case "BACK":
            if (this.stepno > 10) {
              this.stepno -= 10;
            }
            break;
        }
      }
      this.buildScreen();
    }

    buildScreen() {
      //test process
      this.screen_btn1_text = "BACK";
      this.screen_btn2_text = "NEXT";
      switch (this.stepno) {
        case 10:
          this.screen_title = '1.Title';
          break;
        case 20:
          this.screen_title = '2.Title';
          break;
        case 30:
          this.screen_title = '3.Title';
          break;
      }
    }

  }




  let go_sgc;
  let gv_screen_title = "Transaction is not running";
  let gv_screen_btn1_text = "";
  let gv_screen_btn2_text = "";
  let gv_screen_type = "";
  let gv_screen_texts = "";






  // Receive event from user
  srv.before('CREATE', 'Response', async (req) => {
    const resp = req.data;
    if (go_sgc == null) {
      go_sgc = new sgcCore(resp.tcode);
    }
    else {
      //go_sgc.setNextTitle();
      go_sgc.processEvent(resp.event, resp.value);
    }

    // set current screen information from core
    gv_screen_title = go_sgc.screen_title;
    gv_screen_btn1_text = go_sgc.screen_btn1_text;
    gv_screen_btn2_text = go_sgc.screen_btn2_text;
    //return req.error (400, resp.event);
  })

  // Send current core data to
  srv.on('READ', 'Screen', () => [
    { title: gv_screen_title },
    { btn1_text: gv_screen_btn1_text },
    { btn2_text: gv_screen_btn2_text },
    { scr_type: gv_screen_type },
    { scr_texts: gv_screen_texts },
  ])
}