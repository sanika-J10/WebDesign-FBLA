
const queryInput = document.querySelector("#resource-query");
const categoryFilter = document.querySelector("#category-filter");
const cityFilter = document.querySelector("#city-filter");
const sortFilter = document.querySelector("#sort-filter");
const clearButton = document.querySelector("#clear-filters");
const resultsContainer = document.querySelector("#resource-results");
const resultsCount = document.querySelector("#results-count");

const parameters = new URLSearchParams(window.location.search);

queryInput.value = parameters.get("q") || "";
categoryFilter.value = parameters.get("category") || "";

const allowedCategories = [
  "",
  "Education",
  "Food & Essentials",
  "Recreation",
  "Volunteering"
];

if (!allowedCategories.includes(categoryFilter.value)) {
  categoryFilter.value = "";
}

function filterResources() {
  const query = queryInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedCity = cityFilter.value;
  const sortBy = sortFilter.value;

  let results = resources.filter(resource => {
    const searchableText = [
      resource.name,
      resource.category,
      resource.city,
      resource.description,
      resource.audience
    ].join(" ").toLowerCase();

    const matchesQuery = searchableText.includes(query);
    const matchesCategory =
      !selectedCategory ||
      resource.category === selectedCategory;
    const matchesCity =
      !selectedCity ||
      resource.city === selectedCity;

    return matchesQuery && matchesCategory && matchesCity;
  });

  results.sort((a, b) =>
    a[sortBy].localeCompare(b[sortBy])
  );

  if (results.length === 0) {
    renderEmptyState(
      resultsContainer,
      "No matching resources found. Try another keyword or clear your filters."
    );
  } else {
    renderResources(results, resultsContainer);
  }

  resultsCount.textContent =
    `${results.length} resource${results.length === 1 ? "" : "s"} found`;
}

queryInput.addEventListener("input", filterResources);
categoryFilter.addEventListener("change", filterResources);
cityFilter.addEventListener("change", filterResources);
sortFilter.addEventListener("change", filterResources);

clearButton.addEventListener("click", () => {
  queryInput.value = "";
  categoryFilter.value = "";
  cityFilter.value = "";
  sortFilter.value = "name";

  filterResources();
});

filterResources();


const detailContainer =
  document.querySelector("#resource-detail");

const requestedId = parameters.get("id");

if (requestedId) {
  const resource = resources.find(
    item => item.id === requestedId
  );

  // Hide the directory controls when viewing one resource.
  document.querySelector(".filter-panel").hidden = true;
  document.querySelector(".results-heading").hidden = true;
  resultsContainer.hidden = true;

  detailContainer.hidden = false;
  detailContainer.replaceChildren();

  if (!resource) {
    const message = document.createElement("p");
    message.textContent =
      "This resource could not be found. Please return to the directory.";

    const back = document.createElement("a");
    back.href = "resources.html";
    back.textContent = "← Back to resources";

    detailContainer.append(message, back);
  } else {
    const back = document.createElement("a");
    back.href = "resources.html";
    back.textContent = "← Back to all resources";

    const heading = document.createElement("h1");
    heading.textContent = resource.name;

    const category = document.createElement("p");
    category.className = "resource-meta";
    category.textContent =
      `${resource.category} · ${resource.city}`;

    const description = document.createElement("p");
    description.textContent = resource.description;

    const audience = document.createElement("p");
    audience.textContent = `Who it's for: ${resource.audience}`;

    const cost = document.createElement("p");
    cost.textContent = `Cost: ${resource.cost}`;

    const website = document.createElement("a");
    website.href = resource.website;
    website.target = "_blank";
    website.rel = "noopener noreferrer";
    website.textContent = "Visit official website ↗";

    detailContainer.append(
      back, heading, category, description,
      audience, cost, website
    );

    detailContainer.classList.add("detail-panel");
  }
}
