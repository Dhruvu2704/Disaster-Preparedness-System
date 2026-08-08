const DB_NAME = "DisasterPreparednessDB";
const DB_VERSION = 1;

const STORES = {
    GUIDES: "guides",
    SHELTERS: "shelters",
    HOSPITALS: "hospitals",
    SOS_QUEUE: "sos_queue",
    DAMAGE_QUEUE: "damage_queue"
};


// Open / create the database
function openDatabase() {
    return new Promise((resolve, reject) => {

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;

            // Cached data
            if (!db.objectStoreNames.contains(STORES.GUIDES)) {
                db.createObjectStore(STORES.GUIDES, {
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
// SAVE CACHED DATA
// ========================================

async function saveData(storeName, data) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);

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
        const transaction = db.transaction(storeName, "readonly");
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
// GUIDES
// ========================================

async function saveGuides(guides) {
    return saveData(STORES.GUIDES, guides);
}

async function getGuides() {
    return getData(STORES.GUIDES);
}


// ========================================
// SHELTERS
// ========================================

async function saveShelters(shelters) {
    return saveData(STORES.SHELTERS, shelters);
}

async function getShelters() {
    return getData(STORES.SHELTERS);
}


// ========================================
// HOSPITALS
// ========================================

async function saveHospitals(hospitals) {
    return saveData(STORES.HOSPITALS, hospitals);
}

async function getHospitals() {
    return getData(STORES.HOSPITALS);
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

        const store = transaction.objectStore(STORES.SOS_QUEUE);

        store.add({
            ...sosData,
            queuedAt: new Date().toISOString()
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
    return getData(STORES.SOS_QUEUE);
}


// ========================================
// DAMAGE QUEUE
// ========================================

async function queueDamage(damageData) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            STORES.DAMAGE_QUEUE,
            "readwrite"
        );

        const store = transaction.objectStore(STORES.DAMAGE_QUEUE);

        store.add({
            ...damageData,
            queuedAt: new Date().toISOString()
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
    return getData(STORES.DAMAGE_QUEUE);
}


// ========================================
// REMOVE AFTER SUCCESSFUL SYNC
// ========================================

async function removeFromQueue(storeName, queueId) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);

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


async function removeSOS(queueId) {
    return removeFromQueue(STORES.SOS_QUEUE, queueId);
}


async function removeDamage(queueId) {
    return removeFromQueue(STORES.DAMAGE_QUEUE, queueId);
}
window.indexedDBService = {
    saveGuides: saveGuides,
    getGuides: getGuides,
    saveShelters: saveShelters,
    getShelters: getShelters,
    saveHospitals: saveHospitals,
    getHospitals: getHospitals,
    queueSOS: queueSOS,
    getSOSQueue: getSOSQueue,
    queueDamage: queueDamage,
    getDamageQueue: getDamageQueue,
    removeSOS: removeSOS,
    removeDamage: removeDamage
};

console.log("IndexedDB service loaded");
