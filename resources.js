const queryInput = document.querySelector("#resource-query");
const categoryFilter = document.querySelector("#category-filter");
const cityFilter = document.querySelector("#city-filter");
const sortFilter = document.querySelector("#sort-filter");
const clearButton = document.querySelector("#clear-filters");
const resultsContainer = document.querySelector("#resource-results");
const resultsCount = document.querySelector("#results-count");
const detailContainer = document.querySelector("#resource-detail");

const parameters = new URLSearchParams(window.location.search);

queryInput.value = parameters.get("q") || "";
categoryFilter.value = parameters.get("category") || "";

const allowedCategories = [
  "",
  "Education",
  "Food & Essentials",
  "Financial Assistance",
  "Recreation",
  "Volunteering"
];

if (!allowedCategories.includes(categoryFilter.value)) {
  categoryFilter.value = "";
}

function filterResources() {
  const query = queryInput.value.trim().toLowerCase();
  const organizationId = parameters.get("organization");
  const selectedCategory = categoryFilter.value;
  const selectedCity = cityFilter.value;
  const sortBy = sortFilter.value;

  let results = resources.filter(resource => {
    const searchableText = [
      resource.name,
      resource.category,
      resource.city,
      resource.description,
      resource.audience,
      resource.cost,
      resource.address,
      resource.eligibility,
      resource.appointment,
      resource.importantNote,
      resource.phone,
      ...(resource.serviceArea || []),
      ...(resource.services || []),
      ...(resource.tags || []),
      ...Object.keys(resource.hours || {}),
      ...Object.values(resource.hours || {})
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesQuery = searchableText.includes(query);

    const matchesCategory =
      !selectedCategory ||
      resource.category === selectedCategory;

    const matchesCity =
      !selectedCity ||
      resource.city === selectedCity;

    const matchesOrganization =
      !organizationId ||
      resource.organizationId === organizationId;

    return (
      matchesQuery &&
      matchesCategory &&
      matchesCity &&
      matchesOrganization
);
  });

  results.sort((a, b) =>
    String(a[sortBy] || "").localeCompare(
      String(b[sortBy] || "")
    )
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

function addTextElement(parent, tag, text, className = "") {
  if (!text) return;

  const element = document.createElement(tag);
  element.textContent = text;

  if (className) {
    element.className = className;
  }

  parent.appendChild(element);
}

function addSection(parent, headingText) {
  const section = document.createElement("section");
  section.className = "detail-section";

  const heading = document.createElement("h2");
  heading.textContent = headingText;

  section.appendChild(heading);
  parent.appendChild(section);

  return section;
}

function addExternalLink(parent, label, url, className = "text-link") {
  if (!url || !/^https?:\/\//i.test(url)) return;

  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = label;
  link.className = className;

  parent.appendChild(link);
}

function addPhoneLink(parent, phone) {
  if (!phone) return;

  const paragraph = document.createElement("p");
  paragraph.append("Phone: ");

  const link = document.createElement("a");
  link.href = `tel:${phone.replace(/[^\d+]/g, "")}`;
  link.textContent = phone;

  paragraph.appendChild(link);
  parent.appendChild(paragraph);
}

function addList(parent, items) {
  if (!Array.isArray(items) || items.length === 0) return;

  const list = document.createElement("ul");

  items.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.appendChild(listItem);
  });

  parent.appendChild(list);
}

function renderResourceDetail(resource) {
  detailContainer.replaceChildren();
  detailContainer.hidden = false;
  detailContainer.classList.add("detail-panel");

  const back = document.createElement("a");
  back.href = "resources.html";
  back.textContent = "← Back to all resources";
  back.className = "text-link";

  const heading = document.createElement("h1");
  heading.textContent = resource.name;

  const category = document.createElement("p");
  category.className = "resource-meta";
  category.textContent = `${resource.category} · ${resource.city}`;

  detailContainer.append(back, heading, category);
  const organization = (organizations || []).find(
    item => item.id === resource.organizationId
  );

  if (organization) {
    const organizationSection = addSection(
      detailContainer,
      "Part of this organization"
    );

    addTextElement(
      organizationSection,
      "p",
      organization.name
    );

    addTextElement(
      organizationSection,
      "p",
      organization.description
    );

    addExternalLink(
      organizationSection,
      "View all library programs →",
      "resources.html?organization=" + organization.id
    );

    addExternalLink(
      organizationSection,
      "Visit official library website ↗",
      organization.website
    );
  }

  addTextElement(detailContainer, "p", resource.description);

  // Main action link, such as an interest form or service information.
  if (resource.actionUrl) {
    const actionSection = addSection(detailContainer, "Get started");

    addExternalLink(
      actionSection,
      resource.actionLabel || "Get more information",
      resource.actionUrl,
      "primary-button"
    );
  }

  // Contact information.
  const contactSection = addSection(detailContainer, "Contact & location");

  addTextElement(contactSection, "p", resource.address
    ? `Address: ${resource.address}`
    : "");

  addPhoneLink(contactSection, resource.phone);

  if (resource.website) {
    addExternalLink(
      contactSection,
      "Visit official website ↗",
      resource.website
    );
  }

  // Audience, cost, and eligibility.
  const eligibilitySection = addSection(
    detailContainer,
    "Eligibility & cost"
  );

  addTextElement(
    eligibilitySection,
    "p",
    resource.audience ? `Who it's for: ${resource.audience}` : ""
  );

  addTextElement(
    eligibilitySection,
    "p",
    resource.cost ? `Cost: ${resource.cost}` : ""
  );

  addTextElement(
    eligibilitySection,
    "p",
    resource.eligibility
      ? `Eligibility details: ${resource.eligibility}`
      : ""
  );

  if (resource.serviceArea?.length) {
    addTextElement(
      eligibilitySection,
      "h3",
      "Service area"
    );

    addList(eligibilitySection, resource.serviceArea);
  }

  // Appointment requirements and important notes.
  if (resource.appointment || resource.importantNote) {
    const notesSection = addSection(
      detailContainer,
      "Before you go"
    );

    if (resource.appointment) {
      addTextElement(
        notesSection,
        "p",
        resource.appointment,
        "important-note"
      );
    }

    if (resource.importantNote) {
      addTextElement(
        notesSection,
        "p",
        resource.importantNote
      );
    }
  }

  // Opening hours.
  if (resource.hours) {
    const hoursSection = addSection(
      detailContainer,
      "Hours"
    );

    const hoursList = document.createElement("ul");

    Object.entries(resource.hours).forEach(([day, hours]) => {
      const item = document.createElement("li");
      item.textContent = `${day}: ${hours}`;
      hoursList.appendChild(item);
    });

    hoursSection.appendChild(hoursList);
  }

  // Services and available items.
  if (resource.services?.length) {
    const servicesSection = addSection(
      detailContainer,
      "Available items & services"
    );

    addList(servicesSection, resource.services);
  }

  // Source for checking current information.
  if (resource.source) {
    const sourceSection = addSection(
      detailContainer,
      "Information source"
    );

    addExternalLink(
      sourceSection,
      "Check the source ↗",
      resource.source
    );
  }

  const reminder = document.createElement("p");
  reminder.className = "resource-meta";
  reminder.textContent =
    "Details can change. Contact the provider to confirm current hours, eligibility, and requirements.";

  detailContainer.appendChild(reminder);
}

const requestedId = parameters.get("id");

if (requestedId) {
  document.querySelector(".filter-panel").hidden = true;
  document.querySelector(".results-heading").hidden = true;
  resultsContainer.hidden = true;

  detailContainer.hidden = false;

  const resource = resources.find(
    item => item.id === requestedId
  );

  if (resource) {
    renderResourceDetail(resource);
  } else {
    detailContainer.replaceChildren();

    addTextElement(
      detailContainer,
      "h1",
      "Resource not found"
    );

    addTextElement(
      detailContainer,
      "p",
      "This resource could not be found. Please return to the directory."
    );

    const back = document.createElement("a");
    back.href = "resources.html";
    back.textContent = "← Back to resources";

    detailContainer.appendChild(back);
  }
} else {
  filterResources();
}
