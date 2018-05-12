var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
var a    = pref.getBranch("network.proxy.");

var areaCode = ["246", "251", "252", "620", "621"];

var loginTextnow = "CODE:";
    loginTextnow+= "SET !ERRORIGNORE YES\n";
    loginTextnow+= "SET !TIMEOUT_TAG 0\n";
    loginTextnow+= "SET !TIMEOUT_PAGE 25\n";
	loginTextnow+=  "SET !DATASOURCE C:\\Test\\Textnow_Accounts.csv" + "\n";
	loginTextnow+=  "SET !DATASOURCE_LINE 1\n";    
    loginTextnow+= "TAB T=1\n";
    loginTextnow+= "TAB OPEN\n";
    loginTextnow+= "TAB T=2\n";
    loginTextnow+= "TAB CLOSEALLOTHERS\n";
    loginTextnow+= "CLEAR\n";
    loginTextnow+= "WAIT SECONDS = 1\n";
	loginTextnow+= "URL GOTO=https://www.textnow.com/login\n";
	loginTextnow+= "WAIT SECONDS = 2\n";
	loginTextnow+= "TAG POS=1 TYPE=INPUT:TEXT FORM=NAME:userForm ATTR=ID:loginUsername CONTENT={{!COL1}}\n";
	loginTextnow+= "SET !ENCRYPTION NO\n";
	loginTextnow+= "TAG POS=1 TYPE=INPUT:PASSWORD FORM=NAME:userForm ATTR=ID:loginPassword CONTENT={{!COL2}}\n";
	loginTextnow+= "TAG POS=1 TYPE=BUTTON FORM=NAME:userForm ATTR=ID:submitLogin\n";	
	loginTextnow+= "TAG POS=1 TYPE=BUTTON FORM=NAME:userForm ATTR=ID:submitLogin\n";	
	loginTextnow+= "TAG POS=1 TYPE=BUTTON FORM=NAME:userForm ATTR=ID:submitLogin\n";	
	loginTextnow+= "WAIT SECONDS = 12\n";	
	loginTextnow+= "TAG POS=1 TYPE=A ATTR=TXT:CONTINUE<SP>TO<SP>TEXTNOW\n";
	loginTextnow+= "WAIT SECONDS = 1.5\n";
	loginTextnow+= "TAG POS=1 TYPE=INPUT:SUBMIT ATTR=ID:close-button\n";	
	loginTextnow+= "WAIT SECONDS = 1.5\n";
	loginTextnow+= "TAG POS=1 TYPE=INPUT:TEXT FORM=ID:enterAreaCodeForm ATTR=ID:areacode CONTENT="+ areaCode[Math.floor(Math.random()*areaCode.length)] + "\n";
	loginTextnow+= "WAIT SECONDS = 1\n";
	loginTextnow+= "TAG POS=1 TYPE=INPUT:SUBMIT FORM=ID:enterAreaCodeForm ATTR=*\n";
	loginTextnow+= "WAIT SECONDS = 2\n";
	loginTextnow+= "TAG POS=1 TYPE=INPUT:SUBMIT ATTR=ID:close-button\n";
	//loginTextnow+= "SEARCH SOURCE=REGEXP:\"<div class=\\\"phoneNumber\\\">(\\\([0-9][0-9][0-9]\\\) [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9])</div>\" EXTRACT=\"$1\"\n";
	//loginTextnow+= "SET !CLIPBOARD {{!EXTRACT}}\n";		
	loginTextnow+= "PROMPT {{!COL3}}\n";		
	loginTextnow+= "WAIT SECONDS = 20\n";	

var line = prompt("Nhap thu tu:");
line = parseInt(line);

a.setIntPref("type", 5);

for(var i=line; i <=line+500; i+=3){
	iimPlay(loginTextnow.replace("SET !DATASOURCE_LINE 1", "SET !DATASOURCE_LINE " + i));	
}
