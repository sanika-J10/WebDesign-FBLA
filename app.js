function createResourceCard(resource) {
  const article = document.createElement("article");
  article.className = "resource-card";

  const title = document.createElement("h3");
  title.textContent = resource.name;

  const category = document.createElement("p");
  category.className = "resource-meta";
  category.textContent =
    `${resource.category} · ${resource.city}`;

  const description = document.createElement("p");
  description.textContent = resource.description;

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const details = document.createElement("a");
  details.className = "text-link";
  details.href =
    `resources.html?id=${encodeURIComponent(resource.id)}`;
  details.textContent = "View details →";

  const saveButton = document.createElement("button");
  saveButton.className = "save-button";

  function updateButton() {
    const isSaved = getSavedIds().includes(resource.id);

    saveButton.textContent = isSaved
      ? "♥ Saved"
      : "♡ Save";

    saveButton.setAttribute("aria-pressed", String(isSaved));
    saveButton.setAttribute(
      "aria-label",
      `${isSaved ? "Remove" : "Save"} ${resource.name}`
    );
  }

  saveButton.addEventListener("click", () => {
    toggleSaved(resource.id);
    updateButton();
  });

  updateButton();

  actions.append(details, saveButton);
  article.append(title, category, description, actions);

  return article;
}

function renderResources(list, container) {
  container.replaceChildren();

  list.forEach(resource => {
    container.appendChild(createResourceCard(resource));
  });
}

function renderEmptyState(container, message) {
  const paragraph = document.createElement("p");
  paragraph.className = "empty-state";
  paragraph.textContent = message;
  container.replaceChildren(paragraph);
}

const featuredContainer =
  document.querySelector("#featured-resources");

if (featuredContainer && typeof resources !== "undefined") {
  const featured = resources.filter(resource =>
    resource.featured
  );

  renderResources(featured, featuredContainer);
}

const homeSearch = document.querySelector("#home-search");

if (homeSearch) {
  homeSearch.addEventListener("submit", event => {
    event.preventDefault();

    const query = document
      .querySelector("#home-query")
      .value.trim();

    const destination = query
      ? `resources.html?q=${encodeURIComponent(query)}`
      : "resources.html";

    window.location.href = destination;
  });
}

function getSavedIds() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("commonground-saved") || "[]"
    );

    return Array.isArray(saved)
      ? saved.filter(id => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

function saveIds(ids) {
  localStorage.setItem(
    "commonground-saved",
    JSON.stringify(ids)
  );
}

function toggleSaved(id) {
  const saved = getSavedIds();

  const updated = saved.includes(id)
    ? saved.filter(savedId => savedId !== id)
    : [...saved, id];

  saveIds(updated);
}
