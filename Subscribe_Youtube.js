var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
var a    = pref.getBranch("network.proxy.");

var vps_order = 8;
var subscribe = "CODE:";
    subscribe+= "SET !ERRORIGNORE YES\n";
    subscribe+= "SET !TIMEOUT_TAG 0\n";
    subscribe+= "SET !TIMEOUT_PAGE 20\n";
    subscribe+=  "SET !DATASOURCE C:\\Users\\Administrator\\Downloads\\Channels.csv" + "\n";
    subscribe+=  "SET !DATASOURCE_LINE 1\n";   
    subscribe += "SET !VAR1 EVAL(\"var start_vps=\\\"{{!COL4}}\\\"; var end_vps=\\\"{{!COL5}}\\\";var x=\\\"about:cache\\\"; if ((start_vps <= vps_order) && (vps_order <= end_vps)) {x = \\\"{{!COL1}}\\\";} x;\")\n";
    subscribe+= "URL GOTO={{!VAR1}}\n";
    subscribe+= "WAIT SECONDS = 5\n";
    subscribe+= "TAG POS=4 TYPE=SPAN ATTR=TXT:Subscribe\n";
    subscribe+= "WAIT SECONDS = 10\n";

// End-of-line markers
const CRLF = "\r\n";
const LF = "\n";

var lines = new Array();               

var file_i = imns.FIO.openNode("C:\\Users\\Administrator\\Downloads\\Channels.csv");
var text = imns.FIO.readTextFile(file_i);         // Read file into one string

// Determine end-of-line marker
var eol = (text.indexOf(CRLF) == -1) ? LF : CRLF;

// Split into lines
lines = text.split(eol);

// Iterate over each line and split into columns
for (i = 1; i < lines.length; i++)
{
    iimPlay(subscribe.replace("SET !DATASOURCE_LINE 1", "SET !DATASOURCE_LINE " + i).split("vps_order").join(vps_order));
}
window.close();