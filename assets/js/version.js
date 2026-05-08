document.addEventListener("DOMContentLoaded", () => {
  const box = document.createElement("div");
  box.className = "version-badge";
  box.textContent = "v-" + new Date().toISOString();
  document.body.appendChild(box);
});
