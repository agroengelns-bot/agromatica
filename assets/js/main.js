(function(){
  function pagePrefix(){
    return location.pathname.indexOf('/en/') !== -1 ? '../' : '';
  }

  function addLegalLinks(){
    var footers = document.querySelectorAll('footer');
    footers.forEach(function(footer){
      if (footer.querySelector('.legal-links') || footer.querySelector('.footer-legal')) return;
      var container = footer.querySelector('.container') || footer;
      var block = document.createElement('div');
      block.className = 'small legal-links';
      if (document.documentElement.lang === 'en') {
        block.innerHTML = '<strong>Legal</strong><br><a href="../impressum.html">Legal notice</a> · <a href="../datenschutz.html">Privacy policy</a> · <a href="../agb.html">Terms and Conditions</a>';
      } else {
        block.innerHTML = '<strong>Rechtliches</strong><br><a href="impressum.html">Impressum</a> · <a href="datenschutz.html">Datenschutz</a> · <a href="agb.html">AGB</a>';
      }
      container.appendChild(block);
    });
  }

  function textFrom(el){
    return (el && el.textContent ? el.textContent : '').replace(/\s+/g, ' ').trim();
  }

  function findContext(link){
    var contextRoot = link.closest('article, .product-card, .mount-card, .zube-card, .solution-card, .cta-box, .hero, section, main') || document;
    var heading = contextRoot.querySelector('h1, h2, h3');
    var image = contextRoot.querySelector('img[alt]');
    var context = textFrom(heading) || (image ? image.getAttribute('alt') : '') || document.title.replace(/\s*[–|-].*$/, '').trim();
    return context || (document.documentElement.lang === 'en' ? 'Agromatic actuator' : 'Agromatic Stellantrieb');
  }

  function makeMailto(context, isEnglish){
    var url = location.href.split('#')[0];
    if (location.hash) url += location.hash;
    var subject = isEnglish ? ('Technical inquiry – ' + context) : ('Technische Anfrage – ' + context);
    var body = isEnglish
      ? [
          'Hello Agromatic team,',
          '',
          'I am interested in the following product or topic:',
          context,
          '',
          'Page:',
          url,
          '',
          'Please support me with the technical selection.',
          '',
          'Application:',
          'Medium:',
          'Torque / force:',
          'Operating time:',
          'Voltage:',
          'Protection class:',
          'Ambient conditions / Ex zone:',
          'Installation situation:',
          '',
          'Kind regards'
        ].join('\n')
      : [
          'Hallo Agromatic-Team,',
          '',
          'ich interessiere mich für folgendes Produkt bzw. Thema:',
          context,
          '',
          'Seite:',
          url,
          '',
          'Bitte unterstützen Sie mich bei der technischen Auslegung.',
          '',
          'Anwendung:',
          'Medium:',
          'Drehmoment / Kraft:',
          'Stellzeit:',
          'Spannung:',
          'Schutzart:',
          'Umgebung / Ex-Zone:',
          'Einbausituation:',
          '',
          'Viele Grüße'
        ].join('\n');
    return 'mailto:info@agromatic.de?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  function isInquiryLink(link){
    var href = link.getAttribute('href') || '';
    var label = textFrom(link).toLowerCase();
    var hrefLower = href.toLowerCase();
    if (hrefLower.indexOf('mailto:info@agromatic.de') === 0 && href.indexOf('subject=') === -1) return true;
    if (!(hrefLower === 'kontakt.html' || hrefLower === 'contact.html' || hrefLower === 'en/contact.html' || hrefLower === '../kontakt.html' || hrefLower === '../contact.html')) return false;
    return /(anfrage|anfragen|beratung|auslegung|inquiry|request)/i.test(label);
  }

  function addInquiryMailto(){
    var isEnglish = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0 || location.pathname.indexOf('/en/') !== -1;
    document.querySelectorAll('a[href]').forEach(function(link){
      if (!isInquiryLink(link)) return;
      var context = findContext(link);
      link.setAttribute('href', makeMailto(context, isEnglish));
      link.setAttribute('data-inquiry-context', context);
    });
  }

  function init(){
    addLegalLinks();
    addInquiryMailto();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
