let visibleEvents = events;

const eventQuery = document.getElementById("event-query");
const eventCategory = document.getElementById("event-category");
const eventCity = document.getElementById("event-city");
const eventCount = document.getElementById("event-count");
const eventResults = document.getElementById("event-results");

const calendarGrid = document.getElementById("calendar-grid");
const calendarMonth = document.getElementById("calendar-month");
const calendarPrev = document.getElementById("calendar-prev");
const calendarNext = document.getElementById("calendar-next");
const calendarEventDetails = document.getElementById("calendar-event-details");

const today = new Date();
today.setHours(0, 0, 0, 0);

let currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

function getEventDate(dateString) {
    const parts = dateString.split("-");
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
}

function getCategoryKey(category) {
    return category.toLowerCase().replace(/\s+/g, "-");
}

function formatEventDate(dateString) {
    return getEventDate(dateString).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}

function formatEventTime(timeString) {
    if (!timeString) return "Time not listed";

    const parts = timeString.split(":");
    const date = new Date();
    date.setHours(Number(parts[0]), Number(parts[1]), 0, 0);

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });
}

function createEventCard(eventItem) {
    const card = document.createElement("article");
    card.className = "event-card";

    const category = document.createElement("p");
    category.className = "event-category";
    category.textContent = eventItem.category;

    const title = document.createElement("h3");
    title.textContent = eventItem.title;

    const date = document.createElement("p");
    date.textContent = formatEventDate(eventItem.date);

    const time = document.createElement("p");
    time.textContent = formatEventTime(eventItem.time);

    const location = document.createElement("p");
    location.textContent = eventItem.location + ", " + eventItem.city;

    const description = document.createElement("p");
    description.textContent = eventItem.description;

    const link = document.createElement("a");
    link.href = eventItem.website;
    link.textContent = "Event details";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    card.appendChild(category);
    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(time);
    card.appendChild(location);
    card.appendChild(description);
    card.appendChild(link);

    return card;
}

function filterEvents() {
    const query = eventQuery.value.trim().toLowerCase();
    const selectedCategory = eventCategory.value;
    const selectedCity = eventCity.value;

    visibleEvents = events.filter(eventItem => {
        if (!eventItem.date || !eventItem.title) return false;

        if (getEventDate(eventItem.date) < today) return false;

        const matchesQuery =
            eventItem.title.toLowerCase().includes(query) ||
            eventItem.description.toLowerCase().includes(query) ||
            eventItem.location.toLowerCase().includes(query) ||
            eventItem.city.toLowerCase().includes(query) ||
            eventItem.category.toLowerCase().includes(query);

        const matchesCategory =
            selectedCategory === "all" ||
            getCategoryKey(eventItem.category) === selectedCategory;

        const matchesCity =
            selectedCity === "all" ||
            eventItem.city === selectedCity;

        return matchesQuery && matchesCategory && matchesCity;
    });

    displayEvents();
    renderCalendar();
}

function displayEvents() {
    eventResults.innerHTML = "";

    eventCount.textContent =
        visibleEvents.length + (visibleEvents.length === 1 ? " event found" : " events found");

    if (visibleEvents.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No upcoming events match your search. Try changing your filters.";
        eventResults.appendChild(message);
        return;
    }

    visibleEvents.forEach(eventItem => {
        eventResults.appendChild(createEventCard(eventItem));
    });
}

function renderCalendar() {
    calendarGrid.innerHTML = "";

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    calendarMonth.textContent = currentMonth.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    dayNames.forEach(day => {
        const heading = document.createElement("div");
        heading.className = "calendar-day-name";
        heading.textContent = day;
        calendarGrid.appendChild(heading);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement("div");
        emptyDay.className = "calendar-day empty";
        calendarGrid.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateString =
            year + "-" +
            String(month + 1).padStart(2, "0") + "-" +
            String(day).padStart(2, "0");

        const dayEvents = visibleEvents.filter(eventItem =>
            eventItem.date === dateString
        );

        const dayButton = document.createElement("button");
        dayButton.type = "button";
        dayButton.className = "calendar-day";
        dayButton.textContent = day;

        if (
            year === today.getFullYear() &&
            month === today.getMonth() &&
            day === today.getDate()
        ) {
            dayButton.classList.add("today");
        }

        if (dayEvents.length > 0) {
            dayButton.classList.add("has-events");
            dayButton.setAttribute(
                "aria-label",
                day + " " + (dayEvents.length === 1 ? "event" : "events")
            );

            dayButton.addEventListener("click", () => {
                showEventDetails(dayEvents);
            });

            dayButton.title = dayEvents.map(eventItem => eventItem.title).join(", ");
        } else {
            dayButton.addEventListener("click", () => {
                showEventDetails([]);
            });
        }

        calendarGrid.appendChild(dayButton);
    }
}

function showEventDetails(dayEvents) {
    calendarEventDetails.innerHTML = "";

    if (dayEvents.length === 0) {
        const message = document.createElement("p");
        message.textContent = "Select a date with an event to see its details.";
        calendarEventDetails.appendChild(message);
        return;
    }

    dayEvents.forEach(eventItem => {
        const card = document.createElement("article");
        card.className = "calendar-event";

        const heading = document.createElement("h3");
        heading.textContent = eventItem.title;

        const date = document.createElement("p");
        date.textContent = formatEventDate(eventItem.date);

        const time = document.createElement("p");
        time.textContent = formatEventTime(eventItem.time);

        const location = document.createElement("p");
        location.textContent = eventItem.location + ", " + eventItem.city;

        const description = document.createElement("p");
        description.textContent = eventItem.description;

        const link = document.createElement("a");
        link.href = eventItem.website;
        link.textContent = "Event details";
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        card.appendChild(heading);
        card.appendChild(date);
        card.appendChild(time);
        card.appendChild(location);
        card.appendChild(description);
        card.appendChild(link);

        calendarEventDetails.appendChild(card);
    });
}

eventQuery.addEventListener("input", filterEvents);
eventCategory.addEventListener("change", filterEvents);
eventCity.addEventListener("change", filterEvents);

calendarPrev.addEventListener("click", () => {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    renderCalendar();
});

calendarNext.addEventListener("click", () => {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    renderCalendar();
});

filterEvents();
