const productRules = [
  { name: "100-Nm-Testaufbau", min: 0, max: 199, ring: false, hood: true },
  { name: "200-Nm-Testaufbau", min: 200, max: 9999, ring: true, hood: true }
];

const $ = (id) => document.getElementById(id);

const torqueInput = $("torque");
const timeInput = $("time");
const protectionInput = $("protection");
const shaftTypeInput = $("shaftType");

const preview = $("productPreview");
const baseLayer = $("baseLayer");
const ringLayer = $("ringLayer");
const hoodLayer = $("hoodLayer");

function getRule(torque) {
  return productRules.find((rule) => torque >= rule.min && torque <= rule.max) || productRules[0];
}

function setActive(layer, active) {
  layer.classList.toggle("is-active", active);
}

function update() {
  const torque = Number(torqueInput.value || 0);
  const time = Number(timeInput.value || 0);
  const protection = protectionInput.value;
  const shaftType = shaftTypeInput.value;

  const rule = getRule(torque);
  const hasShaft = shaftType === "querbohrung";

  baseLayer.src = hasShaft
    ? "assets/img/konfigurator/gehaeuse-welle.png"
    : "assets/img/konfigurator/gehaeuse.png";
  baseLayer.alt = hasShaft ? "Gehäuse mit Welle" : "Gehäuse";
  baseLayer.classList.toggle("has-shaft", hasShaft);
  preview.classList.toggle("is-shaft", hasShaft);

  setActive(baseLayer, true);
  setActive(ringLayer, rule.ring);
  setActive(hoodLayer, rule.hood);

  const layerParts = [];
  if (rule.ring) layerParts.push("Ring");
  if (rule.hood) layerParts.push("Haube");
  const layerText = layerParts.join(" + ") || "nur Gehäuse";

  $("torqueOut").textContent = torque + " Nm";
  $("timeOut").textContent = time + " s";
  $("protectionOut").textContent = protection;
  $("housingOut").textContent = hasShaft ? "Gehäuse mit Welle" : "Standardgehäuse";
  $("layersOut").textContent = layerText;
  $("seriesBadge").textContent = torque >= 200 ? "200 Nm" : "100 Nm";
  $("resultTitle").textContent = (hasShaft ? "Gehäuse mit Welle" : "Gehäuse") + (layerText ? " + " + layerText : "");

  renderMatches(rule, hasShaft, layerText);
}

function renderMatches(rule, hasShaft, layerText) {
  const box = $("matches");
  box.innerHTML = "";

  [
    { title: rule.name, copy: hasShaft ? "Querbohrung: Gehäuse mit Welle" : "Standard: fixes Gehäuse" },
    { title: "Aktive Layer", copy: layerText }
  ].forEach((item) => {
    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `<h3>${item.title}</h3><p>${item.copy}</p>`;
    box.appendChild(card);
  });
}

[torqueInput, timeInput, protectionInput, shaftTypeInput].forEach((el) => {
  el.addEventListener("input", update);
  el.addEventListener("change", update);
});

update();
