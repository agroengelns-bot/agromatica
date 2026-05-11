document.addEventListener("DOMContentLoaded", () => {
  let box = document.querySelector(".version-badge");
  if (!box) {
    box = document.createElement("div");
    box.className = "version-badge";
    document.body.appendChild(box);
  }
  box.textContent = "Konfigurator V17";
});
