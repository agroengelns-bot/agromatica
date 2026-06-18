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

  function makeMailto(context, isEnglish, targetUrl){
    var url = targetUrl || location.href.split('#')[0];
    if (!targetUrl && location.hash) url += location.hash;
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



  function slugify(text){
    return (text || '')
      .toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'produkt';
  }

  function ensureCardId(card, usedIds){
    if (card.id) {
      usedIds[card.id] = true;
      return card.id;
    }
    var heading = textFrom(card.querySelector('h3, h2'));
    var base = 'produkt-' + slugify(heading);
    var id = base;
    var i = 2;
    while (document.getElementById(id) || usedIds[id]) {
      id = base + '-' + i;
      i += 1;
    }
    card.id = id;
    usedIds[id] = true;
    return id;
  }

  function addSeriesInquiryButtons(){
    var isEnglish = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0 || location.pathname.indexOf('/en/') !== -1;
    var cards = document.querySelectorAll('.series-card');
    if (!cards.length) return;

    var usedIds = {};
    document.querySelectorAll('[id]').forEach(function(el){ usedIds[el.id] = true; });

    cards.forEach(function(card){
      if (card.querySelector('.series-inquiry-btn')) return;

      var content = card.querySelector('.series-content') || card;
      var context = textFrom(card.querySelector('h3, h2')) || findContext(card);
      var id = ensureCardId(card, usedIds);
      var targetUrl = location.href.split('#')[0] + '#' + id;

      var button = document.createElement('a');
      button.className = 'btn btn-primary series-inquiry-btn';
      button.href = makeMailto(context, isEnglish, targetUrl);
      button.setAttribute('data-inquiry-context', context);
      button.textContent = isEnglish ? 'Request this product' : 'Stellantrieb auslegen lassen';

      var row = content.querySelector('.series-downloads');
      if (!row) {
        row = document.createElement('div');
        row.className = 'button-row series-downloads';
        content.appendChild(row);
      }
      row.insertBefore(button, row.firstChild);
    });
  }

  function improveGermanCtaLabels(){
    var isEnglish = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0 || location.pathname.indexOf('/en/') !== -1;
    if (isEnglish) return;
    document.querySelectorAll('a, button').forEach(function(el){
      var label = textFrom(el);
      if (label === 'Anfrage senden') {
        el.textContent = 'Technische Anfrage senden';
      }
    });
  }


  function init(){
    improveGermanCtaLabels();
    addLegalLinks();
    addInquiryMailto();
    addSeriesInquiryButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
