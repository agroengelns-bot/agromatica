document.addEventListener("DOMContentLoaded", () => {
  const box = document.createElement("div");
  box.style.position = "fixed";
  box.style.bottom = "10px";
  box.style.right = "10px";
  box.style.background = "#000";
  box.style.color = "#fff";
  box.style.padding = "6px 10px";
  box.style.fontSize = "12px";
  box.style.borderRadius = "6px";
  box.style.zIndex = "9999";

  box.textContent = "v-" + new Date().toISOString();
  document.body.appendChild(box);
});
