const CONFIG_VERSION = "Konfigurator Test V18 – Gearbox/Wellenkombis";
const PROJECT_LINK = "https://github.com/agroengelns-bot/agromatic-Website";

const torqueRules = [
  { torque:100,label:"100 Nm",name:"100 Nm – kleine Haube",hood:"small",ring:false,hoodPlacement:{x:0,y:-236.2,scale:99.2}},
  { torque:200,label:"200 Nm",name:"200 Nm – große Haube",hood:"large",ring:false,hoodPlacement:{x:0,y:-461.7,scale:123.3}}
];

const comboVariants = {
  none:{label:"Ohne Zusatzgetriebe",shaft:null,gearbox:false},
  q20:{label:"Q20",shaft:{x:0,y:390,scale:100,label:"Q20",src:"assets/img/konfigurator/welle-q20.png"},gearbox:true},
  q25:{label:"Q25",shaft:{x:0,y:390,scale:100,label:"Q25",src:"assets/img/konfigurator/welle-q25.png"},gearbox:true},
  pf20:{label:"PF20",shaft:{x:0,y:390,scale:100,label:"PF20",src:"assets/img/konfigurator/welle-pf20.png"},gearbox:true},
  pf25:{label:"PF25",shaft:{x:0,y:390,scale:100,label:"PF25",src:"assets/img/konfigurator/welle-pf25.png"},gearbox:true}
};
const gearboxPlacement={x:0,y:210,scale:100};
const $=(id)=>document.getElementById(id);
function setLayer(layer,placement,active=true){if(!layer)return;layer.classList.toggle("is-active",Boolean(active&&placement));if(!placement)return;layer.style.setProperty("--layer-x",`${placement.x/10}%`);layer.style.setProperty("--layer-y",`${placement.y/10}%`);layer.style.setProperty("--layer-scale",String(placement.scale/100));}
function ensureVersionBadge(){if(document.querySelector(".version-badge"))return;const badge=document.createElement("div");badge.className="version-badge";badge.textContent=CONFIG_VERSION;document.body.appendChild(badge);}
function getRule(){const value=Number($("torque")?.value||100);return torqueRules.find((rule)=>rule.torque===value)||torqueRules[0];}
function updateConfigurator(){const rule=getRule();const comboValue=$("gearboxCombo")?.value||"none";const combo=comboVariants[comboValue]||comboVariants.none;const protection=$("protection")?.value||"IP65";const time=$("time")?.value||"standard";const baseLayer=$("baseLayer");const shaftLayer=$("shaftLayer");const hoodLayer=$("hoodLayer");setLayer(baseLayer,{x:0,y:0,scale:100},true);if(hoodLayer){hoodLayer.src=rule.hood==="large"?"assets/img/konfigurator/haube-gross.png":"assets/img/konfigurator/haube-klein.png";}setLayer(hoodLayer,rule.hoodPlacement,true);if(combo.shaft&&shaftLayer){shaftLayer.src=combo.shaft.src;shaftLayer.alt=combo.shaft.label;}setLayer(shaftLayer,combo.shaft,Boolean(combo.shaft));if($("seriesBadge"))$("seriesBadge").textContent=rule.label;if($("resultTitle"))$("resultTitle").textContent=rule.name;if($("torqueOut"))$("torqueOut").textContent=rule.label;if($("timeOut"))$("timeOut").textContent=time;if($("protectionOut"))$("protectionOut").textContent=protection;if($("housingOut"))$("housingOut").textContent=combo.gearbox?"Gehäuse + Zusatzgetriebe":"Gehäuse";if($("layersOut"))$("layersOut").textContent=combo.label;}
document.addEventListener("DOMContentLoaded",()=>{ensureVersionBadge();["torque","time","protection","gearboxCombo"].forEach((id)=>{const el=$(id);if(!el)return;el.addEventListener("input",updateConfigurator);el.addEventListener("change",updateConfigurator);});updateConfigurator();});
