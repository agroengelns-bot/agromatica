document.addEventListener("DOMContentLoaded", () => {
  const existing = document.querySelector(".version-badge");
  if (existing) existing.remove();

  const box = document.createElement("div");
  box.className = "version-badge";
  box.textContent = "Konfigurator V15";
  document.body.appendChild(box);
});
