document.addEventListener("DOMContentLoaded", () => {

  const torqueInput = document.getElementById("torque");
  const shaftTypeInput = document.getElementById("shaftType");

  const baseLayer = document.getElementById("baseLayer");
  const ringLayer = document.getElementById("ringLayer");
  const hoodLayer = document.getElementById("hoodLayer");

  function update() {
    const torque = Number(torqueInput.value || 0);
    const hasRing = torque >= 200;
    const hasShaft = shaftTypeInput.value === "querbohrung";

    baseLayer.src = hasShaft
      ? "assets/img/konfigurator/gehaeuse-welle.png"
      : "assets/img/konfigurator/gehaeuse.png";

    baseLayer.classList.toggle("has-shaft", hasShaft);

    ringLayer.classList.toggle("is-active", hasRing);
    hoodLayer.classList.toggle("is-active", true);

    hoodLayer.classList.toggle("with-ring", hasRing);
  }

  torqueInput.addEventListener("input", update);
  shaftTypeInput.addEventListener("change", update);

  update();
});
