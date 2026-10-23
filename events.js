const eventQuery = document.querySelector("#event-query");
const eventCategory = document.querySelector("#event-category");
const eventCity = document.querySelector("#event-city");
const eventResults = document.querySelector("#event-results");
const eventCount = document.querySelector("#event-count");

let visibleEvents = events;
let renderCalendar = () => {};

function getCategoryKey(category) {
  const value = String(category || "").toLowerCase();

  if (value.includes("food")) return "food";
  if (value.includes("recreation") || value.includes("park")) {
    return "recreation";
  }
  if (value.includes("volunteer")) return "volunteering";
  if (value.includes("education") || value.includes("learning")) {
    return "education";
  }

  return "community";
}

function formatEventTime(time) {
  if (!time) return "Time not listed";

  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function getEventWebsite(event) {
  return event.website || event.source || "";
}

function getEventLocation(event) {
  return event.location || event.city || "Location not listed";
}

function getEventDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function createEventCard(eventItem) {
  const article = document.createElement("article");
  article.className = "resource-card";

  const date = document.createElement("p");
  date.className = "eyebrow";
  date.textContent = getEventDate(eventItem.date).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric"
    }
  );

  const title = document.createElement("h3");
  title.textContent = eventItem.name;

  const meta = document.createElement("p");
  meta.className = "resource-meta";
  meta.textContent =
    `${eventItem.category} · ${eventItem.city}`;

  const description = document.createElement("p");
  description.textContent = eventItem.description;

  article.append(date, title, meta, description);

  const time = document.createElement("p");
  time.textContent = formatEventTime(eventItem.time);
  article.append(time);

  const website = getEventWebsite(eventItem);

  if (website) {
    const link = document.createElement("a");
    link.className = "text-link";
    link.href = website;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Official event details ↗";
    article.append(link);
  }

  return article;
}

function filterEvents() {
  const query = eventQuery.value.trim().toLowerCase();
  const selectedCategory = eventCategory.value;
  const selectedCity = eventCity.value;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = events.filter(eventItem => {
    if (!eventItem.date || !eventItem.name) return false;

    return getEventDate(eventItem.date) >= today;
  });

  visibleEvents = upcoming.filter(eventItem => {
    const searchable = [
      eventItem.name,
      eventItem.category,
      eventItem.city,
      eventItem.location,
      eventItem.description
    ].join(" ").toLowerCase();

    const matchesSearch = searchable.includes(query);

    const matchesCategory =
      !selectedCategory ||
      getCategoryKey(eventItem.category) ===
        getCategoryKey(selectedCategory);

    const matchesCity =
      !selectedCity || eventItem.city === selectedCity;

    return matchesSearch && matchesCategory && matchesCity;
  });

  visibleEvents.sort((a, b) => {
    const dateComparison = a.date.localeCompare(b.date);

    if (dateComparison !== 0) return dateComparison;

    return (a.time || "23:59").localeCompare(b.time || "23:59");
  });

  eventResults.replaceChildren();

  if (visibleEvents.length === 0) {
    const message = document.createElement("p");
    message.textContent =
      "No upcoming events match those filters. Try another search.";
    eventResults.append(message);
  } else {
    visibleEvents.forEach(eventItem => {
      eventResults.appendChild(createEventCard(eventItem));
    });
  }

  eventCount.textContent =
    `${visibleEvents.length} upcoming event` +
    `${visibleEvents.length === 1 ? "" : "s"} found`;

  // Keep the calendar in sync with the same filtered event list.
  renderCalendar();
}

eventQuery.addEventListener("input", filterEvents);
eventCategory.addEventListener("change", filterEvents);
eventCity.addEventListener("change", filterEvents);

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("calendar-grid");
  const monthLabel = document.getElementById("calendar-month");
  const prevButton = document.getElementById("calendar-prev");
  const nextButton = document.getElementById("calendar-next");
  const details = document.getElementById("calendar-event-details");

  if (!grid || !monthLabel || !prevButton || !nextButton || !details) {
    return;
  }

  const categories = {
    education: "Education",
    food: "Food & Essentials",
    recreation: "Parks & Recreation",
    volunteering: "Volunteering",
    community: "Community"
  };

  const today = new Date();
  let displayedYear = today.getFullYear();
  let displayedMonth = today.getMonth();

  function showEvent(event) {
    details.replaceChildren();
    details.hidden = false;

    const heading = document.createElement("h3");
    heading.textContent = event.name;

    const categoryKey = getCategoryKey(event.category);

    const category = document.createElement("p");
    category.className = "calendar-detail-category";

    const dot = document.createElement("i");
    dot.className = `event-dot ${categoryKey}`;

    category.append(dot);
    category.append(
      document.createTextNode(
        categories[categoryKey] || "Community"
      )
    );

    const date = document.createElement("p");
    date.textContent =
      getEventDate(event.date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      });

    const when = document.createElement("p");
    when.textContent = `Time: ${formatEventTime(event.time)}`;

    const location = document.createElement("p");
    location.textContent = `Location: ${getEventLocation(event)}`;

    const description = document.createElement("p");
    description.textContent = event.description || "";

    details.append(
      heading,
      category,
      date,
      when,
      location,
      description
    );

    const website = getEventWebsite(event);

    if (website) {
      const link = document.createElement("a");
      link.href = website;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "View official source ↗";
      details.append(link);
    }

    details.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  renderCalendar = function () {
    grid.replaceChildren();

    monthLabel.textContent = new Date(
      displayedYear,
      displayedMonth,
      1
    ).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    });

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    weekdays.forEach(day => {
      const heading = document.createElement("div");
      heading.className = "calendar-weekday";
      heading.textContent = day;
      grid.append(heading);
    });

    const firstDay = new Date(
      displayedYear,
      displayedMonth,
      1
    ).getDay();

    const daysInMonth = new Date(
      displayedYear,
      displayedMonth + 1,
      0
    ).getDate();

    const previousMonthDays = new Date(
      displayedYear,
      displayedMonth,
      0
    ).getDate();

    for (let index = 0; index < 42; index++) {
      let dayNumber;
      let cellMonth = displayedMonth;
      let cellYear = displayedYear;
      let outsideMonth = false;

      if (index < firstDay) {
        dayNumber = previousMonthDays - firstDay + index + 1;
        outsideMonth = true;
        cellMonth--;

        if (cellMonth < 0) {
          cellMonth = 11;
          cellYear--;
        }
      } else if (index >= firstDay + daysInMonth) {
        dayNumber = index - firstDay - daysInMonth + 1;
        outsideMonth = true;
        cellMonth++;

        if (cellMonth > 11) {
          cellMonth = 0;
          cellYear++;
        }
      } else {
        dayNumber = index - firstDay + 1;
      }

      const cellDate = [
        cellYear,
        String(cellMonth + 1).padStart(2, "0"),
        String(dayNumber).padStart(2, "0")
      ].join("-");

      const cell = document.createElement("div");
      cell.className = "calendar-day";

      if (outsideMonth) {
        cell.classList.add("outside-month");
      }

      const todayString = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
      ].join("-");

      if (cellDate === todayString) {
        cell.classList.add("is-today");
      }

      const number = document.createElement("div");
      number.className = "calendar-day-number";
      number.textContent = dayNumber;
      cell.append(number);

      const dayEvents = outsideMonth
        ? []
        : visibleEvents
            .filter(event => event.date === cellDate)
            .sort((a, b) =>
              (a.time || "23:59").localeCompare(b.time || "23:59")
            );

      dayEvents.forEach(event => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "calendar-event";

        const timeText = formatEventTime(event.time);

        button.setAttribute(
          "aria-label",
          `${timeText}: ${event.name}`
        );
        button.title = `${timeText} — ${event.name}`;

        const dot = document.createElement("i");
        dot.className = `event-dot ${getCategoryKey(event.category)}`;

        const label = document.createElement("span");
        label.className = "calendar-event-label";

        const time = document.createElement("span");
        time.className = "calendar-event-time";
        time.textContent = event.time
          ? formatEventTime(event.time)
          : "";

        const name = document.createElement("span");
        name.textContent = event.name;

        label.append(time, name);
        button.append(dot, label);

        button.addEventListener("click", () => showEvent(event));
        cell.append(button);
      });

      grid.append(cell);
    }
  };

  prevButton.addEventListener("click", () => {
    displayedMonth--;

    if (displayedMonth < 0) {
      displayedMonth = 11;
      displayedYear--;
    }

    details.hidden = true;
    renderCalendar();
  });

  nextButton.addEventListener("click", () => {
    displayedMonth++;

    if (displayedMonth > 11) {
      displayedMonth = 0;
      displayedYear++;
    }

    details.hidden = true;
    renderCalendar();
  });

  // Initial calendar display.
  filterEvents();
});
