const CONFIG_VERSION = "Konfigurator Test V21 – Gehäuse/PF25-Pfade korrigiert";
const PROJECT_LINK = "https://github.com/agroengelns-bot/agromatica";

const torqueRules = [
  { torque: 100, label: "100 Nm", name: "100 Nm – kleine Haube", hood: "small", ring: false, hoodPlacement: { x: 0, y: -236.2, scale: 99.2 } },
  { torque: 120, label: "120 Nm", name: "120 Nm – kleine Haube mit Ring", hood: "small", ring: true, ringPlacement: { x: 0, y: -172.3, scale: 100 }, hoodPlacement: { x: 0, y: -409.2, scale: 99.2 } },
  { torque: 130, label: "130 Nm", name: "130 Nm – große Haube", hood: "large", ring: false, hoodPlacement: { x: 0, y: -461.7, scale: 123.3 } },
  { torque: 140, label: "140 Nm", name: "140 Nm – große Haube mit Ring", hood: "large", ring: true, ringPlacement: { x: 0, y: -172.3, scale: 100 }, hoodPlacement: { x: 0, y: -520.0, scale: 123.3 } }
];

const basePlacement = { x: 0, y: 0, scale: 100 };
const comboVariants = {
  none: { label: "ohne Zusatzgetriebe", shaftLabel: "ohne Welle", src: "assets/img/konfigurator/gehaeuse.png", gearbox: false },
  q20: { label: "Q20", shaftLabel: "Q20 – Querbohrung 20", src: "assets/img/konfigurator/zusatzQ20.png", gearbox: true },
  q25: { label: "Q25", shaftLabel: "Q25 – Querbohrung 25", src: "assets/img/konfigurator/ZusatzQ25.png", gearbox: true },
  pf20: { label: "PF20", shaftLabel: "PF20 – Passfeder 20", src: "assets/img/konfigurator/zusatzPF20.png", gearbox: true },
  pf25: { label: "PF25", shaftLabel: "PF25 – Passfeder 25", src: "assets/img/konfigurator/ZusatzPF25.png", gearbox: true }
};

const $ = (id) => document.getElementById(id);

function setLayer(layer, placement, active = true) {
  if (!layer) return;
  layer.classList.toggle("is-active", Boolean(active && placement));
  if (!placement) return;
  layer.style.setProperty("--layer-x", `${placement.x / 10}%`);
  layer.style.setProperty("--layer-y", `${placement.y / 10}%`);
  layer.style.setProperty("--layer-scale", String(placement.scale / 100));
}

function ensureVersionBadge() {
  if (document.querySelector(".version-badge")) return;
  const badge = document.createElement("div");
  badge.className = "version-badge";
  badge.textContent = CONFIG_VERSION;
  document.body.appendChild(badge);
}

function getRule() {
  const value = Number($("torque")?.value || 100);
  return torqueRules.find((rule) => rule.torque === value) || torqueRules[0];
}

function getCombo() {
  const value = $("gearboxCombo")?.value || "none";
  return comboVariants[value] || comboVariants.none;
}

function renderMatches(rule, combo) {
  const box = $("matches");
  if (!box) return;
  const layerParts = [];
  if (combo.gearbox) layerParts.push(combo.shaftLabel);
  if (combo.gearbox) layerParts.push("Zusatzgetriebe");
  layerParts.push("Gehäuse");
  if (rule.ring) layerParts.push("Ring");
  layerParts.push(rule.hood === "large" ? "große Haube" : "kleine Haube");

  box.innerHTML = "";
  [
    { title: "Aktive Regel", copy: rule.name },
    { title: "Zusatzgetriebe/Welle", copy: combo.label },
    { title: "Aktive Layer", copy: layerParts.join(" + ") },
    { title: "Projekt", copy: `<a href="${PROJECT_LINK}" target="_blank" rel="noopener">GitHub / Website öffnen</a>` }
  ].forEach((item) => {
    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `<h3>${item.title}</h3><p>${item.copy}</p>`;
    box.appendChild(card);
  });
}

function updateConfigurator() {
  const rule = getRule();
  const combo = getCombo();
  const protection = $("protection")?.value || "IP65";
  const time = Number($("time")?.value || 30);

  const baseLayer = $("baseLayer");
  const gearboxLayer = $("gearboxLayer");
  const shaftLayer = $("shaftLayer");
  const ringLayer = $("ringLayer");
  const hoodLayer = $("hoodLayer");

  // Die Zusatzgetriebe-Bilder sind komplette Gerätebilder
  // (Gehäuse + fest zugeordnete Welle/Zusatzgetriebe).
  // Ohne Zusatzgetriebe wird immer das normale Gehäuse angezeigt.
  if (baseLayer) {
    baseLayer.src = combo.src || "assets/img/konfigurator/gehaeuse.png";
    baseLayer.alt = combo.gearbox ? `Gehäuse mit ${combo.label}` : "Gehäuse";
  }
  setLayer(baseLayer, basePlacement, true);

  // Alte separate gearbox-/shaft-Layer deaktivieren, damit nichts falsch kombiniert wird.
  setLayer(gearboxLayer, null, false);
  setLayer(shaftLayer, null, false);
  setLayer(ringLayer, rule.ringPlacement || null, rule.ring);

  if (hoodLayer) {
    hoodLayer.src = rule.hood === "large" ? "assets/img/konfigurator/haube-gross.png" : "assets/img/konfigurator/haube-klein.png";
    hoodLayer.alt = rule.hood === "large" ? "Große Haube" : "Kleine Haube";
  }
  setLayer(hoodLayer, rule.hoodPlacement, true);

  if ($("seriesBadge")) $("seriesBadge").textContent = rule.label;
  if ($("resultTitle")) $("resultTitle").textContent = rule.name;
  if ($("torqueOut")) $("torqueOut").textContent = rule.label;
  if ($("timeOut")) $("timeOut").textContent = `${time} s`;
  if ($("protectionOut")) $("protectionOut").textContent = protection;
  if ($("housingOut")) $("housingOut").textContent = combo.gearbox ? "Gehäuse + Zusatzgetriebe" : "Gehäuse";
  if ($("shaftOut")) $("shaftOut").textContent = combo.shaftLabel;
  if ($("layersOut")) $("layersOut").textContent = `${combo.label}; ${rule.hood === "large" ? "große" : "kleine"} Haube${rule.ring ? " + Ring" : ""}`;

  renderMatches(rule, combo);
}

document.addEventListener("DOMContentLoaded", () => {
  ensureVersionBadge();
  ["torque", "time", "protection", "gearboxCombo"].forEach((id) => {
    const el = $(id);
    if (!el) return;
    el.addEventListener("input", updateConfigurator);
    el.addEventListener("change", updateConfigurator);
  });
  updateConfigurator();
});
