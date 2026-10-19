
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

  const details = document.createElement("a");
  details.className = "text-link";
  details.href =
    `resources.html?id=${encodeURIComponent(resource.id)}`;
  details.textContent = "View details →";

  article.append(title, category, description, details);

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
