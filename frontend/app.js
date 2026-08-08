const app = document.getElementById("app");
const toast = document.getElementById("toast");

const state = {
  location: "Sector 7G, New Delhi",
  online: true,
  role: "citizen",

  shelter: {
    name: "Relief Camp A",
    capacity: 500,
    occupied: 312,
    food: "Available",
    water: "Available",
    medicine: "Available",
    doctors: 5,
    volunteers: 18
  }
};


/* =========================================================
   GLOBAL HELPERS
========================================================= */

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 2200);
}


function icon(name, cls = "w-5 h-5") {
  return `<i data-lucide="${name}" class="${cls}"></i>`;
}


function button(label, action = "", cls = "") {
  return `<button onclick="${action}" class="btn ${cls}">${label}</button>`;
}


/* =========================================================
   MAIN MOBILE SHELL
========================================================= */

function shell(content, active = "home") {

  const nav = [
    ["home", "Home", "house"],
    ["prepare", "Prepare", "shield-check"],
    ["action", "Action", "asterisk"],
    ["recover", "Recover", "briefcase-medical"],
    ["profile", "Profile", "user-round"]
  ];

  return `
    <div class="mobile-frame app-shell">

      <header
        class="sticky top-0 z-40 border-b border-[#e2ebe6]
        bg-[#f8faf7]/95 px-5 py-4 backdrop-blur">

        <div class="flex items-center justify-between">

          <button
            onclick="go('home')"
            class="flex items-center gap-2 font-extrabold tracking-tight">

            <span
              class="grid h-7 w-7 place-items-center
              rounded-full bg-ink text-xs text-white">

              ${icon("shield-check", "w-4 h-4")}

            </span>

            ResQNet

          </button>


          <div class="flex items-center gap-2">

            <button
              onclick="changeLocation()"
              class="rounded-full border border-[#dce7e1]
              bg-white px-3 py-1.5 text-xs font-semibold">

              ${state.location}

              ${icon("chevron-down", "w-3 h-3 inline")}

            </button>


            <button
              onclick="go('profile')"
              class="grid h-8 w-8 place-items-center
              rounded-full bg-ink text-white">

              ${icon("user-round", "w-4 h-4")}

            </button>

          </div>

        </div>

      </header>


      <main class="px-5 pb-28 pt-5 fade-in">

        ${content}

      </main>


      <nav
        class="fixed bottom-0 left-1/2 z-50 flex w-full
        max-w-[440px] -translate-x-1/2 justify-around
        border-t border-[#dce7e1] bg-white/95 px-2 py-2
        backdrop-blur">

        ${nav.map(([id, label, ico]) => `

          <button
            onclick="go('${id}')"
            class="nav-item
            ${active === id ? "active" : ""}
            flex min-w-[58px] flex-col items-center gap-1
            rounded-2xl px-3 py-2 text-[10px]
            font-semibold text-slate-500">

            ${icon(ico, "w-4 h-4")}

            ${label}

          </button>

        `).join("")}

      </nav>

    </div>
  `;
}


/* =========================================================
   TITLES / STATUS
========================================================= */

function sectionTitle(kicker, title, sub = "") {

  return `
    <div class="mb-5">

      <p
        class="mb-2 text-[10px] font-extrabold uppercase
        tracking-[.2em] text-mint">

        ${kicker}

      </p>

      <h1
        class="display text-3xl font-extrabold
        leading-[1.05]">

        ${title}

      </h1>

      ${
        sub
          ? `
            <p
              class="mt-2 max-w-md text-sm
              leading-6 text-slate-500">

              ${sub}

            </p>
          `
          : ""
      }

    </div>
  `;
}


function status(text, type = "good") {

  const map = {

    good:
      "bg-[#e6faf4] text-ink",

    warn:
      "bg-[#fff3d8] text-[#8a5a00]",

    bad:
      "bg-[#ffe8ec] text-[#a81f36]",

    neutral:
      "bg-slate-100 text-slate-600"

  };

  return `
    <span
      class="rounded-full px-2.5 py-1
      text-[10px] font-bold uppercase
      tracking-wide ${map[type]}">

      ${text}

    </span>
  `;
}


/* =========================================================
   HOME DASHBOARD
========================================================= */

function home() {

  return shell(`

    ${sectionTitle(
      "Current Situation",
      "Stay ready.<br>Stay connected.",
      "Live emergency information based on your location."
    )}


    <!-- WEATHER -->

    <div class="card mb-4 overflow-hidden">

      <div class="flex items-center justify-between p-4">

        <div>

          <p
            class="text-[10px] font-bold uppercase
            tracking-widest text-slate-400">

            Current weather

          </p>

          <p class="mt-1 text-2xl font-extrabold">
            28°C
          </p>

          <p class="text-xs text-slate-500">
            Severe rain warning
          </p>

        </div>


        <div
          class="grid h-12 w-12 place-items-center
          rounded-2xl bg-[#e7f8f2] text-ink">

          ${icon("cloud-rain")}

        </div>

      </div>

    </div>


    <!-- HIGH PRIORITY ALERT -->

    <div
      class="mb-5 rounded-[24px] bg-coral
      p-5 text-white shadow-soft">

      <div class="flex items-start gap-3">

        <div class="mt-0.5">
          ${icon("triangle-alert", "w-5 h-5")}
        </div>


        <div>

          <p
            class="text-[10px] font-extrabold uppercase
            tracking-[.18em] opacity-80">

            High priority

          </p>

          <h2 class="mt-1 text-xl font-extrabold">
            Flash flood warning
          </h2>

          <p
            class="mt-2 text-sm leading-5 text-white/90">

            Flash flooding has been reported in your
            area. Move to higher ground immediately.

          </p>


          <button
            onclick="go('action')"
            class="mt-4 rounded-full bg-white
            px-4 py-2 text-xs font-extrabold text-coral">

            View alert →

          </button>

        </div>

      </div>

    </div>


    <!-- EMERGENCY SERVICES -->

    <div class="mb-5">

      <div class="mb-3 flex items-end justify-between">

        <h2 class="text-lg font-extrabold">
          Emergency services
        </h2>

        <span
          class="text-[10px] font-bold uppercase
          tracking-widest text-slate-400">

          24/7

        </span>

      </div>


      <div class="grid grid-cols-3 gap-3">

        ${[
          ["Police", "shield", "bg-[#e7f8f2]"],
          ["Ambulance", "ambulance", "bg-[#ffe8ec]"],
          ["Fire", "flame", "bg-[#fff3d8]"]
        ]
          .map(
            ([name, ico, bg]) => `

              <button
                onclick="showToast('${name} emergency call')"
                class="card p-3 text-center">

                <span
                  class="mx-auto mb-2 grid h-10 w-10
                  place-items-center rounded-2xl
                  ${bg} text-ink">

                  ${icon(ico, "w-5 h-5")}

                </span>

                <span class="text-xs font-bold">
                  ${name}
                </span>

              </button>

            `
          )
          .join("")}

      </div>

    </div>


    <!-- NEAREST SHELTER -->

    <div class="card mb-5 overflow-hidden">

      <div class="p-4">

        <div class="flex items-start justify-between">

          <div>

            <p
              class="text-[10px] font-extrabold uppercase
              tracking-widest text-mint">

              Nearest safe shelter

            </p>

            <h2 class="mt-1 text-lg font-extrabold">
              Relief Camp A
            </h2>

            <p class="text-xs text-slate-500">
              1.8 km · Sector 7G
            </p>

          </div>

          ${status("OPEN")}

        </div>


        <div class="mt-4 grid grid-cols-3 gap-2 text-center">

          <div class="rounded-2xl bg-paper p-3">

            <p class="text-lg font-extrabold metric">
              188
            </p>

            <p class="text-[9px] uppercase text-slate-400">
              spaces
            </p>

          </div>


          <div class="rounded-2xl bg-paper p-3">

            <p class="text-lg font-extrabold">
              Food
            </p>

            <p class="text-[9px] uppercase text-slate-400">
              available
            </p>

          </div>


          <div class="rounded-2xl bg-paper p-3">

            <p class="text-lg font-extrabold">
              5
            </p>

            <p class="text-[9px] uppercase text-slate-400">
              doctors
            </p>

          </div>

        </div>


        <div class="mt-3 flex gap-2">

          <button
            onclick="go('map')"
            class="btn flex-1 rounded-full bg-ink
            py-2.5 text-xs font-bold text-white">

            Navigate

          </button>


          <button
            onclick="go('shelter')"
            class="btn flex-1 rounded-full
            border border-ink py-2.5
            text-xs font-bold text-ink">

            Details

          </button>

        </div>

      </div>

    </div>


    <!-- LOCAL UPDATES -->

    <div class="mb-4 flex items-end justify-between">

      <h2 class="text-lg font-extrabold">
        Local updates
      </h2>

      <button
        onclick="go('action')"
        class="text-xs font-bold text-ink">

        See all →

      </button>

    </div>


    <div class="space-y-3">

      ${[
        [
          "Waterlogging reported on Main Ring Road",
          "Traffic diverted. Expect delays of 45+ mins.",
          "8 min ago"
        ],

        [
          "Relief supplies arriving at Sector 5",
          "Food and water distribution starts at 3 PM.",
          "19 min ago"
        ],

        [
          "Shelter Alpha currently at 80% capacity",
          "Consider Relief Camp A instead.",
          "31 min ago"
        ]
      ]
        .map(
          ([h, d, t]) => `

            <article class="card p-4">

              <div class="flex gap-3">

                <span
                  class="mt-1 h-2.5 w-2.5
                  rounded-full bg-coral">
                </span>

                <div class="flex-1">

                  <div
                    class="flex justify-between gap-3">

                    <h3 class="text-sm font-bold">
                      ${h}
                    </h3>

                    <span
                      class="whitespace-nowrap
                      text-[9px] text-slate-400">

                      ${t}

                    </span>

                  </div>

                  <p
                    class="mt-1 text-xs
                    leading-5 text-slate-500">

                    ${d}

                  </p>

                </div>

              </div>

            </article>

          `
        )
        .join("")}

    </div>


    <!-- SOS -->

    <button
      onclick="go('sos')"
      class="sos-pulse fixed bottom-24 right-5
      z-40 grid h-16 w-16 place-items-center
      rounded-full bg-coral text-sm font-black
      text-white shadow-xl">

      SOS

    </button>

  `, "home");
}


/* =========================================================
   BEFORE DISASTER
========================================================= */

function prepare() {

  return shell(`

    ${sectionTitle(
      "Before disaster",
      "BE READY.",
      "Know your risks. Know your route. Know what to do."
    )}


    <div class="space-y-3">

      ${[
        [
          "Preparedness",
          "shield-check",
          "Learn how to prepare before disaster strikes.",
          "preparedness"
        ],

        [
          "Emergency Guides",
          "book-open",
          "Step-by-step instructions for emergencies.",
          "guides"
        ],

        [
          "Risk Awareness",
          "activity",
          "Understand the risks around your location.",
          "risk"
        ],

        [
          "Emergency Kit",
          "backpack",
          "Make sure you have everything you need.",
          "kit"
        ],

        [
          "Helpline Numbers",
          "phone-call",
          "Emergency contacts that work even offline.",
          "helplines"
        ],

        [
          "Offline Maps",
          "map",
          "Download essential maps before connectivity is lost.",
          "offline"
        ]
      ]
        .map(
          ([t, ico, dest, route]) => `

            <button
              onclick="go('${route}')"
              class="card flex w-full items-center
              gap-4 p-4 text-left">

              <span
                class="grid h-11 w-11 shrink-0
                place-items-center rounded-2xl
                bg-[#e7f8f2] text-ink">

                ${icon(ico)}

              </span>


              <span class="flex-1">

                <b class="block text-sm">
                  ${t}
                </b>

                <span
                  class="text-xs leading-5
                  text-slate-500">

                  ${dest}

                </span>

              </span>


              ${icon(
                "arrow-up-right",
                "w-4 h-4 text-slate-400"
              )}

            </button>

          `
        )
        .join("")}

    </div>


    <div class="mt-6 card p-5">

      <div class="flex items-end justify-between">

        <div>

          <p
            class="text-[10px] font-bold uppercase
            tracking-widest text-mint">

            Your area

          </p>

          <h2 class="mt-1 text-xl font-extrabold">
            ${state.location}
          </h2>

        </div>

        ${status("MODERATE", "warn")}

      </div>


      <div class="mt-5 space-y-4">

        ${[
          ["Flood", "High", "bad"],
          ["Earthquake", "Moderate", "warn"],
          ["Heatwave", "High", "bad"]
        ]
          .map(
            ([n, v, c]) => `

              <div>

                <div
                  class="mb-1 flex justify-between
                  text-xs font-bold">

                  <span>${n}</span>

                  ${status(v, c)}

                </div>


                <div class="progress-track">

                  <div
                    class="progress-fill
                    ${c === "bad" ? "bg-coral" : "bg-amber"}"
                    style="width:${v === "High" ? 82 : 54}%">

                  </div>

                </div>

              </div>

            `
          )
          .join("")}

      </div>

    </div>


    <div
      class="mt-6 rounded-[24px] bg-ink
      p-6 text-white">

      <p class="text-2xl font-extrabold">
        Preparation today can save a life tomorrow.
      </p>

      <p class="mt-2 text-sm text-white/60">
        Keep your guides, contacts and maps ready
        before connectivity is lost.
      </p>

    </div>

  `, "prepare");
}


/* =========================================================
   PREPAREDNESS
========================================================= */

function preparedness() {

  return shell(`

    ${sectionTitle(
      "Preparedness",
      "PREPARE BEFORE IT HAPPENS.",
      "Simple actions can make an emergency safer."
    )}


    <div class="grid grid-cols-2 gap-3">

      ${[
        ["Flood", "cloud-rain", "Move to higher ground early."],
        ["Earthquake", "activity", "Drop, cover and hold."],
        ["Cyclone", "wind", "Stay indoors and away from windows."],
        ["Landslide", "mountain", "Avoid unstable slopes."],
        ["Heatwave", "sun", "Stay hydrated and cool."],
        ["Fire", "flame", "Evacuate and avoid smoke."]
      ]
        .map(
          ([t, i, d]) => `

            <button
              onclick="showToast('Opening ${t} guide')"
              class="card p-4 text-left">

              <span
                class="grid h-10 w-10
                place-items-center rounded-xl
                bg-[#e7f8f2] text-ink">

                ${icon(i)}

              </span>

              <h3 class="mt-3 font-extrabold">
                ${t}
              </h3>

              <p
                class="mt-1 text-xs
                leading-5 text-slate-500">

                ${d}

              </p>

              <span class="mt-3 block text-xs font-bold">
                Learn →
              </span>

            </button>

          `
        )
        .join("")}

    </div>


    <div class="mt-6 card p-5">

      <div class="flex justify-between">

        <h2 class="font-extrabold">
          Your preparation
        </h2>

        <b class="text-mint">
          3 / 6
        </b>

      </div>


      <div class="mt-4 space-y-3">

        ${[
          "Emergency contacts saved",
          "First aid kit ready",
          "Water stored",
          "Emergency documents",
          "Power bank charged",
          "Offline map downloaded"
        ]
          .map(
            (x, i) => `

              <button
                onclick="
                  this.querySelector('svg')
                  .classList.toggle('text-mint');
                  showToast('Checklist updated')
                "
                class="flex w-full items-center
                gap-3 text-left text-sm">

                <span
                  class="grid h-7 w-7 place-items-center
                  rounded-full border
                  ${i < 3
                    ? "border-mint bg-[#e7f8f2]"
                    : "border-slate-300"}">

                  ${icon(
                    i < 3 ? "check" : "circle",
                    "w-4 h-4"
                  )}

                </span>

                ${x}

              </button>

            `
          )
          .join("")}

      </div>

    </div>

  `, "prepare");
}


/* =========================================================
   EMERGENCY GUIDES
========================================================= */

function guides() {

  return shell(`

    ${sectionTitle(
      "Emergency guides",
      "KNOW WHAT TO DO.",
      "Quick instructions for dangerous situations."
    )}


    <div
      class="mb-5 flex items-center gap-2
      rounded-full border border-[#dce7e1]
      bg-white px-4 py-3">

      ${icon(
        "search",
        "w-4 h-4 text-slate-400"
      )}

      <input
        class="w-full bg-transparent
        text-sm outline-none"
        placeholder="Search emergency guides"
        oninput="filterGuides(this.value)"
      />

    </div>


    <div
      class="mb-4 flex gap-2
      overflow-x-auto pb-1">

      ${[
        "Flood",
        "Earthquake",
        "Cyclone",
        "Fire",
        "First Aid",
        "Heatwave"
      ]
        .map(
          x => `

            <button
              class="whitespace-nowrap
              rounded-full border
              border-[#dce7e1] bg-white
              px-3 py-2 text-xs font-bold">

              ${x}

            </button>

          `
        )
        .join("")}

    </div>


    <div id="guideList" class="space-y-3">

      ${[
        [
          "DURING A FLOOD",
          "Move to higher ground · Avoid moving water · Disconnect electricity if safe",
          "5 min",
          "Critical"
        ],

        [
          "EARTHQUAKE SAFETY",
          "Drop, cover and hold · Stay away from windows",
          "4 min",
          "High"
        ],

        [
          "BASIC FIRST AID",
          "Control bleeding · Check breathing · Call emergency services",
          "6 min",
          "High"
        ],

        [
          "CYCLONE SAFETY",
          "Stay indoors · Secure loose objects · Follow official alerts",
          "4 min",
          "High"
        ]

      ]
        .map(
          ([t, d, time, u]) => `

            <article class="guide-item card p-4">

              <div
                class="flex items-start
                justify-between gap-3">

                <div>

                  <p
                    class="text-[10px] font-extrabold
                    uppercase tracking-widest text-mint">

                    ${u}

                  </p>

                  <h3 class="mt-1 font-extrabold">
                    ${t}
                  </h3>

                  <p
                    class="mt-2 text-xs
                    leading-5 text-slate-500">

                    ${d}

                  </p>

                </div>


                <span
                  class="rounded-full bg-paper
                  px-2 py-1 text-[10px] font-bold">

                  ${time}

                </span>

              </div>


              <button
                onclick="showToast('Guide opened')"
                class="mt-4 text-xs font-extrabold">

                Open Guide →

              </button>

            </article>

          `
        )
        .join("")}

    </div>


    <div
      class="mt-5 rounded-[24px]
      bg-coral p-5 text-white">

      <p
        class="text-xs font-extrabold
        uppercase tracking-widest">

        Immediate danger

      </p>

      <h3 class="mt-1 text-xl font-extrabold">
        Use SOS or call emergency services.
      </h3>

      <button
        onclick="go('sos')"
        class="mt-4 rounded-full bg-white
        px-4 py-2 text-xs font-extrabold
        text-coral">

        Open SOS

      </button>

    </div>

  `, "prepare");
}


function filterGuides(q) {

  document
    .querySelectorAll(".guide-item")
    .forEach(el => {

      el.style.display =
        el.innerText
          .toLowerCase()
          .includes(q.toLowerCase())
          ? ""
          : "none";

    });

}


/* =========================================================
   RISK AWARENESS
========================================================= */

function risk() {

  return shell(`

    ${sectionTitle(
      "Risk awareness",
      "KNOW YOUR RISK.",
      "Historical patterns help explain the risks around you."
    )}


    <div class="card p-5">

      <div
        class="flex items-start
        justify-between">

        <div>

          <p
            class="text-[10px] font-bold uppercase
            tracking-widest text-mint">

            Current location

          </p>

          <h2 class="mt-1 text-lg font-extrabold">
            ${state.location}
          </h2>

        </div>

        <button
          onclick="changeLocation()"
          class="text-xs font-bold">

          Change →

        </button>

      </div>


      <div
        class="mt-5 rounded-[22px]
        bg-ink p-5 text-white">

        <p
          class="text-[10px] font-bold uppercase
          tracking-widest text-white/50">

          Current risk

        </p>

        <p class="mt-1 text-4xl font-extrabold">
          MODERATE
        </p>

        <p class="mt-2 text-xs text-white/60">
          Based on historical incidents and current conditions.
        </p>

      </div>


      <div class="mt-5 space-y-4">

        ${[
          ["Flood", "HIGH", 82, "bad"],
          ["Earthquake", "MODERATE", 54, "warn"],
          ["Heatwave", "HIGH", 78, "bad"],
          ["Cyclone", "LOW", 28, "good"]
        ]
          .map(
            ([n, v, p, c]) => `

              <div>

                <div
                  class="mb-1 flex
                  justify-between text-xs font-bold">

                  <span>${n}</span>

                  ${status(v, c)}

                </div>

                <div class="progress-track">

                  <div
                    class="progress-fill
                    ${
                      c === "bad"
                        ? "bg-coral"
                        : c === "warn"
                        ? "bg-amber"
                        : "bg-mint"
                    }"
                    style="width:${p}%">

                  </div>

                </div>

              </div>

            `
          )
          .join("")}

      </div>

    </div>


    <div class="mt-5 card p-5">

      <p
        class="text-[10px] font-bold uppercase
        tracking-widest text-mint">

        Historical disaster activity

      </p>

      <h2 class="mt-1 text-xl font-extrabold">
        Past 10 years
      </h2>


      <div
        class="mt-5 flex h-36
        items-end gap-2">

        ${[30, 48, 35, 70, 52, 90, 60, 75, 42, 84]
          .map(
            (h, i) => `

              <div
                class="flex flex-1
                flex-col justify-end">

                <div
                  class="rounded-t-md bg-ink/80"
                  style="height:${h}%">
                </div>

                <span
                  class="mt-1 text-center
                  text-[8px] text-slate-400">

                  ${2017 + i}

                </span>

              </div>

            `
          )
          .join("")}

      </div>

    </div>


    <div class="mt-5 grid grid-cols-2 gap-3">

      <div class="card p-4">

        <p class="text-[9px] uppercase text-slate-400">
          Most common
        </p>

        <b class="text-lg">
          Flood
        </b>

      </div>


      <div class="card p-4">

        <p class="text-[9px] uppercase text-slate-400">
          Peak months
        </p>

        <b class="text-lg">
          Jul–Sep
        </b>

      </div>

    </div>


    <div class="mt-5 card p-5">

      <h3 class="font-extrabold">
        Why is this area at risk?
      </h3>

      <p
        class="mt-2 text-sm
        leading-6 text-slate-500">

        Low-lying roads, heavy monsoon rainfall
        and drainage pressure can increase
        localized flooding risk.

      </p>

    </div>

  `, "prepare");
}


/* =========================================================
   EMERGENCY KIT
========================================================= */

function kit() {

  const items = [
    "Drinking water",
    "First aid kit",
    "Flashlight",
    "Power bank",
    "Batteries",
    "Essential medicines",
    "Dry food",
    "Important documents",
    "Whistle",
    "Radio",
    "Blanket",
    "Cash"
  ];

  return shell(`

    ${sectionTitle(
      "Emergency kit",
      "PACK FOR THE UNEXPECTED.",
      "Build your emergency kit before you need it."
    )}


    <div class="card p-5">

      <div class="flex justify-between">

        <span class="text-sm font-bold">
          Readiness
        </span>

        <b class="text-mint">
          7 / 12 READY
        </b>

      </div>


      <div class="progress-track mt-3">

        <div
          class="progress-fill bg-mint"
          style="width:58%">
        </div>

      </div>

    </div>


    <div class="mt-4 space-y-2">

      ${items
        .map(
          (x, i) => `

            <button
              onclick="toggleCheck(this)"
              class="card flex w-full items-center
              gap-3 p-3.5 text-left">

              <span
                class="check grid h-7 w-7
                place-items-center rounded-full
                ${
                  i < 7
                    ? "bg-[#e7f8f2] text-ink"
                    : "border border-slate-300"
                }">

                ${icon(
                  i < 7 ? "check" : "circle",
                  "w-4 h-4"
                )}

              </span>


              <span class="flex-1">

                <b class="text-sm">
                  ${x}
                </b>

                <span
                  class="block text-[10px]
                  text-slate-400">

                  ${i < 7 ? "Ready" : "Needs attention"}

                </span>

              </span>

            </button>

          `
        )
        .join("")}

    </div>


    <div class="mt-5 card p-5">

      <p
        class="text-[10px] font-bold uppercase
        tracking-widest text-mint">

        Recommended for your area

      </p>

      <div class="mt-3 space-y-2 text-sm">

        <p>• Waterproof document pouch</p>
        <p>• Extra drinking water</p>
        <p>• Waterproof flashlight</p>

      </div>

    </div>

  `, "prepare");
}


function toggleCheck(el) {

  el
    .querySelector(".check")
    .classList
    .toggle("bg-[#e7f8f2]");

  showToast("Checklist updated");
}


/* =========================================================
   HELPLINES
========================================================= */

function helplines() {

  const nums = [

    ["Police", "112", "shield"],

    ["Ambulance", "108", "ambulance"],

    ["Fire", "101", "flame"],

    [
      "Disaster Management",
      "Official Government Helpline",
      "triangle-alert"
    ],

    [
      "NDRF",
      "Official Emergency Contact",
      "radio"
    ]

  ];


  return shell(`

    ${sectionTitle(
      "Emergency contacts",
      "HELP IS ONE CALL AWAY.",
      "Emergency contacts remain available even without internet."
    )}


    <div
      class="rounded-[22px]
      bg-ink p-5 text-white">

      <div class="flex gap-3">

        ${icon("wifi-off", "w-5 h-5")}

      </div>

      <p
        class="mt-3 text-sm
        text-white/70">

        Saved locally on your device.
        These contacts are designed to remain
        accessible offline.

      </p>

    </div>


    <div class="mt-4 space-y-3">

      ${nums
        .map(
          ([n, num, ico]) => `

            <div class="card p-4">

              <div class="flex items-center gap-3">

                <span
                  class="grid h-11 w-11
                  place-items-center rounded-2xl
                  bg-[#e7f8f2] text-ink">

                  ${icon(ico)}

                </span>


                <div class="flex-1">

                  <p
                    class="text-[10px]
                    uppercase tracking-widest
                    text-slate-400">

                    ${n}

                  </p>

                  <p class="font-extrabold">
                    ${num}
                  </p>

                </div>


                <button
                  onclick="showToast('Calling ${n}')"
                  class="rounded-full bg-ink
                  px-4 py-2 text-xs
                  font-bold text-white">

                  Call

                </button>

              </div>

            </div>

          `
        )
        .join("")}

    </div>


    <div class="mt-5 card p-5">

      <p
        class="text-[10px] font-bold uppercase
        tracking-widest text-mint">

        Local contacts

      </p>


      <div class="mt-3 space-y-3">

        ${
          [
            "Delhi Disaster Management",
            "District Control Room",
            "Nearest Police Station",
            "Nearest Hospital"
          ]
            .map(
              x => `

                <button
                  onclick="showToast('${x}')"
                  class="flex w-full items-center
                  justify-between border-b
                  border-[#e6eeea] py-3
                  text-sm font-semibold
                  last:border-0">

                  ${x}

                  ${icon(
                    "arrow-up-right",
                    "w-4 h-4"
                  )}

                </button>

              `
            )
            .join("")
        }

      </div>

    </div>

  `, "prepare");
}


/* =========================================================
   OFFLINE MAPS
========================================================= */

function offline() {

  return shell(`

    ${sectionTitle(
      "Offline maps",
      "STAY CONNECTED, EVEN OFFLINE.",
      "Download essential emergency information before connectivity is lost."
    )}


    <div class="card p-5">

      <div class="flex justify-between">

        <span class="text-sm font-bold">
          Device storage
        </span>

        <b>
          1.2 GB available
        </b>

      </div>


      <div class="progress-track mt-3">

        <div
          class="progress-fill bg-ink"
          style="width:34%">
        </div>

      </div>

    </div>


    <div class="mt-4 space-y-3">

      ${[
        ["New Delhi", "82 MB", "Downloaded"],
        ["Current Area", "34 MB", "Download"],
        ["Nearby Districts", "120 MB", "Download"]
      ]
        .map(
          ([n, s, b]) => `

            <div class="card p-4">

              <div class="flex items-center gap-3">

                <div
                  class="grid h-14 w-14
                  place-items-center rounded-2xl
                  bg-[#e7f8f2]">

                  ${icon("map")}

                </div>


                <div class="flex-1">

                  <b>${n}</b>

                  <p class="text-xs text-slate-400">
                    ${s}
                  </p>

                </div>


                <button
                  onclick="
                    showToast(
                      '${b === "Downloaded"
                        ? "Map already downloaded"
                        : "Map download started"}'
                    )
                  "
                  class="
                    rounded-full
                    ${
                      b === "Downloaded"
                        ? "bg-[#e7f8f2] text-ink"
                        : "bg-ink text-white"
                    }
                    px-3 py-2 text-[10px]
                    font-bold">

                  ${b}

                </button>

              </div>

            </div>

          `
        )
        .join("")}

    </div>


    <div class="mt-5 card p-5">

      <h3 class="font-extrabold">
        Offline information included
      </h3>


      <div
        class="mt-3 grid grid-cols-2
        gap-2 text-xs">

        ${[
          "Roads",
          "Relief shelters",
          "Hospitals",
          "Police",
          "Fire stations",
          "Medical camps",
          "Water points",
          "Charging"
        ]
          .map(
            x => `
              <div
                class="rounded-xl
                bg-paper p-3">

                ✓ ${x}

              </div>
            `
          )
          .join("")}

      </div>

    </div>

  `, "prepare");
}


/* =========================================================
   DURING DISASTER
========================================================= */

function emergency() {

  return shell(`

    ${sectionTitle(
      "During disaster",
      "EMERGENCY MODE.",
      "Critical information is prioritized for rapid decisions."
    )}


    <div
      class="mb-4 flex items-center
      justify-between">

      <span class="text-xs font-bold">
        ${state.location}
      </span>

      ${status("ONLINE", "good")}

    </div>


    <div
      class="rounded-[24px]
      bg-coral p-5 text-white">

      <p
        class="text-[10px] font-extrabold
        uppercase tracking-widest
        opacity-75">

        High priority

      </p>

      <h2 class="mt-1 text-2xl font-extrabold">
        FLASH FLOOD
      </h2>

      <p class="mt-2 text-sm text-white/85">
        Move to higher ground immediately.
      </p>


      <button
        onclick="go('map')"
        class="mt-4 rounded-full
        bg-white px-4 py-2
        text-xs font-extrabold text-coral">

        Open emergency map →

      </button>

    </div>


    <div class="mt-4 grid grid-cols-2 gap-3">

      ${[
        ["28°C", "Temperature"],
        ["180mm", "Rainfall"],
        ["HIGH", "Flood risk"],
        ["Strong", "Wind"]
      ]
        .map(
          ([a, b]) => `

            <div class="card p-4">

              <p class="text-2xl font-extrabold">
                ${a}
              </p>

              <p
                class="mt-1 text-[10px]
                uppercase tracking-widest
                text-slate-400">

                ${b}

              </p>

            </div>

          `
        )
        .join("")}

    </div>


    <div class="mt-5">

      <div
        class="mb-3 flex justify-between">

        <h2 class="font-extrabold">
          Nearest help
        </h2>

        <button
          onclick="go('map')"
          class="text-xs font-bold">

          Map →

        </button>

      </div>


      <div class="space-y-2">

        ${[
          ["Shelter", "1.8 km", "shelter"],
          ["Hospital", "2.1 km", "hospital"],
          ["Medical Camp", "3.4 km", "heart-pulse"],
          ["Food", "1.2 km", "utensils"]
        ]
          .map(
            ([a, b, i]) => `

              <button
                onclick="
                  go(
                    '${a === "Shelter"
                      ? "shelter"
                      : "map"}'
                  )
                "
                class="card flex w-full
                items-center gap-3 p-3
                text-left">

                <span
                  class="grid h-9 w-9
                  place-items-center
                  rounded-xl
                  bg-[#e7f8f2]">

                  ${icon(i, "w-4 h-4")}

                </span>


                <span
                  class="flex-1
                  text-sm font-bold">

                  ${a}

                </span>


                <span
                  class="text-xs text-slate-400">

                  ${b}

                </span>


                ${icon(
                  "chevron-right",
                  "w-4 h-4"
                )}

              </button>

            `
          )
          .join("")}

      </div>

    </div>


    <div class="mt-5">

      <h2 class="mb-3 font-extrabold">
        Live local updates
      </h2>


      <div class="space-y-2">

        ${
          [
            "Road blocked — Main Ring Road",
            "Waterlogging — Sector 5",
            "Shelter B filling quickly"
          ]
            .map(
              (x, i) => `

                <div
                  class="card p-3 text-sm">

                  <span
                    class="
                    mr-2 inline-block
                    h-2 w-2 rounded-full
                    ${i === 0
                      ? "bg-coral"
                      : "bg-mint"}">
                  </span>

                  ${x}

                </div>

              `
            )
            .join("")
        }

      </div>

    </div>


    <div class="mt-5 grid grid-cols-2 gap-3">

      <button
        onclick="go('map')"
        class="rounded-2xl bg-ink
        py-4 text-xs font-extrabold
        text-white">

        OPEN MAP

      </button>


      <button
        onclick="go('shelter')"
        class="rounded-2xl
        border border-ink py-4
        text-xs font-extrabold text-ink">

        FIND SHELTER

      </button>

    </div>


    <button
      onclick="go('sos')"
      class="mt-3 w-full
      rounded-2xl bg-coral
      py-4 text-xs font-extrabold
      text-white">

      SOS / REQUEST EMERGENCY HELP

    </button>

  `, "action");
}


/* =========================================================
   MAP
========================================================= */

function initMap() {

  const el = document.getElementById("map");

  if (!el || el.dataset.ready) {
    return;
  }

  el.dataset.ready = "1";


  const map = L
    .map(el, {
      zoomControl: false
    })
    .setView([28.6139, 77.2090], 12);


  L
    .control
    .zoom({
      position: "bottomright"
    })
    .addTo(map);


  L
    .tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution: "© OpenStreetMap"
      }
    )
    .addTo(map);


  const points = [

    [
      28.6139,
      77.2090,
      "Your location",
      "Current position"
    ],

    [
      28.6270,
      77.2150,
      "Relief Camp A",
      "188 spaces · Food · Medical"
    ],

    [
      28.6320,
      77.2050,
      "Medical Camp",
      "Doctors: 4"
    ],

    [
      28.6050,
      77.2250,
      "Food Distribution",
      "Food available"
    ],

    [
      28.6500,
      77.1950,
      "Hospital",
      "Emergency department"
    ]

  ];


  points.forEach((p, i) => {

    const color =
      i === 0
        ? "#e84a5f"
        : "#06483d";


    const marker = L
      .circleMarker(
        [p[0], p[1]],
        {
          radius: i === 0 ? 10 : 8,
          color: "#fff",
          weight: 3,
          fillColor: color,
          fillOpacity: 1
        }
      )
      .addTo(map);


    marker.bindPopup(`
      <b>${p[2]}</b>
      <br>
      <span style="font-size:12px">
        ${p[3]}
      </span>
    `);

  });

}


function mapPage() {

  setTimeout(() => initMap(), 50);


  return shell(`

    ${sectionTitle(
      "Emergency map",
      "FIND HELP AROUND YOU.",
      "Shelters, medical camps and essential resources."
    )}


    <div
      class="mb-3 flex items-center
      gap-2 rounded-full border
      border-[#dce7e1] bg-white
      px-4 py-3">

      ${icon(
        "search",
        "w-4 h-4 text-slate-400"
      )}

      <input
        class="w-full bg-transparent
        text-sm outline-none"
        placeholder="Search location"
      />

    </div>


    <div
      class="mb-3 flex gap-2
      overflow-x-auto pb-1">

      ${[
        "Shelters",
        "Hospitals",
        "Medical",
        "Food",
        "Water",
        "Charging",
        "Police",
        "Fire",
        "Boats"
      ]
        .map(
          x => `

            <button
              class="whitespace-nowrap
              rounded-full bg-white
              px-3 py-2 text-[10px]
              font-bold border
              border-[#dce7e1]">

              ${x}

            </button>

          `
        )
        .join("")}

    </div>


    <div id="map" class="shadow-soft"></div>


    <div
      class="card -mt-8 relative z-10
      mx-3 p-4">

      <div
        class="flex items-start
        justify-between">

        <div>

          <p
            class="text-[10px]
            font-extrabold uppercase
            tracking-widest text-mint">

            Nearest safe shelter

          </p>

          <h2 class="mt-1 text-lg font-extrabold">
            Relief Camp A
          </h2>

          <p class="text-xs text-slate-500">
            1.8 km · 188 spaces available
          </p>

        </div>

        ${status("OPEN")}

      </div>


      <div class="mt-3 flex gap-2">

        <button
          onclick="showToast('Navigation started')"
          class="flex-1 rounded-full
          bg-ink py-2.5 text-xs
          font-bold text-white">

          Navigate →

        </button>


        <button
          onclick="go('shelter')"
          class="flex-1 rounded-full
          border border-ink py-2.5
          text-xs font-bold">

          Details

        </button>

      </div>

    </div>


    <div class="mt-4 grid grid-cols-3 gap-2">

      <button
        onclick="showToast('Centered on current location')"
        class="card py-3 text-xs font-bold">

        ${icon(
          "locate-fixed",
          "w-4 h-4 mx-auto mb-1"
        )}

        Locate

      </button>


      <button
        onclick="go('ai')"
        class="card py-3 text-xs font-bold">

        ${icon(
          "bot",
          "w-4 h-4 mx-auto mb-1"
        )}

        AI

      </button>


      <button
        onclick="go('sos')"
        class="card py-3 text-xs
        font-bold text-coral">

        ${icon(
          "siren",
          "w-4 h-4 mx-auto mb-1"
        )}

        SOS

      </button>

    </div>

  `, "action");
}


/* =========================================================
   SHELTER DETAILS
========================================================= */

function shelter() {

  const s = state.shelter;

  const avail =
    s.capacity - s.occupied;

  const pct =
    Math.round(
      s.occupied /
      s.capacity *
      100
    );


  return shell(`

    ${sectionTitle(
      "Shelter details",
      "RELIEF CAMP A",
      `Official relief shelter · ${state.location}`
    )}


    <div class="card p-5">

      <div
        class="flex justify-between
        items-start">

        <div>

          <p
            class="text-[10px]
            uppercase tracking-widest
            text-slate-400">

            Current status

          </p>

          <h2 class="mt-1 text-xl font-extrabold">
            OPEN
          </h2>

        </div>

        ${status("VERIFIED")}

      </div>


      <div
        class="mt-5 rounded-[22px]
        bg-paper p-5">

        <div
          class="flex items-end
          justify-between">

          <div>

            <p
              class="text-4xl
              font-extrabold metric">

              ${avail}

            </p>

            <p
              class="text-xs uppercase
              tracking-widest
              text-slate-400">

              available

            </p>

          </div>


          <div class="text-right">

            <p class="font-bold">
              ${s.occupied} / ${s.capacity}
            </p>

            <p
              class="text-[10px]
              uppercase text-slate-400">

              occupied

            </p>

          </div>

        </div>


        <div class="progress-track mt-4">

          <div
            class="progress-fill bg-mint"
            style="width:${pct}%">

          </div>

        </div>

      </div>


      <div
        class="mt-4 grid grid-cols-2
        gap-2">

        ${[
          ["Food", s.food],
          ["Water", s.water],
          ["Medicine", s.medicine],
          ["Doctors", s.doctors],
          ["Volunteers", s.volunteers],
          ["Beds", avail],
          ["Electricity", "Available"],
          ["Internet", "Available"]
        ]
          .map(
            ([a, b]) => `

              <div
                class="rounded-2xl
                border border-[#e5ede9]
                p-3">

                <p
                  class="text-[9px]
                  uppercase tracking-widest
                  text-slate-400">

                  ${a}

                </p>

                <p
                  class="mt-1 text-sm
                  font-extrabold">

                  ${b}

                </p>

              </div>

            `
          )
          .join("")}

      </div>


      <p
        class="mt-4 text-[10px]
        text-slate-400">

        Last updated 5 minutes ago ·
        Information verified by shelter administrator.

      </p>

    </div>


    <div class="mt-4 grid grid-cols-2 gap-3">

      <button
        onclick="showToast('Navigation started')"
        class="rounded-2xl bg-ink
        py-4 text-xs font-extrabold
        text-white">

        NAVIGATE

      </button>


      <button
        onclick="showToast('Help request opened')"
        class="rounded-2xl
        border border-ink py-4
        text-xs font-extrabold">

        REQUEST HELP

      </button>

    </div>

  `, "action");
}


/* =========================================================
   SOS
========================================================= */

function sos() {

  return shell(`

    ${sectionTitle(
      "Emergency",
      "EMERGENCY SOS.",
      "Use this only when you need immediate assistance."
    )}


    <div class="card p-4 text-center">

      <div
        class="flex justify-center
        gap-2 text-xs font-bold">

        ${icon("map-pin", "w-4 h-4")}

        ${state.location}

      </div>


      <p
        class="mt-1 text-[10px]
        text-slate-400">

        GPS ACTIVE ·
        ${state.online
          ? "NETWORK CONNECTED"
          : "OFFLINE MODE"}

      </p>

    </div>


    <div
      class="flex flex-col
      items-center py-8">

      <button
        onclick="sendSOS()"
        class="sos-pulse grid h-52 w-52
        place-items-center rounded-full
        bg-coral text-white shadow-xl">

        <span>

          <b
            class="block text-4xl
            font-black">

            SOS

          </b>

          <small
            class="mt-2 block
            text-[9px] font-bold
            uppercase tracking-[.18em]">

            Press and hold

          </small>

        </span>

      </button>


      <p
        class="mt-5 text-center
        text-xs text-slate-500">

        Hold for 3 seconds to send
        an emergency request.

      </p>

    </div>


    <div class="card p-5">

      <h3 class="font-extrabold">

        ${state.online
          ? "When online"
          : "When offline"}

      </h3>


      <div class="mt-3 space-y-2 text-sm">

        ${
          (
            state.online
              ? [
                  "GPS location will be sent",
                  "Emergency request will be sent",
                  "Authorities will be notified"
                ]
              : [
                  "Request saved locally",
                  "GPS location saved",
                  "Automatically sent when connection returns"
                ]
          )
            .map(
              x => `<p>✓ ${x}</p>`
            )
            .join("")
        }

      </div>

    </div>


    <div class="mt-4 card p-4">

      <p
        class="text-[10px]
        uppercase tracking-widest
        text-mint">

        Direct emergency lines

      </p>


      <div class="mt-2 grid grid-cols-3 gap-2">

        ${[
          "POLICE",
          "AMBULANCE",
          "FIRE"
        ]
          .map(
            x => `

              <button
                onclick="
                  showToast(
                    'Calling ${x}'
                  )
                "
                class="rounded-xl
                border border-[#dce7e1]
                py-3 text-[10px]
                font-extrabold">

                ${x}

              </button>

            `
          )
          .join("")}

      </div>

    </div>


    <button
      onclick="
        showToast(
          'Calling emergency services'
        )
      "
      class="mt-3 w-full
      rounded-2xl border border-ink
      py-4 text-xs font-extrabold">

      CALL EMERGENCY SERVICES

    </button>

  `, "action");
}


function sendSOS() {

  showToast(
    state.online
      ? "SOS sent — authorities notified"
      : "SOS saved offline — will sync when connected"
  );

}


/* =========================================================
   AI ASSISTANT
========================================================= */

function ai() {

  return shell(`

    ${sectionTitle(
      "ResQ AI",
      "ASK WHEN YOU'RE UNSURE.",
      "Emergency guidance based on your location and situation."
    )}


    <div
      class="rounded-[22px]
      bg-ink p-5 text-white">

      <div class="flex items-center gap-3">

        <span
          class="grid h-10 w-10
          place-items-center rounded-2xl
          bg-mint text-ink">

          ${icon("bot")}

        </span>


        <div>

          <b>
            ResQ AI
          </b>

          <p
            class="text-xs text-white/60">

            Using ${state.location}

          </p>

        </div>

      </div>


      <p
        class="mt-4 text-xs
        text-white/70">

        For life-threatening emergencies,
        call emergency services or use SOS.

      </p>

    </div>


    <div class="mt-5 space-y-2">

      ${[
        "Where is the nearest shelter?",
        "What should I do during a flood?",
        "How do I give basic first aid?",
        "Which emergency number should I call?",
        "Is my area currently at risk?"
      ]
        .map(
          q => `

            <button
              onclick="
                showToast(
                  'ResQ AI: Guidance loaded'
                )
              "
              class="card w-full p-4
              text-left text-sm
              font-semibold">

              ${q}

              <span class="float-right">
                →
              </span>

            </button>

          `
        )
        .join("")}

    </div>


    <div
      class="mt-5 flex items-center
      gap-2 rounded-full border
      border-[#dce7e1] bg-white
      p-2 pl-4">

      <input
        class="flex-1 bg-transparent
        text-sm outline-none"
        placeholder="Ask ResQ AI..."
      />


      <button
        onclick="
          showToast(
            'AI response generated'
          )
        "
        class="grid h-10 w-10
        place-items-center rounded-full
        bg-ink text-white">

        ${icon("arrow-up", "w-4 h-4")}

      </button>

    </div>

  `, "action");
}


/* =========================================================
   AFTER DISASTER
========================================================= */

function recover() {

  return shell(`

    ${sectionTitle(
      "After disaster",
      "RECOVER TOGETHER.",
      "Find assistance. Report damage. Help your community recover."
    )}


    <div class="space-y-3">

      ${[
        [
          "Medical Help",
          "heart-pulse",
          "Find hospitals and medical camps.",
          "medical"
        ],

        [
          "Missing Persons",
          "user-search",
          "Report or search for missing people.",
          "missing"
        ],

        [
          "Relief Distribution",
          "package",
          "Find food, water and essential supplies.",
          "relief"
        ],

        [
          "Damage Report",
          "house-damage",
          "Report damage to homes and infrastructure.",
          "damage"
        ],

        [
          "Recovery Resources",
          "hand-helping",
          "Find government and community assistance.",
          "resources"
        ]

      ]
        .map(
          ([t, i, d, r]) => `

            <button
              onclick="go('${r}')"
              class="card flex w-full
              items-center gap-4
              p-4 text-left">

              <span
                class="grid h-11 w-11
                items-center place-items-center
                rounded-2xl bg-[#e7f8f2]">

                ${icon(i)}

              </span>


              <span class="flex-1">

                <b class="block">
                  ${t}
                </b>

                <span
                  class="text-xs
                  text-slate-500">

                  ${d}

                </span>

              </span>


              ${icon(
                "arrow-up-right",
                "w-4 h-4"
              )}

            </button>

          `
        )
        .join("")}

    </div>


    <div class="mt-6">

      <div
        class="mb-3 flex
        justify-between">

        <h2 class="font-extrabold">
          Your reports
        </h2>

        <span class="text-xs font-bold">
          2 active
        </span>

      </div>


      <div class="space-y-2">

        ${[
          "Damage Report #204 — Under Review",
          "Missing Person #108 — Submitted"
        ]
          .map(
            x => `

              <div
                class="card p-4
                text-sm font-semibold">

                ${x}

              </div>

            `
          )
          .join("")}

      </div>

    </div>

  `, "recover");
}


/* =========================================================
   MEDICAL
========================================================= */

function medical() {

  return shell(`

    ${sectionTitle(
      "Medical help",
      "FIND MEDICAL HELP.",
      "Hospitals, medical camps and ambulances near you."
    )}


    <div class="card p-4">

      <div
        class="flex items-center
        gap-2 text-xs font-bold">

        ${icon("map-pin", "w-4 h-4")}

        ${state.location}

      </div>


      <div
        class="mt-3 h-36
        rounded-2xl bg-[#dce9e4]
        editorial-grid">

      </div>

    </div>


    <div class="mt-4 space-y-3">

      ${[
        [
          "Government Hospital",
          "2.1 km",
          "Emergency Department · 24/7 · Ambulance Available"
        ],

        [
          "Medical Relief Camp",
          "3.4 km",
          "Doctors: 4 · Medicine Available"
        ],

        [
          "District Clinic",
          "4.2 km",
          "Open · First Aid"
        ]

      ]
        .map(
          ([n, d, desc]) => `

            <div class="card p-4">

              <div
                class="flex justify-between">

                <div>

                  <p
                    class="text-[10px]
                    uppercase tracking-widest
                    text-mint">

                    Medical

                  </p>

                  <h3 class="font-extrabold">
                    ${n}
                  </h3>

                  <p
                    class="mt-1 text-xs
                    text-slate-500">

                    ${d} · ${desc}

                  </p>

                </div>

                ${status("OPEN")}

              </div>


              <div class="mt-3 flex gap-2">

                <button
                  onclick="
                    showToast(
                      'Navigation started'
                    )
                  "
                  class="flex-1 rounded-full
                  bg-ink py-2 text-xs
                  font-bold text-white">

                  Navigate

                </button>


                <button
                  onclick="
                    showToast(
                      'Calling medical facility'
                    )
                  "
                  class="flex-1 rounded-full
                  border border-ink py-2
                  text-xs font-bold">

                  Call

                </button>

              </div>

            </div>

          `
        )
        .join("")}

    </div>

  `, "recover");
}


/* =========================================================
   MISSING PERSONS
========================================================= */

function missing() {

  return shell(`

    ${sectionTitle(
      "Missing persons",
      "HELP FIND THEM.",
      "Report or search for people separated during the disaster."
    )}


    <div class="grid grid-cols-2 gap-3">

      <button
        onclick="
          showToast(
            'Missing person form opened'
          )
        "
        class="rounded-2xl bg-ink
        p-5 text-left text-white">

        <b>
          Report missing
        </b>

        <span
          class="mt-2 block
          text-xs text-white/60">

          Create a new report →

        </span>

      </button>


      <button
        onclick="
          showToast(
            'Search opened'
          )
        "
        class="rounded-2xl
        border border-ink
        p-5 text-left">

        <b>
          Search
        </b>

        <span
          class="mt-2 block
          text-xs text-slate-500">

          Find a person →

        </span>

      </button>

    </div>


    <div
      class="mt-5 flex items-center
      gap-2 rounded-full border
      border-[#dce7e1] bg-white
      px-4 py-3">

      ${icon(
        "search",
        "w-4 h-4 text-slate-400"
      )}

      <input
        class="w-full bg-transparent
        text-sm outline-none"
        placeholder="Name, age or location"
      />

    </div>


    <div class="mt-4 space-y-3">

      ${[
        [
          "Aarav Sharma",
          "17 years",
          "Sector 7 · 2 hours ago"
        ],

        [
          "Meera Singh",
          "42 years",
          "Sector 5 · 5 hours ago"
        ],

        [
          "Rohan Kumar",
          "29 years",
          "Yamuna Road · 7 hours ago"
        ]

      ]
        .map(
          ([n, a, l]) => `

            <div
              class="card flex items-center
              gap-3 p-4">

              <div
                class="grid h-12 w-12
                place-items-center
                rounded-full bg-ink
                text-white">

                ${icon("user-round")}

              </div>


              <div class="flex-1">

                <b>
                  ${n}
                </b>

                <p
                  class="text-xs
                  text-slate-500">

                  ${a} · ${l}

                </p>

              </div>


              ${status(
                "SEARCHING",
                "warn"
              )}

            </div>

          `
        )
        .join("")}

    </div>

  `, "recover");
}


/* =========================================================
   RELIEF
========================================================= */

function relief() {

  return shell(`

    ${sectionTitle(
      "Relief distribution",
      "FIND RELIEF.",
      "Food, water, medicine and essential supplies near you."
    )}


    <div class="card h-48 p-4">

      <div
        class="flex h-full items-center
        justify-center rounded-2xl
        bg-[#dce9e4]
        editorial-grid
        text-sm font-bold text-ink">

        ${icon(
          "map",
          "w-6 h-6 mr-2"
        )}

        Resource map

      </div>

    </div>


    <div class="mt-4 space-y-3">

      ${[
        [
          "Community Relief Center",
          "1.4 km",
          "Food: Available · Water: Available · Medicine: Limited"
        ],

        [
          "Sector 5 Distribution Point",
          "2.2 km",
          "Food: Available · Water: Available"
        ],

        [
          "Mobile Medical & Relief Unit",
          "3.1 km",
          "Medicine: Available · First Aid"
        ]

      ]
        .map(
          ([n, d, x]) => `

            <div class="card p-4">

              <p
                class="text-[10px]
                uppercase tracking-widest
                text-mint">

                Relief point

              </p>

              <h3 class="font-extrabold">
                ${n}
              </h3>

              <p class="text-xs text-slate-400">
                ${d}
              </p>

              <p
                class="mt-2 text-xs
                text-slate-500">

                ${x}

              </p>


              <button
                onclick="
                  showToast(
                    'Navigation started'
                  )
                "
                class="mt-3 rounded-full
                bg-ink px-4 py-2
                text-xs font-bold
                text-white">

                Navigate →

              </button>

            </div>

          `
        )
        .join("")}

    </div>

  `, "recover");
}


/* =========================================================
   DAMAGE REPORT
========================================================= */

function damage() {

  return shell(`

    ${sectionTitle(
      "Damage report",
      "REPORT WHAT HAPPENED.",
      "Your report helps authorities understand where help is needed."
    )}


    <div class="card p-5 space-y-5">

      <label class="block">

        <span class="label">
          Damage type
        </span>

        <select class="field">

          <option>Home</option>
          <option>Road</option>
          <option>Bridge</option>
          <option>Electricity</option>
          <option>Water</option>
          <option>Other</option>

        </select>

      </label>


      <label class="block">

        <span class="label">
          Description
        </span>

        <textarea
          class="field h-28"
          placeholder="Describe the damage...">
        </textarea>

      </label>


      <div>

        <span class="label">
          Photos
        </span>

        <button
          onclick="
            showToast(
              'Photo picker opened'
            )
          "
          class="field flex w-full
          items-center gap-2
          text-left text-slate-400">

          ${icon("camera")}

          Upload photos

        </button>

      </div>


      <div>

        <span class="label">
          Location
        </span>

        <button
          onclick="
            showToast(
              'Using current location'
            )
          "
          class="field flex w-full
          items-center gap-2
          text-left">

          ${icon("map-pin")}

          ${state.location}

          <span
            class="ml-auto
            text-xs font-bold">

            Use current

          </span>

        </button>

      </div>


      <div>

        <span class="label">
          Severity
        </span>


        <div
          class="grid grid-cols-4
          gap-2">

          ${[
            "Low",
            "Moderate",
            "High",
            "Critical"
          ]
            .map(
              x => `

                <button
                  class="rounded-xl
                  border border-[#dce7e1]
                  py-3 text-[10px]
                  font-bold">

                  ${x}

                </button>

              `
            )
            .join("")}

        </div>

      </div>


      <button
        onclick="
          showToast(
            'Report RN-20481 submitted'
          )
        "
        class="w-full rounded-2xl
        bg-ink py-4
        text-xs font-extrabold
        text-white">

        SUBMIT REPORT →

      </button>

    </div>

  `, "recover");
}


/* =========================================================
   RECOVERY RESOURCES
========================================================= */

function resources() {

  return shell(`

    ${sectionTitle(
      "Recovery resources",
      "START RECOVERING.",
      "Government, community and practical support after a disaster."
    )}


    <div class="space-y-3">

      ${[
        "Government Assistance",
        "Temporary Housing",
        "Financial Support",
        "Food Assistance",
        "Medical Assistance",
        "Documentation Help",
        "Community Support"
      ]
        .map(
          x => `

            <button
              onclick="
                showToast(
                  '${x} opened'
                )
              "
              class="card w-full p-4
              text-left">

              <div
                class="flex items-center
                justify-between">

                <b>
                  ${x}
                </b>

                ${icon(
                  "arrow-up-right",
                  "w-4 h-4"
                )}

              </div>


              <p
                class="mt-1 text-xs
                text-slate-500">

                Eligibility, required documents
                and available support.

              </p>

            </button>

          `
        )
        .join("")}

    </div>


    <div
      class="mt-5 rounded-[24px]
      bg-ink p-5 text-white">

      <p
        class="text-[10px]
        uppercase tracking-widest
        text-mint">

        Official support

      </p>

      <h2 class="mt-1 text-xl font-extrabold">
        Use verified resources first.
      </h2>

      <p
        class="mt-2 text-xs
        leading-5 text-white/60">

        This prototype will later connect
        to official government information sources.

      </p>

    </div>

  `, "recover");
}


/* =========================================================
   SHELTER ADMIN DASHBOARD
========================================================= */

function shelterAdmin() {

  const s = state.shelter;

  const avail =
    s.capacity - s.occupied;

  const pct =
    Math.round(
      s.occupied /
      s.capacity *
      100
    );


  return `

    <div class="dashboard-shell bg-paper">

      <div
        class="mx-auto max-w-[1500px]
        px-4 py-4 md:px-8">


        <header
          class="flex items-center
          justify-between border-b
          border-[#dce7e1] pb-4">

          <button
            onclick="go('home')"
            class="flex items-center
            gap-2 font-extrabold">

            <span
              class="grid h-8 w-8
              place-items-center
              rounded-full bg-ink
              text-white">

              ${icon(
                "shield-check",
                "w-4 h-4"
              )}

            </span>

            ResQNet

          </button>


          <div class="flex items-center gap-2">

            ${status("SHELTER ADMIN")}

            <button
              onclick="go('home')"
              class="rounded-full border
              border-[#dce7e1]
              bg-white px-3 py-2
              text-xs font-bold">

              Exit

            </button>

          </div>

        </header>


        <div
          class="grid gap-5 py-5
          lg:grid-cols-[220px_1fr]">


          <aside class="sidebar space-y-2">

            ${[
              "Dashboard",
              "Capacity",
              "Resources",
              "Medical",
              "Volunteers",
              "Requests"
            ]
              .map(
                (x, i) => `

                  <button
                    onclick="
                      showToast(
                        '${x} section'
                      )
                    "
                    class="
                      flex w-full
                      items-center gap-3
                      rounded-2xl px-3 py-3
                      text-left text-sm
                      font-semibold
                      ${
                        i === 0
                          ? "bg-ink text-white"
                          : "hover:bg-white"
                      }">

                    ${icon(
                      [
                        "layout-dashboard",
                        "gauge",
                        "package",
                        "heart-pulse",
                        "users",
                        "send"
                      ][i],
                      "w-4 h-4"
                    )}

                    ${x}

                  </button>

                `
              )
              .join("")}

          </aside>


          <main>

            ${sectionTitle(
              "Shelter administrator",
              "RELIEF CAMP A",
              "Official shelter · Sector 7G, New Delhi"
            )}


            <div class="mb-5 flex flex-wrap gap-2">

              ${status("OPEN")}

              ${status("VERIFIED")}

            </div>


            <div
              class="grid gap-3 md:grid-cols-3">

              ${[
                ["TOTAL CAPACITY", s.capacity],
                ["OCCUPIED", s.occupied],
                ["AVAILABLE", avail]
              ]
                .map(
                  ([a, b]) => `

                    <div class="card p-5">

                      <p
                        class="text-[10px]
                        uppercase tracking-widest
                        text-slate-400">

                        ${a}

                      </p>

                      <p
                        class="mt-2 text-4xl
                        font-extrabold metric">

                        ${b}

                      </p>

                    </div>

                  `
                )
                .join("")}

            </div>


            <div
              class="mt-4 grid gap-4
              xl:grid-cols-[1.4fr_1fr]">


              <div class="card p-5">

                <div
                  class="flex justify-between">

                  <h2 class="font-extrabold">
                    Occupancy overview
                  </h2>

                  <span
                    class="text-xs
                    text-slate-400">

                    ${pct}% occupied

                  </span>

                </div>


                <div
                  class="progress-track
                  mt-5 h-4">

                  <div
                    class="progress-fill bg-mint"
                    style="width:${pct}%">

                  </div>

                </div>


                <div
                  class="mt-3 flex
                  justify-between
                  text-xs text-slate-500">

                  <span>
                    Occupied ${s.occupied}
                  </span>

                  <span>
                    Available ${avail}
                  </span>

                </div>


                <div
                  class="mt-5 flex
                  flex-wrap gap-2">

                  <button
                    onclick="updateCapacity()"
                    class="rounded-full
                    bg-ink px-4 py-2
                    text-xs font-bold
                    text-white">

                    Update capacity

                  </button>


                  <button
                    onclick="
                      showToast(
                        'Supply request opened'
                      )
                    "
                    class="rounded-full
                    bg-[#ffe8ec]
                    px-4 py-2
                    text-xs font-bold
                    text-coral">

                    Request supplies

                  </button>

                </div>

              </div>


              <div class="card p-5">

                <h2 class="font-extrabold">
                  Resource status
                </h2>


                <div
                  class="mt-3 grid
                  grid-cols-2 gap-2">

                  ${[
                    ["Food", s.food],
                    ["Water", s.water],
                    ["Medicine", s.medicine],
                    ["Doctors", s.doctors],
                    ["Volunteers", s.volunteers],
                    ["Power", "Available"]
                  ]
                    .map(
                      ([a, b]) => `

                        <div
                          class="rounded-2xl
                          bg-paper p-3">

                          <p
                            class="text-[9px]
                            uppercase
                            text-slate-400">

                            ${a}

                          </p>

                          <b class="text-sm">
                            ${b}
                          </b>

                        </div>

                      `
                    )
                    .join("")}

                </div>

              </div>

            </div>


            <div class="mt-4 card p-5">

              <div
                class="flex justify-between">

                <h2 class="font-extrabold">
                  Incoming help requests
                </h2>

                <button
                  class="text-xs font-bold">

                  View all →

                </button>

              </div>


              <div class="mt-3 space-y-2">

                ${[
                  ["Medical assistance", 4],
                  ["Food & Water", 12],
                  ["Clothing & blankets", 8],
                  ["Mental health support", 2]
                ]
                  .map(
                    ([a, n]) => `

                      <div
                        class="flex items-center
                        justify-between
                        border-b
                        border-[#e6eeea]
                        py-3 last:border-0">

                        <span
                          class="text-sm
                          font-semibold">

                          ${a}

                        </span>

                        <b>
                          ${n}
                        </b>

                      </div>

                    `
                  )
                  .join("")}

              </div>

            </div>


          </main>

        </div>

      </div>

    </div>

  `;
}


function updateCapacity() {

  state.shelter.occupied =
    Math.min(
      state.shelter.capacity,
      state.shelter.occupied + 1
    );

  showToast("Occupancy updated");

  render();
}


/* =========================================================
   GOVERNMENT COMMAND CENTER
========================================================= */

function government() {

  setTimeout(
    () => initCommandMap(),
    50
  );


  return `

    <div
      class="dashboard-shell
      bg-[#eef3f0]">


      <div
        class="mx-auto max-w-[1550px]
        px-4 py-4 md:px-8">


        <header
          class="flex flex-wrap
          items-center justify-between
          gap-3 border-b
          border-[#cfdcd6] pb-4">


          <div>

            <button
              onclick="go('home')"
              class="flex items-center
              gap-2 font-extrabold">

              <span
                class="grid h-8 w-8
                place-items-center
                rounded-full bg-ink
                text-white">

                ${icon(
                  "shield-check",
                  "w-4 h-4"
                )}

              </span>

              ResQNet

              <span class="text-slate-400">
                / Command Center
              </span>

            </button>

          </div>


          <div
            class="flex items-center
            gap-2 text-xs">

            ${status("LIVE", "good")}


            <button
              onclick="go('home')"
              class="rounded-full border
              border-[#cfdcd6]
              bg-white px-4 py-2
              font-bold">

              Citizen view

            </button>

          </div>

        </header>


        <div class="py-5">

          ${sectionTitle(
            "Government disaster management",
            "INCIDENT COMMAND CENTER",
            "Flash flood response · New Delhi · Live operational overview"
          )}


          <!-- STAT CARDS -->

          <div
            class="grid grid-cols-2 gap-3
            md:grid-cols-3 xl:grid-cols-6">

            ${[
              ["ACTIVE SOS", "128", "coral"],
              ["ACTIVE INCIDENTS", "64", "coral"],
              ["AFFECTED PEOPLE", "14.2k", "ink"],
              ["OPEN SHELTERS", "24", "ink"],
              ["VOLUNTEERS", "845", "ink"],
              ["MEDICAL CAMPS", "12", "ink"]
            ]
              .map(
                ([a, b, c]) => `

                  <div class="card p-4">

                    <p
                      class="text-[9px]
                      uppercase tracking-widest
                      text-slate-400">

                      ${a}

                    </p>

                    <p
                      class="mt-1 text-3xl
                      font-extrabold
                      ${
                        c === "coral"
                          ? "text-coral"
                          : ""
                      }
                      metric">

                      ${b}

                    </p>

                  </div>

                `
              )
              .join("")}

          </div>


          <div
            class="mt-4 grid gap-4
            xl:grid-cols-[1fr_360px]">


            <!-- LIVE MAP -->

            <div class="card p-4">

              <div
                class="mb-3 flex
                items-center
                justify-between">

                <h2 class="font-extrabold">
                  Live incident map
                </h2>

                ${status("LIVE", "good")}

              </div>


              <div
                id="commandMap"
                class="command-map
                rounded-[20px]">

              </div>

            </div>


            <!-- RIGHT SIDE -->

            <div class="space-y-4">


              <div class="card p-5">

                <div
                  class="flex justify-between">

                  <h2 class="font-extrabold">
                    AI priority action
                  </h2>

                  ${status(
                    "CRITICAL",
                    "bad"
                  )}

                </div>


                <p
                  class="mt-3 text-sm
                  font-bold">

                  Sector 7G — 12 people
                  require immediate rescue.

                </p>


                <p
                  class="mt-2 text-xs
                  leading-5 text-slate-500">

                  Recommended deployment:
                  2 rescue teams,
                  1 ambulance,
                  4 volunteers.

                </p>


                <button
                  onclick="
                    showToast(
                      'Resource deployment queued'
                    )
                  "
                  class="mt-4 w-full
                  rounded-xl bg-coral
                  py-3 text-xs
                  font-extrabold
                  text-white">

                  DEPLOY RESOURCES
                  IMMEDIATELY →

                </button>

              </div>


              <div class="card p-5">

                <h2 class="font-extrabold">
                  Priority incidents
                </h2>


                <div class="mt-3 space-y-3">

                  ${
                    [
                      "Bridge collapse · Sector 7G",
                      "Medical emergency · Camp A",
                      "Road blockage · District 4",
                      "Power outage · District 5"
                    ]
                      .map(
                        (x, i) => `

                          <div
                            class="flex gap-2
                            text-xs">

                            <span
                              class="mt-1 h-2 w-2
                              rounded-full
                              ${
                                i < 2
                                  ? "bg-coral"
                                  : "bg-amber"
                              }">
                            </span>


                            <div>

                              <b>
                                ${x}
                              </b>

                              <p
                                class="text-slate-400">

                                ${i + 2} min ago

                              </p>

                            </div>

                          </div>

                        `
                      )
                      .join("")
                  }

                </div>

              </div>

            </div>

          </div>


          <!-- BOTTOM CARDS -->

          <div
            class="mt-4 grid gap-4
            lg:grid-cols-3">


            <!-- SHELTER OCCUPANCY -->

            <div class="card p-5">

              <h2 class="font-extrabold">
                Shelter occupancy
              </h2>


              <div class="mt-4 space-y-3">

                ${[
                  "Relief Camp A",
                  "Shelter B",
                  "Shelter C"
                ]
                  .map(
                    (x, i) => `

                      <div>

                        <div
                          class="flex
                          justify-between
                          text-xs">

                          <span>
                            ${x}
                          </span>

                          <b>
                            ${[62, 81, 94][i]}%
                          </b>

                        </div>


                        <div
                          class="progress-track mt-1">

                          <div
                            class="
                            progress-fill
                            ${
                              i === 2
                                ? "bg-coral"
                                : "bg-mint"
                            }"
                            style="
                              width:${[62, 81, 94][i]}%
                            ">

                          </div>

                        </div>

                      </div>

                    `
                  )
                  .join("")}

              </div>

            </div>


            <!-- RESOURCE REQUESTS -->

            <div class="card p-5">

              <h2 class="font-extrabold">
                Resource requests
              </h2>


              <div class="mt-3 space-y-2">

                ${
                  [
                    "Food — 14 pending",
                    "Water — 9 pending",
                    "Medicine — 7 pending",
                    "Doctors — 5 pending"
                  ]
                    .map(
                      x => `

                        <div
                          class="flex
                          justify-between
                          rounded-xl
                          bg-paper p-3
                          text-xs">

                          <span>
                            ${x}
                          </span>

                          ${status(
                            "PENDING",
                            "warn"
                          )}

                        </div>

                      `
                    )
                    .join("")
                }

              </div>

            </div>


            <!-- SOS TRENDS -->

            <div class="card p-5">

              <h2 class="font-extrabold">
                SOS trends (24h)
              </h2>


              <div
                class="mt-5 flex h-24
                items-end gap-1">

                ${[
                  18, 28, 22, 35,
                  48, 42, 65, 72,
                  58, 80, 68, 92
                ]
                  .map(
                    h => `

                      <div
                        class="flex-1
                        rounded-t
                        bg-ink/80"
                        style="
                          height:${h}%
                        ">

                      </div>

                    `
                  )
                  .join("")}

              </div>


              <p
                class="mt-2 text-[10px]
                text-slate-400">

                Requests increasing
                during peak rainfall.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  `;
}


/* =========================================================
   GOVERNMENT MAP
========================================================= */

function initCommandMap() {

  const el =
    document.getElementById(
      "commandMap"
    );


  if (
    !el ||
    el.dataset.ready
  ) {
    return;
  }


  el.dataset.ready = "1";


  const map =
    L.map(
      el,
      {
        zoomControl: false
      }
    )
    .setView(
      [28.6139, 77.2090],
      11
    );


  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        "© OpenStreetMap"
    }
  )
  .addTo(map);


  [
    [
      28.61,
      77.21,
      "CRITICAL SOS"
    ],

    [
      28.65,
      77.18,
      "Flood zone"
    ],

    [
      28.58,
      77.25,
      "Shelter"
    ],

    [
      28.67,
      77.23,
      "Medical camp"
    ]

  ].forEach(
    (p, i) => {

      L
        .circleMarker(
          [p[0], p[1]],
          {
            radius:
              i === 0
                ? 11
                : 8,

            color: "#fff",

            weight: 2,

            fillColor:
              i === 0
                ? "#e84a5f"
                : i === 1
                ? "#f2b84b"
                : "#00a884",

            fillOpacity: 0.95
          }
        )
        .addTo(map)
        .bindPopup(
          `<b>${p[2]}</b>`
        );

    }
  );

}


/* =========================================================
   PROFILE
========================================================= */

function profile() {

  return shell(`

    ${sectionTitle(
      "Profile",
      "YOUR PROFILE.",
      "Keep your emergency information ready."
    )}


    <div
      class="card flex items-center
      gap-4 p-5">

      <div
        class="grid h-16 w-16
        place-items-center
        rounded-full bg-ink
        text-white">

        ${icon(
          "user-round",
          "w-7 h-7"
        )}

      </div>


      <div>

        <h2 class="text-lg font-extrabold">
          Citizen Account
        </h2>

        <p
          class="text-xs
          text-slate-500">

          Emergency profile active

        </p>

      </div>

    </div>


    <div class="mt-4 space-y-2">

      ${[
        [
          "Emergency contacts",
          "Manage contacts",
          "phone-call"
        ],

        [
          "Offline data",
          "3 maps · 8 guides saved",
          "download"
        ],

        [
          "Notifications",
          "Alerts enabled",
          "bell"
        ],

        [
          "Language",
          "English",
          "languages"
        ],

        [
          "Accessibility",
          "Default",
          "accessibility"
        ],

        [
          "Privacy",
          "Manage your data",
          "lock-keyhole"
        ]

      ]
        .map(
          ([a, b, i]) => `

            <button
              onclick="
                showToast('${a}')
              "
              class="card flex w-full
              items-center gap-3
              p-4 text-left">

              <span
                class="grid h-10 w-10
                place-items-center
                rounded-xl
                bg-[#e7f8f2]">

                ${icon(
                  i,
                  "w-4 h-4"
                )}

              </span>


              <span class="flex-1">

                <b class="block text-sm">
                  ${a}
                </b>

                <span
                  class="text-xs
                  text-slate-500">

                  ${b}

                </span>

              </span>


              ${icon(
                "chevron-right",
                "w-4 h-4"
              )}

            </button>

          `
        )
        .join("")}

    </div>


    <div
      class="mt-5 rounded-[24px]
      bg-ink p-5 text-white">

      <p
        class="text-[10px]
        uppercase tracking-widest
        text-mint">

        Profile status

      </p>

      <h2
        class="mt-1 text-xl
        font-extrabold">

        Emergency information
        is up to date.

      </h2>

    </div>

  `, "profile");
}


/* =========================================================
   LOGIN / ROLE SELECTION
========================================================= */

function login() {

  return `

    <div
      class="min-h-screen
      bg-ink text-white">


      <div
        class="mx-auto flex
        min-h-screen max-w-5xl
        flex-col justify-between
        px-6 py-8 md:px-12">


        <header
          class="flex items-center
          gap-2 font-extrabold">

          ${icon(
            "shield-check",
            "w-6 h-6 text-mint"
          )}

          ResQNet

        </header>


        <main
          class="grid gap-10 py-12
          md:grid-cols-2
          md:items-center">


          <div>

            <p
              class="mb-3 text-xs
              font-bold uppercase
              tracking-[.25em]
              text-mint">

              Disaster management platform

            </p>


            <h1
              class="display text-5xl
              font-extrabold
              leading-[.95]
              md:text-7xl">

              PREPARED.<br>
              CONNECTED.<br>

              <span class="text-mint">
                PROTECTED.
              </span>

            </h1>


            <p
              class="mt-5 max-w-md
              text-sm leading-6
              text-white/60">

              A connected emergency ecosystem
              for citizens, shelters,
              volunteers and authorities.

            </p>

          </div>


          <div
            class="rounded-[30px]
            bg-white p-6
            text-ink shadow-2xl">


            <p
              class="text-[10px]
              font-bold uppercase
              tracking-widest
              text-mint">

              Continue as

            </p>


            <div class="mt-4 space-y-3">

              ${[
                [
                  "I NEED HELP",
                  "Citizen / affected person",
                  "home",
                  "home"
                ],

                [
                  "I MANAGE A SHELTER",
                  "Shelter administrator",
                  "tent",
                  "shelter-admin"
                ],

                [
                  "I AM AN AUTHORITY",
                  "Government / disaster management",
                  "landmark",
                  "government"
                ]

              ]
                .map(
                  ([a, b, i, r]) => `

                    <button
                      onclick="
                        go('${r}')
                      "
                      class="
                        card flex w-full
                        items-center gap-3
                        p-4 text-left
                        hover:border-ink">


                      <span
                        class="grid h-10 w-10
                        place-items-center
                        rounded-xl
                        bg-[#e7f8f2]">

                        ${icon(i)}

                      </span>


                      <span class="flex-1">

                        <b class="block text-sm">
                          ${a}
                        </b>

                        <span
                          class="text-xs
                          text-slate-500">

                          ${b}

                        </span>

                      </span>


                      ${icon(
                        "arrow-right",
                        "w-4 h-4"
                      )}

                    </button>

                  `
                )
                .join("")}

            </div>


            <div
              class="my-5 flex
              items-center gap-3
              text-[10px]
              uppercase tracking-widest
              text-slate-400">

              <span
                class="h-px flex-1
                bg-slate-200">
              </span>

              guest

              <span
                class="h-px flex-1
                bg-slate-200">
              </span>

            </div>


            <button
              onclick="go('home')"
              class="w-full
              rounded-2xl bg-ink
              py-4 text-xs
              font-extrabold
              text-white">

              CONTINUE AS GUEST

            </button>

          </div>

        </main>


        <footer
          class="text-xs
          text-white/30">

          Prototype frontend ·
          No backend connected

        </footer>

      </div>

    </div>

  `;
}


/* =========================================================
   ROUTES
========================================================= */

const routes = {

  home,

  prepare,

  preparedness,

  guides,

  risk,

  kit,

  helplines,

  offline,

  action: emergency,

  map: mapPage,

  shelter,

  sos,

  ai,

  recover,

  medical,

  missing,

  relief,

  damage,

  resources,

  "shelter-admin": shelterAdmin,

  government,

  profile,

  login

};


/* =========================================================
   LOCATION
========================================================= */

function changeLocation() {

  const next =
    prompt(
      "Enter a location:",
      state.location
    );


  if (next) {

    state.location = next;

    showToast(
      "Location changed"
    );

    render();

  }

}


/* =========================================================
   NAVIGATION
========================================================= */

function go(route) {

  location.hash = route;

}


/* =========================================================
   RENDER
========================================================= */

function render() {

  const route =
    (
      location.hash ||
      "#login"
    ).slice(1);


  app.innerHTML =
    (
      routes[route] ||
      login
    )();


  lucide.createIcons();

}


window.addEventListener(
  "hashchange",
  render
);


render();