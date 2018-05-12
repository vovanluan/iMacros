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

var openMail = "CODE:";
    openMail +=  "SET !TIMEOUT_PAGE 60" + "\n";
    openMail +=  "SET !TIMEOUT_TAG 1" + "\n";
    openMail +=  "SET !TIMEOUT_STEP 1" + "\n";
    openMail += "SET !TIMEOUT_MACRO 400\n";
    openMail += "SET !ERRORIGNORE YES\n";
    openMail += "SET !EXTRACT NULL\n";
    openMail +=  "SET !DATASOURCE C:\\Test\\Accounts.csv" + "\n";
    openMail +=  "SET !LOOP 1\n";
    openMail +=  "SET !DATASOURCE_LINE {{!LOOP}}\n";
    openMail += "WAIT SECONDS = 1\n";
    openMail += "TAB T=1\n";
    openMail += "TAB CLOSEALLOTHERS\n";
    openMail += "WAIT SECONDS = 1\n";
    openMail += "URL GOTO=https://accounts.google.com/ServiceLogin?hl=en&service=youtube\n";
    openMail += "WAIT SECONDS = 1\n";
    openMail += "TAG POS=1 TYPE=INPUT:EMAIL FORM=ID:gaia_loginform ATTR=ID:Email CONTENT={{!COL1}}\n";
    openMail += "WAIT SECONDS = 1\n";
    openMail += "TAG POS=1 TYPE=INPUT:SUBMIT FORM=ID:gaia_loginform ATTR=ID:next\n";
    openMail += "WAIT SECONDS = 6\n";
    openMail += "SET !ENCRYPTION NO\n";
    openMail += "TAG POS=1 TYPE=INPUT:PASSWORD FORM=ID:gaia_loginform ATTR=ID:Passwd CONTENT={{!COL2}}\n";
    openMail += "WAIT SECONDS = 1\n";
    openMail += "TAG POS=1 TYPE=INPUT:SUBMIT FORM=ID:gaia_loginform ATTR=ID:signIn\n";
    openMail += "WAIT SECONDS = 8\n";
    openMail += "TAG POS=1 TYPE=SELECT FORM=ID:challenge ATTR=ID:countryList CONTENT=%US\n";
    openMail += "TAG POS=1 TYPE=BUTTON FORM=ACTION:/signin/challenge/ll/4 ATTR=TXT:Enter<SP>the<SP>city<SP>you<SP>usually<SP>sign<SP>in<SP>from\n";
    openMail += "WAIT SECONDS = 3\n";
    openMail += "TAG POS=1 TYPE=INPUT:TEXT FORM=ID:challenge ATTR=ID:answer CONTENT=Ha<SP>Noi\n";
    openMail += "WAIT SECONDS = 1\n";
    openMail += "TAG POS=1 TYPE=BUTTON FORM=ACTION:/signin/challenge/kpe/* ATTR=TXT:Confirm<SP>your<SP>recovery<SP>email\n";
    openMail += "TAG POS=1 TYPE=BUTTON FORM=ACTION:/signin/challenge/kpp/* ATTR=TXT:Confirm<SP>your<SP>recovery<SP>phone<SP>number\n";
    openMail += "WAIT SECONDS = 3\n";
    openMail += "TAG POS=1 TYPE=INPUT:EMAIL FORM=ID:challenge ATTR=NAME:email CONTENT={{!COL4}}\n";
    openMail += "TAG POS=1 TYPE=INPUT:TEL FORM=ID:challenge ATTR=NAME:phoneNumber CONTENT={{!COL5}}\n";
    openMail += "WAIT SECONDS = 1\n";
    openMail += "TAG POS=1 TYPE=INPUT:SUBMIT FORM=ID:challenge ATTR=ID:submit\n";
    openMail += "WAIT SECONDS = 5\n";

var changePassword = "CODE:";
    changePassword +=  "SET !TIMEOUT_PAGE 60" + "\n";
    changePassword +=  "SET !TIMEOUT_TAG 1" + "\n";
    changePassword +=  "SET !TIMEOUT_STEP 1" + "\n";
    changePassword += "SET !TIMEOUT_MACRO 400\n";
    changePassword += "SET !ERRORIGNORE YES\n";
    changePassword += "SET !EXTRACT NULL\n";
    changePassword +=  "SET !DATASOURCE C:\\Test\\Accounts.csv" + "\n";
    changePassword +=  "SET !LOOP 1\n";
    changePassword +=  "SET !DATASOURCE_LINE {{!LOOP}}\n";
    changePassword += "WAIT SECONDS = 1\n";
    changePassword += "TAB T=1\n";
    changePassword += "URL GOTO=https://myaccount.google.com/general-light\n";
    changePassword += "WAIT SECONDS = 4\n";
    changePassword += "TAG POS=1 TYPE=A ATTR=TXT:Change<SP>password\n";
    changePassword += "WAIT SECONDS = 4\n";
    changePassword += "SET !ENCRYPTION NO\n";
    changePassword += "TAG POS=1 TYPE=INPUT:PASSWORD FORM=ID:gaia_loginform ATTR=ID:Passwd CONTENT={{!COL2}}\n";
    changePassword += "TAG POS=1 TYPE=INPUT:SUBMIT FORM=ID:gaia_loginform ATTR=ID:signIn\n";
    changePassword += "WAIT SECONDS = 4\n";
    changePassword += "TAG POS=1 TYPE=INPUT:PASSWORD FORM=ACTION:general-light/password/change?rapt=* ATTR=NAME:id.boq.ubcp.password CONTENT=nopainnogain201294\n";
    changePassword += "TAG POS=1 TYPE=INPUT:PASSWORD FORM=ACTION:general-light/password/change?rapt=* ATTR=NAME:id.boq.ubcp.repeatedPassword CONTENT=nopainnogain201294\n";
    changePassword += "WAIT SECONDS = 4\n";
    changePassword += "TAG POS=1 TYPE=BUTTON FORM=ACTION:general-light/password/change?* ATTR=TXT:Change<SP>password\n";
    changePassword += "WAIT SECONDS = 5\n";

var clickSignin = "CODE:";
    clickSignin +=  "SET !TIMEOUT_PAGE 60" + "\n";
    clickSignin +=  "SET !TIMEOUT_TAG 1" + "\n";
    clickSignin +=  "SET !TIMEOUT_STEP 1" + "\n";
    clickSignin += "SET !TIMEOUT_MACRO 400\n";
    clickSignin += "SET !ERRORIGNORE YES\n";
    clickSignin += "SET !EXTRACT NULL\n";
    clickSignin += "TAB T=1\n";
    clickSignin += "URL GOTO=https://m.youtube.com/#\n";
    clickSignin += "TAG POS=1 TYPE=BUTTON ATTR=TITLE:Settings\n";
    clickSignin += "WAIT SECONDS = 1\n";
    clickSignin += "TAG POS=1 TYPE=A ATTR=TXT:Sign<SP>in\n";
    clickSignin += "WAIT SECONDS = 5\n";


var writeToFile = "CODE:";
    writeToFile+= "SET !ERRORIGNORE YES\n";
    writeToFile+= "SET !TIMEOUT_TAG 0\n";
    writeToFile+= "SET !TIMEOUT_PAGE 20\n";
    writeToFile+= "SET !EXTRACT NULL\n";
    writeToFile+= "SET !EXTRACT \"MyData\"\n";
    writeToFile+= "SAVEAS TYPE=EXTRACT FOLDER=C:\\Test FILE=file.txt\n";
    writeToFile+= "WAIT SECONDS = 1\n";

var checkSignIn = "CODE:";
    checkSignIn+= "SET !ERRORIGNORE YES\n";
    checkSignIn+= "SET !TIMEOUT_TAG 0\n";
    checkSignIn+= "SET !TIMEOUT_PAGE 20\n";
    checkSignIn+= "SET !EXTRACT NULL\n";
    checkSignIn+= "URL GOTO=https://m.youtube.com/#\n";
    checkSignIn+= "WAIT SECONDS = 1\n";
    checkSignIn+= "TAG POS=1 TYPE=BUTTON ATTR=TITLE:Settings\n";
    checkSignIn+= "TAG POS=1 TYPE=BODY ATTR=* EXTRACT=HTM\n";
    checkSignIn+= "WAIT SECONDS = 1\n";

iimPlay(openMail.replace("SET !LOOP 1", "SET !LOOP " + line));
iimPlay(changePassword.replace("SET !LOOP 1", "SET !LOOP " + line));
iimPlay(clickSignin);
iimPlay(checkSignIn);
var result = iimGetLastExtract();
if (result.indexOf("Sign in") > -1){
    //write number to file
    var profile = getProfileName();
    iimPlay(writeToFile.replace("MyData", profile));
}



