var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
var a    = pref.getBranch("network.proxy.");

var TIMEPERURRL = 25;


var accounts_per_vps = 160;
var drop_rate = 0.2;
var number_of_vps_need = 0;
var max_vps = 14;
var status, currentSubs, quantity, url, start_count, goal_count;
var a = new Array(100);
for (var i = 0; i <= 100; i++) {
  a[i] = new Array(max_vps);
  for (var j = 0; j < max_vps; j ++) {
    a[i][j] = 0;
  }
}
var getData = "CODE:";
    getData+= "SET !ERRORIGNORE YES\n";
    getData+= "SET !TIMEOUT_TAG 0\n";
    getData+= "SET !TIMEOUT_PAGE 20\n";
    getData+=  "SET !DATASOURCE C:\\Test\\file.csv" + "\n";
    getData+=  "SET !DATASOURCE_LINE 1\n";  
    getData += "SET !EXTRACT NULL\n";
    getData += "SET !EXTRACT {{!COLMYCOLUMN}}\n";





var goToOrderPage = "CODE:";
    goToOrderPage+= "SET !ERRORIGNORE YES\n";
    goToOrderPage+= "SET !TIMEOUT_TAG 0\n";
    goToOrderPage+= "SET !TIMEOUT_PAGE 20\n";
    goToOrderPage+=  "SET !DATASOURCE_LINE 1\n";  
    goToOrderPage += "SET !EXTRACT NULL\n";
    goToOrderPage += "TAB T=1\n";
    goToOrderPage += "TAB CLOSEALLOTHERS\n";
    goToOrderPage+= "FILEDELETE NAME=C:\\Test\\file.csv\n";    
    goToOrderPage+= "FILEDELETE NAME=C:\\Test\\Channels.csv\n";    
    goToOrderPage+= "FILEDELETE NAME=C:\\Test\\time.txt\n";    
    goToOrderPage += "URL GOTO=http://utube.store/sign-in\n";
    goToOrderPage += "WAIT SECONDS = 3\n";
    goToOrderPage += "TAG POS=1 TYPE=INPUT:EMAIL FORM=ID:signin-form ATTR=ID:email CONTENT=vovanluan201294@gmail.com\n";
    goToOrderPage += "SET !ENCRYPTION NO\n";
    goToOrderPage += "TAG POS=1 TYPE=INPUT:PASSWORD FORM=ID:signin-form ATTR=ID:password CONTENT=nopainnogain201294\n";
    goToOrderPage += "TAG POS=1 TYPE=BUTTON FORM=ID:signin-form ATTR=TXT:Sign<SP>in\n";
    goToOrderPage += "WAIT SECONDS = 5\n";
    goToOrderPage += "URL GOTO=http://utube.store/admin/orders\n";
    goToOrderPage += "WAIT SECONDS = 1\n";
    goToOrderPage += "TAG POS=1 TYPE=TH ATTR=TXT:Status\n";
    goToOrderPage += "WAIT SECONDS = 1\n";
    goToOrderPage += "TAG POS=1 TYPE=SELECT ATTR=NAME:orders_length CONTENT=%100\n";
    goToOrderPage += "WAIT SECONDS = 1\n";


var getTable = "CODE:";
    getTable+= "SET !ERRORIGNORE YES\n";
    getTable+= "SET !TIMEOUT_TAG 1\n";
    getTable+= "SET !TIMEOUT_PAGE 20\n";
    getTable+=  "SET !DATASOURCE_LINE 1\n";  
    getTable += "SET !EXTRACT NULL\n";
    getTable += "SET !EXTRACT_TEST_POPUP NO\n";
    getTable += "TAB T=1\n";
    getTable += "TAG POS=MYPOS TYPE=TR ATTR=ROLE:row\n";
    getTable += "TAG POS=R1 TYPE=TD ATTR=* EXTRACT=TXT\n";
    getTable += "TAG POS=R1 TYPE=TD ATTR=* EXTRACT=TXT\n";
    getTable += "TAG POS=R1 TYPE=TD ATTR=* EXTRACT=TXT\n";
    getTable += "TAG POS=R1 TYPE=TD ATTR=* EXTRACT=TXT\n";
    getTable += "TAG POS=R1 TYPE=TD ATTR=* EXTRACT=TXT\n";
    getTable += "TAG POS=R1 TYPE=TD ATTR=* EXTRACT=TXT\n";
    getTable += "TAG POS=R1 TYPE=TD ATTR=* EXTRACT=TXT\n";
    getTable += "TAG POS=R1 TYPE=TD ATTR=* EXTRACT=TXT\n";
    getTable += "TAG POS=R1 TYPE=TD ATTR=* EXTRACT=TXT\n";
    getTable += "TAG POS=R1 TYPE=TD ATTR=* EXTRACT=TXT\n";
    getTable += "TAG POS=R1 TYPE=TD ATTR=* EXTRACT=TXT\n";
    getTable += "SAVEAS TYPE=EXTRACT FOLDER=C:\\Test FILE=file.csv\n";

var getCurrentSubs = "CODE:";
    getCurrentSubs+= "SET !ERRORIGNORE YES\n";
    getCurrentSubs+= "SET !TIMEOUT_TAG 0\n";
    getCurrentSubs+= "SET !TIMEOUT_PAGE 20\n";
    getCurrentSubs+=  "SET !DATASOURCE_LINE 1\n";  
    getCurrentSubs += "SET !EXTRACT NULL\n";
    getCurrentSubs += "SET !EXTRACT_TEST_POPUP NO\n";
    getCurrentSubs += "TAB T=1\n";
    getCurrentSubs += "TAB OPEN\n";
    getCurrentSubs += "TAB T=2\n";
    getCurrentSubs += "URL GOTO=MYURL\n";
    getCurrentSubs += "WAIT SECONDS = 0.25\n";
    getCurrentSubs += "TAG POS=1 TYPE=yt-formatted-string ATTR=ID:subscriber-count EXTRACT=TXT\n";
    getCurrentSubs += "TAB CLOSE\n";

var setOrderFinish = "CODE:";
    setOrderFinish+= "SET !ERRORIGNORE YES\n";
    setOrderFinish+= "SET !TIMEOUT_TAG 0\n";
    setOrderFinish+= "SET !TIMEOUT_PAGE 20\n";
    setOrderFinish+=  "SET !DATASOURCE_LINE 1\n";  
    setOrderFinish += "SET !EXTRACT NULL\n";
    setOrderFinish += "SET !EXTRACT_TEST_POPUP NO\n";
    setOrderFinish += "TAG POS=MYPOS TYPE=A ATTR=TXT:Edit\n";
    setOrderFinish += "WAIT SECONDS = 2\n";
    setOrderFinish += "TAG POS=1 TYPE=SELECT FORM=ACTION:orders/* ATTR=ID:status CONTENT=%2\n";
    setOrderFinish += "TAG POS=1 TYPE=BUTTON FORM=ACTION:orders/* ATTR=TXT:Submit\n";
    setOrderFinish += "WAIT SECONDS = 2\n";

var setOrderInProgress = "CODE:";
    setOrderInProgress+= "SET !ERRORIGNORE YES\n";
    setOrderInProgress+= "SET !TIMEOUT_TAG 0\n";
    setOrderInProgress+= "SET !TIMEOUT_PAGE 20\n";
    setOrderInProgress+=  "SET !DATASOURCE_LINE 1\n";  
    setOrderInProgress += "SET !EXTRACT NULL\n";
    setOrderInProgress += "SET !EXTRACT_TEST_POPUP NO\n";
    setOrderInProgress += "TAG POS=MYPOS TYPE=A ATTR=TXT:Edit\n";
    setOrderInProgress += "WAIT SECONDS = 2\n";
    setOrderInProgress += "TAG POS=1 TYPE=SELECT FORM=ACTION:orders/* ATTR=ID:status CONTENT=%1\n";
    setOrderInProgress += "TAG POS=1 TYPE=INPUT:NUMBER FORM=ACTION:orders/* ATTR=ID:startCount CONTENT=MYAMOUNT\n";
    setOrderInProgress += "TAG POS=1 TYPE=BUTTON FORM=ACTION:orders/* ATTR=TXT:Submit\n";
    setOrderInProgress += "WAIT SECONDS = 2\n";

var savePendingOrder = "CODE:";
    savePendingOrder+= "SET !ERRORIGNORE YES\n";
    savePendingOrder+= "SET !TIMEOUT_TAG 0\n";
    savePendingOrder+= "SET !TIMEOUT_PAGE 20\n";
    savePendingOrder+=  "SET !DATASOURCE_LINE 1\n";  
    savePendingOrder += "SET !EXTRACT NULL\n";
    savePendingOrder += "SET !EXTRACT_TEST_POPUP NO\n";
    savePendingOrder += "ADD !EXTRACT MYURL\n";
    savePendingOrder += "ADD !EXTRACT MYSTARTCOUNT\n";
    savePendingOrder += "ADD !EXTRACT MYQUANTITY\n";
    savePendingOrder += "ADD !EXTRACT MYVPSARRAY\n";
    savePendingOrder += "ADD !EXTRACT MYSERVICE\n";
    savePendingOrder += "SAVEAS TYPE=EXTRACT FOLDER=C:\\Test FILE=Channels.csv\n";


var saveTime = "CODE:";
    saveTime+= "SET !ERRORIGNORE YES\n";
    saveTime+= "SET !TIMEOUT_TAG 0\n";
    saveTime+= "SET !TIMEOUT_PAGE 20\n";
    saveTime+=  "SET !DATASOURCE_LINE 1\n";  
    saveTime += "SET !EXTRACT NULL\n";
    saveTime += "SET !EXTRACT_TEST_POPUP NO\n";
    saveTime += "ADD !EXTRACT MYTIME\n";
    saveTime += "SAVEAS TYPE=EXTRACT FOLDER=C:\\Test FILE=time.txt\n";
function getExtract(column, n){
    iimPlay(getData.replace("MYCOLUMN", column).replace("SET !DATASOURCE_LINE 1", "SET !DATASOURCE_LINE " + n));
    return iimGetLastExtract();
}

function getArrayofVPS(number_of_vps_need) {
    var array_Of_VPS = [];
    for(var i = 0; i <=100; i++) {
        for(var j = 0; j < max_vps; j++) {
            if (number_of_vps_need == 0)
                break;
            if (a[i][j] == 0) {
                array_Of_VPS.push(j + 1);
                a[i][j] = 1;
                number_of_vps_need -= 1;
            }
        }
    }
    return array_Of_VPS;
}

// Go to list of orders page 
// Extract data tu table ra file
iimPlay(goToOrderPage);
for (var i = 1; i <= 100; i++) {
    iimPlay(getTable.replace("MYPOS", i));
}


// End-of-line markers
const CRLF = "\r\n";
const LF = "\n";

var lines = new Array();               

var file_i = imns.FIO.openNode("C:\\Test\\file.csv");
var text = imns.FIO.readTextFile(file_i);         // Read file into one string

// Determine end-of-line marker
var eol = (text.indexOf(CRLF) == -1) ? LF : CRLF;

// Split into lines
lines = text.split(eol);

// Iterate over each line and split into columns

for (i = 1; i < lines.length; i++){
    // Break for neu status la Finished
    status = getExtract(10, i);
    if (status == "Finished") 
        break;
    url = getExtract(4, i);
    quantity = getExtract(5, i);
    service = getExtract(3, i);
    service = service.split(".")[0];

    iimPlay(getCurrentSubs.replace("MYURL", url));
    currentSubs = iimGetLastExtract();
    //Check if number of subscribers is hidden
    if (currentSubs.indexOf(" subscribe") == -1) {
        //Reject order
        //Continue loop
        continue;
    }
    currentSubs = currentSubs.replace(" subscribers", "").replace(" subscriber","").replace(",", "");
    currentSubs = parseInt(currentSubs);    
    if (status == "Pending") {
        url = url.split("?")[0];
        start_count = currentSubs;
        //Luu data vao file Pending Orders
        number_of_vps_need = Math.ceil(quantity/((1 - drop_rate) * accounts_per_vps));
        var array_Of_VPS = getArrayofVPS(number_of_vps_need);
        //alert(number_of_vps_need);
        
        iimPlay(savePendingOrder.replace("MYURL", url).replace("MYSTARTCOUNT", start_count).replace("MYQUANTITY", quantity).replace("MYSERVICE", service).replace("MYVPSARRAY", array_Of_VPS));
        //Edit start count = currentsubs
        // Edit status thanh In Progress
        iimPlay(setOrderInProgress.replace("MYPOS", i).replace("MYAMOUNT", start_count));
    }
    if (status == "In Progress") {
        goal_count = getExtract(8, i);
        //alert("Current subs:" + currentSubs);
        //alert("Goal:" + goal_count);
        if (currentSubs >= goal_count) {
            // Update status thanh Finished
            iimPlay(setOrderFinish.replace("MYPOS", i));
        }
    }
}

var maxLoopToRun = 0;
for(var i = 0; i <=100; i++) {
    for(var j = 0; j < max_vps; j++) {
        if(a[i][j] == 0) {
            maxLoopToRun = i + 1;
            i = 101;
            break;
        }
    }
}

iimPlay(saveTime.replace("MYTIME", maxLoopToRun * TIMEPERURRL));