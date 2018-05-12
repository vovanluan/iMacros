var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
var a    = pref.getBranch("network.proxy.");

var vps_order = 14;
var type, start_vps, end_vps;
var array_Of_VPS;

function getProfileName(){
profile =  "CODE:";
profile+= "SET !ERRORIGNORE YES\n";
profile+= "SET !TIMEOUT_PAGE 20\n";
profile +=  "VERSION BUILD=8970419 RECORDER=FX" + "\n";
profile +=  "TAB T=1" + "\n";
profile +=  "URL GOTO=about:cache" + "\n";
profile +=  "WAIT SECONDS=3" + "\n";
profile +=  "TAG POS=1 TYPE=h2 ATTR=TXT:disk" + "\n";
profile +=  "SET !EXTRACT NULL" + "\n";
profile +=  "TAG POS=R4 TYPE=TD ATTR=* EXTRACT=TXT" + "\n";
//profile +=  "SET !VAR2 EVAL(\"var s='{{!EXTRACT}}'; var x,y,z,v,w; x=s.split(' '); y=x[1].split(' '); z=y[0];w=z.substr(0,8);v=w.match(/\\d+/g);v\")" + "\n";
//profile +=  "SET !EXTRACT {{!VAR2}}" + "\n";
iimPlay(profile);
var ret = iimGetExtract();
return ret.split("\\cache2")[0].split("Profiles\\").pop();
    //C:\Users\Admin\AppData\Local\Mozilla\Firefox\Profiles\1\cache2 
}

var line = getProfileName();

var getIPandPort = "CODE:";
getIPandPort += "SET !DATASOURCE C:\\Test\\Accounts.csv" + "\n";
getIPandPort +=  "SET !LOOP 1\n";
getIPandPort +=  "SET !DATASOURCE_LINE {{!LOOP}}" + "\n";
getIPandPort += "SET !EXTRACT NULL\n";
getIPandPort += "SET !EXTRACT {{!COL3}}\n";
//iimPlay(getIPandPort.replace("SET !LOOP 1", "SET !LOOP " + line));
var result = iimGetLastExtract();
var array = result.split(":");
var ip = array[0];
var port = array[1];

    a.setCharPref("http", ip);
    a.setIntPref("http_port", port);
    a.setCharPref("ssl", ip);
    a.setIntPref("ssl_port", port);
    a.setCharPref("ftp", ip);
    a.setIntPref("ftp_port", port);
    a.setCharPref("socks", ip);
    a.setIntPref("socks_port", port);

a.setIntPref("type", 1); // type = 1 : use ssh, type = 5: not use ssh

var getData = "CODE:";
    getData+= "SET !ERRORIGNORE YES\n";
    getData+= "SET !TIMEOUT_TAG 0\n";
    getData+= "SET !TIMEOUT_PAGE 20\n";
    getData+=  "SET !DATASOURCE C:\\Test\\Order.txt" + "\n";
    getData+=  "SET !DATASOURCE_LINE 1\n";  
    getData += "SET !EXTRACT NULL\n";
    getData += "SET !EXTRACT {{!COLMYCOLUMN}}\n";

var twitterRetweet = "CODE:";
    twitterRetweet+= "SET !ERRORIGNORE YES\n";
    twitterRetweet+= "SET !TIMEOUT_TAG 0\n";
    twitterRetweet+= "SET !TIMEOUT_PAGE 20\n";  
    twitterRetweet+=  "TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:/search ATTR=ID:q CONTENT=USERNAME\n";  
    twitterRetweet+= "WAIT SECONDS = 1\n";
    twitterRetweet+=  "TAG POS=1 TYPE=INPUT:IMAGE FORM=ACTION:/search ATTR=ALT:Search&&TYPE:image\n";  
    twitterRetweet+= "WAIT SECONDS = 3\n";
    twitterRetweet+=  "TAG POS=1 TYPE=SPAN ATTR=TXT:@USERNAME\n";  
    twitterRetweet+= "WAIT SECONDS = 3\n";
    twitterRetweet+= "TAG POS=1 TYPE=TABLE ATTR=CLASS:tweet&&HREF:MYHREF*\n";
    twitterRetweet+= "WAIT SECONDS = 3\n";
    twitterRetweet+= "TAG POS=1 TYPE=SPAN ATTR=TITLE:Retweet&&CLASS:imgsprite_detail_rt_gif&&TXT:\n";
    twitterRetweet+= "WAIT SECONDS = 2\n";
    twitterRetweet+= "TAG POS=1 TYPE=INPUT:SUBMIT ATTR=NAME:commit\n";
    twitterRetweet+= "WAIT SECONDS = 5\n";

var twitterFavorite = "CODE:";
    twitterFavorite+= "SET !ERRORIGNORE YES\n";
    twitterFavorite+= "SET !TIMEOUT_TAG 0\n";
    twitterFavorite+= "SET !TIMEOUT_PAGE 20\n";
    twitterFavorite+=  "TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:/search ATTR=ID:q CONTENT=USERNAME\n";  
    twitterFavorite+= "WAIT SECONDS = 1\n";
    twitterFavorite+=  "TAG POS=1 TYPE=INPUT:IMAGE FORM=ACTION:/search ATTR=ALT:Search&&TYPE:image\n";  
    twitterFavorite+= "WAIT SECONDS = 3\n";
    twitterFavorite+=  "TAG POS=1 TYPE=SPAN ATTR=TXT:@USERNAME\n";  
    twitterFavorite+= "WAIT SECONDS = 3\n";
    twitterFavorite+= "TAG POS=1 TYPE=TABLE ATTR=CLASS:tweet&&HREF:MYHREF*\n";
    twitterFavorite+= "WAIT SECONDS = 3\n";
    twitterFavorite+= "TAG POS=1 TYPE=SPAN ATTR=TITLE:Like&&CLASS:imgsprite_detail_heart_gif&&TXT:\n";
    twitterFavorite+= "WAIT SECONDS = 5\n";


var playCode = "";
// End-of-line markers
const CRLF = "\r\n";
const LF = "\n";

var lines = new Array();               

var file_i = imns.FIO.openNode("C:\\Test\\Order.txt");
var text = imns.FIO.readTextFile(file_i);         // Read file into one string

// Determine end-of-line marker
var eol = (text.indexOf(CRLF) == -1) ? LF : CRLF;

// Split into lines
lines = text.split(eol);

// Iterate over each line and split into columns

function getExtract(column, n){
    iimPlay(getData.replace("MYCOLUMN", column).replace("SET !DATASOURCE_LINE 1", "SET !DATASOURCE_LINE " + n));
    return iimGetLastExtract();
}

//iimPlayCode("URL GOTO=twitter.com\nWAIT SECONDS=3\n");

/*
for (i = 1; i < lines.length; i++)
{
    array_Of_VPS = getExtract(4, i);
    array_Of_VPS = array_Of_VPS.split(",").map(Number);

    if (array_Of_VPS.includes(vps_order)) {
        type = getExtract(5, i);
        type = parseInt(type);        
        var link = getExtract(1,i);
        var username = link.split("/")[3];
        var href = link.replace("https://twitter.com", "");        
        switch(type) {
            // TWITTER section //    
            //  Twitter Favorites   
            case 47:
                iimPlay(twitterFavorite.split("USERNAME").join(username).replace("MYHREF", href));
                break;  
            // Twitter Retweets
            case 48:
                iimPlay(twitterRetweet.split("USERNAME").join(username).replace("MYHREF", href));
                break;                                       
            default:
                playCode = subscribe.replace("MYCODE", subscribeCode);
                break;        
        }
    }

}
*/
window.close();