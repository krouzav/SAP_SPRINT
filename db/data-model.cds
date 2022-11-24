namespace sgc;

entity Response {
    tcode : String;
    event : String;
    value : String;
}

entity Screen {
    title: String;
    btn1_text: String;
    btn2_text: String;
    scr_type: String;
    scr_texts: String;
}

entity Params {
    KEY tcode  : String;
    KEY stepno : Integer;
    title      : String;
    btn1_text  : String;
    btn2_text  : String;
}