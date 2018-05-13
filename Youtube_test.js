var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
var a    = pref.getBranch("network.proxy.");

var vps_order = 1;
var profiles_per_vps = 160;
var max_vps = 14;
var max_profiles = profiles_per_vps * max_vps;
var type, start_profile, end_profile, current_profile;
var array_Of_profiles;

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
    //C:\Users\Administrator\AppData\Local\Mozilla\Firefox\Profiles\1\cache2 
}

var line = getProfileName();

var getIPandPort = "CODE:";
getIPandPort += "SET !DATASOURCE C:\\Test\\Accounts.csv" + "\n";
getIPandPort +=  "SET !LOOP 1\n";
getIPandPort +=  "SET !DATASOURCE_LINE {{!LOOP}}" + "\n";
getIPandPort += "SET !EXTRACT NULL\n";
getIPandPort += "SET !EXTRACT {{!COL3}}\n";
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

a.setIntPref("type", 5); // type = 1 : use ssh, type = 5: not use ssh


var subscribeCode = "TAG POS=4 TYPE=SPAN ATTR=TXT:Subscribe\nTAG POS=4 TYPE=SPAN ATTR=TXT:Đăng<SP>ký\n";
var likeCode = "TAG POS=1 TYPE=A ATTR=ROLE:button&&TITLE:like<SP>this<SP>video<SP>along<SP>with*\n";
var dislikeCode = "TAG POS=1 TYPE=A ATTR=ROLE:button&&TITLE:dislike<SP>this<SP>video<SP>along<SP>with*\n";
var getData = "CODE:";
    getData+= "SET !ERRORIGNORE YES\n";
    getData+= "SET !TIMEOUT_TAG 0\n";
    getData+= "SET !TIMEOUT_PAGE 20\n";
    getData+=  "SET !DATASOURCE C:\\Users\\Administrator\\Downloads\\Channels.csv" + "\n";
    getData+=  "SET !DATASOURCE_LINE 1\n";  
    getData += "SET !EXTRACT NULL\n";
    getData += "SET !EXTRACT {{!COLMYCOLUMN}}\n";

var subscribe = "CODE:";
    subscribe+= "SET !ERRORIGNORE YES\n";
    subscribe+= "SET !TIMEOUT_TAG 0\n";
    subscribe+= "SET !TIMEOUT_PAGE 20\n";
    subscribe+=  "SET !DATASOURCE C:\\Users\\Administrator\\Downloads\\Channels.csv" + "\n";
    subscribe+=  "SET !DATASOURCE_LINE 1\n";   
    subscribe+= "URL GOTO={{!COL1}}\n";
    subscribe+= "WAIT SECONDS = 5\n";
    subscribe+= "MYCODE";
    subscribe+= "WAIT SECONDS = 10\n";


var postGoogle = "CODE:";
    postGoogle+= "SET !ERRORIGNORE YES\n";
    postGoogle+= "SET !TIMEOUT_TAG 0\n";
    postGoogle+= "SET !TIMEOUT_PAGE 20\n";
    postGoogle+=  "SET !DATASOURCE C:\\Users\\Administrator\\Downloads\\Channels.csv" + "\n";
    postGoogle+=  "SET !DATASOURCE_LINE 1\n";  
    postGoogle+= "TAG POS=1 TYPE=TEXTAREA ATTR=ID:pg7w8 CONTENT={{!COL1}}\n";
    postGoogle+= "WAIT SECONDS = 1\n";
    postGoogle+= "TAG POS=1 TYPE=DIV ATTR=DATA-TOOLTIP:Add<SP>link\n";
    postGoogle+= "WAIT SECONDS = 3\n";
    postGoogle+= "TAG POS=5 TYPE=INPUT:TEXT ATTR=* CONTENT={{!COL1}}\n";
    postGoogle+= "WAIT SECONDS = 1\n";
    postGoogle+= "TAG POS=1 TYPE=SPAN ATTR=TXT:OK\n";
    postGoogle+= "WAIT SECONDS = 10\n";
    postGoogle+= "TAG POS=1 TYPE=SPAN ATTR=TXT:Post\n";
    postGoogle+= "WAIT SECONDS = 4\n";

var oneVote = "CODE:";
    oneVote+= "SET !ERRORIGNORE YES\n";
    oneVote+= "SET !TIMEOUT_TAG 0\n";
    oneVote+= "SET !TIMEOUT_PAGE 20\n";
    oneVote+=  "SET !DATASOURCE C:\\Users\\Administrator\\Downloads\\Channels.csv" + "\n";
    oneVote+=  "SET !DATASOURCE_LINE 1\n";  
    oneVote+= "URL GOTO={{!COL1}}\n";
    oneVote+= "WAIT SECONDS = 2\n";
    oneVote+= "TAG POS=1 TYPE=DIV ATTR=ARIA-LABEL:+1&&ARIA-PRESSED:false\n";
    oneVote+= "WAIT SECONDS = 3\n";


var reshare_Google = "CODE:";
    reshare_Google+= "SET !ERRORIGNORE YES\n";
    reshare_Google+= "SET !TIMEOUT_TAG 0\n";
    reshare_Google+= "SET !TIMEOUT_PAGE 20\n";
    reshare_Google+=  "SET !DATASOURCE C:\\Users\\Administrator\\Downloads\\Channels.csv" + "\n";
    reshare_Google+=  "SET !DATASOURCE_LINE 1\n";  
    reshare_Google+= "URL GOTO={{!COL1}}\n";
    reshare_Google+= "WAIT SECONDS = 2\n";    
    reshare_Google += "TAG POS=1 TYPE=DIV ATTR=ARIA-LABEL:Share&&ARIA-DISABLED:false\n";
    reshare_Google += "TAG POS=R1 TYPE=SPAN ATTR=STYLE:top:<SP>-12px\n";
    reshare_Google += "WAIT SECONDS = 2\n";
    reshare_Google += "TAG POS=1 TYPE=SPAN ATTR=TXT:Post\n";
    reshare_Google += "WAIT SECONDS = 5\n";

var followGoogle = "CODE:";
    followGoogle+= "SET !ERRORIGNORE YES\n";
    followGoogle+= "SET !TIMEOUT_TAG 0\n";
    followGoogle+= "SET !TIMEOUT_PAGE 20\n";
    followGoogle+=  "SET !DATASOURCE C:\\Users\\Administrator\\Downloads\\Channels.csv" + "\n";
    followGoogle+=  "SET !DATASOURCE_LINE 1\n";  
    followGoogle+= "URL GOTO={{!COL1}}\n";
    followGoogle+= "WAIT SECONDS = 3\n";
    followGoogle+= "TAG POS=5 TYPE=DIV ATTR=TXT:Follow\n";
    followGoogle+= "WAIT SECONDS = 2\n";
    followGoogle+= "TAG POS=2 TYPE=SPAN ATTR=TXT:Okay,<SP>got<SP>it!\n";
    followGoogle+= "WAIT SECONDS = 5\n";

var twitterRetweet = "CODE:";
    twitterRetweet+= "SET !ERRORIGNORE YES\n";
    twitterRetweet+= "SET !TIMEOUT_TAG 0\n";
    twitterRetweet+= "SET !TIMEOUT_PAGE 20\n";
    twitterRetweet+=  "SET !DATASOURCE C:\\Users\\Administrator\\Downloads\\Channels.csv" + "\n";
    twitterRetweet+=  "SET !DATASOURCE_LINE 1\n";  
    twitterRetweet+= "URL GOTO=twitter.com\n";
    twitterRetweet+= "WAIT SECONDS = 3\n";
    twitterRetweet+= "URL GOTO={{!COL1}}\n";
    twitterRetweet+= "WAIT SECONDS = 3\n";
    twitterRetweet+= "TAG POS=1 TYPE=SPAN ATTR=TITLE:Retweet&&CLASS:imgsprite_detail_rt_gif&&TXT:\n";
    twitterRetweet+= "WAIT SECONDS = 2\n";
    twitterRetweet+= "TAG POS=1 TYPE=INPUT:SUBMIT ATTR=NAME:commit\n";
    twitterRetweet+= "WAIT SECONDS = 5\n";

var twitterFavorite = "CODE:";
    twitterFavorite+= "SET !ERRORIGNORE YES\n";
    twitterFavorite+= "SET !TIMEOUT_TAG 0\n";
    twitterFavorite+= "SET !TIMEOUT_PAGE 20\n";
    twitterFavorite+=  "SET !DATASOURCE C:\\Users\\Administrator\\Downloads\\Channels.csv" + "\n";
    twitterFavorite+=  "SET !DATASOURCE_LINE 1\n";  
    twitterFavorite+= "URL GOTO=twitter.com\n";
    twitterFavorite+= "WAIT SECONDS = 3\n";    
    twitterFavorite+= "URL GOTO={{!COL1}}\n";
    twitterFavorite+= "WAIT SECONDS = 3\n";
    twitterFavorite+= "TAG POS=1 TYPE=SPAN ATTR=TITLE:Like&&CLASS:imgsprite_detail_heart_gif&&TXT:\n";
    twitterFavorite+= "WAIT SECONDS = 5\n";

var commentYoutube = "CODE:";
commentYoutube+=  "SET !DATASOURCE C:\\Users\\Administrator\\Downloads\\Channels.csv" + "\n";
commentYoutube +=  "SET !LOOP 1\n";
commentYoutube +=  "SET !ERRORIGNORE YES\n";
commentYoutube +=  "SET !TIMEOUT_TAG 1\n";
commentYoutube +=  "SET !DATASOURCE_LINE 1" + "\n";
commentYoutube += "SET !EXTRACT NULL\n";
commentYoutube += "URL GOTO={{!COL1}}\n";
commentYoutube += "WAIT SECONDS = 2\n";
commentYoutube += "TAG POS=1 TYPE=H2 ATTR=TXT:Comments\n";
commentYoutube += "TAG POS=1 TYPE=H2 ATTR=TXT:Comment<SP>*\n";
commentYoutube += "TAG POS=1 TYPE=H2 ATTR=TXT:Comments<SP>*\n";
commentYoutube += "WAIT SECONDS = 4\n";
commentYoutube += "TAG POS=3 TYPE=SPAN ATTR=TXT:Add<SP>a<SP>public<SP>comment...\n";
commentYoutube += "WAIT SECONDS = 2\n";
commentYoutube += "TAG POS=1 TYPE=DIV ATTR=ID:koya_elem_*&&CONTENTEDITABLE:true\n";
commentYoutube += "WAIT SECONDS = 1\n";
commentYoutube += "EVENTS TYPE=KEYPRESS SELECTOR=\".aqb\" CHARS=\"RANDOMCOMMENT\"\n";
commentYoutube += "EVENTS TYPE=KEYPRESS SELECTOR=\".eqb\" CHARS=\"RANDOMCOMMENT\"\n";
commentYoutube += "WAIT SECONDS = 2\n";
commentYoutube += "TAG POS=1 TYPE=BUTTON ATTR=TXT:Comment\n";
commentYoutube += "WAIT SECONDS = 5\n";

var commentContents = [
"This is your first video?\! Wow﻿",
"Interesting, very Interesting",
"Great video ever",
"That's good stuff:D",
"Well done!",
"Cool video",
"am I dreaming? I knew keeping subscribed was a good idea",
"I am so glad a kept subscribed﻿",
"Long time no see﻿",
"one of my favorite uploads on this channel\!﻿",
"awesome vid",
"lovely vid",
"Amazing! Watched 10 times\!﻿",
"you are so good",
"play this vid again and again",
"I really like this vide",
"I love that",
"What a lovely vid\!",
"Looks so good",
"So good. My compliments to the vid\!",
"This is a really nice vid",
"What an amazing vid\!",
"Your video is amazing\!",
"Very enjoyable. Well done\!﻿",
"You are fire dear sweet.﻿",
"I would love to watch it all over again, man\?﻿",
"you are the best",
"Best video I ever seen!",
"Cool video, keep up the good work\!",
"Absolutely Blew Me Away﻿",
"This one is the Best by far﻿",
"your videos hav grown a lot. I love them! COngrats\!﻿",
"Keep'em coming﻿",
"Incredible\!",
"Truly Awesome and Completely Amazing Video\!",
"When's the next video? Can you do this every day\?﻿"
];

var randomComment = commentContents[0] ;


var playCode = "";
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

function getExtract(column, n){
    iimPlay(getData.replace("MYCOLUMN", column).replace("SET !DATASOURCE_LINE 1", "SET !DATASOURCE_LINE " + n));
    return iimGetLastExtract();
}
function getArrayofProfiles(start, end) {
    var array_of_profiles = [];
    if(start <= end) {
        for(var i = start; i <= end; i++) {
            array_of_profiles.push(i);
        }
    }
    else {
        for (var i = start; i <= max_profiles; i++) {
            array_of_profiles.push(i);
        }
        for (var j = 1; j <= end_profile; j++) {
            array_of_profiles.push(j);
        }
    }

    return array_of_profiles;
}

for (i = 1; i < lines.length; i++)
{
    start_profile = getExtract(4, i);
    start_profile = parseInt(start_profile);
    end_profile = getExtract(5, i);
    end_profile = parseInt(end_profile);
/*    array_Of_VPS = getExtract(4, i);
    array_Of_VPS = array_Of_VPS.split(",").map(Number);*/
    type = getExtract(6, i);
    type = parseInt(type);
    line = parseInt(line);
    current_profile = (vps_order - 1) * profiles_per_vps + line;
    array_of_profiles = getArrayofProfiles(start_profile, end_profile);

    if (array_of_profiles.includes(current_profile)){
        switch(type) {
            /* YOUTUBE section */

            // Youtube Subs
            case 38:
                iimPlay(subscribe.replace("SET !DATASOURCE_LINE 1", "SET !DATASOURCE_LINE " + i).replace("MYCODE", subscribeCode));
                break;
            // Youtube like
            case 41:
                iimPlay(subscribe.replace("SET !DATASOURCE_LINE 1", "SET !DATASOURCE_LINE " + i).replace("MYCODE", likeCode));
                break;    
            // Youtube dislike
            case 42:    
                iimPlay(subscribe.replace("SET !DATASOURCE_LINE 1", "SET !DATASOURCE_LINE " + i).replace("MYCODE", dislikeCode));
                break;
            // Youtube comment     
            case 43:
                randomComment = commentContents[Math.floor(Math.random() * ((commentContents.length-1) - 0 + 1) + 0)];
                iimPlay(commentYoutube.replace("SET !DATASOURCE_LINE 1", "SET !DATASOURCE_LINE " + i).split("RANDOMCOMMENT").join(randomComment));            
                break;    

            /* GOOGLE+ section */

            // Follow
            case 44:
                iimPlay(followGoogle.replace("SET !DATASOURCE_LINE 1", "SET !DATASOURCE_LINE " + i));
                break;             
            //+1
            case 45:
                iimPlay(oneVote.replace("SET !DATASOURCE_LINE 1", "SET !DATASOURCE_LINE " + i));
                break;   
            // reshare
            case 46:
                iimPlay(reshare_Google.replace("SET !DATASOURCE_LINE 1", "SET !DATASOURCE_LINE " + i));
                break;  

            /* TWITTER section */    
            //  Twitter Favorites   
            case 47:
                iimPlay(twitterFavorite.replace("SET !DATASOURCE_LINE 1", "SET !DATASOURCE_LINE " + i));
                break;  
            // Twitter Retweets
            case 48:
                iimPlay(twitterRetweet.replace("SET !DATASOURCE_LINE 1", "SET !DATASOURCE_LINE " + i));
                break;                                       
            default:
                playCode = subscribe.replace("MYCODE", subscribeCode);
                break;        
        }        
    }        


}
window.close();