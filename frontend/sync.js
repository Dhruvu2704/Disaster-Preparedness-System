/// ========================================
// SYNC PENDING DATA
// ========================================

const SYNC_API_URL = "http://127.0.0.1:8000/api/sync";


// ========================================
// GET JWT FROM EXISTING LOGIN FLOW
// ========================================

function getAccessToken() {

    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
        return accessToken;
    }

    const resqnetToken = localStorage.getItem("resqnet_token");

    if (resqnetToken) {
        return resqnetToken;
    }

    const token = localStorage.getItem("token");

    if (token) {
        return token;
    }

    const jwt = localStorage.getItem("jwt");

    if (jwt) {
        return jwt;
    }

    const authToken = localStorage.getItem("authToken");

    if (authToken) {
        return authToken;
    }

    return null;
}


// ========================================
// KEEP ONLY PENDING QUEUED RECORDS
// ========================================

function getPendingRecords(queue) {

    return queue.filter(function (item) {

        return item.status === "pending";

    });
}


// ========================================
// DELETE SUCCESSFULLY SYNCED RECORDS
// ========================================

async function removeSyncedRecords(ids, removeFunction) {

    if (!Array.isArray(ids)) {
        return;
    }

    for (let i = 0; i < ids.length; i++) {

        const queueId = ids[i];

        await removeFunction(queueId);

        console.log("Removed synced queue item:", queueId);
    }
}


// ========================================
// SYNC PENDING DATA
// ========================================

async function syncPendingData() {

    // Check internet connection
    if (!navigator.onLine) {

        console.log("Offline. Sync skipped.");

        return;
    }


    console.log("Starting sync...");


    try {

        // Get all IndexedDB queues
        const sosQueue =
            getPendingRecords(
                await indexedDBService.getSOSQueue()
            );

        const damageQueue =
            getPendingRecords(
                await indexedDBService.getDamageQueue()
            );

        const missingQueue =
            getPendingRecords(
                await indexedDBService.getMissingQueue()
            );

        const helpQueue =
            getPendingRecords(
                await indexedDBService.getHelpQueue()
            );


        console.log("Pending SOS:", sosQueue);
        console.log("Pending damage reports:", damageQueue);
        console.log("Pending missing reports:", missingQueue);
        console.log("Pending help requests:", helpQueue);


        // Nothing to synchronize
        if (
            sosQueue.length === 0 &&
            damageQueue.length === 0 &&
            missingQueue.length === 0 &&
            helpQueue.length === 0
        ) {

            console.log("No pending data to sync.");

            return;
        }


        // Get JWT from existing login flow
        const accessToken = getAccessToken();

        if (!accessToken) {

            console.warn(
                "No access token found. Pending data will remain in IndexedDB."
            );

            return;
        }


        // Send all four queues in ONE request.
        // queueId, status and queuedAt are intentionally preserved.
        const response = await fetch(
            SYNC_API_URL,
            {
                method: "POST",

                headers: {
                    "Authorization": "Bearer " + accessToken,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    sos: sosQueue,
                    damage: damageQueue,
                    missing: missingQueue,
                    help: helpQueue
                })
            }
        );


        if (!response.ok) {

            const errorText = await response.text();

            throw new Error(
                "Sync API failed (" +
                response.status +
                "): " +
                errorText
            );
        }


        const result = await response.json();

        console.log("Sync response:", result);


        // Only remove queue records explicitly returned by the backend.
        if (result.success === true && result.synced) {

            await removeSyncedRecords(
                result.synced.sos,
                indexedDBService.removeSOS
            );

            await removeSyncedRecords(
                result.synced.damage,
                indexedDBService.removeDamage
            );

            await removeSyncedRecords(
                result.synced.missing,
                indexedDBService.removeMissing
            );

            await removeSyncedRecords(
                result.synced.help,
                indexedDBService.removeHelp
            );

            console.log("Sync completed successfully.");

        } else {

            console.warn(
                "Sync was not successful. Pending records were kept."
            );
        }


    } catch (error) {

        // IMPORTANT: do not delete anything when the request fails.
        console.error(
            "Sync error. Pending data remains in IndexedDB:",
            error
        );
    }
}


// ========================================
// SYNC WHEN INTERNET RETURNS
// ========================================

window.addEventListener("online", function () {

    console.log(
        "Internet restored. Starting sync..."
    );

    syncPendingData();

});


console.log("Sync service loaded");
