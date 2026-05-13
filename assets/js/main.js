// Platz für spätere Interaktionen, z. B. mobile Navigation oder Formulare.

(function () {
  function addIsoFooterCertificate() {
    var footerGrid = document.querySelector('footer .footer-grid');
    if (!footerGrid || footerGrid.querySelector('.footer-certification')) return;

    var cert = document.createElement('div');
    cert.className = 'footer-certification';
    cert.innerHTML =
      '<img src="assets/img/din-iso-9001-badge.svg" alt="DIN ISO 9001 Zertifizierung" class="footer-certification__badge">' +
      '<div class="footer-certification__text">' +
        '<strong>DIN EN ISO 9001</strong>' +
        '<span>Qualitätsmanagement · Verband Deutscher Maschinen- und Anlagenbau e.V.</span>' +
      '</div>';

    footerGrid.appendChild(cert);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addIsoFooterCertificate);
  } else {
    addIsoFooterCertificate();
  }
}());
