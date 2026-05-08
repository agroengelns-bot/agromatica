document.addEventListener("DOMContentLoaded", () => {
  const drehmoment = document.querySelector("#drehmoment");
  const wellenanschluss = document.querySelector("#wellenanschluss");

  const base = document.querySelector(".layer-base");
  const shaft = document.querySelector(".layer-shaft");
  const ring = document.querySelector(".layer-ring");
  const hood = document.querySelector(".layer-hood");

  function updateConfig() {
    const torque = parseInt(drehmoment.value);
    const welle = wellenanschluss.value;

    base.classList.remove("layer-hidden");
    shaft.classList.add("layer-hidden");
    ring.classList.add("layer-hidden");
    hood.classList.add("layer-hidden");

    if (welle === "Querbohrung") {
      base.classList.add("layer-hidden");
      shaft.classList.remove("layer-hidden");
    }

    if (torque >= 200) {
      ring.classList.remove("layer-hidden");
      hood.classList.remove("layer-hidden");
    } else {
      hood.classList.remove("layer-hidden");
    }
  }

  drehmoment.addEventListener("change", updateConfig);
  wellenanschluss.addEventListener("change", updateConfig);

  updateConfig();
});
