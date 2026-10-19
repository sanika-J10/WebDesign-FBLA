
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
