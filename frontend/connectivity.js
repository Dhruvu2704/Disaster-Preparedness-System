// ========================================
// CONNECTIVITY STATUS
// ========================================

let isOnline = navigator.onLine;


// ========================================
// CHECK CURRENT STATUS
// ========================================

function getConnectionStatus() {

    return isOnline;
}


// ========================================
// WHEN INTERNET COMES BACK
// ========================================

window.addEventListener("online", function () {

    isOnline = true;

    console.log("Internet connection restored");

    updateConnectionUI(true);

});


// ========================================
// WHEN INTERNET IS LOST
// ========================================

window.addEventListener("offline", function () {

    isOnline = false;

    console.log("Internet connection lost");

    updateConnectionUI(false);

});


// ========================================
// UPDATE UI
// ========================================

function updateConnectionUI(online) {

    const statusElement =
        document.getElementById("connection-status");


    if (!statusElement) {
        return;
    }


    if (online) {

        statusElement.innerText =
            "Online";

        statusElement.className =
            "online";

    } else {

        statusElement.innerText =
            "Offline Mode";

        statusElement.className =
            "offline";
    }
}


// ========================================
// INITIAL STATUS
// ========================================

window.addEventListener("load", function () {

    updateConnectionUI(navigator.onLine);

});


// ========================================
// EXPORT
// ========================================

window.connectivityService = {

    getConnectionStatus:
        getConnectionStatus

};


console.log("Connectivity service loaded");