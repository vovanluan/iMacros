var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
var a    = pref.getBranch("network.proxy.");

var saveChannels = "CODE:";
    saveChannels+= "SET !ERRORIGNORE YES\n";
    saveChannels+= "SET !TIMEOUT_TAG 0\n";
    saveChannels+= "SET !TIMEOUT_PAGE 5\n";
    saveChannels+= "TAB T=1\n";
    saveChannels+= "FILEDELETE NAME=C:\\Users\\Administrator\\Downloads\\Channels.csv\n";
    saveChannels+= "WAIT SECONDS = 1\n";
    saveChannels+= "URL GOTO=https://www.dropbox.com/s/33anozxsqmwp3zi/Channels.csv?dl=1&pv=1\n";
    saveChannels+= "WAIT SECONDS = 1\n";
    
iimPlay(saveChannels);

