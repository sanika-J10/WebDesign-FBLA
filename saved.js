const savedContainer =
  document.querySelector("#saved-resources");

function renderSavedResources() {
  const ids = getSavedIds();

  const savedResources = resources.filter(resource =>
    ids.includes(resource.id)
  );

  if (savedResources.length === 0) {
    const message = document.createElement("p");
    message.textContent =
      "You haven't saved any resources yet. Explore the directory to build your shortlist.";

    savedContainer.replaceChildren(message);
    return;
  }

  renderResources(savedResources, savedContainer);
}

renderSavedResources();
