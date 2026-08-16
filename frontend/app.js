/* =========================================================
   RESQNET - COMPLETE FRONTEND APP
   MEMBER 1: UI / FRONTEND ONLY

   Roles:
   1. Citizen
   2. Shelter Representative
   3. Government / Authority

   NOTE:
   No IndexedDB
   No backend
   No API
   No Service Worker
   No sync logic
========================================================= */


/* =========================================================
   GLOBAL STATE
========================================================= */

let currentPage = "login";

let currentUserRole = "citizen";

let currentUserName = "ResQNet User";

const API_BASE = "http://127.0.0.1:8000";


async function getShelters() {

    try {

        const response = await fetch(
            `${API_BASE}/api/shelters?status=Active`
        );

        if (!response.ok) {
            throw new Error(
                `Shelter API returned ${response.status}`
            );
        }

        return await response.json();

    } catch (error) {

        console.error(
            "Shelter API error:",
            error
        );

        showToast(
            "Unable to load shelters"
        );

        return [];
    }
}


/* =========================================================
   DEMO DATA
========================================================= */

let shelterData = {

    name: "Community Relief Center",

    capacity: 500,

    occupied: 312,

    doctors: 5,

    volunteers: 18,

    food: "Available",

    medicine: "Available",

    water: "Available",

    electricity: "Limited",

    internet: "Available"

};


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    render();

});


/* =========================================================
   NAVIGATION
========================================================= */

function navigate(page) {

    currentPage = page;

    render();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   MAIN RENDER
========================================================= */

function render() {

    const app = document.getElementById("app");

    if (!app) return;


    /*
       Login and Register do not use
       the dashboard layout.
    */

    if (
        currentPage === "login" ||
        currentPage === "register"
    ) {

        app.innerHTML = renderPage();

    }

    else {

        app.innerHTML = applicationLayout();

    }


    /*
       Re-create Lucide icons
    */

    if (
        typeof lucide !== "undefined" &&
        lucide.createIcons
    ) {

        lucide.createIcons();

    }
    if (currentPage === "shelters") {
    loadShelters();
    }

    if (currentPage === "missing") {
    loadMissingPersons();
}

}


/* =========================================================
   PAGE ROUTER
========================================================= */

function renderPage() {

    switch (currentPage) {


        /* =========================
           AUTHENTICATION
        ========================= */

        case "login":

            return loginPage();


        case "register":

            return registerPage();


        /* =========================
           DASHBOARD
        ========================= */

        case "dashboard":

            if (currentUserRole === "shelter") {

                return shelterDashboard();

            }

            if (currentUserRole === "government") {

                return governmentDashboard();

            }

            return citizenDashboard();


        /* =========================
           CITIZEN PAGES
        ========================= */

        case "guides":

            return guidesPage();


        case "checklist":

            return checklistPage();


        case "contacts":

            return contactsPage();


        case "map":

            return mapPage();


        case "shelters":

            return sheltersPage();


        case "hospitals":

            return hospitalsPage();


        case "sos":

            return sosPage();


        case "damage":

            return damagePage();


        case "missing":

            return missingPage();


        case "help":

            return helpPage();


        /* =========================
           SHELTER PAGES
        ========================= */

        case "governmentRequest":

            return governmentRequestPage();


        case "myShelter":

            return myShelterPage();


        /* =========================
           GOVERNMENT PAGES
        ========================= */

        case "shelterMonitoring":

            return shelterMonitoringPage();


        case "alerts":

            return alertsPage();


        case "reports":

            return reportsPage();


        case "requests":

            return requestsPage();


        default:

            return loginPage();

    }

}


/* =========================================================
   APPLICATION LAYOUT
========================================================= */

function applicationLayout() {

    return `

        <div class="min-h-screen flex bg-paper">


            <!-- MOBILE OVERLAY -->

            <div
                id="mobileOverlay"
                class="
                    fixed
                    inset-0
                    bg-black/40
                    z-40
                    hidden
                    md:hidden
                "
                onclick="closeMobileMenu()"
            ></div>


            <!-- SIDEBAR -->

            <aside
                id="sidebar"
                class="
                    fixed
                    md:sticky
                    top-0
                    left-0
                    z-50
                    h-screen
                    w-72
                    bg-white
                    border-r
                    border-gray-100
                    flex
                    flex-col
                    -translate-x-full
                    md:translate-x-0
                    transition-transform
                    duration-300
                "
            >


                <!-- LOGO -->

                <div
                    class="
                        p-5
                        border-b
                        border-gray-100
                    "
                >

                    <div class="
                        flex
                        items-center
                        gap-3
                    ">

                        <div
                            class="
                                w-11
                                h-11
                                rounded-xl
                                bg-ink
                                text-white
                                flex
                                items-center
                                justify-center
                                shadow-glow
                            "
                        >

                            <i
                                data-lucide="shield-alert"
                                class="w-6 h-6"
                            ></i>

                        </div>


                        <div>

                            <h1
                                class="
                                    font-bold
                                    text-xl
                                    text-ink
                                "
                            >
                                ResQNet
                            </h1>

                            <p
                                class="
                                    text-xs
                                    text-gray-500
                                "
                            >
                                Disaster Management
                            </p>

                        </div>

                    </div>

                </div>


                <!-- USER -->

                <div
                    class="
                        mx-4
                        mt-4
                        p-4
                        rounded-xl
                        bg-paper
                    "
                >

                    <div
                        class="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <div
                            class="
                                w-10
                                h-10
                                rounded-full
                                bg-ink
                                text-white
                                flex
                                items-center
                                justify-center
                                font-bold
                            "
                        >

                            ${getInitials(currentUserName)}

                        </div>


                        <div
                            class="
                                min-w-0
                            "
                        >

                            <p
                                class="
                                    font-semibold
                                    text-sm
                                    truncate
                                "
                            >

                                ${escapeHTML(currentUserName)}

                            </p>


                            <p
                                class="
                                    text-xs
                                    text-gray-500
                                "
                            >

                                ${getRoleName()}

                            </p>

                        </div>

                    </div>

                </div>


                <!-- NAVIGATION -->

                <nav
                    class="
                        flex-1
                        p-4
                        space-y-1
                        overflow-y-auto
                    "
                >

                    ${getNavigation()}

                </nav>


                <!-- LOGOUT -->

                <div
                    class="
                        p-4
                        border-t
                        border-gray-100
                    "
                >

                    <button
                        onclick="logout()"
                        class="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            rounded-xl
                            text-gray-600
                            hover:bg-red-50
                            hover:text-red-600
                            transition
                        "
                    >

                        <i
                            data-lucide="log-out"
                            class="w-5 h-5"
                        ></i>

                        <span class="font-semibold">
                            Logout
                        </span>

                    </button>

                </div>

            </aside>


            <!-- MAIN -->

            <main
                class="
                    flex-1
                    min-w-0
                "
            >

                <!-- TOP BAR -->

                <header
                    class="
                        sticky
                        top-0
                        z-30
                        bg-white/95
                        backdrop-blur
                        border-b
                        border-gray-100
                        px-4
                        md:px-8
                        py-4
                    "
                >

                    <div
                        class="
                            flex
                            items-center
                            justify-between
                        "
                    >


                        <button
                            onclick="toggleMobileMenu()"
                            class="
                                md:hidden
                                w-10
                                h-10
                                rounded-xl
                                bg-paper
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <i
                                data-lucide="menu"
                            ></i>

                        </button>


                        <div
                            class="
                                hidden
                                md:block
                            "
                        >

                            <p
                                class="
                                    text-sm
                                    text-gray-500
                                "
                            >

                                ${getGreeting()}

                            </p>

                        </div>


                        <!-- STATUS -->

                        <div
                            class="
                                flex
                                items-center
                                gap-2
                            "
                        >

                            <span
                                class="
                                    w-2.5
                                    h-2.5
                                    rounded-full
                                    bg-green-500
                                "
                            ></span>

                            <span
                                class="
                                    text-xs
                                    md:text-sm
                                    font-semibold
                                    text-gray-600
                                "
                            >
                                System Ready
                            </span>

                        </div>

                    </div>

                </header>


                <!-- CONTENT -->

                <div
                    class="
                        p-4
                        md:p-8
                        max-w-7xl
                        mx-auto
                    "
                >

                    <div class="fade-in">

                        ${renderPage()}

                    </div>

                </div>

            </main>

        </div>

    `;

}


/* =========================================================
   NAVIGATION
========================================================= */

function getNavigation() {


    /* =========================
       CITIZEN
    ========================= */

    if (currentUserRole === "citizen") {

        return `

            ${navigationItem(
                "dashboard",
                "layout-dashboard",
                "Dashboard"
            )}

            ${navigationItem(
                "map",
                "map",
                "Emergency Map"
            )}

            ${navigationItem(
                "sos",
                "siren",
                "SOS Emergency",
                true
            )}

            ${navigationItem(
                "shelters",
                "home",
                "Shelters"
            )}

            ${navigationItem(
                "hospitals",
                "hospital",
                "Hospitals"
            )}

            ${navigationItem(
                "contacts",
                "phone",
                "Emergency Contacts"
            )}

            ${navigationItem(
                "guides",
                "book-open",
                "Disaster Guides"
            )}

            ${navigationItem(
                "checklist",
                "clipboard-check",
                "Emergency Checklist"
            )}

            ${navigationItem(
                "damage",
                "triangle-alert",
                "Damage Report"
            )}

            ${navigationItem(
                "missing",
                "user-search",
                "Missing Persons"
            )}

            ${navigationItem(
                "help",
                "circle-help",
                "Help & Support"
            )}

        `;

    }


    /* =========================
       SHELTER
    ========================= */

    if (currentUserRole === "shelter") {

        return `

            ${navigationItem(
                "dashboard",
                "layout-dashboard",
                "Dashboard"
            )}

            ${navigationItem(
                "myShelter",
                "home",
                "My Shelter"
            )}

            ${navigationItem(
                "map",
                "map",
                "Emergency Map"
            )}

            ${navigationItem(
                "governmentRequest",
                "hand-helping",
                "Request Govt Help"
            )}

            ${navigationItem(
                "contacts",
                "phone",
                "Emergency Contacts"
            )}

            ${navigationItem(
                "hospitals",
                "hospital",
                "Hospitals"
            )}

            ${navigationItem(
                "help",
                "circle-help",
                "Help & Support"
            )}

        `;

    }


    /* =========================
       GOVERNMENT
    ========================= */

    if (currentUserRole === "government") {

        return `

            ${navigationItem(
                "dashboard",
                "layout-dashboard",
                "Command Center"
            )}

            ${navigationItem(
                "shelterMonitoring",
                "home",
                "Shelter Monitoring"
            )}

            ${navigationItem(
                "alerts",
                "megaphone",
                "Emergency Alerts"
            )}

            ${navigationItem(
                "reports",
                "file-warning",
                "Citizen Reports"
            )}

            ${navigationItem(
                "requests",
                "inbox",
                "Resource Requests"
            )}

            ${navigationItem(
                "missing",
                "user-search",
                "Missing Persons"
            )}

            ${navigationItem(
                "map",
                "map",
                "Emergency Map"
            )}

            ${navigationItem(
                "hospitals",
                "hospital",
                "Hospitals"
            )}

            ${navigationItem(
                "contacts",
                "phone",
                "Government Contacts"
            )}

            ${navigationItem(
                "help",
                "circle-help",
                "Help & Support"
            )}

        `;

    }

}


function navigationItem(
    page,
    icon,
    label,
    emergency = false
) {

    const active =
        currentPage === page
            ? "active"
            : "";

    const emergencyClass =
        emergency
            ? "text-red-600"
            : "";


    return `

        <button
            onclick="navigate('${page}')"
            class="
                nav-item
                ${active}
                ${emergencyClass}
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                text-left
                text-sm
                font-semibold
            "
        >

            <i
                data-lucide="${icon}"
                class="w-5 h-5"
            ></i>

            <span>
                ${label}
            </span>

        </button>

    `;

}


/* =========================================================
   AUTHENTICATION
========================================================= */

function loginPage() {

    return `

        <div
            class="
                min-h-screen
                flex
                items-center
                justify-center
                bg-paper
                px-4
                py-10
            "
        >

            <div
                class="
                    w-full
                    max-w-md
                "
            >


                <!-- LOGO -->

                <div
                    class="
                        text-center
                        mb-8
                    "
                >

                    <div
                        class="
                            w-16
                            h-16
                            mx-auto
                            rounded-2xl
                            bg-ink
                            text-white
                            flex
                            items-center
                            justify-center
                            shadow-glow
                        "
                    >

                        <i
                            data-lucide="shield-alert"
                            class="w-8 h-8"
                        ></i>

                    </div>


                    <h1
                        class="
                            text-3xl
                            font-bold
                            text-ink
                            mt-4
                        "
                    >
                        ResQNet
                    </h1>


                    <p
                        class="
                            text-gray-500
                            mt-2
                        "
                    >
                        Disaster Management Platform
                    </p>

                </div>


                <!-- LOGIN CARD -->

                <div
                    class="
                        card
                        p-6
                        md:p-8
                    "
                >

                    <h2
                        class="
                            text-2xl
                            font-bold
                            text-ink
                        "
                    >
                        Welcome Back
                    </h2>


                    <p
                        class="
                            text-sm
                            text-gray-500
                            mt-1
                            mb-6
                        "
                    >
                        Login to your ResQNet account.
                    </p>


                    <form
                        onsubmit="handleLogin(event)"
                        class="space-y-5"
                    >


                        <!-- ROLE -->

                        <div>

                            <label
                                class="
                                    block
                                    text-sm
                                    font-semibold
                                    mb-2
                                "
                            >
                                Login As
                            </label>


                            <select
                                id="loginRole"
                                class="resq-input"
                                required
                            >

                                <option value="citizen">
                                    Citizen
                                </option>

                                <option value="shelter">
                                    Shelter Representative
                                </option>

                                <option value="government">
                                    Government / Authority
                                </option>

                            </select>

                        </div>


                        <!-- EMAIL -->

                        <div>

                            <label
                                class="
                                    block
                                    text-sm
                                    font-semibold
                                    mb-2
                                "
                            >
                                Email Address
                            </label>


                            <div class="relative">

                                <i
                                    data-lucide="mail"
                                    class="
                                        absolute
                                        left-4
                                        top-3.5
                                        w-5
                                        h-5
                                        text-gray-400
                                    "
                                ></i>


                                <input
                                    id="loginEmail"
                                    type="email"
                                    class="
                                        resq-input
                                        pl-12
                                    "
                                    placeholder="Enter your email"
                                    required
                                >

                            </div>

                        </div>


                        <!-- PASSWORD -->

                        <div>

                            <label
                                class="
                                    block
                                    text-sm
                                    font-semibold
                                    mb-2
                                "
                            >
                                Password
                            </label>


                            <div class="relative">

                                <i
                                    data-lucide="lock"
                                    class="
                                        absolute
                                        left-4
                                        top-3.5
                                        w-5
                                        h-5
                                        text-gray-400
                                    "
                                ></i>


                                <input
                                    id="loginPassword"
                                    type="password"
                                    class="
                                        resq-input
                                        pl-12
                                    "
                                    placeholder="Enter password"
                                    required
                                >

                            </div>

                        </div>


                        <button
                            type="submit"
                            class="
                                resq-button
                                w-full
                                bg-ink
                                text-white
                                py-3.5
                                rounded-xl
                                font-bold
                            "
                        >

                            <i
                                data-lucide="log-in"
                                class="w-5 h-5 inline"
                            ></i>

                            Login

                        </button>

                    </form>


                    <div
                        class="
                            text-center
                            mt-6
                            pt-6
                            border-t
                            border-gray-100
                        "
                    >

                        <p
                            class="
                                text-sm
                                text-gray-500
                            "
                        >

                            Don't have an account?

                            <button
                                onclick="navigate('register')"
                                class="
                                    font-bold
                                    text-ink
                                    ml-1
                                "
                            >
                                Create Account
                            </button>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    `;

}


function registerPage() {

    return `

        <div
            class="
                min-h-screen
                flex
                items-center
                justify-center
                bg-paper
                px-4
                py-10
            "
        >

            <div
                class="
                    w-full
                    max-w-lg
                "
            >


                <div
                    class="
                        text-center
                        mb-8
                    "
                >

                    <div
                        class="
                            w-16
                            h-16
                            mx-auto
                            rounded-2xl
                            bg-ink
                            text-white
                            flex
                            items-center
                            justify-center
                        "
                    >

                        <i
                            data-lucide="shield-alert"
                            class="w-8 h-8"
                        ></i>

                    </div>


                    <h1
                        class="
                            text-3xl
                            font-bold
                            text-ink
                            mt-4
                        "
                    >
                        ResQNet
                    </h1>


                    <p
                        class="
                            text-gray-500
                            mt-2
                        "
                    >
                        Create your account
                    </p>

                </div>


                <div
                    class="
                        card
                        p-6
                        md:p-8
                    "
                >

                    <h2
                        class="
                            text-2xl
                            font-bold
                            text-ink
                        "
                    >
                        Create Account
                    </h2>


                    <p
                        class="
                            text-sm
                            text-gray-500
                            mt-1
                            mb-6
                        "
                    >
                        Select the account type you need.
                    </p>


                    <form
                        onsubmit="handleRegister(event)"
                        class="space-y-5"
                    >


                        <!-- ROLE -->

                        <div>

                            <label
                                class="
                                    block
                                    text-sm
                                    font-semibold
                                    mb-2
                                "
                            >
                                Account Type
                            </label>


                            <select
                                id="registerRole"
                                class="resq-input"
                                onchange="showRoleFields()"
                                required
                            >

                                <option value="">
                                    Select account type
                                </option>

                                <option value="citizen">
                                    Citizen
                                </option>

                                <option value="shelter">
                                    Shelter Representative
                                </option>

                                <option value="government">
                                    Government / Authority
                                </option>

                            </select>

                        </div>


                        <!-- NAME -->

                        <div>

                            <label
                                class="
                                    block
                                    text-sm
                                    font-semibold
                                    mb-2
                                "
                            >
                                Full Name
                            </label>


                            <input
                                id="registerName"
                                type="text"
                                class="resq-input"
                                placeholder="Enter your name"
                                required
                            >

                        </div>


                        <!-- ORGANIZATION -->

                        <div
                            id="organizationField"
                            class="hidden"
                        >

                            <label
                                class="
                                    block
                                    text-sm
                                    font-semibold
                                    mb-2
                                "
                            >
                                Organization / Shelter Name
                            </label>


                            <input
                                id="registerOrganization"
                                class="resq-input"
                                placeholder="Enter organization name"
                            >

                        </div>


                        <!-- EMAIL -->

                        <div>

                            <label
                                class="
                                    block
                                    text-sm
                                    font-semibold
                                    mb-2
                                "
                            >
                                Email Address
                            </label>


                            <input
                                id="registerEmail"
                                type="email"
                                class="resq-input"
                                placeholder="Enter email"
                                required
                            >

                        </div>


                        <!-- PHONE -->

                        <div>

                            <label
                                class="
                                    block
                                    text-sm
                                    font-semibold
                                    mb-2
                                "
                            >
                                Phone Number
                            </label>


                            <input
                                id="registerPhone"
                                type="tel"
                                class="resq-input"
                                placeholder="Enter phone number"
                                required
                            >

                        </div>


                        <!-- PASSWORD -->

                        <div>

                            <label
                                class="
                                    block
                                    text-sm
                                    font-semibold
                                    mb-2
                                "
                            >
                                Password
                            </label>


                            <input
                                id="registerPassword"
                                type="password"
                                class="resq-input"
                                placeholder="Create password"
                                required
                            >

                        </div>


                        <!-- CONFIRM -->

                        <div>

                            <label
                                class="
                                    block
                                    text-sm
                                    font-semibold
                                    mb-2
                                "
                            >
                                Confirm Password
                            </label>


                            <input
                                id="registerConfirmPassword"
                                type="password"
                                class="resq-input"
                                placeholder="Confirm password"
                                required
                            >

                        </div>


                        <label
                            class="
                                flex
                                items-start
                                gap-3
                                text-sm
                                text-gray-600
                            "
                        >

                            <input
                                type="checkbox"
                                required
                                class="mt-1"
                            >

                            <span>
                                I agree to the ResQNet terms
                                and emergency service guidelines.
                            </span>

                        </label>


                        <button
                            type="submit"
                            class="
                                w-full
                                bg-ink
                                text-white
                                py-3.5
                                rounded-xl
                                font-bold
                            "
                        >

                            <i
                                data-lucide="user-plus"
                                class="w-5 h-5 inline"
                            ></i>

                            Create Account

                        </button>

                    </form>


                    <div
                        class="
                            text-center
                            mt-6
                            pt-6
                            border-t
                        "
                    >

                        <p
                            class="
                                text-sm
                                text-gray-500
                            "
                        >

                            Already have an account?

                            <button
                                onclick="navigate('login')"
                                class="
                                    font-bold
                                    text-ink
                                "
                            >
                                Login
                            </button>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   LOGIN / REGISTER HANDLERS
========================================================= */

async function handleLogin(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const role =
        document.getElementById("loginRole").value;


    if (!email || !password || !role) {

        showToast("Please fill all fields");

        return;
    }


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            showToast(
                data.detail || "Invalid email or password"
            );

            return;
        }


        // Store the JWT returned by the backend
        localStorage.setItem(
            "resqnet_token",
            data.access_token
        );


        // Keep the selected frontend role
        currentUserRole = role;


        // Temporary display name until we fetch the
        // authenticated user's actual profile
        currentUserName =
            email
                .split("@")[0]
                .replace(/[._-]/g, " ");


        currentUserName =
            currentUserName
                .split(" ")
                .map(
                    word =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1)
                )
                .join(" ");


        showToast("Login successful");


        setTimeout(function () {

            navigate("dashboard");

        }, 400);


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        showToast(
            "Unable to connect to the server"
        );
    }

}


async function handleRegister(event) {

    event.preventDefault();

    const role =
        document.getElementById("registerRole").value;

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const phone =
        document.getElementById("registerPhone").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("registerConfirmPassword").value;


    if (!role || !name || !email || !phone || !password) {

        showToast("Please fill all required fields");

        return;
    }


    if (password.length < 6) {

        showToast(
            "Password must contain at least 6 characters"
        );

        return;
    }


    if (password !== confirmPassword) {

        showToast(
            "Passwords do not match"
        );

        return;
    }


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    phone: phone
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            showToast(
                data.detail || "Registration failed"
            );

            return;
        }


        showToast(
            "Account created successfully"
        );


        setTimeout(function () {

            navigate("login");

        }, 700);


    } catch (error) {

        console.error("Registration error:", error);

        showToast(
            "Unable to connect to the server"
        );

    }

}


function showRoleFields() {

    const roleElement =
        document.getElementById(
            "registerRole"
        );

    const organizationField =
        document.getElementById(
            "organizationField"
        );


    if (
        !roleElement ||
        !organizationField
    ) {

        return;

    }


    const role =
        roleElement.value;


    if (
        role === "shelter" ||
        role === "government"
    ) {

        organizationField.classList.remove(
            "hidden"
        );

    }

    else {

        organizationField.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   CITIZEN DASHBOARD
========================================================= */

function citizenDashboard() {

    return `

        ${pageHeader(
            "Citizen Dashboard",
            "Your emergency information and assistance center."
        )}


        <!-- EMERGENCY BANNER -->

        <div
            class="
                card
                p-5
                mb-6
                border-l-4
                border-coral
                bg-white
            "
        >

            <div
                class="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                "
            >

                <div
                    class="
                        flex
                        items-start
                        gap-4
                    "
                >

                    <div
                        class="
                            w-12
                            h-12
                            rounded-xl
                            bg-red-100
                            text-coral
                            flex
                            items-center
                            justify-center
                            shrink-0
                        "
                    >

                        <i
                            data-lucide="triangle-alert"
                        ></i>

                    </div>


                    <div>

                        <h2
                            class="
                                font-bold
                                text-lg
                            "
                        >
                            Stay Prepared
                        </h2>


                        <p
                            class="
                                text-sm
                                text-gray-500
                                mt-1
                            "
                        >
                            Check emergency alerts and
                            know your nearest shelter.
                        </p>

                    </div>

                </div>


                <button
                    onclick="navigate('sos')"
                    class="
                        bg-coral
                        text-white
                        px-5
                        py-3
                        rounded-xl
                        font-bold
                    "
                >
                    Emergency SOS
                </button>

            </div>

        </div>


        <!-- QUICK ACTIONS -->

        <div
            class="
                grid
                grid-cols-2
                md:grid-cols-4
                gap-4
                mb-6
            "
        >

            ${quickAction(
                "Emergency Map",
                "map",
                "navigate('map')"
            )}

            ${quickAction(
                "Find Shelter",
                "home",
                "navigate('shelters')"
            )}

            ${quickAction(
                "Hospitals",
                "hospital",
                "navigate('hospitals')"
            )}

            ${quickAction(
                "SOS",
                "siren",
                "navigate('sos')"
            )}

        </div>


        <!-- INFO CARDS -->

        <div
            class="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-6
            "
        >


            <!-- NEAREST SHELTER -->

            <div class="card p-6">

                <div
                    class="
                        flex
                        items-center
                        justify-between
                        mb-5
                    "
                >

                    <div>

                        <h2
                            class="
                                text-xl
                                font-bold
                            "
                        >
                            Nearest Shelter
                        </h2>

                        <p
                            class="
                                text-sm
                                text-gray-500
                            "
                        >
                            Available emergency accommodation
                        </p>

                    </div>


                    <i
                        data-lucide="home"
                        class="
                            text-mint
                        "
                    ></i>

                </div>


                <div
                    class="
                        p-4
                        bg-paper
                        rounded-xl
                    "
                >

                    <h3 class="font-bold">
                        Community Relief Center
                    </h3>

                    <p
                        class="
                            text-sm
                            text-gray-500
                            mt-1
                        "
                    >
                        1.8 km away
                    </p>


                    <div
                        class="
                            flex
                            items-center
                            justify-between
                            mt-4
                        "
                    >

                        <span
                            class="
                                text-sm
                                text-green-700
                                font-semibold
                            "
                        >
                            188 spaces available
                        </span>


                        <button
                            onclick="navigate('shelters')"
                            class="
                                text-sm
                                font-bold
                                text-ink
                            "
                        >
                            View
                        </button>

                    </div>

                </div>

            </div>


            <!-- EMERGENCY CONTACTS -->

            <div class="card p-6">

                <div
                    class="
                        flex
                        items-center
                        justify-between
                        mb-5
                    "
                >

                    <div>

                        <h2
                            class="
                                text-xl
                                font-bold
                            "
                        >
                            Emergency Contacts
                        </h2>

                        <p
                            class="
                                text-sm
                                text-gray-500
                            "
                        >
                            Important emergency services
                        </p>

                    </div>


                    <i
                        data-lucide="phone"
                        class="
                            text-mint
                        "
                    ></i>

                </div>


                ${contactRow(
                    "National Emergency",
                    "112",
                    "phone"
                )}

                ${contactRow(
                    "Police",
                    "100",
                    "shield"
                )}

                ${contactRow(
                    "Ambulance",
                    "108",
                    "ambulance"
                )}

            </div>

        </div>

    `;

}


/* =========================================================
   SHELTER REPRESENTATIVE DASHBOARD
========================================================= */

function shelterDashboard() {

    const available =
        Math.max(
            shelterData.capacity -
            shelterData.occupied,
            0
        );


    const occupancy =
        shelterData.capacity > 0
            ? Math.round(
                (
                    shelterData.occupied /
                    shelterData.capacity
                ) * 100
            )
            : 0;


    return `

        ${pageHeader(
            "Shelter Representative Dashboard",
            "Manage your shelter and request emergency assistance."
        )}


        <!-- SHELTER HEADER -->

        <div class="card p-6 mb-6">

            <div
                class="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                "
            >

                <div>

                    <p
                        class="
                            text-sm
                            text-gray-500
                        "
                    >
                        Current Shelter
                    </p>


                    <h2
                        class="
                            text-2xl
                            font-bold
                            text-ink
                            mt-1
                        "
                    >
                        ${shelterData.name}
                    </h2>


                    <p
                        class="
                            text-sm
                            text-gray-500
                            mt-1
                        "
                    >
                        Shelter Representative
                    </p>

                </div>


                <span
                    class="
                        bg-green-100
                        text-green-700
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-bold
                    "
                >
                    SHELTER ACTIVE
                </span>

            </div>

        </div>


        <!-- STATS -->

        <div
            class="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-4
                gap-5
                mb-6
            "
        >

            ${statCard(
                "Total Capacity",
                shelterData.capacity,
                "People",
                "users"
            )}

            ${statCard(
                "Occupied",
                shelterData.occupied,
                "People staying",
                "user-check"
            )}

            ${statCard(
                "Available",
                available,
                "Spaces remaining",
                "bed"
            )}

            ${statCard(
                "Volunteers",
                shelterData.volunteers,
                "Currently available",
                "heart-handshake"
            )}

        </div>


        <!-- OCCUPANCY -->

        <div class="card p-6 mb-6">

            <div
                class="
                    flex
                    justify-between
                    mb-3
                "
            >

                <h3 class="font-bold">
                    Shelter Occupancy
                </h3>


                <span class="font-bold">
                    ${occupancy}%
                </span>

            </div>


            <div class="progress-track">

                <div
                    class="progress-fill bg-mint"
                    style="width:${occupancy}%"
                ></div>

            </div>


            <div
                class="
                    flex
                    justify-between
                    mt-3
                    text-sm
                    text-gray-500
                "
            >

                <span>
                    ${shelterData.occupied} occupied
                </span>

                <span>
                    ${available} spaces available
                </span>

            </div>

        </div>


        <!-- UPDATE + RESOURCES -->

        <div
            class="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-6
                mb-6
            "
        >


            <!-- UPDATE -->

            <div class="card p-6">

                <h2
                    class="
                        text-xl
                        font-bold
                        mb-5
                    "
                >
                    Update Shelter Details
                </h2>


                <form
                    onsubmit="updateShelter(event)"
                    class="space-y-4"
                >


                    <div>

                        <label
                            class="
                                block
                                text-sm
                                font-semibold
                                mb-2
                            "
                        >
                            Maximum Capacity
                        </label>


                        <input
                            id="shelterCapacity"
                            type="number"
                            min="0"
                            value="${shelterData.capacity}"
                            class="resq-input"
                            required
                        >

                    </div>


                    <div>

                        <label
                            class="
                                block
                                text-sm
                                font-semibold
                                mb-2
                            "
                        >
                            Current Occupancy
                        </label>


                        <input
                            id="shelterOccupancy"
                            type="number"
                            min="0"
                            value="${shelterData.occupied}"
                            class="resq-input"
                            required
                        >

                    </div>


                    <div>

                        <label
                            class="
                                block
                                text-sm
                                font-semibold
                                mb-2
                            "
                        >
                            Doctors Available
                        </label>


                        <input
                            id="shelterDoctors"
                            type="number"
                            min="0"
                            value="${shelterData.doctors}"
                            class="resq-input"
                            required
                        >

                    </div>


                    <div>

                        <label
                            class="
                                block
                                text-sm
                                font-semibold
                                mb-2
                            "
                        >
                            Volunteers
                        </label>


                        <input
                            id="shelterVolunteers"
                            type="number"
                            min="0"
                            value="${shelterData.volunteers}"
                            class="resq-input"
                            required
                        >

                    </div>


                    <button
                        type="submit"
                        class="
                            w-full
                            bg-ink
                            text-white
                            py-3
                            rounded-xl
                            font-bold
                        "
                    >

                        <i
                            data-lucide="save"
                            class="w-4 h-4 inline"
                        ></i>

                        Update Shelter

                    </button>

                </form>

            </div>


            <!-- RESOURCES -->

            <div class="card p-6">

                <h2
                    class="
                        text-xl
                        font-bold
                        mb-5
                    "
                >
                    Resource Availability
                </h2>


                ${resourceRow(
                    "utensils",
                    "Food",
                    shelterData.food
                )}

                ${resourceRow(
                    "pill",
                    "Medicine",
                    shelterData.medicine
                )}

                ${resourceRow(
                    "droplets",
                    "Clean Water",
                    shelterData.water
                )}

                ${resourceRow(
                    "zap",
                    "Electricity",
                    shelterData.electricity
                )}

                ${resourceRow(
                    "wifi",
                    "Internet",
                    shelterData.internet
                )}

            </div>

        </div>


        <!-- GOVERNMENT HELP -->

        <div
            class="
                card
                p-6
                border
                border-amber-200
                bg-amber-50
            "
        >

            <div
                class="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    gap-5
                "
            >

                <div
                    class="
                        w-12
                        h-12
                        rounded-xl
                        bg-amber-100
                        text-amber-700
                        flex
                        items-center
                        justify-center
                        shrink-0
                    "
                >

                    <i
                        data-lucide="hand-helping"
                    ></i>

                </div>


                <div class="flex-1">

                    <h2
                        class="
                            text-xl
                            font-bold
                        "
                    >
                        Need Government Assistance?
                    </h2>


                    <p
                        class="
                            text-sm
                            text-gray-600
                            mt-1
                        "
                    >
                        Request food, medicine,
                        volunteers, rescue equipment
                        or other emergency resources.
                    </p>


                    <button
                        onclick="navigate('governmentRequest')"
                        class="
                            mt-4
                            bg-ink
                            text-white
                            px-5
                            py-3
                            rounded-xl
                            font-bold
                        "
                    >

                        Request Government Help

                    </button>

                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   MY SHELTER
========================================================= */

function myShelterPage() {

    return shelterDashboard();

}


/* =========================================================
   SHELTER UPDATE
========================================================= */

function updateShelter(event) {

    event.preventDefault();


    const capacity =
        Number(
            document.getElementById(
                "shelterCapacity"
            ).value
        );


    const occupied =
        Number(
            document.getElementById(
                "shelterOccupancy"
            ).value
        );


    const doctors =
        Number(
            document.getElementById(
                "shelterDoctors"
            ).value
        );


    const volunteers =
        Number(
            document.getElementById(
                "shelterVolunteers"
            ).value
        );


    if (capacity < 0 || occupied < 0) {

        showToast(
            "Values cannot be negative"
        );

        return;

    }


    if (occupied > capacity) {

        showToast(
            "Occupancy cannot exceed capacity"
        );

        return;

    }


    shelterData.capacity = capacity;

    shelterData.occupied = occupied;

    shelterData.doctors = doctors;

    shelterData.volunteers = volunteers;


    showToast(
        "Shelter details updated"
    );


    setTimeout(
        function () {

            render();

        },
        500
    );

}


/* =========================================================
   GOVERNMENT REQUEST PAGE
========================================================= */

function governmentRequestPage() {

    return `

        ${pageHeader(
            "Request Government Assistance",
            "Send a resource request to the relevant government authority."
        )}


        <div
            class="
                max-w-3xl
                mx-auto
            "
        >

            <div class="card p-6 md:p-8">

                <div
                    class="
                        p-4
                        rounded-xl
                        bg-paper
                        mb-6
                    "
                >

                    <p
                        class="
                            text-xs
                            text-gray-500
                            uppercase
                            font-bold
                        "
                    >
                        Requesting Shelter
                    </p>


                    <p
                        class="
                            font-bold
                            text-ink
                            mt-1
                        "
                    >
                        ${shelterData.name}
                    </p>

                </div>


                <form
                    onsubmit="submitGovernmentRequest(event)"
                    class="space-y-5"
                >


                    <div>

                        <label
                            class="
                                block
                                text-sm
                                font-semibold
                                mb-2
                            "
                        >
                            Assistance Required
                        </label>


                        <select
                            id="requestType"
                            class="resq-input"
                            required
                        >

                            <option value="">
                                Select resource
                            </option>

                            <option>
                                Food
                            </option>

                            <option>
                                Drinking Water
                            </option>

                            <option>
                                Medicines
                            </option>

                            <option>
                                Doctors
                            </option>

                            <option>
                                Volunteers
                            </option>

                            <option>
                                Rescue Equipment
                            </option>

                            <option>
                                Boats
                            </option>

                            <option>
                                Generator
                            </option>

                        </select>

                    </div>


                    <div>

                        <label
                            class="
                                block
                                text-sm
                                font-semibold
                                mb-2
                            "
                        >
                            Quantity Required
                        </label>


                        <input
                            id="requestQuantity"
                            type="number"
                            min="1"
                            class="resq-input"
                            placeholder="Enter quantity"
                            required
                        >

                    </div>


                    <div>

                        <label
                            class="
                                block
                                text-sm
                                font-semibold
                                mb-2
                            "
                        >
                            Priority
                        </label>


                        <select
                            id="requestPriority"
                            class="resq-input"
                        >

                            <option>
                                Normal
                            </option>

                            <option>
                                High
                            </option>

                            <option>
                                Critical
                            </option>

                        </select>

                    </div>


                    <div>

                        <label
                            class="
                                block
                                text-sm
                                font-semibold
                                mb-2
                            "
                        >
                            Additional Details
                        </label>


                        <textarea
                            id="requestDetails"
                            class="resq-input"
                            rows="5"
                            placeholder="Describe what assistance is required..."
                        ></textarea>

                    </div>


                    <button
                        type="submit"
                        class="
                            w-full
                            bg-ink
                            text-white
                            py-3
                            rounded-xl
                            font-bold
                        "
                    >

                        <i
                            data-lucide="send"
                            class="w-4 h-4 inline"
                        ></i>

                        Send Request

                    </button>

                </form>

            </div>

        </div>

    `;

}


function submitGovernmentRequest(event) {

    event.preventDefault();


    const resource =
        document.getElementById(
            "requestType"
        ).value;


    if (!resource) {

        showToast(
            "Please select a resource"
        );

        return;

    }


    showToast(
        "Government assistance request submitted"
    );


    setTimeout(
        function () {

            navigate("dashboard");

        },
        700
    );

}


/* =========================================================
   GOVERNMENT DASHBOARD
========================================================= */

function governmentDashboard() {

    return `

        ${pageHeader(
            "Government Emergency Command Center",
            "Monitor disasters, shelters, citizen reports and resource requests."
        )}


        <!-- OVERVIEW -->

        <div
            class="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-4
                gap-5
                mb-6
            "
        >

            ${statCard(
                "Active Shelters",
                "24",
                "Currently operating",
                "home"
            )}

            ${statCard(
                "People Sheltered",
                "8,421",
                "Across all shelters",
                "users"
            )}

            ${statCard(
                "Pending Requests",
                "17",
                "Need attention",
                "bell-ring"
            )}

            ${statCard(
                "Active Emergencies",
                "6",
                "Currently monitored",
                "triangle-alert"
            )}

        </div>


        <!-- ALERT -->

        <div
            class="
                card
                p-6
                mb-6
                border-l-4
                border-coral
            "
        >

            <div
                class="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                "
            >

                <div
                    class="
                        flex
                        items-start
                        gap-4
                    "
                >

                    <div
                        class="
                            w-11
                            h-11
                            rounded-xl
                            bg-red-100
                            text-coral
                            flex
                            items-center
                            justify-center
                        "
                    >

                        <i
                            data-lucide="triangle-alert"
                        ></i>

                    </div>


                    <div>

                        <h3 class="font-bold">
                            Active Disaster Alert
                        </h3>


                        <p
                            class="
                                text-sm
                                text-gray-500
                                mt-1
                            "
                        >
                            Flood emergency reported
                            in multiple areas.
                        </p>

                    </div>

                </div>


                <button
                    onclick="navigate('alerts')"
                    class="
                        bg-coral
                        text-white
                        px-5
                        py-2.5
                        rounded-xl
                        font-bold
                    "
                >
                    Manage Alert
                </button>

            </div>

        </div>


        <!-- REQUESTS + REPORTS -->

        <div
            class="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-6
                mb-6
            "
        >


            <!-- REQUESTS -->

            <div class="card p-6">

                <div
                    class="
                        flex
                        justify-between
                        items-center
                        mb-5
                    "
                >

                    <div>

                        <h2
                            class="
                                text-xl
                                font-bold
                            "
                        >
                            Resource Requests
                        </h2>


                        <p
                            class="
                                text-sm
                                text-gray-500
                            "
                        >
                            Requests from shelters
                        </p>

                    </div>


                    <span
                        class="
                            bg-red-100
                            text-red-700
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-bold
                        "
                    >
                        17 Pending
                    </span>

                </div>


                ${governmentRequestItem(
                    "Community Relief Center",
                    "Medicine",
                    "Critical"
                )}


                ${governmentRequestItem(
                    "Government School Camp",
                    "Drinking Water",
                    "High"
                )}


                ${governmentRequestItem(
                    "District Emergency Shelter",
                    "Volunteers",
                    "Normal"
                )}


                <button
                    onclick="navigate('requests')"
                    class="
                        w-full
                        mt-4
                        bg-paper
                        py-3
                        rounded-xl
                        font-bold
                        text-ink
                    "
                >
                    View All Requests
                </button>

            </div>


            <!-- REPORTS -->

            <div class="card p-6">

                <h2
                    class="
                        text-xl
                        font-bold
                        mb-1
                    "
                >
                    Citizen Reports
                </h2>


                <p
                    class="
                        text-sm
                        text-gray-500
                        mb-5
                    "
                >
                    Recently submitted reports
                </p>


                ${reportItem(
                    "Damage Report",
                    "Road blocked near Sector 18",
                    "High"
                )}


                ${reportItem(
                    "Missing Person",
                    "Missing person reported",
                    "Critical"
                )}


                ${reportItem(
                    "Damage Report",
                    "Building damage reported",
                    "Normal"
                )}


                <button
                    onclick="navigate('reports')"
                    class="
                        w-full
                        mt-4
                        bg-paper
                        py-3
                        rounded-xl
                        font-bold
                        text-ink
                    "
                >
                    View All Reports
                </button>

            </div>

        </div>


        <!-- COMMAND CENTER -->

        <div class="card p-6">

            <h2
                class="
                    text-xl
                    font-bold
                    mb-5
                "
            >
                Command Center
            </h2>


            <div
                class="
                    grid
                    grid-cols-2
                    md:grid-cols-4
                    gap-4
                "
            >

                ${quickAction(
                    "Shelter Monitoring",
                    "home",
                    "navigate('shelterMonitoring')"
                )}


                ${quickAction(
                    "Emergency Alerts",
                    "megaphone",
                    "navigate('alerts')"
                )}


                ${quickAction(
                    "Citizen Reports",
                    "file-text",
                    "navigate('reports')"
                )}


                ${quickAction(
                    "Emergency Map",
                    "map",
                    "navigate('map')"
                )}

            </div>

        </div>

    `;

}


/* =========================================================
   GOVERNMENT REQUEST CARD
========================================================= */

function governmentRequestItem(
    shelter,
    request,
    priority
) {

    let priorityClass =
        "bg-gray-100 text-gray-700";


    if (priority === "Critical") {

        priorityClass =
            "bg-red-100 text-red-700";

    }

    else if (priority === "High") {

        priorityClass =
            "bg-amber-100 text-amber-700";

    }


    return `

        <div
            class="
                p-4
                rounded-xl
                bg-paper
                mb-3
            "
        >

            <div
                class="
                    flex
                    justify-between
                    gap-3
                "
            >

                <div>

                    <p class="font-bold">
                        ${shelter}
                    </p>


                    <p
                        class="
                            text-sm
                            text-gray-500
                        "
                    >
                        Requires ${request}
                    </p>

                </div>


                <span
                    class="
                        ${priorityClass}
                        px-2
                        py-1
                        rounded-full
                        text-xs
                        font-bold
                        h-fit
                    "
                >
                    ${priority}
                </span>

            </div>


            <div
                class="
                    flex
                    gap-2
                    mt-3
                "
            >

                <button
                    onclick="
                        approveRequest('${shelter}')
                    "
                    class="
                        flex-1
                        bg-ink
                        text-white
                        py-2
                        rounded-lg
                        text-sm
                        font-bold
                    "
                >
                    Approve
                </button>


                <button
                    onclick="
                        assignRequest('${shelter}')
                    "
                    class="
                        flex-1
                        bg-white
                        border
                        py-2
                        rounded-lg
                        text-sm
                        font-bold
                    "
                >
                    Assign
                </button>

            </div>

        </div>

    `;

}


function approveRequest(shelter) {

    showToast(
        `Request from ${shelter} approved`
    );

}


function assignRequest(shelter) {

    showToast(
        `Request assigned from ${shelter}`
    );

}


/* =========================================================
   SHELTER MONITORING
========================================================= */

function shelterMonitoringPage() {

    const shelters = [

        [
            "Community Relief Center",
            500,
            312
        ],

        [
            "Government School Camp",
            350,
            210
        ],

        [
            "District Emergency Shelter",
            700,
            420
        ],

        [
            "City Relief Center",
            450,
            430
        ]

    ];


    return `

        ${pageHeader(
            "Shelter Monitoring",
            "Monitor capacity and resource availability across relief shelters."
        )}


        <div
            class="
                card
                overflow-hidden
            "
        >

            <div class="overflow-x-auto">

                <table
                    class="
                        w-full
                        text-sm
                    "
                >

                    <thead
                        class="
                            bg-paper
                        "
                    >

                        <tr>

                            <th
                                class="
                                    text-left
                                    p-4
                                "
                            >
                                Shelter
                            </th>


                            <th
                                class="
                                    text-left
                                    p-4
                                "
                            >
                                Capacity
                            </th>


                            <th
                                class="
                                    text-left
                                    p-4
                                "
                            >
                                Occupied
                            </th>


                            <th
                                class="
                                    text-left
                                    p-4
                                "
                            >
                                Available
                            </th>


                            <th
                                class="
                                    text-left
                                    p-4
                                "
                            >
                                Status
                            </th>


                            <th
                                class="
                                    text-left
                                    p-4
                                "
                            >
                                Action
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${shelters.map(
                            function (shelter) {

                                const available =
                                    shelter[1] -
                                    shelter[2];


                                return `

                                    <tr
                                        class="
                                            border-t
                                            border-gray-100
                                        "
                                    >

                                        <td
                                            class="
                                                p-4
                                                font-semibold
                                            "
                                        >
                                            ${shelter[0]}
                                        </td>


                                        <td class="p-4">
                                            ${shelter[1]}
                                        </td>


                                        <td class="p-4">
                                            ${shelter[2]}
                                        </td>


                                        <td class="p-4">
                                            ${available}
                                        </td>


                                        <td class="p-4">

                                            <span
                                                class="
                                                    px-2
                                                    py-1
                                                    rounded-full
                                                    bg-green-100
                                                    text-green-700
                                                    text-xs
                                                    font-bold
                                                "
                                            >
                                                Active
                                            </span>

                                        </td>


                                        <td class="p-4">

                                            <button
                                                onclick="
                                                    showToast(
                                                        'Shelter details opened'
                                                    )
                                                "
                                                class="
                                                    text-ink
                                                    font-bold
                                                "
                                            >
                                                View
                                            </button>

                                        </td>

                                    </tr>

                                `;

                            }
                        ).join("")}

                    </tbody>

                </table>

            </div>

        </div>

    `;

}


/* =========================================================
   GOVERNMENT ALERTS
========================================================= */

function alertsPage() {

    return `

        ${pageHeader(
            "Emergency Alerts",
            "Create and manage disaster alerts for affected areas."
        )}


        <div
            class="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-6
            "
        >


            <!-- CREATE ALERT -->

            <div class="card p-6">

                <h2
                    class="
                        text-xl
                        font-bold
                        mb-5
                    "
                >
                    Create Emergency Alert
                </h2>


                <form
                    onsubmit="createAlert(event)"
                    class="space-y-4"
                >

                    <input
                        id="alertTitle"
                        class="resq-input"
                        placeholder="Alert title"
                        required
                    >


                    <select
                        id="alertType"
                        class="resq-input"
                    >

                        <option>
                            Flood
                        </option>

                        <option>
                            Cyclone
                        </option>

                        <option>
                            Earthquake
                        </option>

                        <option>
                            Landslide
                        </option>

                        <option>
                            Fire
                        </option>

                        <option>
                            Other
                        </option>

                    </select>


                    <input
                        id="alertArea"
                        class="resq-input"
                        placeholder="Affected area"
                        required
                    >


                    <textarea
                        id="alertMessage"
                        class="resq-input"
                        rows="5"
                        placeholder="Emergency message"
                        required
                    ></textarea>


                    <button
                        type="submit"
                        class="
                            w-full
                            bg-coral
                            text-white
                            py-3
                            rounded-xl
                            font-bold
                        "
                    >

                        Publish Emergency Alert

                    </button>

                </form>

            </div>


            <!-- ACTIVE ALERT -->

            <div class="card p-6">

                <h2
                    class="
                        text-xl
                        font-bold
                        mb-5
                    "
                >
                    Active Alerts
                </h2>


                <div
                    class="
                        p-5
                        bg-red-50
                        rounded-xl
                        border
                        border-red-100
                    "
                >

                    <div
                        class="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <i
                            data-lucide="triangle-alert"
                            class="text-coral"
                        ></i>


                        <p class="font-bold">
                            Flood Warning
                        </p>

                    </div>


                    <p
                        class="
                            text-sm
                            text-gray-600
                            mt-3
                        "
                    >
                        Residents in low-lying areas
                        should move to designated
                        shelters.
                    </p>


                    <div
                        class="
                            flex
                            gap-3
                            mt-4
                        "
                    >

                        <button
                            onclick="
                                showToast(
                                    'Alert updated'
                                )
                            "
                            class="
                                text-sm
                                font-bold
                                text-ink
                            "
                        >
                            Edit Alert
                        </button>


                        <button
                            onclick="
                                showToast(
                                    'Alert cancelled'
                                )
                            "
                            class="
                                text-sm
                                font-bold
                                text-red-600
                            "
                        >
                            Cancel

                        </button>

                    </div>

                </div>

            </div>

        </div>

    `;

}


function createAlert(event) {

    event.preventDefault();


    const title =
        document.getElementById(
            "alertTitle"
        ).value.trim();


    if (!title) {

        showToast(
            "Please enter an alert title"
        );

        return;

    }


    showToast(
        "Emergency alert published"
    );

}


/* =========================================================
   GOVERNMENT REPORTS
========================================================= */

function reportsPage() {

    return `

        ${pageHeader(
            "Citizen Reports",
            "Review damage, emergency and public safety reports."
        )}


        <div
            class="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-5
            "
        >

            ${largeReportCard(
                "Damage Report",
                "Road blocked near Sector 18",
                "High",
                "map-pin"
            )}


            ${largeReportCard(
                "Missing Person",
                "Missing person reported by citizen",
                "Critical",
                "user-search"
            )}


            ${largeReportCard(
                "Damage Report",
                "Building damage reported",
                "Normal",
                "building"
            )}


            ${largeReportCard(
                "SOS Request",
                "Emergency assistance requested",
                "Critical",
                "siren"
            )}

        </div>

    `;

}


/* =========================================================
   GOVERNMENT REQUESTS
========================================================= */

function requestsPage() {

    return `

        ${pageHeader(
            "Resource Requests",
            "Review and manage requests submitted by shelters."
        )}


        <div
            class="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-5
            "
        >

            ${governmentRequestItem(
                "Community Relief Center",
                "Medicine",
                "Critical"
            )}


            ${governmentRequestItem(
                "Government School Camp",
                "Drinking Water",
                "High"
            )}


            ${governmentRequestItem(
                "District Emergency Shelter",
                "Volunteers",
                "Normal"
            )}


            ${governmentRequestItem(
                "City Relief Center",
                "Food",
                "High"
            )}

        </div>

    `;

}


/* =========================================================
   CITIZEN GUIDES
========================================================= */

function guidesPage() {

    const container = document.createElement("div");

    container.innerHTML = `
        ${pageHeader(
            "Disaster Guides",
            "Practical safety guidance before, during, and after a disaster."
        )}

        <div
            id="guidesContainer"
            class="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
            <div class="card p-6 text-center">
                Loading disaster guides...
            </div>
        </div>
    `;


    setTimeout(async function () {

        const guidesContainer =
            document.getElementById("guidesContainer");

        if (!guidesContainer) {
            return;
        }


        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/preparedness/guides/"
            );


            if (!response.ok) {
                throw new Error(
                    `Failed to load guides: ${response.status}`
                );
            }


            const guides = await response.json();


            if (guides.length === 0) {

                guidesContainer.innerHTML = `
                    <div class="card p-6 text-center">
                        No disaster guides available.
                    </div>
                `;

                return;
            }


            guidesContainer.innerHTML =
                guides.map(function (guide) {

                    return `

                        <div class="card p-6">

                            <div class="mb-5">

                                <p
                                    class="
                                        text-sm
                                        font-semibold
                                        text-gray-500
                                        mb-1
                                    "
                                >
                                    ${escapeHTML(guide.disaster_type)}
                                </p>

                                <h3
                                    class="
                                        text-xl
                                        font-bold
                                    "
                                >
                                    ${escapeHTML(guide.title)}
                                </h3>

                            </div>


                            <div class="space-y-4">

                                <div>

                                    <h4
                                        class="
                                            font-bold
                                            mb-1
                                        "
                                    >
                                        Before
                                    </h4>

                                    <p class="text-gray-600">
                                        ${escapeHTML(guide.before_text)}
                                    </p>

                                </div>


                                <div>

                                    <h4
                                        class="
                                            font-bold
                                            mb-1
                                        "
                                    >
                                        During
                                    </h4>

                                    <p class="text-gray-600">
                                        ${escapeHTML(guide.during_text)}
                                    </p>

                                </div>


                                <div>

                                    <h4
                                        class="
                                            font-bold
                                            mb-1
                                        "
                                    >
                                        After
                                    </h4>

                                    <p class="text-gray-600">
                                        ${escapeHTML(guide.after_text)}
                                    </p>

                                </div>

                            </div>

                        </div>

                    `;

                }).join("");


        } catch (error) {

            console.error(
                "Guide loading error:",
                error
            );


            guidesContainer.innerHTML = `
                <div class="card p-6 text-center">

                    <h3
                        class="
                            text-lg
                            font-bold
                            text-red-600
                        "
                    >
                        Unable to load disaster guides
                    </h3>

                    <p class="text-gray-500 mt-2">
                        Please make sure the backend server is running.
                    </p>

                </div>
            `;

        }

    }, 0);


    return container.innerHTML;
}


/* =========================================================
   CHECKLIST
========================================================= */

function checklistPage() {

    return `

        ${pageHeader(
            "Emergency Checklist",
            "Keep essential items ready before a disaster."
        )}


        <div class="card p-6 max-w-3xl">

            <h2
                class="
                    text-xl
                    font-bold
                    mb-5
                "
            >
                Emergency Kit
            </h2>


            ${checkItem(
                "Drinking water"
            )}


            ${checkItem(
                "First aid kit"
            )}


            ${checkItem(
                "Torch / flashlight"
            )}


            ${checkItem(
                "Power bank"
            )}


            ${checkItem(
                "Important documents"
            )}


            ${checkItem(
                "Emergency medicines"
            )}


            ${checkItem(
                "Non-perishable food"
            )}


            ${checkItem(
                "Battery-powered radio"
            )}

        </div>

    `;

}


function checkItem(text) {

    return `

        <label
            class="
                flex
                items-center
                gap-3
                p-4
                rounded-xl
                bg-paper
                mb-3
                cursor-pointer
            "
        >

            <input
                type="checkbox"
                class="w-5 h-5"
            >


            <span
                class="
                    text-sm
                    font-semibold
                "
            >
                ${text}
            </span>

        </label>

    `;

}


/* =========================================================
   CONTACTS
========================================================= */

function contactsPage() {

    return `

        ${pageHeader(
            "Emergency Contacts",
            "Important emergency services and support contacts."
        )}


        <div
            class="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-5
            "
        >

            ${contactCard(
                "National Emergency",
                "112",
                "Emergency assistance",
                "phone"
            )}


            ${contactCard(
                "Police",
                "100",
                "Police emergency",
                "shield"
            )}


            ${contactCard(
                "Ambulance",
                "108",
                "Medical emergency",
                "ambulance"
            )}


            ${contactCard(
                "Fire Department",
                "101",
                "Fire emergency",
                "flame"
            )}

        </div>

    `;

}


/* =========================================================
   MAP
========================================================= */

function mapPage() {

    return `

        ${pageHeader(
            "Emergency Map",
            "Locate shelters, hospitals and emergency resources."
        )}


        <div class="card p-4">

            <div
                id="resqMap"
                class="command-map bg-gray-200"
            ></div>

        </div>


        <div
            class="
                grid
                grid-cols-2
                md:grid-cols-4
                gap-4
                mt-5
            "
        >

            ${mapLegend(
                "home",
                "Shelters"
            )}


            ${mapLegend(
                "hospital",
                "Hospitals"
            )}


            ${mapLegend(
                "droplets",
                "Water"
            )}


            ${mapLegend(
                "heart-pulse",
                "Medical Camps"
            )}

        </div>

        <script>

            setTimeout(function () {

                if (
                    typeof L !== "undefined" &&
                    document.getElementById("resqMap")
                ) {

                    const map =
                        L.map("resqMap")
                        .setView(
                            [28.6139, 77.2090],
                            11
                        );

                    L.tileLayer(
                        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                        {
                            attribution:
                                "&copy; OpenStreetMap contributors"
                        }
                    ).addTo(map);


                    const locations = [

                        {
                            lat: 28.6200,
                            lng: 77.2100,
                            title:
                                "Community Relief Center"
                        },

                        {
                            lat: 28.6000,
                            lng: 77.2300,
                            title:
                                "Emergency Hospital"
                        },

                        {
                            lat: 28.6400,
                            lng: 77.1900,
                            title:
                                "Medical Camp"
                        }

                    ];


                    locations.forEach(function (location) {

                        L.marker([
                            location.lat,
                            location.lng
                        ])
                        .addTo(map)
                        .bindPopup(
                            "<b>" +
                            location.title +
                            "</b>"
                        );

                    });

                }

            }, 200);

        </script>

    `;

}


/* =========================================================
   SHELTERS
========================================================= */

function sheltersPage() {

    return `

        ${pageHeader(
            "Emergency Shelters",
            "Find nearby relief shelters and available capacity."
        )}


        <div
            id="shelterList"
            class="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-5
            "
        >

            <div class="card p-6">

                <p class="text-gray-500">
                    Loading shelters...
                </p>

            </div>

        </div>

    `;

}

async function loadShelters() {

    const container =
        document.getElementById("shelterList");


    if (!container) {
        return;
    }


    const shelters =
        await getShelters();


    if (!shelters.length) {

        container.innerHTML = `

            <div class="card p-6">

                <p class="text-gray-500">
                    No active shelters found.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML =
        shelters
            .map(apiShelterCard)
            .join("");


    if (
        typeof lucide !== "undefined" &&
        lucide.createIcons
    ) {

        lucide.createIcons();

    }

}

function apiShelterCard(shelter) {

    return `

        <div
            class="
                card
                p-6
                resource-card
            "
        >

            <div
                class="
                    flex
                    justify-between
                    gap-3
                "
            >

                <div>

                    <h3
                        class="
                            text-lg
                            font-bold
                        "
                    >
                        ${escapeHTML(shelter.name)}
                    </h3>


                    <p
                        class="
                            text-sm
                            text-gray-500
                            mt-1
                        "
                    >
                        ${escapeHTML(shelter.district)}
                    </p>

                </div>


                <i
                    data-lucide="home"
                    class="text-ink"
                ></i>

            </div>


            <div
                class="
                    mt-5
                    p-4
                    rounded-xl
                    bg-paper
                "
            >

                <div
                    class="
                        flex
                        justify-between
                        text-sm
                    "
                >

                    <span>
                        Capacity
                    </span>

                    <span class="font-bold">
                        ${shelter.capacity}
                    </span>

                </div>


                <div
                    class="
                        flex
                        justify-between
                        text-sm
                        mt-3
                    "
                >

                    <span>
                        Status
                    </span>

                    <span
                        class="
                            font-bold
                            text-green-700
                        "
                    >
                        ${escapeHTML(shelter.status)}
                    </span>

                </div>


                <div
                    class="
                        mt-3
                        text-sm
                        text-gray-500
                    "
                >

                    Location:
                    ${shelter.latitude},
                    ${shelter.longitude}

                </div>

            </div>


            <button
                onclick="
                    showToast(
                        'Shelter details opened'
                    )
                "
                class="
                    w-full
                    mt-4
                    bg-ink
                    text-white
                    py-3
                    rounded-xl
                    font-bold
                "
            >

                View Shelter

            </button>

        </div>

    `;

}


/* =========================================================
   HOSPITALS
========================================================= */

function hospitalsPage() {

    const container = document.createElement("div");

    container.innerHTML = `
        ${pageHeader(
            "Emergency Hospitals",
            "Find hospitals and medical assistance."
        )}

        <div
            id="hospitalsContainer"
            class="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
            <div class="card p-6 text-center">
                Loading hospitals...
            </div>
        </div>
    `;


    setTimeout(async function () {

        const hospitalsContainer =
            document.getElementById(
                "hospitalsContainer"
            );


        if (!hospitalsContainer) {
            return;
        }


        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/emergency/hospitals/"
            );


            if (!response.ok) {

                throw new Error(
                    `Failed to load hospitals: ${response.status}`
                );

            }


            const hospitals =
                await response.json();


            if (hospitals.length === 0) {

                hospitalsContainer.innerHTML = `
                    <div class="card p-6 text-center">
                        No hospitals available.
                    </div>
                `;

                return;
            }


            hospitalsContainer.innerHTML =
                hospitals.map(function (hospital) {

                    return `

                        <div class="card p-6">

                            <div
                                class="
                                    flex
                                    items-start
                                    justify-between
                                    mb-4
                                "
                            >

                                <div>

                                    <h3
                                        class="
                                            text-xl
                                            font-bold
                                        "
                                    >
                                        ${escapeHTML(hospital.name)}
                                    </h3>

                                    <p
                                        class="
                                            text-gray-500
                                            mt-1
                                        "
                                    >
                                        Emergency Medical Facility
                                    </p>

                                </div>


                                <i
                                    data-lucide="hospital"
                                    class="w-7 h-7 text-ink"
                                ></i>

                            </div>


                            <div
                                class="
                                    bg-paper
                                    rounded-xl
                                    p-4
                                    space-y-3
                                "
                            >

                                <div
                                    class="
                                        flex
                                        justify-between
                                    "
                                >

                                    <span>
                                        Available Beds
                                    </span>

                                    <strong>
                                        ${hospital.beds_available}
                                    </strong>

                                </div>


                                <div
                                    class="
                                        flex
                                        justify-between
                                    "
                                >

                                    <span>
                                        Phone
                                    </span>

                                    <strong>
                                        ${hospital.phone}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Location
                                    </span>

                                    <p
                                        class="
                                            text-sm
                                            text-gray-500
                                            mt-1
                                        "
                                    >
                                        ${hospital.latitude},
                                        ${hospital.longitude}
                                    </p>

                                </div>

                            </div>


                            <a
                                href="tel:${hospital.phone}"
                                class="
                                    block
                                    w-full
                                    mt-5
                                    bg-ink
                                    text-white
                                    py-3
                                    rounded-xl
                                    font-bold
                                    text-center
                                "
                            >
                                Call Hospital
                            </a>

                        </div>

                    `;

                }).join("");


            if (
                typeof lucide !== "undefined" &&
                lucide.createIcons
            ) {

                lucide.createIcons();

            }


        } catch (error) {

            console.error(
                "Hospital loading error:",
                error
            );


            hospitalsContainer.innerHTML = `
                <div class="card p-6 text-center">

                    <h3
                        class="
                            text-lg
                            font-bold
                            text-red-600
                        "
                    >
                        Unable to load hospitals
                    </h3>

                    <p class="text-gray-500 mt-2">
                        Please make sure the backend server is running.
                    </p>

                </div>
            `;

        }

    }, 0);


    return container.innerHTML;
}


/* =========================================================
   SOS
========================================================= */

function sosPage() {

    return `

        ${pageHeader(
            "Emergency SOS",
            "Use SOS only when you need immediate assistance."
        )}


        <div
            class="
                max-w-2xl
                mx-auto
                text-center
            "
        >

            <div
                class="
                    card
                    p-8
                    md:p-12
                "
            >

                <div
                    class="
                        w-28
                        h-28
                        mx-auto
                        rounded-full
                        bg-red-100
                        text-coral
                        flex
                        items-center
                        justify-center
                        sos-button
                    "
                >

                    <i
                        data-lucide="siren"
                        class="w-14 h-14"
                    ></i>

                </div>


                <h2
                    class="
                        text-3xl
                        font-bold
                        mt-6
                    "
                >
                    Emergency SOS
                </h2>


                <p
                    class="
                        text-gray-500
                        mt-3
                    "
                >
                    Your emergency request will be
                    prepared with your current location.
                </p>


                <button
                    onclick="triggerSOS()"
                    class="
                        mt-8
                        w-full
                        bg-coral
                        text-white
                        py-4
                        rounded-xl
                        font-bold
                        text-lg
                        sos-button
                    "
                >

                    <i
                        data-lucide="siren"
                        class="w-5 h-5 inline"
                    ></i>

                    SEND SOS

                </button>


                <p
                    class="
                        text-xs
                        text-gray-400
                        mt-4
                    "
                >
                    Use only for genuine emergencies.
                </p>

            </div>

        </div>

    `;

}

function getUserIdFromToken() {
    const token = localStorage.getItem("resqnet_token");

    if (!token) {
        return null;
    }

    try {
        const payload = JSON.parse(
            atob(token.split(".")[1])
        );

        return payload.user_id || payload.sub || payload.id || null;

    } catch (error) {
        console.error("Unable to decode token:", error);
        return null;
    }
}


async function triggerSOS() {

    const token =
        localStorage.getItem("resqnet_token");

    if (!token) {
        showToast("Please login first");
        navigate("login");
        return;
    }

    const userId = getUserIdFromToken();

    if (!userId) {
        showToast("Unable to identify logged-in user");
        return;
    }

    try {

        let latitude = 28.628;
        let longitude = 77.370;

        if (navigator.geolocation) {

            try {

                const position =
                    await new Promise(
                        (resolve, reject) => {

                            navigator.geolocation.getCurrentPosition(
                                resolve,
                                reject,
                                {
                                    enableHighAccuracy: true,
                                    timeout: 5000
                                }
                            );

                        }
                    );

                latitude =
                    position.coords.latitude;

                longitude =
                    position.coords.longitude;

            } catch (locationError) {

                console.log(
                    "Using default SOS location:",
                    locationError
                );

            }
        }

        const response = await fetch(
            `${API_BASE}/api/sos/`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    user_id: Number(userId),
                    latitude: latitude,
                    longitude: longitude
                })
            }
        );

        const data = await response.json();

        if (response.ok) {
            showToast("SOS sent successfully");

            console.log("SOS RESPONSE:", data);

            const hospital = data.nearest_hospital;
            const shelter = data.nearest_shelter;

            alert(
                `🚨 SOS RECEIVED\n\n` +

                `📍 Location:\n` +
                `${data.location.latitude}, ${data.location.longitude}\n\n` +

                `🏥 Nearest Hospital:\n` +
                `${hospital.name}\n` +
                `📞 ${hospital.phone}\n` +
                `🛏️ Beds available: ${hospital.beds_available}\n` +
                `📏 Distance: ${hospital.distance_km} km\n\n` +

                `🏠 Nearest Shelter:\n` +
                `${shelter.name}\n` +
                `👥 Capacity: ${shelter.capacity}\n` +
                `📊 Status: ${shelter.status}\n` +
                `📏 Distance: ${shelter.distance_km} km`
            );

            return;
        }

    console.log("SOS Response:", data);

    if (!response.ok) {
        console.log(
            "SOS validation error:",
            JSON.stringify(data, null, 2)
        );

        showToast(
            data.detail
                ? JSON.stringify(data.detail)
                : "SOS request failed"
        );

        return;
    }

        if (!response.ok) {

            showToast(
                data.detail ||
                "Failed to send SOS"
            );

            return;
        }

        showToast(
            "SOS sent successfully"
        );

    } catch (error) {

        console.error(
            "SOS API Error:",
            error
        );

        showToast(
            "Unable to connect to the server"
        );
    }
}


/* =========================================================
   DAMAGE REPORT
========================================================= */

function damagePage() {

    setTimeout(() => {
        loadDamageReports();
    }, 0);

    return `
        ${pageHeader(
            "Damage Report",
            "Report damage caused by a disaster."
        )}

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <!-- REPORT DAMAGE -->

            <div class="card p-6 md:p-8">

                <h2 class="text-xl font-bold mb-5">
                    Report Damage
                </h2>

                <form
                    onsubmit="submitDamageReport(event)"
                    class="space-y-5"
                >

                    <!-- DAMAGE TYPE -->

                    <div>

                        <label class="
                            block
                            text-sm
                            font-semibold
                            mb-2
                        ">
                            Damage Type
                        </label>

                        <select
                            id="damageType"
                            class="resq-input"
                            required
                        >

                            <option value="">
                                Select damage type
                            </option>

                            <option value="Building">
                                Building
                            </option>

                            <option value="Road">
                                Road
                            </option>

                            <option value="Bridge">
                                Bridge
                            </option>

                            <option value="Electricity">
                                Electricity
                            </option>

                            <option value="Water Supply">
                                Water Supply
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>


                    <!-- LOCATION -->

                    <div>

                        <label class="
                            block
                            text-sm
                            font-semibold
                            mb-2
                        ">
                            Location
                        </label>

                        <input
                            id="damageLocation"
                            class="resq-input"
                            placeholder="Enter location"
                            required
                        >

                    </div>


                    <!-- SEVERITY -->

                    <div>

                        <label class="
                            block
                            text-sm
                            font-semibold
                            mb-2
                        ">
                            Severity
                        </label>

                        <select
                            id="damageSeverity"
                            class="resq-input"
                            required
                        >

                            <option value="">
                                Select severity
                            </option>

                            <option value="Low">
                                Low
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="High">
                                High
                            </option>

                        </select>

                    </div>


                    <!-- DESCRIPTION -->

                    <div>

                        <label class="
                            block
                            text-sm
                            font-semibold
                            mb-2
                        ">
                            Description
                        </label>

                        <textarea
                            id="damageDescription"
                            class="resq-input"
                            rows="5"
                            placeholder="Describe the damage..."
                            required
                        ></textarea>

                    </div>


                    <button
                        type="submit"
                        class="
                            w-full
                            bg-ink
                            text-white
                            py-3
                            rounded-xl
                            font-bold
                        "
                    >
                        Submit Damage Report
                    </button>

                </form>

            </div>


            <!-- RECENT REPORTS -->

            <div class="card p-6">

                <h2 class="text-xl font-bold mb-5">
                    Recent Damage Reports
                </h2>

                <div id="damageReportsList">

                    <p class="text-sm text-gray-500">
                        Loading damage reports...
                    </p>

                </div>

            </div>

        </div>
    `;
}
async function submitDamageReport(event) {

    event.preventDefault();


    const type =
        document.getElementById("damageType").value;

    const location =
        document.getElementById("damageLocation").value.trim();

    const severity =
        document.getElementById("damageSeverity").value;

    const description =
        document.getElementById("damageDescription").value.trim();


    const token =
        localStorage.getItem("resqnet_token");


    if (!token) {

        showToast("Please login first");

        navigate("login");

        return;
    }


    if (
        !type ||
        !location ||
        !severity ||
        !description
    ) {

        showToast(
            "Please fill all required fields"
        );

        return;
    }


    try {

        /*
         * Get user's current coordinates.
         *
         * If location permission is denied,
         * use the default project coordinates.
         */

        let latitude = 28.628;
        let longitude = 77.370;


        if (navigator.geolocation) {

            try {

                const position =
                    await new Promise(
                        (resolve, reject) => {

                            navigator.geolocation.getCurrentPosition(
                                resolve,
                                reject,
                                {
                                    enableHighAccuracy: true,
                                    timeout: 5000
                                }
                            );

                        }
                    );


                latitude =
                    position.coords.latitude;

                longitude =
                    position.coords.longitude;

            } catch (locationError) {

                console.log(
                    "Using default coordinates:",
                    locationError
                );

            }

        }


        const response = await fetch(
            `${API_BASE}/api/damage`,
            {
                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json",

                    "Authorization":
                        `Bearer ${token}`

                },

                body: JSON.stringify({

                    type: type,

                    description:
                        `${location}: ${description}`,

                    photo: null,

                    latitude: latitude,

                    longitude: longitude,

                    severity: severity

                })

            }
        );


        const data =
            await response.json();


        console.log(
            "Damage Report Response:",
            data
        );


        if (!response.ok) {

            showToast(
                data.detail ||
                "Failed to submit damage report"
            );

            return;
        }


        showToast(
            "Damage report submitted successfully"
        );


        document.getElementById(
            "damageType"
        ).value = "";

        document.getElementById(
            "damageLocation"
        ).value = "";

        document.getElementById(
            "damageSeverity"
        ).value = "";

        document.getElementById(
            "damageDescription"
        ).value = "";


        await loadDamageReports();


    } catch (error) {

        console.error(
            "Damage Report API Error:",
            error
        );


        showToast(
            "Unable to connect to the server"
        );
    }
}

async function loadDamageReports() {

    const container =
        document.getElementById(
            "damageReportsList"
        );


    if (!container) {
        return;
    }


    const token =
        localStorage.getItem(
            "resqnet_token"
        );


    if (!token) {

        container.innerHTML = `
            <p class="text-sm text-gray-500">
                Please login to view damage reports.
            </p>
        `;

        return;
    }


    try {

        const response = await fetch(
            `${API_BASE}/api/damage`,
            {
                method: "GET",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );


        const data =
            await response.json();


        console.log(
            "Damage Reports:",
            data
        );


        if (!response.ok) {

            throw new Error(
                data.detail ||
                "Failed to load damage reports"
            );

        }


        if (
            !data ||
            data.length === 0
        ) {

            container.innerHTML = `
                <p class="text-sm text-gray-500">
                    No damage reports found.
                </p>
            `;

            return;
        }


        container.innerHTML =
            data.map(report => {

                return `

                    <div class="
                        p-4
                        bg-paper
                        rounded-xl
                        mb-3
                    ">

                        <div class="
                            flex
                            items-start
                            justify-between
                            gap-3
                        ">

                            <div>

                                <h3 class="
                                    font-bold
                                    text-ink
                                ">
                                    ${escapeHTML(
                                        report.type
                                    )}
                                </h3>


                                <p class="
                                    text-sm
                                    text-gray-500
                                    mt-1
                                ">
                                    ${escapeHTML(
                                        report.description
                                    )}
                                </p>


                                <p class="
                                    text-sm
                                    text-gray-500
                                    mt-2
                                ">
                                    Location:
                                    ${report.latitude},
                                    ${report.longitude}
                                </p>

                            </div>


                            <span class="
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-bold
                            ">
                                ${escapeHTML(
                                    report.severity
                                )}
                            </span>

                        </div>

                    </div>

                `;

            }).join("");


    } catch (error) {

        console.error(
            "Load Damage Reports Error:",
            error
        );


        container.innerHTML = `
            <p class="text-sm text-red-500">
                Unable to load damage reports.
            </p>
        `;
    }
}


/* =========================================================
   MISSING PERSON
========================================================= */

function missingPage() {

    return `
        ${pageHeader(
            "Missing Persons",
            "Report or search for missing persons."
        )}

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <!-- REPORT FORM -->

            <div class="card p-6">

                <h2 class="text-xl font-bold mb-5">
                    Report Missing Person
                </h2>

                <form
                    onsubmit="submitMissingReport(event)"
                    class="space-y-4"
                >

                    <input
                        id="missingName"
                        class="resq-input"
                        placeholder="Person's name"
                        required
                    >

                    <input
                        id="missingAge"
                        class="resq-input"
                        placeholder="Age"
                        type="number"
                        required
                    >

                    <select
                        id="missingGender"
                        class="resq-input"
                        required
                    >
                        <option value="">
                            Select Gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                        <option value="Other">
                            Other
                        </option>
                    </select>

                    <input
                        id="missingLastSeen"
                        class="resq-input"
                        placeholder="Last known location"
                        required
                    >

                    <textarea
                        id="missingDetails"
                        class="resq-input"
                        rows="4"
                        placeholder="Additional details"
                    ></textarea>

                    <button
                        type="submit"
                        class="w-full bg-ink text-white py-3 rounded-xl font-bold"
                    >
                        Submit Missing Person Report
                    </button>

                </form>

            </div>


            <!-- RECENT REPORTS -->

            <div class="card p-6">

                <h2 class="text-xl font-bold mb-5">
                    Recent Reports
                </h2>

                <div id="missingReportsList">
                    <p class="text-sm text-gray-500">
                        Loading missing person reports...
                    </p>
                </div>

            </div>

        </div>
    `;
}

async function submitMissingReport(event) {

    event.preventDefault();

    const name =
        document.getElementById("missingName").value.trim();

    const age =
        Number(document.getElementById("missingAge").value);

    const gender =
        document.getElementById("missingGender").value;

    const lastSeen =
        document.getElementById("missingLastSeen").value.trim();

    const token =
        localStorage.getItem("resqnet_token");


    if (!token) {

        showToast("Please login first");

        navigate("login");

        return;
    }


    if (!name || !age || !gender || !lastSeen) {

        showToast("Please fill all required fields");

        return;
    }


    try {

        const response = await fetch(
            `${API_BASE}/api/missing`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({

                    name: name,

                    age: age,

                    gender: gender,

                    photo: null,

                    last_seen: lastSeen,

                    latitude: 28.628,

                    longitude: 77.370

                })
            }
        );


        const data =
            await response.json();


        console.log(
            "Missing Person Response:",
            data
        );


        if (!response.ok) {

            showToast(
                data.detail ||
                "Failed to submit report"
            );

            return;
        }


        showToast(
            "Missing person report submitted successfully"
        );


        document.getElementById(
            "missingName"
        ).value = "";

        document.getElementById(
            "missingAge"
        ).value = "";

        document.getElementById(
            "missingGender"
        ).value = "";

        document.getElementById(
            "missingLastSeen"
        ).value = "";

        document.getElementById(
            "missingDetails"
        ).value = "";


        await loadMissingPersons();


    } catch (error) {

        console.error(
            "Missing Person API Error:",
            error
        );

        showToast(
            "Unable to connect to the server"
        );
    }
}
async function loadMissingPersons() {

    const container =
        document.getElementById(
            "missingReportsList"
        );


    if (!container) {
        return;
    }


    const token =
        localStorage.getItem(
            "resqnet_token"
        );


    if (!token) {

        container.innerHTML = `
            <p class="text-sm text-gray-500">
                Please login to view missing person reports.
            </p>
        `;

        return;
    }


    try {

        console.log(
            "Loading missing persons..."
        );


        const response = await fetch(
            `${API_BASE}/api/missing`,
            {
                method: "GET",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );


        const data =
            await response.json();


        console.log(
            "Missing Persons API:",
            data
        );


        if (!response.ok) {

            throw new Error(
                data.detail ||
                "Failed to load missing persons"
            );
        }


        if (
            !data ||
            data.length === 0
        ) {

            container.innerHTML = `
                <p class="text-sm text-gray-500">
                    No missing person reports found.
                </p>
            `;

            return;
        }


        container.innerHTML =
            data.map(person => {

                return `

                    <div class="
                        p-4
                        bg-paper
                        rounded-xl
                        mb-3
                    ">

                        <div class="
                            flex
                            items-start
                            justify-between
                            gap-3
                        ">

                            <div>

                                <h3 class="
                                    font-bold
                                    text-ink
                                ">
                                    ${escapeHTML(
                                        person.name
                                    )}
                                </h3>


                                <p class="
                                    text-sm
                                    text-gray-500
                                    mt-1
                                ">
                                    ${person.age} years
                                    • ${escapeHTML(
                                        person.gender
                                    )}
                                </p>


                                <p class="
                                    text-sm
                                    text-gray-500
                                ">
                                    Last seen:
                                    ${escapeHTML(
                                        person.last_seen
                                    )}
                                </p>

                            </div>


                            <span class="
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-bold
                                bg-red-100
                                text-red-700
                            ">
                                ${escapeHTML(
                                    person.status ||
                                    "Missing"
                                )}
                            </span>

                        </div>

                    </div>

                `;

            }).join("");


    } catch (error) {

        console.error(
            "Load Missing Persons Error:",
            error
        );


        container.innerHTML = `
            <p class="text-sm text-red-500">
                Unable to load missing person reports.
            </p>
        `;
    }
}


/* =========================================================
   HELP
========================================================= */

function helpPage() {

    return `
        ${pageHeader(
            "Help & Support",
            "Get assistance using ResQNet."
        )}

        <div class="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
        ">

            <button
                onclick="navigate('guides')"
                class="card p-6 text-left resource-card"
            >
                <div class="
                    w-12
                    h-12
                    rounded-xl
                    bg-paper
                    text-ink
                    flex
                    items-center
                    justify-center
                    mb-4
                ">
                    <i data-lucide="book-open"></i>
                </div>

                <h3 class="text-lg font-bold">
                    How ResQNet Works
                </h3>

                <p class="text-sm text-gray-500 mt-2">
                    Learn how to use disaster guides and preparedness resources.
                </p>
            </button>


            <button
                onclick="navigate('sos')"
                class="card p-6 text-left resource-card"
            >
                <div class="
                    w-12
                    h-12
                    rounded-xl
                    bg-paper
                    text-ink
                    flex
                    items-center
                    justify-center
                    mb-4
                ">
                    <i data-lucide="siren"></i>
                </div>

                <h3 class="text-lg font-bold">
                    Emergency Assistance
                </h3>

                <p class="text-sm text-gray-500 mt-2">
                    Send an SOS or access emergency assistance.
                </p>
            </button>


            <button
                onclick="navigate('shelters')"
                class="card p-6 text-left resource-card"
            >
                <div class="
                    w-12
                    h-12
                    rounded-xl
                    bg-paper
                    text-ink
                    flex
                    items-center
                    justify-center
                    mb-4
                ">
                    <i data-lucide="home"></i>
                </div>

                <h3 class="text-lg font-bold">
                    Shelter Information
                </h3>

                <p class="text-sm text-gray-500 mt-2">
                    Find available shelters and their capacity.
                </p>
            </button>


            <button
                onclick="navigate('contacts')"
                class="card p-6 text-left resource-card"
            >
                <div class="
                    w-12
                    h-12
                    rounded-xl
                    bg-paper
                    text-ink
                    flex
                    items-center
                    justify-center
                    mb-4
                ">
                    <i data-lucide="phone"></i>
                </div>

                <h3 class="text-lg font-bold">
                    Emergency Contacts
                </h3>

                <p class="text-sm text-gray-500 mt-2">
                    Access important emergency service numbers.
                </p>
            </button>


            <button
                onclick="navigate('damage')"
                class="card p-6 text-left resource-card"
            >
                <div class="
                    w-12
                    h-12
                    rounded-xl
                    bg-paper
                    text-ink
                    flex
                    items-center
                    justify-center
                    mb-4
                ">
                    <i data-lucide="file-warning"></i>
                </div>

                <h3 class="text-lg font-bold">
                    Report Damage
                </h3>

                <p class="text-sm text-gray-500 mt-2">
                    Report damaged roads, buildings, bridges and utilities.
                </p>
            </button>


            <button
                onclick="navigate('missing')"
                class="card p-6 text-left resource-card"
            >
                <div class="
                    w-12
                    h-12
                    rounded-xl
                    bg-paper
                    text-ink
                    flex
                    items-center
                    justify-center
                    mb-4
                ">
                    <i data-lucide="user-search"></i>
                </div>

                <h3 class="text-lg font-bold">
                    Missing Persons
                </h3>

                <p class="text-sm text-gray-500 mt-2">
                    Report and view missing person reports.
                </p>
            </button>

        </div>
    `;
}


/* =========================================================
   HELPER COMPONENTS
========================================================= */

function pageHeader(
    title,
    subtitle
) {

    return `

        <div
            class="
                mb-7
            "
        >

            <h1
                class="
                    text-2xl
                    md:text-3xl
                    font-bold
                    text-ink
                "
            >
                ${title}
            </h1>


            <p
                class="
                    text-sm
                    md:text-base
                    text-gray-500
                    mt-1
                "
            >
                ${subtitle}
            </p>

        </div>

    `;

}


function statCard(
    title,
    value,
    subtitle,
    icon
) {

    return `

        <div
            class="
                card
                p-5
            "
        >

            <div
                class="
                    flex
                    items-start
                    justify-between
                "
            >

                <div>

                    <p
                        class="
                            text-sm
                            text-gray-500
                        "
                    >
                        ${title}
                    </p>


                    <p
                        class="
                            text-3xl
                            font-bold
                            text-ink
                            mt-2
                        "
                    >
                        ${value}
                    </p>


                    <p
                        class="
                            text-xs
                            text-gray-400
                            mt-1
                        "
                    >
                        ${subtitle}
                    </p>

                </div>


                <div
                    class="
                        w-11
                        h-11
                        rounded-xl
                        bg-paper
                        text-ink
                        flex
                        items-center
                        justify-center
                    "
                >

                    <i
                        data-lucide="${icon}"
                    ></i>

                </div>

            </div>

        </div>

    `;

}


function quickAction(
    title,
    icon,
    action
) {

    return `

        <button
            onclick="${action}"
            class="
                card
                p-5
                text-left
                hover:-translate-y-1
                transition
            "
        >

            <div
                class="
                    w-11
                    h-11
                    rounded-xl
                    bg-paper
                    text-ink
                    flex
                    items-center
                    justify-center
                    mb-4
                "
            >

                <i
                    data-lucide="${icon}"
                ></i>

            </div>


            <p
                class="
                    font-bold
                    text-sm
                "
            >
                ${title}
            </p>

        </button>

    `;

}


function resourceRow(
    icon,
    name,
    status
) {

    let statusClass =
        "bg-green-100 text-green-700";


    if (
        status === "Limited"
    ) {

        statusClass =
            "bg-amber-100 text-amber-700";

    }


    return `

        <div
            class="
                flex
                items-center
                justify-between
                p-4
                rounded-xl
                bg-paper
                mb-3
            "
        >

            <div
                class="
                    flex
                    items-center
                    gap-3
                "
            >

                <i
                    data-lucide="${icon}"
                    class="
                        w-5
                        h-5
                        text-ink
                    "
                ></i>


                <span class="font-semibold">
                    ${name}
                </span>

            </div>


            <span
                class="
                    ${statusClass}
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-bold
                "
            >
                ${status}
            </span>

        </div>

    `;

}


function contactRow(
    title,
    number,
    icon
) {

    return `

        <div
            class="
                flex
                items-center
                justify-between
                p-3
                rounded-xl
                bg-paper
                mb-2
            "
        >

            <div
                class="
                    flex
                    items-center
                    gap-3
                "
            >

                <i
                    data-lucide="${icon}"
                    class="w-5 h-5"
                ></i>


                <span class="font-semibold">
                    ${title}
                </span>

            </div>


            <a
                href="tel:${number}"
                class="
                    font-bold
                    text-ink
                "
            >
                ${number}
            </a>

        </div>

    `;

}


function contactCard(
    title,
    number,
    description,
    icon
) {

    return `

        <div class="card p-6">

            <div
                class="
                    flex
                    items-center
                    gap-4
                "
            >

                <div
                    class="
                        w-12
                        h-12
                        rounded-xl
                        bg-paper
                        text-ink
                        flex
                        items-center
                        justify-center
                    "
                >

                    <i
                        data-lucide="${icon}"
                    ></i>

                </div>


                <div class="flex-1">

                    <h3 class="font-bold">
                        ${title}
                    </h3>


                    <p
                        class="
                            text-sm
                            text-gray-500
                        "
                    >
                        ${description}
                    </p>

                </div>


                <a
                    href="tel:${number}"
                    class="
                        bg-ink
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        font-bold
                    "
                >
                    ${number}
                </a>

            </div>

        </div>

    `;

}


function guideCard(
    title,
    icon,
    description
) {

    return `

        <div
            class="
                card
                p-6
                resource-card
            "
        >

            <div
                class="
                    w-12
                    h-12
                    rounded-xl
                    bg-paper
                    text-ink
                    flex
                    items-center
                    justify-center
                    mb-4
                "
            >

                <i
                    data-lucide="${icon}"
                ></i>

            </div>


            <h3
                class="
                    text-lg
                    font-bold
                "
            >
                ${title}
            </h3>


            <p
                class="
                    text-sm
                    text-gray-500
                    mt-2
                "
            >
                ${description}
            </p>


            <button
                onclick="
                    showToast(
                        'Guide opened'
                    )
                "
                class="
                    mt-4
                    text-sm
                    font-bold
                    text-ink
                "
            >
                Read Guide →
            </button>

        </div>

    `;

}


function shelterCard(
    name,
    distance,
    capacity,
    occupied
) {

    const available =
        capacity - occupied;


    return `

        <div
            class="
                card
                p-6
                resource-card
            "
        >

            <div
                class="
                    flex
                    justify-between
                    gap-3
                "
            >

                <div>

                    <h3
                        class="
                            text-lg
                            font-bold
                        "
                    >
                        ${name}
                    </h3>


                    <p
                        class="
                            text-sm
                            text-gray-500
                            mt-1
                        "
                    >
                        ${distance} away
                    </p>

                </div>


                <i
                    data-lucide="home"
                    class="text-ink"
                ></i>

            </div>


            <div
                class="
                    mt-5
                    p-4
                    rounded-xl
                    bg-paper
                "
            >

                <div
                    class="
                        flex
                        justify-between
                        text-sm
                    "
                >

                    <span>
                        Capacity
                    </span>

                    <span class="font-bold">
                        ${capacity}
                    </span>

                </div>


                <div
                    class="
                        flex
                        justify-between
                        text-sm
                        mt-2
                    "
                >

                    <span>
                        Occupied
                    </span>

                    <span class="font-bold">
                        ${occupied}
                    </span>

                </div>


                <div
                    class="
                        flex
                        justify-between
                        text-sm
                        mt-2
                    "
                >

                    <span>
                        Available
                    </span>

                    <span
                        class="
                            font-bold
                            text-green-700
                        "
                    >
                        ${available}
                    </span>

                </div>

            </div>


            <button
                onclick="
                    showToast(
                        'Shelter details opened'
                    )
                "
                class="
                    w-full
                    mt-4
                    bg-ink
                    text-white
                    py-3
                    rounded-xl
                    font-bold
                "
            >
                View Shelter

            </button>

        </div>

    `;

}


function hospitalCard(
    name,
    distance,
    service,
    status
) {

    return `

        <div
            class="
                card
                p-6
                resource-card
            "
        >

            <div
                class="
                    flex
                    items-start
                    justify-between
                "
            >

                <div>

                    <h3
                        class="
                            text-lg
                            font-bold
                        "
                    >
                        ${name}
                    </h3>


                    <p
                        class="
                            text-sm
                            text-gray-500
                            mt-1
                        "
                    >
                        ${distance} away
                    </p>

                </div>


                <i
                    data-lucide="hospital"
                    class="text-ink"
                ></i>

            </div>


            <div
                class="
                    mt-4
                    flex
                    justify-between
                    items-center
                "
            >

                <span
                    class="
                        text-sm
                        font-semibold
                    "
                >
                    ${service}
                </span>


                <span
                    class="
                        bg-green-100
                        text-green-700
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-bold
                    "
                >
                    ${status}
                </span>

            </div>


            <button
                onclick="
                    showToast(
                        'Hospital details opened'
                    )
                "
                class="
                    w-full
                    mt-4
                    border
                    border-ink
                    text-ink
                    py-2.5
                    rounded-xl
                    font-bold
                "
            >
                View Hospital

            </button>

        </div>

    `;

}


function missingPersonCard(
    name,
    location,
    age
) {

    return `

        <div
            class="
                p-4
                rounded-xl
                bg-paper
                mb-3
            "
        >

            <div
                class="
                    flex
                    items-center
                    gap-3
                "
            >

                <div
                    class="
                        w-10
                        h-10
                        rounded-full
                        bg-white
                        flex
                        items-center
                        justify-center
                    "
                >

                    <i
                        data-lucide="user"
                    ></i>

                </div>


                <div>

                    <p class="font-bold">
                        ${name}
                    </p>


                    <p
                        class="
                            text-xs
                            text-gray-500
                        "
                    >
                        ${age} • ${location}
                    </p>

                </div>

            </div>

        </div>

    `;

}


function helpCard(
    title,
    description,
    icon
) {

    return `

        <button
            onclick="
                showToast(
                    'Help article opened'
                )
            "
            class="
                card
                p-6
                text-left
                resource-card
            "
        >

            <div
                class="
                    w-12
                    h-12
                    rounded-xl
                    bg-paper
                    text-ink
                    flex
                    items-center
                    justify-center
                    mb-4
                "
            >

                <i
                    data-lucide="${icon}"
                ></i>

            </div>


            <h3
                class="
                    text-lg
                    font-bold
                "
            >
                ${title}
            </h3>


            <p
                class="
                    text-sm
                    text-gray-500
                    mt-2
                "
            >
                ${description}
            </p>

        </button>

    `;

}


function mapLegend(
    icon,
    text
) {

    return `

        <div
            class="
                card
                p-4
                flex
                items-center
                gap-3
            "
        >

            <i
                data-lucide="${icon}"
                class="
                    w-5
                    h-5
                    text-ink
                "
            ></i>


            <span
                class="
                    text-sm
                    font-semibold
                "
            >
                ${text}
            </span>

        </div>

    `;

}


function reportItem(
    type,
    description,
    priority
) {

    return `

        <div
            class="
                p-4
                rounded-xl
                bg-paper
                mb-3
            "
        >

            <div
                class="
                    flex
                    items-center
                    gap-3
                "
            >

                <div
                    class="
                        w-10
                        h-10
                        rounded-xl
                        bg-white
                        flex
                        items-center
                        justify-center
                    "
                >

                    <i
                        data-lucide="file-warning"
                        class="w-5 h-5"
                    ></i>

                </div>


                <div class="flex-1">

                    <p class="font-bold text-sm">
                        ${type}
                    </p>


                    <p
                        class="
                            text-xs
                            text-gray-500
                        "
                    >
                        ${description}
                    </p>

                </div>


                <span
                    class="
                        text-xs
                        font-bold
                    "
                >
                    ${priority}
                </span>

            </div>

        </div>

    `;

}


function largeReportCard(
    type,
    description,
    priority,
    icon
) {

    return `

        <div class="card p-6">

            <div
                class="
                    w-12
                    h-12
                    rounded-xl
                    bg-paper
                    flex
                    items-center
                    justify-center
                    text-ink
                    mb-4
                "
            >

                <i
                    data-lucide="${icon}"
                ></i>

            </div>


            <span
                class="
                    text-xs
                    font-bold
                    uppercase
                "
            >
                ${priority}
            </span>


            <h3
                class="
                    text-lg
                    font-bold
                    mt-2
                "
            >
                ${type}
            </h3>


            <p
                class="
                    text-sm
                    text-gray-500
                    mt-2
                "
            >
                ${description}
            </p>


            <div
                class="
                    flex
                    gap-3
                    mt-5
                "
            >

                <button
                    onclick="
                        showToast(
                            'Report opened'
                        )
                    "
                    class="
                        flex-1
                        bg-ink
                        text-white
                        py-2.5
                        rounded-xl
                        font-bold
                    "
                >
                    View
                </button>


                <button
                    onclick="
                        showToast(
                            'Report assigned'
                        )
                    "
                    class="
                        flex-1
                        border
                        py-2.5
                        rounded-xl
                        font-bold
                    "
                >
                    Assign
                </button>

            </div>

        </div>

    `;

}


/* =========================================================
   USER / UI HELPERS
========================================================= */

function getRoleName() {

    if (
        currentUserRole === "citizen"
    ) {

        return "Citizen";

    }


    if (
        currentUserRole === "shelter"
    ) {

        return "Shelter Representative";

    }


    if (
        currentUserRole === "government"
    ) {

        return "Government Authority";

    }


    return "User";

}


function getInitials(name) {

    if (!name) return "RQ";


    const words =
        name
            .trim()
            .split(/\s+/)
            .slice(0, 2);


    return words
        .map(
            word =>
                word
                    .charAt(0)
                    .toUpperCase()
        )
        .join("");

}


function getGreeting() {

    const hour =
        new Date().getHours();


    if (hour < 12) {

        return "Good morning";

    }


    if (hour < 18) {

        return "Good afternoon";

    }


    return "Good evening";

}


function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMobileMenu() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );

    const overlay =
        document.getElementById(
            "mobileOverlay"
        );


    if (!sidebar || !overlay) {

        return;

    }


    sidebar.classList.toggle(
        "-translate-x-full"
    );

    overlay.classList.toggle(
        "hidden"
    );

}


function closeMobileMenu() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );

    const overlay =
        document.getElementById(
            "mobileOverlay"
        );


    if (!sidebar || !overlay) {

        return;

    }


    sidebar.classList.add(
        "-translate-x-full"
    );

    overlay.classList.add(
        "hidden"
    );

}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    currentUserRole = "citizen";

    currentUserName = "ResQNet User";

    currentPage = "login";


    showToast(
        "Logged out successfully"
    );


    setTimeout(
        function () {

            render();

        },
        400
    );

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {

        return;

    }


    toast.textContent = message;


    toast.classList.remove(
        "hidden"
    );


    clearTimeout(
        window.resqToastTimer
    );


    window.resqToastTimer =
        setTimeout(
            function () {

                toast.classList.add(
                    "hidden"
                );

            },
            2500
        );

}