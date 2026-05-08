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

  baseLayer.classList.toggle("has-shaft", hasShaft);

  setActive(baseLayer, true);
  setActive(ringLayer, rule.ring);
  setActive(hoodLayer, rule.hood);

  /* WICHTIG: Haube reagiert auf Ring */
  hoodLayer.classList.toggle("with-ring", rule.ring);

  $("torqueOut").textContent = torque + " Nm";
  $("timeOut").textContent = time + " s";
  $("protectionOut").textContent = protection;
  $("housingOut").textContent = hasShaft ? "Gehäuse mit Welle" : "Standardgehäuse";

  const layerParts = [];
  if (rule.ring) layerParts.push("Ring");
  if (rule.hood) layerParts.push("Haube");
  $("layersOut").textContent = layerParts.join(" + ");
}

[torqueInput, timeInput, protectionInput, shaftTypeInput].forEach((el) => {
  el.addEventListener("input", update);
  el.addEventListener("change", update);
});

update();
