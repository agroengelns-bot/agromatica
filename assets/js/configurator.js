const productRules = [
  { name: "100-Nm-Testaufbau", min: 0, max: 199, ring: false, hood: true },
  { name: "200-Nm-Testaufbau", min: 200, max: 9999, ring: true, hood: true }
];

const $ = (id) => document.getElementById(id);

function getRule(torque) {
  return productRules.find((rule) => torque >= rule.min && torque <= rule.max) || productRules[0];
}

function setActive(layer, active) {
  if (!layer) return;
  layer.classList.toggle("is-active", active);
}

function ensureVersionBadge() {
  if (document.querySelector(".version-badge")) return;
  const badge = document.createElement("div");
  badge.className = "version-badge";
  badge.textContent = "Konfigurator V15";
  document.body.appendChild(badge);
}

function renderMatches(rule, hasShaft, layerText) {
  const box = $("matches");
  if (!box) return;

  box.innerHTML = "";

  [
    {
      title: rule.name,
      copy: hasShaft ? "Querbohrung: Gehäuse mit Welle" : "Standard: fixes Gehäuse"
    },
    {
      title: "Aktive Layer",
      copy: layerText
    }
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
  const shaftTypeInput = $("shaftType");

  const baseLayer = $("baseLayer");
  const ringLayer = $("ringLayer");
  const hoodLayer = $("hoodLayer");

  if (!torqueInput || !shaftTypeInput || !baseLayer || !ringLayer || !hoodLayer) return;

  const torque = Number(torqueInput.value || 0);
  const time = Number(timeInput?.value || 0);
  const protection = protectionInput?.value || "";
  const shaftType = shaftTypeInput.value;

  const rule = getRule(torque);
  const hasShaft = shaftType === "querbohrung";

  baseLayer.src = hasShaft
    ? "assets/img/konfigurator/gehaeuse-welle.png"
    : "assets/img/konfigurator/gehaeuse.png";
  baseLayer.alt = hasShaft ? "Gehäuse mit Welle" : "Gehäuse";

  baseLayer.classList.toggle("has-shaft", hasShaft);

  setActive(baseLayer, true);
  setActive(ringLayer, rule.ring);
  setActive(hoodLayer, rule.hood);

  hoodLayer.classList.toggle("with-ring", rule.ring);

  const layerParts = [];
  if (rule.ring) layerParts.push("Ring");
  if (rule.hood) layerParts.push("Haube");
  const layerText = layerParts.join(" + ") || "nur Gehäuse";

  if ($("torqueOut")) $("torqueOut").textContent = torque + " Nm";
  if ($("timeOut")) $("timeOut").textContent = time + " s";
  if ($("protectionOut")) $("protectionOut").textContent = protection;
  if ($("housingOut")) $("housingOut").textContent = hasShaft ? "Gehäuse mit Welle" : "Standardgehäuse";
  if ($("layersOut")) $("layersOut").textContent = layerText;
  if ($("seriesBadge")) $("seriesBadge").textContent = torque >= 200 ? "200 Nm" : "100 Nm";
  if ($("resultTitle")) {
    $("resultTitle").textContent = (hasShaft ? "Gehäuse mit Welle" : "Gehäuse") + (layerText ? " + " + layerText : "");
  }

  renderMatches(rule, hasShaft, layerText);
}

document.addEventListener("DOMContentLoaded", () => {
  ensureVersionBadge();

  ["torque", "time", "protection", "shaftType"].forEach((id) => {
    const el = $(id);
    if (!el) return;
    el.addEventListener("input", updateConfigurator);
    el.addEventListener("change", updateConfigurator);
  });

  updateConfigurator();
});
