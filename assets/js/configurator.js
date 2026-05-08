
function applyConfig(){
const t=parseInt(document.getElementById('torque').value,10);
const base=document.getElementById('baseLayer');
const ring=document.getElementById('ringLayer');
const hood=document.getElementById('hoodLayer');

if(t>=200){
 ring.style.display='block';
 // 200 config
 base.style.transform='translate(-50%, calc(-50% + 228px)) scale(0.97)';
 ring.style.transform='translate(calc(-50% + 19px), calc(-50% + 78px)) scale(0.92)';
 hood.style.transform='translate(calc(-50% + 10px), calc(-50% - 90px)) scale(0.99)';
}else{
 ring.style.display='none';
 // 100 config
 base.style.transform='translate(-50%, calc(-50% + 228px)) scale(0.97)';
 hood.style.transform='translate(calc(-50% + 10px), calc(-50% - 8px)) scale(0.99)';
}

base.style.zIndex=3;
ring.style.zIndex=2;
hood.style.zIndex=1;
}
