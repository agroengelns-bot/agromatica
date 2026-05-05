
const products=[
  {name:"S-100",torqueMin:0,torqueMax:150,timeMin:10,timeMax:60,protection:["IP54","IP65"]},
  {name:"M-250",torqueMin:151,torqueMax:350,timeMin:15,timeMax:90,protection:["IP65","IP67"]},
  {name:"L-500",torqueMin:351,torqueMax:650,timeMin:25,timeMax:120,protection:["IP67","IP68"]},
  {name:"X-900",torqueMin:651,torqueMax:1000,timeMin:40,timeMax:180,protection:["IP68"]}
];
const $=id=>document.getElementById(id);
const torqueInput=$("torque"),timeInput=$("time"),protectionInput=$("protection"),shaftTypeInput=$("shaftType"),handwheelInput=$("handwheelOption"),clutchInput=$("clutchOption");
const hoodLayer=$("hoodLayer"),shaftLayer=$("shaftLayer"),handwheelLayer=$("handwheelLayer"),clutchLayer=$("clutchLayer");
function getHood(torque){if(torque<=150)return{label:"Standard",height:96,top:18};if(torque<=350)return{label:"Mittel",height:122,top:7};if(torque<=650)return{label:"Hoch",height:150,top:0};return{label:"Extra hoch",height:178,top:-8}}
function getShaft(time){if(time<=30)return{label:"Kurzwelle",height:96};if(time<=90)return{label:"Standardwelle",height:126};return{label:"Langwelle",height:152}}
function shaftLabel(value){return shaftTypeInput.options[shaftTypeInput.selectedIndex].text}
function update(){
  const torque=Number(torqueInput.value||0),time=Number(timeInput.value||0),protection=protectionInput.value,shaftType=shaftTypeInput.value;
  const hood=getHood(torque),shaft=getShaft(time);
  hoodLayer.style.height=hood.height+"px";hoodLayer.style.top=hood.top+"px";shaftLayer.style.height=shaft.height+"px";
  shaftLayer.classList.remove("vierkant","passfeder","querbohrung");shaftLayer.classList.add(shaftType);
  handwheelLayer.style.display=handwheelInput.checked?"block":"none";clutchLayer.style.display=clutchInput.checked?"block":"none";
  $("torqueOut").textContent=torque+" Nm";$("timeOut").textContent=time+" s";$("protectionOut").textContent=protection;$("hoodOut").textContent=hood.label;$("shaftOut").textContent=shaft.label+" · "+shaftLabel(shaftType);
  const suitable=products.filter(p=>torque>=p.torqueMin&&torque<=p.torqueMax&&time>=p.timeMin&&time<=p.timeMax&&p.protection.includes(protection));
  const primary=suitable[0]||products.reduce((best,p)=>{const td=torque<p.torqueMin?p.torqueMin-torque:torque>p.torqueMax?torque-p.torqueMax:0;const sd=time<p.timeMin?p.timeMin-time:time>p.timeMax?time-p.timeMax:0;return(td+sd)<best.score?{p,score:td+sd}:best},{p:products[0],score:Infinity}).p;
  $("resultTitle").textContent="Grundgerät "+primary.name;$("seriesBadge").textContent=suitable.length?"Passende Auswahl":"Nächstes Grundgerät";
  const box=$("matches");box.innerHTML="";(suitable.length?suitable:[primary]).forEach(p=>{const card=document.createElement("div");card.className="match-card";card.innerHTML=`<h3>${p.name}</h3><p>${p.torqueMin}-${p.torqueMax} Nm · ${p.timeMin}-${p.timeMax} s</p><p>${p.protection.join(", ")}</p>`;box.appendChild(card)})
}
[torqueInput,timeInput,protectionInput,shaftTypeInput,handwheelInput,clutchInput].forEach(el=>{el.addEventListener("input",update);el.addEventListener("change",update)});update();
