const productPresets = {
  "100": {
    name: "100 Nm – Gehäuse mit Haube",
    layers: {
      base: { visible: true, x: 0, y: 188, scale: 100, order: 4 },
      ring: { visible: false, x: 0, y: 0, scale: 100, order: 2 },
      hood: { visible: true, x: 10, y: -55, scale: 101.5, order: 3 },
      handwheel: { visible: true, x: 314, y: 215, scale: 70.7, order: 1 }
    }
  },
  "200": {
    name: "200 Nm – Gehäuse mit Ring und Haube",
    layers: {
      base: { visible: true, x: 0, y: 188, scale: 100, order: 5 },
      ring: { visible: true, x: 21, y: 33, scale: 94.8, order: 4 },
      hood: { visible: true, x: 10, y: -140, scale: 101.5, order: 2 },
      handwheel: { visible: true, x: 314, y: 215, scale: 70.7, order: 1 }
    }
  }
};

const $ = (id) => document.getElementById(id);

function getPreset(torque) {
  return Number(torque || 0) >= 200 ? productPresets["200"] : productPresets["100"];
}

function applyLayer(layer, preset) {
  if (!layer || !preset) return;
  layer.classList.toggle("is-active", Boolean(preset.visible));
  layer.style.display = preset.visible ? "block" : "none";
  layer.style.zIndex = String(preset.order);
  layer.style.opacity = preset.visible ? "1" : "0";
  layer.style.transform = `translate(calc(-50% + ${preset.x}px), calc(-50% + ${preset.y}px)) scale(${preset.scale / 100})`;
}

function renderMatches(preset, layerText) {
  const box = $("matches");
  if (!box) return;
  box.innerHTML = "";

  [
    { title: preset.name, copy: "Basis ist immer gehaeuse.png. Zusatzlayer werden je nach Drehmoment gesetzt." },
    { title: "Aktive Layer", copy: layerText }
  ].forEach((item) => {
    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `<h3>${item.title}</h3><p>${item.copy}</p>`;
    box.appendChild(card);
  });
}

function updateConfigurator() {
  const torqueInput = $("torque");
  const timeInput = $("time");
  const protectionInput = $("protection");
  const showHandwheelInput = $("showHandwheel");

  const baseLayer = $("baseLayer");
  const ringLayer = $("ringLayer");
  const hoodLayer = $("hoodLayer");
  const handwheelLayer = $("handwheelLayer");

  if (!torqueInput || !baseLayer || !ringLayer || !hoodLayer || !handwheelLayer) return;

  const torque = Number(torqueInput.value || 0);
  const time = Number(timeInput?.value || 0);
  const protection = protectionInput?.value || "";
  const handwheelVisible = showHandwheelInput ? showHandwheelInput.checked : true;
  const preset = getPreset(torque);

  baseLayer.src = "assets/img/konfigurator/gehaeuse.png?v=21";
  ringLayer.src = "assets/img/konfigurator/ring.png?v=21";
  hoodLayer.src = "assets/img/konfigurator/haube.png?v=21";
  handwheelLayer.src = "assets/img/konfigurator/handrad.png?v=21";

  applyLayer(baseLayer, preset.layers.base);
  applyLayer(ringLayer, preset.layers.ring);
  applyLayer(hoodLayer, preset.layers.hood);
  applyLayer(handwheelLayer, {
    ...preset.layers.handwheel,
    visible: preset.layers.handwheel.visible && handwheelVisible
  });

  const activeParts = ["Gehäuse"];
  if (preset.layers.ring.visible) activeParts.push("Ring");
  if (preset.layers.hood.visible) activeParts.push("Haube");
  if (handwheelVisible) activeParts.push("Handrad");
  const layerText = activeParts.join(" + ");

  if ($("torqueOut")) $("torqueOut").textContent = torque + " Nm";
  if ($("timeOut")) $("timeOut").textContent = time + " s";
  if ($("protectionOut")) $("protectionOut").textContent = protection;
  if ($("housingOut")) $("housingOut").textContent = "Gehäuse";
  if ($("layersOut")) $("layersOut").textContent = activeParts.filter((part) => part !== "Gehäuse").join(" + ");
  if ($("seriesBadge")) $("seriesBadge").textContent = torque >= 200 ? "200 Nm" : "100 Nm";
  if ($("resultTitle")) $("resultTitle").textContent = preset.layers.ring.visible ? "Gehäuse mit Ring und Haube" : "Gehäuse mit Haube";

  renderMatches(preset, layerText);
}

document.addEventListener("DOMContentLoaded", () => {
  ["torque", "time", "protection", "showHandwheel"].forEach((id) => {
    const el = $(id);
    if (!el) return;
    el.addEventListener("input", updateConfigurator);
    el.addEventListener("change", updateConfigurator);
  });

  updateConfigurator();
});
