
const SAVED_EVENTS_KEY = "commonground-saved-events";
const WEEK_EVENTS_KEY = "commonground-week-events";

function getStoredEvents(key) {
    try {
        const items = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(items) ? items : [];
    } catch {
        return [];
    }
}

function getEventKey(item) {
    return `${item.title}|${item.date}`;
}

function isEventStored(key, item) {
    return getStoredEvents(key).some(
        saved => getEventKey(saved) === getEventKey(item)
    );
}

function toggleStoredEvent(key, item) {
    const stored = getStoredEvents(key);
    const exists = stored.some(
        saved => getEventKey(saved) === getEventKey(item)
    );

    const updated = exists
        ? stored.filter(saved => getEventKey(saved) !== getEventKey(item))
        : [...stored, item];

    localStorage.setItem(key, JSON.stringify(updated));
}
const eventQuery = document.querySelector("#event-query");
const eventCategory = document.querySelector("#event-category");
const eventCity = document.querySelector("#event-city");
const eventResults = document.querySelector("#event-results");
const eventCount = document.querySelector("#event-count");

const calendarGrid = document.querySelector("#calendar-grid");
const calendarMonth = document.querySelector("#calendar-month");
const calendarPrev = document.querySelector("#calendar-prev");
const calendarNext = document.querySelector("#calendar-next");
const calendarDetails = document.querySelector("#calendar-event-details");

const today = new Date();
today.setHours(0, 0, 0, 0);

let displayedMonth = new Date(today.getFullYear(), today.getMonth(), 1);
let visibleEvents = [];

function getDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
}

function formatDate(dateString) {
    return getDate(dateString).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}

function formatTime(time) {
    if (!time) return "Time not listed";

    const [hour, minute] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, minute, 0, 0);

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });
}

function createEventCard(item) {
    const card = document.createElement("article");
    card.className = "resource-card";

    const date = document.createElement("p");
    date.className = "eyebrow";
    date.textContent = formatDate(item.date);

    const title = document.createElement("h3");
    title.textContent = item.title;

    const meta = document.createElement("p");
    meta.className = "resource-meta";
    meta.textContent = item.category + " · " + item.city;

    const time = document.createElement("p");
    time.textContent = formatTime(item.time);

    const location = document.createElement("p");
    location.textContent = item.location;

    const description = document.createElement("p");
    description.textContent = item.description;

    const link = document.createElement("a");
    link.className = "text-link";
    link.href = item.website;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Official event details ↗";

        const actions = document.createElement("div");
    actions.className = "card-actions";

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.className = "save-button";

    function updateSaveButton() {
        const saved = isEventStored(SAVED_EVENTS_KEY, item);
        saveButton.textContent = saved ? "♥ Saved" : "♡ Save Event";
        saveButton.setAttribute("aria-pressed", String(saved));
    }

    saveButton.addEventListener("click", () => {
        toggleStoredEvent(SAVED_EVENTS_KEY, item);
        updateSaveButton();
    });

    const weekButton = document.createElement("button");
    weekButton.type = "button";
    weekButton.className = "save-button";

    function updateWeekButton() {
        const inWeek = isEventStored(WEEK_EVENTS_KEY, item);
        weekButton.textContent = inWeek
            ? "✓ Added to My Week"
            : "+ Add to My Week";
        weekButton.setAttribute("aria-pressed", String(inWeek));
    }

    weekButton.addEventListener("click", () => {
        toggleStoredEvent(WEEK_EVENTS_KEY, item);
        updateWeekButton();
    });

    updateSaveButton();
    updateWeekButton();

    actions.append(saveButton, weekButton);
    card.append(date, title, meta, time, location, description, link, actions);

    return card;
}

function filterEvents() {
    const query = eventQuery ? eventQuery.value.trim().toLowerCase() : "";
    const category = eventCategory ? eventCategory.value : "";
    const city = eventCity ? eventCity.value : "";

    visibleEvents = events.filter(item => {
        if (!item.date || !item.title) return false;
        if (getDate(item.date) < today) return false;

        const searchable = [
            item.title,
            item.category,
            item.city,
            item.location,
            item.description
        ].join(" ").toLowerCase();

        const matchesQuery = searchable.includes(query);

        const matchesCategory =
            !category ||
            category.toLowerCase() === "all" ||
            item.category.toLowerCase() === category.toLowerCase();

        const matchesCity =
            !city ||
            city.toLowerCase() === "all" ||
            item.city.toLowerCase() === city.toLowerCase();

        return matchesQuery && matchesCategory && matchesCity;
    });

    visibleEvents.sort((a, b) => a.date.localeCompare(b.date));

    displayEvents();
    renderCalendar();
}

function displayEvents() {
    if (!eventResults) return;

    eventResults.replaceChildren();

    if (eventCount) {
        eventCount.textContent =
            visibleEvents.length +
            (visibleEvents.length === 1
                ? " upcoming event found"
                : " upcoming events found");
    }

    if (visibleEvents.length === 0) {
        const message = document.createElement("p");
        message.textContent =
            "No upcoming events match those filters. Try changing your search.";
        eventResults.appendChild(message);
        return;
    }

    visibleEvents.forEach(item => {
        eventResults.appendChild(createEventCard(item));
    });
}

function showEventDetails(dayEvents) {
    if (!calendarDetails) return;

    calendarDetails.replaceChildren();
    calendarDetails.hidden = false;

    if (dayEvents.length === 0) {
        const message = document.createElement("p");
        message.textContent = "Select a date with an event to see its details.";
        calendarDetails.appendChild(message);
        return;
    }

    dayEvents.forEach(item => {
        const card = document.createElement("article");
        card.className = "resource-card";

        const title = document.createElement("h3");
        title.textContent = item.title;

        const date = document.createElement("p");
        date.textContent = formatDate(item.date);

        const time = document.createElement("p");
        time.textContent = formatTime(item.time);

        const location = document.createElement("p");
        location.textContent = item.location + ", " + item.city;

        const description = document.createElement("p");
        description.textContent = item.description;

        const link = document.createElement("a");
        link.className = "text-link";
        link.href = item.website;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Official event details ↗";

        card.append(title, date, time, location, description, link);
        calendarDetails.appendChild(card);
    });
}

function renderCalendar() {
    if (!calendarGrid || !calendarMonth) return;

    calendarGrid.replaceChildren();

    const year = displayedMonth.getFullYear();
    const month = displayedMonth.getMonth();

    calendarMonth.textContent = displayedMonth.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });

    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach(day => {
        const heading = document.createElement("div");
        heading.className = "calendar-weekday";
        heading.textContent = day;
        calendarGrid.appendChild(heading);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        empty.className = "calendar-day outside-month";
        calendarGrid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateString =
            year + "-" +
            String(month + 1).padStart(2, "0") + "-" +
            String(day).padStart(2, "0");

        const dayEvents = visibleEvents.filter(item => item.date === dateString);

        const cell = document.createElement("div");
        cell.className = "calendar-day";

        if (
            year === today.getFullYear() &&
            month === today.getMonth() &&
            day === today.getDate()
        ) {
            cell.classList.add("is-today");
        }

        const number = document.createElement("div");
        number.className = "calendar-day-number";
        number.textContent = day;
        cell.appendChild(number);

        dayEvents.forEach(item => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "calendar-event";
            button.textContent = item.title;
            button.title = item.title;
            button.addEventListener("click", () => {
                showEventDetails([item]);
            });
            cell.appendChild(button);
        });

        if (dayEvents.length > 0) {
            cell.classList.add("has-events");
            cell.addEventListener("click", event => {
                if (event.target.tagName !== "BUTTON") {
                    showEventDetails(dayEvents);
                }
            });
        }

        calendarGrid.appendChild(cell);
    }
}

if (eventQuery) eventQuery.addEventListener("input", filterEvents);
if (eventCategory) eventCategory.addEventListener("change", filterEvents);
if (eventCity) eventCity.addEventListener("change", filterEvents);

if (calendarPrev) {
    calendarPrev.addEventListener("click", () => {
        displayedMonth.setMonth(displayedMonth.getMonth() - 1);
        renderCalendar();
    });
}

if (calendarNext) {
    calendarNext.addEventListener("click", () => {
        displayedMonth.setMonth(displayedMonth.getMonth() + 1);
        renderCalendar();
    });
}

filterEvents();
