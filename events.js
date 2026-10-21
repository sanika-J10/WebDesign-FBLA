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
