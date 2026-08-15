const DB_NAME = "DisasterPreparednessDB";
const DB_VERSION = 2;

const STORES = {
    // Cached data
    GUIDES: "guides",
    CHECKLIST: "checklist",
    SHELTERS: "shelters",
    HOSPITALS: "hospitals",
    ALERTS: "alerts",
    EMERGENCY_CONTACTS: "emergency_contacts",

    // Offline queues
    SOS_QUEUE: "sos_queue",
    DAMAGE_QUEUE: "damage_queue",
    MISSING_QUEUE: "missing_queue",
    HELP_QUEUE: "help_queue"
};


// ========================================
// OPEN / CREATE DATABASE
// ========================================

function openDatabase() {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(
            DB_NAME,
            DB_VERSION
        );


        // Runs when database is created
        // or database version is increased
        request.onupgradeneeded = function (event) {

            const db = event.target.result;


            // ========================================
            // CACHED DATA
            // ========================================

            // GUIDES
            if (!db.objectStoreNames.contains(STORES.GUIDES)) {

                db.createObjectStore(
                    STORES.GUIDES,
                    {
                        keyPath: "id"
                    }
                );
            }


            // CHECKLIST
            if (!db.objectStoreNames.contains(STORES.CHECKLIST)) {

                db.createObjectStore(
                    STORES.CHECKLIST,
                    {
                        keyPath: "id"
                    }
                );
            }


            // SHELTERS
            if (!db.objectStoreNames.contains(STORES.SHELTERS)) {

                db.createObjectStore(
                    STORES.SHELTERS,
                    {
                        keyPath: "id"
                    }
                );
            }


            // HOSPITALS
            if (!db.objectStoreNames.contains(STORES.HOSPITALS)) {

                db.createObjectStore(
                    STORES.HOSPITALS,
                    {
                        keyPath: "id"
                    }
                );
            }


            // ALERTS
            if (!db.objectStoreNames.contains(STORES.ALERTS)) {

                db.createObjectStore(
                    STORES.ALERTS,
                    {
                        keyPath: "id"
                    }
                );
            }


            // EMERGENCY CONTACTS
            if (!db.objectStoreNames.contains(STORES.EMERGENCY_CONTACTS)) {

                db.createObjectStore(
                    STORES.EMERGENCY_CONTACTS,
                    {
                        keyPath: "id"
                    }
                );
            }


            // ========================================
            // OFFLINE QUEUES
            // ========================================

            // SOS QUEUE
            if (!db.objectStoreNames.contains(STORES.SOS_QUEUE)) {

                db.createObjectStore(
                    STORES.SOS_QUEUE,
                    {
                        keyPath: "queueId",
                        autoIncrement: true
                    }
                );
            }


            // DAMAGE QUEUE
            if (!db.objectStoreNames.contains(STORES.DAMAGE_QUEUE)) {

                db.createObjectStore(
                    STORES.DAMAGE_QUEUE,
                    {
                        keyPath: "queueId",
                        autoIncrement: true
                    }
                );
            }


            // MISSING PERSON QUEUE
            if (!db.objectStoreNames.contains(STORES.MISSING_QUEUE)) {

                db.createObjectStore(
                    STORES.MISSING_QUEUE,
                    {
                        keyPath: "queueId",
                        autoIncrement: true
                    }
                );
            }


            // HELP REQUEST QUEUE
            if (!db.objectStoreNames.contains(STORES.HELP_QUEUE)) {

                db.createObjectStore(
                    STORES.HELP_QUEUE,
                    {
                        keyPath: "queueId",
                        autoIncrement: true
                    }
                );
            }
        };


        // ========================================
        // DATABASE OPENED SUCCESSFULLY
        // ========================================

        request.onsuccess = function () {

            resolve(request.result);
        };


        // ========================================
        // DATABASE ERROR
        // ========================================

        request.onerror = function () {

            reject(request.error);
        };
    });
}



// ========================================
// SAVE CACHED DATA
// ========================================

async function saveData(storeName, data) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(
            storeName,
            "readwrite"
        );

        const store =
            transaction.objectStore(storeName);


        data.forEach(item => {

            store.put(item);

        });


        transaction.oncomplete = () => {

            db.close();

            resolve();
        };


        transaction.onerror = () => {

            db.close();

            reject(transaction.error);
        };
    });
}



// ========================================
// GET CACHED DATA
// ========================================

async function getData(storeName) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(
            storeName,
            "readonly"
        );

        const store =
            transaction.objectStore(storeName);


        const request =
            store.getAll();


        request.onsuccess = () => {

            db.close();

            resolve(request.result);
        };


        request.onerror = () => {

            db.close();

            reject(request.error);
        };
    });
}



// ========================================
// GUIDES
// ========================================

async function saveGuides(guides) {

    return saveData(
        STORES.GUIDES,
        guides
    );
}


async function getGuides() {

    return getData(
        STORES.GUIDES
    );
}



// ========================================
// CHECKLIST
// ========================================

async function saveChecklist(checklist) {

    return saveData(
        STORES.CHECKLIST,
        checklist
    );
}


async function getChecklist() {

    return getData(
        STORES.CHECKLIST
    );
}



// ========================================
// SHELTERS
// ========================================

async function saveShelters(shelters) {

    return saveData(
        STORES.SHELTERS,
        shelters
    );
}


async function getShelters() {

    return getData(
        STORES.SHELTERS
    );
}



// ========================================
// HOSPITALS
// ========================================

async function saveHospitals(hospitals) {

    return saveData(
        STORES.HOSPITALS,
        hospitals
    );
}


async function getHospitals() {

    return getData(
        STORES.HOSPITALS
    );
}



// ========================================
// ALERTS
// ========================================

async function saveAlerts(alerts) {

    return saveData(
        STORES.ALERTS,
        alerts
    );
}


async function getAlerts() {

    return getData(
        STORES.ALERTS
    );
}



// ========================================
// EMERGENCY CONTACTS
// ========================================

async function saveEmergencyContacts(contacts) {

    return saveData(
        STORES.EMERGENCY_CONTACTS,
        contacts
    );
}


async function getEmergencyContacts() {

    return getData(
        STORES.EMERGENCY_CONTACTS
    );
}



// ========================================
// SOS QUEUE
// ========================================

async function queueSOS(sosData) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                STORES.SOS_QUEUE,
                "readwrite"
            );

        const store =
            transaction.objectStore(
                STORES.SOS_QUEUE
            );


        store.add({

            ...sosData,

            queuedAt:
                new Date().toISOString(),

            status: "pending"
        });


        transaction.oncomplete = () => {

            db.close();

            resolve();
        };


        transaction.onerror = () => {

            db.close();

            reject(transaction.error);
        };
    });
}


async function getSOSQueue() {

    return getData(
        STORES.SOS_QUEUE
    );
}



// ========================================
// DAMAGE QUEUE
// ========================================

async function queueDamage(damageData) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                STORES.DAMAGE_QUEUE,
                "readwrite"
            );

        const store =
            transaction.objectStore(
                STORES.DAMAGE_QUEUE
            );


        store.add({

            ...damageData,

            queuedAt:
                new Date().toISOString(),

            status: "pending"
        });


        transaction.oncomplete = () => {

            db.close();

            resolve();
        };


        transaction.onerror = () => {

            db.close();

            reject(transaction.error);
        };
    });
}


async function getDamageQueue() {

    return getData(
        STORES.DAMAGE_QUEUE
    );
}



// ========================================
// MISSING PERSON QUEUE
// ========================================

async function queueMissing(missingData) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                STORES.MISSING_QUEUE,
                "readwrite"
            );

        const store =
            transaction.objectStore(
                STORES.MISSING_QUEUE
            );


        store.add({

            ...missingData,

            queuedAt:
                new Date().toISOString(),

            status: "pending"
        });


        transaction.oncomplete = () => {

            db.close();

            resolve();
        };


        transaction.onerror = () => {

            db.close();

            reject(transaction.error);
        };
    });
}


async function getMissingQueue() {

    return getData(
        STORES.MISSING_QUEUE
    );
}



// ========================================
// HELP REQUEST QUEUE
// ========================================

async function queueHelp(helpData) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                STORES.HELP_QUEUE,
                "readwrite"
            );

        const store =
            transaction.objectStore(
                STORES.HELP_QUEUE
            );


        store.add({

            ...helpData,

            queuedAt:
                new Date().toISOString(),

            status: "pending"
        });


        transaction.oncomplete = () => {

            db.close();

            resolve();
        };


        transaction.onerror = () => {

            db.close();

            reject(transaction.error);
        };
    });
}


async function getHelpQueue() {

    return getData(
        STORES.HELP_QUEUE
    );
}



// ========================================
// REMOVE FROM QUEUE
// ========================================

async function removeFromQueue(
    storeName,
    queueId
) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                storeName,
                "readwrite"
            );

        const store =
            transaction.objectStore(
                storeName
            );


        store.delete(queueId);


        transaction.oncomplete = () => {

            db.close();

            resolve();
        };


        transaction.onerror = () => {

            db.close();

            reject(transaction.error);
        };
    });
}



// ========================================
// REMOVE SOS
// ========================================

async function removeSOS(queueId) {

    return removeFromQueue(
        STORES.SOS_QUEUE,
        queueId
    );
}



// ========================================
// REMOVE DAMAGE
// ========================================

async function removeDamage(queueId) {

    return removeFromQueue(
        STORES.DAMAGE_QUEUE,
        queueId
    );
}



// ========================================
// REMOVE MISSING PERSON
// ========================================

async function removeMissing(queueId) {

    return removeFromQueue(
        STORES.MISSING_QUEUE,
        queueId
    );
}



// ========================================
// REMOVE HELP REQUEST
// ========================================

async function removeHelp(queueId) {

    return removeFromQueue(
        STORES.HELP_QUEUE,
        queueId
    );
}



// ========================================
// GET TOTAL PENDING COUNT
// ========================================

async function getPendingCount() {

    const sos =
        await getSOSQueue();

    const damage =
        await getDamageQueue();

    const missing =
        await getMissingQueue();

    const help =
        await getHelpQueue();


    return (
        sos.length +
        damage.length +
        missing.length +
        help.length
    );
}



// ========================================
// EXPORT SERVICE
// ========================================

window.indexedDBService = {

    // Cached data

    saveGuides,
    getGuides,

    saveChecklist,
    getChecklist,

    saveShelters,
    getShelters,

    saveHospitals,
    getHospitals,

    saveAlerts,
    getAlerts,

    saveEmergencyContacts,
    getEmergencyContacts,


    // Offline queues

    queueSOS,
    getSOSQueue,

    queueDamage,
    getDamageQueue,

    queueMissing,
    getMissingQueue,

    queueHelp,
    getHelpQueue,


    // Remove after sync

    removeSOS,
    removeDamage,
    removeMissing,
    removeHelp,


    // Pending count

    getPendingCount
};


console.log(
    "IndexedDB service loaded"
);