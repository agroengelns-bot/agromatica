
const productRules = [
  {
    name: "100-Nm-Testaufbau",
    min: 0,
    max: 199,
    title: "Gehäuse + Haube",
    ring: false,
    hood: true,
    layerText: "Haube",
    preset: {
      base: { x: 0, y: 68, scale: 1.08, opacity: 100, order: 3 },
      ring: { x: 9, y: 22, scale: 1.03, opacity: 100, order: 2 },
      hood: { x: 10, y: -8, scale: 1.10, opacity: 100, order: 1 }
    }
  },
  {
    name: "200-Nm-Testaufbau",
    min: 200,
    max: 9999,
    title: "Gehäuse + Ring + Haube",
    ring: true,
    hood: true,
    layerText: "Ring + Haube",
    preset: {
      base: { x: 0, y: 68, scale: 1.08, opacity: 100, order: 3 },
      ring: { x: 9, y: 24, scale: 1.03, opacity: 100, order: 2 },
      hood: { x: 10, y: -34, scale: 1.10, opacity: 100, order: 1 }
    }
  }
];

const $ = (id) => document.getElementById(id);

function getRule(torque) {
  return productRules.find((rule) => torque >= rule.min && torque <= rule.max) || productRules[0];
}

function applyLayer(layer, preset, isVisible) {
  if (!layer || !preset) return;
  layer.style.display = isVisible ? "block" : "none";
  if (!isVisible) return;
  layer.style.position = "absolute";
  layer.style.left = "50%";
  layer.style.top = "50%";
  layer.style.transformOrigin = "center center";
  layer.style.opacity = String((preset.opacity ?? 100) / 100);
  layer.style.zIndex = String(preset.order ?? 1);
  layer.style.transform = `translate(calc(-50% + ${preset.x || 0}px), calc(-50% + ${preset.y || 0}px)) scale(${preset.scale || 1})`;
}

function renderMatches(rule, hasShaft, layerText) {
  const matches = $("matches");
  if (!matches) return;
  matches.innerHTML = `
    <article class="match-card">
      <h3>${rule.name}</h3>
      <p>${hasShaft ? "Querbohrung" : "Standard"}: ${hasShaft ? "Gehäuse mit Welle" : "fixes Gehäuse"}</p>
    </article>
    <article class="match-card">
      <h3>Aktive Layer</h3>
      <p>${layerText}</p>
    </article>
  `;
}

function updateConfigurator() {
  const torqueInput = $("torque");
  const timeInput = $("time");
  const protectionInput = $("protection");
  const shaftTypeInput = $("shaftType");
  const seriesBadge = $("seriesBadge");
  const resultTitle = $("resultTitle");
  const torqueOut = $("torqueOut");
  const timeOut = $("timeOut");
  const protectionOut = $("protectionOut");
  const housingOut = $("housingOut");
  const layersOut = $("layersOut");

  const baseLayer = $("baseLayer");
  const ringLayer = $("ringLayer");
  const hoodLayer = $("hoodLayer");

  if (!torqueInput || !shaftTypeInput || !baseLayer || !ringLayer || !hoodLayer) return;

  const torque = Number(torqueInput.value || 0);
  const time = Number(timeInput?.value || 0);
  const protection = protectionInput?.value || "";
  const shaftType = shaftTypeInput.value;
  const hasShaft = shaftType === "querbohrung";
  const rule = getRule(torque);

  if (seriesBadge) seriesBadge.textContent = `${torque || 0} Nm`;
  if (resultTitle) resultTitle.textContent = rule.title;
  if (torqueOut) torqueOut.textContent = `${torque || 0} Nm`;
  if (timeOut) timeOut.textContent = `${time || 0} s`;
  if (protectionOut) protectionOut.textContent = protection;
  if (housingOut) housingOut.textContent = hasShaft ? "Gehäuse mit Welle" : "Standardgehäuse";
  if (layersOut) layersOut.textContent = rule.layerText;

  baseLayer.src = hasShaft
    ? "assets/img/konfigurator/gehaeuse-welle.png"
    : "assets/img/konfigurator/gehaeuse.png";
  hoodLayer.src = rule.ring
    ? "assets/img/konfigurator/haube-mit-ring.png"
    : "assets/img/konfigurator/haube.png";

  applyLayer(baseLayer, rule.preset.base, true);
  applyLayer(ringLayer, rule.preset.ring, rule.ring);
  applyLayer(hoodLayer, rule.preset.hood, rule.hood);

  renderMatches(rule, hasShaft, rule.layerText);
}

document.addEventListener("DOMContentLoaded", () => {
  ["torque", "time", "protection", "shaftType"].forEach((id) => {
    const el = $(id);
    if (!el) return;
    el.addEventListener("input", updateConfigurator);
    el.addEventListener("change", updateConfigurator);
  });

  updateConfigurator();
});
