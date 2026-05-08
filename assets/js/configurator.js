
function updateLayersByTorque(value){
  const base=document.getElementById('baseLayer');
  const ring=document.getElementById('ringLayer');
  const hood=document.getElementById('hoodLayer');

  if(value>=200){
    base.style.display='block';
    ring.style.display='block';
    hood.style.display='block';
  }else{
    base.style.display='block';
    ring.style.display='none';
    hood.style.display='block';
  }
}
