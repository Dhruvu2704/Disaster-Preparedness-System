const DB_NAME = "DisasterPreparednessDB";
const DB_VERSION = 2;

const STORES = {
    GUIDES: "guides",
    CHECKLIST: "checklist",
    SHELTERS: "shelters",
    HOSPITALS: "hospitals",
    ALERTS: "alerts",
    EMERGENCY_CONTACTS: "emergency_contacts",

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

        request.onupgradeneeded = function (event) {

            const db = event.target.result;

            // Cached data stores
            if (!db.objectStoreNames.contains(STORES.GUIDES)) {
                db.createObjectStore(STORES.GUIDES, {
                    keyPath: "id"
                });
            }

            if (!db.objectStoreNames.contains(STORES.CHECKLIST)) {
                db.createObjectStore(STORES.CHECKLIST, {
                    keyPath: "id"
                });
            }

            if (!db.objectStoreNames.contains(STORES.SHELTERS)) {
                db.createObjectStore(STORES.SHELTERS, {
                    keyPath: "id"
                });
            }

            if (!db.objectStoreNames.contains(STORES.HOSPITALS)) {
                db.createObjectStore(STORES.HOSPITALS, {
                    keyPath: "id"
                });
            }

            if (!db.objectStoreNames.contains(STORES.ALERTS)) {
                db.createObjectStore(STORES.ALERTS, {
                    keyPath: "id"
                });
            }

            if (!db.objectStoreNames.contains(STORES.EMERGENCY_CONTACTS)) {
                db.createObjectStore(STORES.EMERGENCY_CONTACTS, {
                    keyPath: "id"
                });
            }


            // Offline queues
            if (!db.objectStoreNames.contains(STORES.SOS_QUEUE)) {
                db.createObjectStore(STORES.SOS_QUEUE, {
                    keyPath: "queueId",
                    autoIncrement: true
                });
            }

            if (!db.objectStoreNames.contains(STORES.DAMAGE_QUEUE)) {
                db.createObjectStore(STORES.DAMAGE_QUEUE, {
                    keyPath: "queueId",
                    autoIncrement: true
                });
            }

            if (!db.objectStoreNames.contains(STORES.MISSING_QUEUE)) {
                db.createObjectStore(STORES.MISSING_QUEUE, {
                    keyPath: "queueId",
                    autoIncrement: true
                });
            }

            if (!db.objectStoreNames.contains(STORES.HELP_QUEUE)) {
                db.createObjectStore(STORES.HELP_QUEUE, {
                    keyPath: "queueId",
                    autoIncrement: true
                });
            }
        };


        request.onsuccess = function () {
            resolve(request.result);
        };

        request.onerror = function () {
            reject(request.error);
        };
    });
}


// ========================================
// GENERIC SAVE DATA
// ========================================

async function saveData(storeName, data) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(
            storeName,
            "readwrite"
        );

        const store = transaction.objectStore(storeName);

        if (Array.isArray(data)) {

            data.forEach(item => {
                store.put(item);
            });

        } else {

            store.put(data);
        }

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
// GENERIC GET DATA
// ========================================

async function getData(storeName) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(
            storeName,
            "readonly"
        );

        const store = transaction.objectStore(storeName);

        const request = store.getAll();

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
// CACHED DATA
// ========================================

async function saveGuides(data) {
    return saveData(STORES.GUIDES, data);
}

async function getGuides() {
    return getData(STORES.GUIDES);
}


async function saveChecklist(data) {
    return saveData(STORES.CHECKLIST, data);
}

async function getChecklist() {
    return getData(STORES.CHECKLIST);
}


async function saveShelters(data) {
    return saveData(STORES.SHELTERS, data);
}

async function getShelters() {
    return getData(STORES.SHELTERS);
}


async function saveHospitals(data) {
    return saveData(STORES.HOSPITALS, data);
}

async function getHospitals() {
    return getData(STORES.HOSPITALS);
}


async function saveAlerts(data) {
    return saveData(STORES.ALERTS, data);
}

async function getAlerts() {
    return getData(STORES.ALERTS);
}


async function saveEmergencyContacts(data) {
    return saveData(
        STORES.EMERGENCY_CONTACTS,
        data
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

        const transaction = db.transaction(
            STORES.SOS_QUEUE,
            "readwrite"
        );

        const store = transaction.objectStore(
            STORES.SOS_QUEUE
        );

        const sosRecord = {

            ...sosData,

            // Backend-required fields
            latitude:
                sosData.latitude !== undefined
                    ? sosData.latitude
                    : null,

            longitude:
                sosData.longitude !== undefined
                    ? sosData.longitude
                    : null,

            timestamp:
                sosData.timestamp ||
                new Date().toISOString(),

            queuedAt:
                new Date().toISOString(),

            status: "pending"
        };

        store.add(sosRecord);

        transaction.oncomplete = () => {

            db.close();

            console.log(
                "SOS queued successfully:",
                sosRecord
            );

            resolve(sosRecord);
        };

        transaction.onerror = () => {

            db.close();

            console.error(
                "Failed to queue SOS:",
                transaction.error
            );

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
// UPDATE SOS
// ========================================

async function updateSOS(sosData) {

    if (
        !sosData ||
        sosData.queueId === undefined
    ) {

        throw new Error(
            "queueId is required to update SOS"
        );
    }

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(
            STORES.SOS_QUEUE,
            "readwrite"
        );

        const store = transaction.objectStore(
            STORES.SOS_QUEUE
        );

        store.put(sosData);

        transaction.oncomplete = () => {

            db.close();

            console.log(
                "SOS updated:",
                sosData
            );

            resolve(sosData);
        };

        transaction.onerror = () => {

            db.close();

            reject(transaction.error);
        };
    });
}


// ========================================
// DAMAGE QUEUE
// ========================================

async function queueDamage(data) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(
            STORES.DAMAGE_QUEUE,
            "readwrite"
        );

        const store = transaction.objectStore(
            STORES.DAMAGE_QUEUE
        );

        store.add({

            ...data,

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

async function queueMissing(data) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(
            STORES.MISSING_QUEUE,
            "readwrite"
        );

        const store = transaction.objectStore(
            STORES.MISSING_QUEUE
        );

        store.add({

            ...data,

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

async function queueHelp(data) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(
            STORES.HELP_QUEUE,
            "readwrite"
        );

        const store = transaction.objectStore(
            STORES.HELP_QUEUE
        );

        store.add({

            ...data,

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

        const transaction = db.transaction(
            storeName,
            "readwrite"
        );

        const store = transaction.objectStore(
            storeName
        );

        store.delete(queueId);

        transaction.oncomplete = () => {

            db.close();

            console.log(
                "Removed queue item:",
                queueId
            );

            resolve();
        };

        transaction.onerror = () => {

            db.close();

            reject(transaction.error);
        };
    });
}


// ========================================
// REMOVE FUNCTIONS
// ========================================

async function removeSOS(queueId) {

    return removeFromQueue(
        STORES.SOS_QUEUE,
        queueId
    );
}


async function removeDamage(queueId) {

    return removeFromQueue(
        STORES.DAMAGE_QUEUE,
        queueId
    );
}


async function removeMissing(queueId) {

    return removeFromQueue(
        STORES.MISSING_QUEUE,
        queueId
    );
}


async function removeHelp(queueId) {

    return removeFromQueue(
        STORES.HELP_QUEUE,
        queueId
    );
}


// ========================================
// PENDING COUNT
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

    // Database
    openDatabase,

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

    // SOS
    queueSOS,
    getSOSQueue,
    updateSOS,
    removeSOS,

    // Damage
    queueDamage,
    getDamageQueue,
    removeDamage,

    // Missing
    queueMissing,
    getMissingQueue,
    removeMissing,

    // Help
    queueHelp,
    getHelpQueue,
    removeHelp,

    // Pending count
    getPendingCount
};


console.log(
    "IndexedDB service loaded successfully"
);