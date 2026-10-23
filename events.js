const eventQuery = document.querySelector("#event-query");
const eventCategory = document.querySelector("#event-category");
const eventCity = document.querySelector("#event-city");
const eventResults = document.querySelector("#event-results");
const eventCount = document.querySelector("#event-count");

function createEventCard(eventItem) {
  const article = document.createElement("article");
  article.className = "resource-card";

  const date = document.createElement("p");
  date.className = "eyebrow";

  // Use local date formatting to avoid timezone date shifts.
  const [year, month, day] = eventItem.date.split("-").map(Number);
  const eventDate = new Date(year, month - 1, day);

  date.textContent = eventDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  const title = document.createElement("h3");
  title.textContent = eventItem.name;

  const meta = document.createElement("p");
  meta.className = "resource-meta";
  meta.textContent =
    `${eventItem.category} · ${eventItem.city}`;

  const description = document.createElement("p");
  description.textContent = eventItem.description;

  const link = document.createElement("a");
  link.className = "text-link";
  link.href = eventItem.website;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Official event details ↗";

  article.append(date, title, meta, description, link);

  return article;
}

function filterEvents() {
  const query = eventQuery.value.trim().toLowerCase();

  const category = eventCategory.value;
  const city = eventCity.value;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = events.filter(eventItem => {
    const [year, month, day] =
      eventItem.date.split("-").map(Number);

    const date = new Date(year, month - 1, day);

    return date >= today;
  });

  const matching = upcoming.filter(eventItem => {
    const searchable = [
      eventItem.name,
      eventItem.category,
      eventItem.city,
      eventItem.description
    ].join(" ").toLowerCase();

    return searchable.includes(query)
      && (!category || eventItem.category === category)
      && (!city || eventItem.city === city);
  });

  matching.sort((a, b) => a.date.localeCompare(b.date));

  eventResults.replaceChildren();

  if (matching.length === 0) {
    renderEmptyState(
      eventResults,
      "No upcoming events match those filters. Try another search."
    );
  } else {
    matching.forEach(item => {
      eventResults.appendChild(createEventCard(item));
    });
  }

  eventCount.textContent =
    `${matching.length} upcoming event${matching.length === 1 ? "" : "s"} found`;
}

eventQuery.addEventListener("input", filterEvents);
eventCategory.addEventListener("change", filterEvents);
eventCity.addEventListener("change", filterEvents);

filterEvents();

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("calendar-grid");
  const monthLabel = document.getElementById("calendar-month");
  const prevButton = document.getElementById("calendar-prev");
  const nextButton = document.getElementById("calendar-next");
  const details = document.getElementById("calendar-event-details");

  // If this isn't the events page, do nothing.
  if (!grid || !monthLabel || !prevButton || !nextButton || !details) {
    return;
  }

  // DEMO DATA: Replace these with verified local events.
  // Use YYYY-MM-DD for dates and 24-hour HH:MM for times.
  const events = [
    {
      id: 1,
      name: "Community Storytime",
      date: "2026-10-24",
      time: "10:00",
      category: "education",
      location: "Cumming Library",
      description: "A community reading activity.",
      source: "https://events.forsythpl.org/"
    },
    {
      id: 2,
      name: "Community Park Cleanup",
      date: "2026-10-25",
      time: "09:00",
      category: "volunteering",
      location: "Cumming, GA",
      description: "A sample volunteer event. Verify the actual date and location.",
      source: "https://www.keepforsythcountybeautiful.org/events-1"
    },
    {
      id: 3,
      name: "Family Recreation Day",
      date: "2026-10-28",
      time: "14:00",
      category: "recreation",
      location: "Alpharetta, GA",
      description: "A sample recreation event. Verify the actual schedule.",
      source: "https://www.alpharetta.ga.us/"
    },
    {
      id: 4,
      name: "Community Food Drive",
      date: "2026-10-30",
      time: "11:00",
      category: "food",
      location: "Cumming, GA",
      description: "A sample food drive. Verify the actual date and arrangements.",
      source: "https://www.theplacega.org/"
    },
    {
      id: 5,
      name: "Community Arts Workshop",
      date: "2026-11-05",
      time: "16:30",
      category: "community",
      location: "Alpharetta, GA",
      description: "A sample community activity. Verify the actual schedule.",
      source: "https://www.fulcolibrary.org/locations/alph/"
    }
  ];

  const categories = {
    education: "Education",
    food: "Food & Essentials",
    recreation: "Parks & Recreation",
    volunteering: "Volunteering",
    community: "Community"
  };

  // Start on the current month.
  const today = new Date();
  let displayedYear = today.getFullYear();
  let displayedMonth = today.getMonth();

  function formatTime(time) {
    const [hour, minute] = time.split(":").map(Number);
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;

    return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
  }

  function showEvent(event) {
    details.replaceChildren();
    details.hidden = false;

    const heading = document.createElement("h3");
    heading.textContent = event.name;

    const category = document.createElement("p");
    category.className = "calendar-detail-category";

    const dot = document.createElement("i");
    dot.className = `event-dot ${event.category}`;

    category.append(dot);
    category.append(
      document.createTextNode(categories[event.category] || "Community")
    );

    const date = new Date(`${event.date}T12:00:00`);
    const dateText = date.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    const when = document.createElement("p");
    when.textContent = `${dateText} · ${formatTime(event.time)}`;

    const location = document.createElement("p");
    location.textContent = `Location: ${event.location}`;

    const description = document.createElement("p");
    description.textContent = event.description;

    details.append(heading, category, when, location, description);

    if (event.source) {
      const link = document.createElement("a");
      link.href = event.source;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "View official source";
      details.append(link);
    }

    details.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  function renderCalendar() {
    grid.replaceChildren();

    monthLabel.textContent = new Date(
      displayedYear,
      displayedMonth,
      1
    ).toLocaleDateString(undefined, {
      month: "long",
      year: "numeric"
    });

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    weekdays.forEach((day) => {
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

    // Six rows keep the calendar height consistent.
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

      if (cellDate === [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
      ].join("-")) {
        cell.classList.add("is-today");
      }

      const number = document.createElement("div");
      number.className = "calendar-day-number";
      number.textContent = dayNumber;
      cell.append(number);

      // Only show events in the month currently being viewed.
      const dayEvents = outsideMonth
        ? []
        : events
            .filter((event) => event.date === cellDate)
            .sort((a, b) => a.time.localeCompare(b.time));

      dayEvents.forEach((event) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "calendar-event";
        button.setAttribute(
          "aria-label",
          `${formatTime(event.time)}: ${event.name}`
        );
        button.title = `${formatTime(event.time)} — ${event.name}`;

        const dot = document.createElement("i");
        dot.className = `event-dot ${event.category}`;

        const label = document.createElement("span");
        label.className = "calendar-event-label";

        const time = document.createElement("span");
        time.className = "calendar-event-time";
        time.textContent = formatTime(event.time);

        const name = document.createElement("span");
        name.textContent = event.name;

        label.append(time, name);
        button.append(dot, label);

        button.addEventListener("click", () => showEvent(event));
        cell.append(button);
      });

      grid.append(cell);
    }
  }

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

  renderCalendar();
});
