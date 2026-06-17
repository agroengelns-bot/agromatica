const CONFIG_VERSION = "Konfigurator V45 – Layer sofort sichtbar";
const PROJECT_LINK = "https://github.com/agroengelns-bot/agromatica";
const IS_EN_CONFIGURATOR = window.location.pathname.includes("/en/");
const CONFIG_ASSET_PREFIX = IS_EN_CONFIGURATOR ? "../" : "";
const ASSET_BASE = CONFIG_ASSET_PREFIX + "assets/img/konfigurator/";
const CONFIG_URL = CONFIG_ASSET_PREFIX + "assets/data/agromatic-master-config.json";

const CONFIG_TRANSLATIONS_EN = {
  "Konfigurator V45 – Layer sofort sichtbar": "Configurator V45 – layers immediately visible",
  "kleine Haube mit Ring": "small cover with ring",
  "große Haube mit Ring": "large cover with ring",
  "kleine Haube": "small cover",
  "große Haube": "large cover",
  "ohne Zusatzgetriebe": "without auxiliary gearbox",
  "mit Zusatzgetriebe": "with auxiliary gearbox",
  "Kombibild Zusatzgetriebe mit passender Welle": "combined image of auxiliary gearbox with matching shaft",
  "Gehäuse + Zusatzgetriebe": "Housing + auxiliary gearbox",
  "Zusatzgetriebe + Vierkant": "Auxiliary gearbox + square shaft",
  "Zusatzgetriebe + Q20": "Auxiliary gearbox + Q20",
  "Zusatzgetriebe + Q25": "Auxiliary gearbox + Q25",
  "Zusatzgetriebe + PF20": "Auxiliary gearbox + PF20",
  "Zusatzgetriebe + PF25": "Auxiliary gearbox + PF25",
  "Q20 ohne Zusatzgetriebe": "Q20 without auxiliary gearbox",
  "Q25 ohne Zusatzgetriebe": "Q25 without auxiliary gearbox",
  "PF20 ohne Zusatzgetriebe": "PF20 without auxiliary gearbox",
  "PF25 ohne Zusatzgetriebe": "PF25 without auxiliary gearbox",
  "Federwelle / Passfeder": "keyed shaft / keyway",
  "Vierkant": "square shaft",
  "ohne Welle": "without shaft",
  "Zusatzgetriebe": "Auxiliary gearbox",
  "Gehäuse": "Housing",
  "Haube": "Cover",
  "Ring": "Ring",
  "Handrad": "Handwheel",
  "Stellungsanzeige": "Position indicator",
  "mit Handrad": "with handwheel",
  "mit Stellungsanzeige": "with position indicator",
  "Konfiguration": "Configuration",
  "nach Auswahl": "by selection",
  "Aktive Layer": "Active layers",
  "Projekt": "Project",
  "GitHub / Website öffnen": "Open GitHub / website"
};

function configText(value) {
  const text = String(value ?? "");
  if (!IS_EN_CONFIGURATOR || !text) return text;
  if (CONFIG_TRANSLATIONS_EN[text]) return CONFIG_TRANSLATIONS_EN[text];

  return Object.keys(CONFIG_TRANSLATIONS_EN)
    .sort((a, b) => b.length - a.length)
    .reduce((output, key) => output.split(key).join(CONFIG_TRANSLATIONS_EN[key]), text);
}

const IMAGE_ALIASES = {
  "Gehäuse.png": "gehaeuse.png",
  "Gehäuse": "gehaeuse.png",
  "ZusPF20.png": "ZusPF20.png",
  "ZusatzPF20.png": "ZusPF20.png",
  "zusatzPF20.png": "ZusPF20.png",
  "zusatzpf20.png": "ZusPF20.png",
  "zusatz-pf20.png": "ZusPF20.png",
  "haube_1000_transparent_kongruent.png": "haube-klein.png",
  "Fa.png": "haube-gross.png",
  "ring_1000_transparent_kongruent.png": "ring.png",
  "SW_1000_only_scaled.png": "welle-innenvierkant.png",
  "Federwelle.png": "welle-federwelle.png",
  "Handrad.png": "handrad.png",
  "handrad.png": "handrad.png"
};

let config = null;

const fallbackConfig = {
  version: "fallback-v24",
  selectionRules: {
    gearboxMode: {
      none: { label: "ohne Zusatzgetriebe" },
      withGearbox: { label: "mit Zusatzgetriebe" }
    },
    shaftType: {
      vierkant: { label: "Vierkant" },
      federwelle: { label: "Federwelle / Passfeder" },
      q20: { label: "Q20" },
      q25: { label: "Q25" },
      pf20: { label: "PF20" },
      pf25: { label: "PF25" }
    },
    hoodSetup: {
      small: { label: "kleine Haube", hoodKey: "hood_small", ringKey: "none", hoodMount: "onHousing" },
      small_with_ring: { label: "kleine Haube mit Ring", hoodKey: "hood_small", ringKey: "ring_standard", hoodMount: "onRing" },
      large: { label: "große Haube", hoodKey: "hood_large", ringKey: "none", hoodMount: "onHousing" },
      large_with_ring: { label: "große Haube mit Ring", hoodKey: "hood_large", ringKey: "ring_standard", hoodMount: "onRing" }
    },
    resolver: {
      none: {
        vierkant: { shaftKey: "shaft_vierkant", gearboxKey: "none" },
        federwelle: { shaftKey: "shaft_federwelle", gearboxKey: "none" },
        q20: { shaftKey: "shaft_q20", gearboxKey: "none" },
        q25: { shaftKey: "shaft_q25", gearboxKey: "none" },
        pf20: { shaftKey: "shaft_pf20", gearboxKey: "none" },
        pf25: { shaftKey: "shaft_pf25", gearboxKey: "none" }
      },
      withGearbox: {
        vierkant: { shaftKey: "none", gearboxKey: "gearbox_vierkant" },
        federwelle: { shaftKey: "none", gearboxKey: "gearbox_pf25" },
        q20: { shaftKey: "none", gearboxKey: "gearbox_q20" },
        q25: { shaftKey: "none", gearboxKey: "gearbox_q25" },
        pf20: { shaftKey: "none", gearboxKey: "gearbox_pf20" },
        pf25: { shaftKey: "none", gearboxKey: "gearbox_pf25" }
      }
    }
  },
  variants: { baseVariants: {}, ringVariants: {}, hoodVariants: {}, shaftVariants: {}, gearboxVariants: {}, handwheelVariants: {} }
};

const torqueLabels = IS_EN_CONFIGURATOR ? {
  small: { label: "100 Nm", title: "100 Nm – small cover" },
  small_with_ring: { label: "120 Nm", title: "120 Nm – small cover with ring" },
  large: { label: "130 Nm", title: "130 Nm – large cover" },
  large_with_ring: { label: "140 Nm", title: "140 Nm – large cover with ring" }
} : {
  small: { label: "100 Nm", title: "100 Nm – kleine Haube" },
  small_with_ring: { label: "120 Nm", title: "120 Nm – kleine Haube mit Ring" },
  large: { label: "130 Nm", title: "130 Nm – große Haube" },
  large_with_ring: { label: "140 Nm", title: "140 Nm – große Haube mit Ring" }
};

const $ = (id) => document.getElementById(id);

function resolveFile(fileName) {
  if (!fileName) return null;
  return IMAGE_ALIASES[fileName] || fileName;
}

function normalizePlacement(placement) {
  if (!placement || placement.visible === false) return null;
  return {
    visible: placement.visible !== false,
    x: Number(placement.x || 0),
    y: Number(placement.y || 0),
    scale: Number(placement.scale || 100),
    opacity: Number(placement.opacity ?? 100),
    zIndex: Number(placement.zIndex || 1)
  };
}

function setLayer(layer, variant, mount) {
  if (!layer) return;

  const placement = normalizePlacement((mount && variant?.placements?.[mount]) || variant?.placement);

  if (!variant || !variant.file || !placement || placement.visible === false) {
    layer.classList.remove("is-active");
    layer.style.display = "none";
    layer.style.visibility = "hidden";
    layer.style.opacity = "0";
    layer.removeAttribute("src");
    layer.removeAttribute("alt");
    return;
  }

  const src = ASSET_BASE + resolveFile(variant.file) + "?v=" + encodeURIComponent(CONFIG_VERSION);

  // V45: Aktive Layer sofort sichtbar setzen.
  // Nicht mehr auf onload warten, weil gecachte Bilder sonst ohne erneutes onload unsichtbar bleiben können.
  layer.classList.add("is-active");
  layer.removeAttribute("alt");
  layer.style.display = "block";
  layer.style.visibility = "visible";
  layer.style.border = "0";
  layer.style.outline = "0";
  layer.style.boxShadow = "none";
  layer.style.background = "transparent";
  layer.style.backgroundImage = "none";
  layer.style.setProperty("--layer-x", `${placement.x / 10}%`);
  layer.style.setProperty("--layer-y", `${placement.y / 10}%`);
  layer.style.setProperty("--layer-scale", String(placement.scale / 100));
  layer.style.opacity = String((placement.opacity ?? 100) / 100);
  layer.style.zIndex = String(placement.zIndex ?? 1);

  layer.onerror = () => {
    console.warn("Konfigurator-Bild nicht gefunden:", variant.file, "=>", resolveFile(variant.file));
    layer.classList.remove("is-active");
    layer.style.display = "none";
    layer.style.visibility = "hidden";
    layer.style.opacity = "0";
    layer.removeAttribute("src");
    layer.removeAttribute("alt");
  };

  if (layer.getAttribute("src") !== src) {
    layer.src = src;
  }
}

function optionList(select, items, selected) {
  if (!select) return;
  select.innerHTML = "";
  Object.entries(items || {}).forEach(([key, item]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = configText(item.label || item.name || key);
    if (key === selected) option.selected = true;
    select.appendChild(option);
  });
}

function ensureVersionBadge() {
  if (document.querySelector(".version-badge")) return;
  const badge = document.createElement("div");
  badge.className = "version-badge";
  badge.textContent = configText(CONFIG_VERSION);
  document.body.appendChild(badge);
}

function renderMatches(summary) {
  const box = $("matches");
  if (!box) return;
  box.innerHTML = "";
  [
    { title: configText("Haube"), copy: configText(summary.hoodLabel) },
    { title: configText("Zusatzgetriebe"), copy: configText(summary.gearboxLabel) },
    { title: configText("Aktive Layer"), copy: summary.layers.map(configText).join(" + ") },
    { title: configText("Projekt"), copy: `<a href="${PROJECT_LINK}" target="_blank" rel="noopener">${configText("GitHub / Website öffnen")}</a>` }
  ].forEach((item) => {
    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `<h3>${item.title}</h3><p>${item.copy}</p>`;
    box.appendChild(card);
  });
}

function updateConfigurator() {
  const cfg = config || fallbackConfig;
  const rules = cfg.selectionRules || fallbackConfig.selectionRules;
  const variants = cfg.variants || fallbackConfig.variants;

  const hoodSetupKey = $("hoodSetup")?.value || cfg.active?.hoodSetup || "large_with_ring";
  const gearboxMode = $("gearboxMode")?.value || cfg.active?.gearboxMode || "none";
  const shaftType = $("shaftType")?.value || cfg.active?.shaftType || "vierkant";
  const protection = $("protection")?.value || "IP65";
  const time = Number($("time")?.value || 30);
  const handwheelEnabled = Boolean($("handwheelEnabled")?.checked);
  const positionIndicatorEnabled = Boolean($("positionIndicatorEnabled")?.checked);

  const hoodSetup = rules.hoodSetup?.[hoodSetupKey] || rules.hoodSetup.large_with_ring;
  const resolver = rules.resolver?.[gearboxMode]?.[shaftType] || rules.resolver.none.vierkant;

  const baseVariant = variants.baseVariants?.base_gehaeuse || Object.values(variants.baseVariants || {})[0];
  const ringVariant = hoodSetup.ringKey && hoodSetup.ringKey !== "none" ? variants.ringVariants?.[hoodSetup.ringKey] : null;
  const hoodVariant = variants.hoodVariants?.[hoodSetup.hoodKey];
  const shaftVariant = resolver.shaftKey && resolver.shaftKey !== "none" ? variants.shaftVariants?.[resolver.shaftKey] : null;
  const gearboxVariant = resolver.gearboxKey && resolver.gearboxKey !== "none" ? variants.gearboxVariants?.[resolver.gearboxKey] : null;
  const handwheelVariant = handwheelEnabled ? (variants.handwheelVariants?.handwheel_handrad || Object.values(variants.handwheelVariants || {})[0]) : null;

  setLayer($("baseLayer"), baseVariant);
  setLayer($("gearboxLayer"), gearboxVariant, "underHousing");
  setLayer($("shaftLayer"), shaftVariant, "underHousing");
  setLayer($("ringLayer"), ringVariant, "onHousing");
  setLayer($("hoodLayer"), hoodVariant, hoodSetup.hoodMount || "onHousing");
  setLayer($("handwheelLayer"), handwheelVariant);

  const torque = torqueLabels[hoodSetupKey] || { label: "", title: configText(hoodSetup.label || "Konfiguration") };
  const shaftLabel = configText(rules.shaftType?.[shaftType]?.label || shaftVariant?.name || shaftType);
  const gearboxLabel = configText(rules.gearboxMode?.[gearboxMode]?.label || gearboxMode);
  const layers = [];
  if (gearboxVariant) layers.push(configText(gearboxVariant.name || "Zusatzgetriebe"));
  if (shaftVariant) layers.push(configText(shaftVariant.name || shaftLabel));
  layers.push(configText(baseVariant?.name || "Gehäuse"));
  if (ringVariant) layers.push(configText(ringVariant.name || "Ring"));
  if (hoodVariant) layers.push(configText(hoodSetup.label || hoodVariant.name || "Haube"));
  if (handwheelVariant) layers.push(configText(handwheelVariant.name || "Handrad"));
  if (positionIndicatorEnabled) layers.push(configText("Stellungsanzeige"));

  if ($("seriesBadge")) $("seriesBadge").textContent = torque.label || configText("Konfiguration");
  if ($("resultTitle")) $("resultTitle").textContent = torque.title || configText(hoodSetup.label);
  if ($("torqueOut")) $("torqueOut").textContent = torque.label || configText("nach Auswahl");
  if ($("timeOut")) $("timeOut").textContent = `${time} s`;
  if ($("protectionOut")) $("protectionOut").textContent = protection;
  if ($("housingOut")) $("housingOut").textContent = gearboxVariant ? configText("Gehäuse + Zusatzgetriebe") : configText("Gehäuse");
  if ($("shaftOut")) $("shaftOut").textContent = shaftLabel;
  if ($("layersOut")) $("layersOut").textContent = layers.join(" + ");

  renderMatches({ hoodLabel: configText(hoodSetup.label), gearboxLabel: gearboxLabel + (handwheelEnabled ? " · " + configText("mit Handrad") : "") + (positionIndicatorEnabled ? " · " + configText("mit Stellungsanzeige") : ""), layers });
}

async function loadConfig() {
  try {
    const response = await fetch(CONFIG_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    config = await response.json();
  } catch (error) {
    console.warn("Master-JSON konnte nicht geladen werden, Fallback aktiv:", error);
    config = fallbackConfig;
  }
}

function initControls() {
  const cfg = config || fallbackConfig;
  const rules = cfg.selectionRules || fallbackConfig.selectionRules;
  optionList($("hoodSetup"), rules.hoodSetup, cfg.active?.hoodSetup || "large_with_ring");
  optionList($("gearboxMode"), rules.gearboxMode, cfg.active?.gearboxMode || "none");
  optionList($("shaftType"), rules.shaftType, cfg.active?.shaftType || "vierkant");
  ["hoodSetup", "gearboxMode", "shaftType", "handwheelEnabled", "positionIndicatorEnabled", "time", "protection"].forEach((id) => {
    const el = $(id);
    if (!el) return;
    el.addEventListener("input", updateConfigurator);
    el.addEventListener("change", updateConfigurator);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  ensureVersionBadge();
  await loadConfig();
  initControls();
  updateConfigurator();
});


// V37: Falls ein Layer-Bild nicht geladen werden kann, keinen sichtbaren Rahmen/Alt-Text anzeigen.
(function(){
  function cleanLayerImages(){
    document.querySelectorAll('img').forEach(function(img){
      if (img.closest('.configurator-card') || img.closest('.configurator-preview') || img.closest('#configuratorPreview') || img.closest('#previewLayers') || img.className.indexOf('layer') !== -1) {
        img.removeAttribute('alt');
        img.style.border = '0';
        img.style.outline = '0';
        img.style.background = 'transparent';
        img.style.boxShadow = 'none';
        img.onerror = function(){
          this.style.display = 'none';
          this.removeAttribute('src');
        };
        if (!img.complete && img.naturalWidth === 0) {
          // Laden läuft noch, nicht anfassen.
        }
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanLayerImages);
  } else {
    cleanLayerImages();
  }
  window.addEventListener('load', cleanLayerImages);
})();
