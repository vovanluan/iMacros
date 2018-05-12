var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
var a    = pref.getBranch("network.proxy.");

function getProfileName(){
profile =  "CODE:";
profile+= "SET !ERRORIGNORE YES\n";
profile+= "SET !TIMEOUT_PAGE 20\n";
profile +=  "VERSION BUILD=8970419 RECORDER=FX" + "\n";
profile +=  "TAB T=1" + "\n";
profile +=  "URL GOTO=about:cache" + "\n";
profile +=  "WAIT SECONDS=1" + "\n";
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
getIPandPort += "WAIT SECONDS = 1\n";
iimPlay(getIPandPort.replace("SET !LOOP 1", "SET !LOOP " + line));
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






