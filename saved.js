const savedResourcesContainer = document.querySelector("#saved-resources");
const savedEventsContainer = document.querySelector("#saved-events");
const weekContainer = document.querySelector("#week-items");

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

function saveStoredEvents(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
}

function getEventKey(item) {
    return `${item.title}|${item.date}`;
}

function removeStoredEvent(key, item) {
    const updated = getStoredEvents(key).filter(
        saved => getEventKey(saved) !== getEventKey(item)
    );

    saveStoredEvents(key, updated);
    renderSavedPage();
}

function createEventListCard(item, listType) {
    const card = document.createElement("article");
    card.className = "resource-card";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const meta = document.createElement("p");
    meta.className = "resource-meta";
    meta.textContent = [
        item.category,
        item.city,
        item.date
    ].filter(Boolean).join(" · ");

    const description = document.createElement("p");
    description.textContent = item.description || "";

    card.append(title, meta, description);

    if (item.time) {
        const time = document.createElement("p");
        time.textContent = `Time: ${item.time}`;
        card.appendChild(time);
    }

    if (item.location) {
        const location = document.createElement("p");
        location.textContent = `Location: ${item.location}`;
        card.appendChild(location);
    }

    if (item.website) {
        const link = document.createElement("a");
        link.className = "text-link";
        link.href = item.website;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Official event details ↗";
        card.appendChild(link);
    }

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "save-button";
    removeButton.textContent = listType === "week"
        ? "Remove from My Week"
        : "Remove saved event";

    removeButton.addEventListener("click", () => {
        const key = listType === "week"
            ? WEEK_EVENTS_KEY
            : SAVED_EVENTS_KEY;

        removeStoredEvent(key, item);
    });

    card.appendChild(removeButton);
    return card;
}

function renderEventList(container, items, emptyMessage, listType) {
    if (!container) return;

    container.replaceChildren();

    if (items.length === 0) {
        const message = document.createElement("p");
        message.className = "empty-state";
        message.textContent = emptyMessage;
        container.appendChild(message);
        return;
    }

    items.forEach(item => {
        container.appendChild(createEventListCard(item, listType));
    });
}

function renderSavedPage() {
    // Keep the existing resource-saving system.
    if (
        savedResourcesContainer &&
        typeof resources !== "undefined" &&
        typeof getSavedIds === "function" &&
        typeof renderResources === "function"
    ) {
        const ids = getSavedIds();
        const savedResources = resources.filter(resource =>
            ids.includes(resource.id)
        );

        if (savedResources.length === 0) {
            const message = document.createElement("p");
            message.className = "empty-state";
            message.textContent =
                "You haven't saved any resources yet. Explore the directory to build your shortlist.";
            savedResourcesContainer.replaceChildren(message);
        } else {
            renderResources(savedResources, savedResourcesContainer);
        }
    }

    // Display saved events.
    const savedEvents = getStoredEvents(SAVED_EVENTS_KEY);
    savedEvents.sort((a, b) => a.date.localeCompare(b.date));

    renderEventList(
        savedEventsContainer,
        savedEvents,
        "You haven't saved any events yet. Browse upcoming events to find something you like.",
        "saved"
    );

    // Display My Week, sorted by date.
    const weekEvents = getStoredEvents(WEEK_EVENTS_KEY);
    weekEvents.sort((a, b) => a.date.localeCompare(b.date));

    renderEventList(
        weekContainer,
        weekEvents,
        "Your week is empty. Add events from the Events page!",
        "week"
    );
}

document.addEventListener("DOMContentLoaded", renderSavedPage);
