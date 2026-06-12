(function(){
  function addLegalLinks(){
    var footers = document.querySelectorAll('footer');
    footers.forEach(function(footer){
      if (footer.querySelector('.legal-links') || footer.querySelector('.footer-legal')) return;
      var container = footer.querySelector('.container') || footer;
      var block = document.createElement('div');
      block.className = 'small legal-links';
      block.innerHTML = '<strong>Rechtliches</strong><br><a href="impressum.html">Impressum</a> · <a href="datenschutz.html">Datenschutz</a> · <a href="agb.html">AGB</a>';
      container.appendChild(block);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addLegalLinks);
  } else {
    addLegalLinks();
  }
})();
