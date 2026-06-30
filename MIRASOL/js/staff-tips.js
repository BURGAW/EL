/**
 * Staff tip links — renders from SITE_CONFIG.staffTips
 */
(function () {
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function render() {
    const cfg = window.SITE_CONFIG?.staffTips;
    const mount = document.getElementById('staff-tips-mount');
    if (!cfg?.enabled || !mount) return;

    const members = (cfg.members || []).filter((m) => m && m.name);
    if (!members.length) return;

    const cards = members
      .map((member) => {
        const url = String(member.url || '').trim();
        const action = url
          ? `<a href="${escapeHtml(url)}" class="btn btn-red staff-tips__btn" target="_blank" rel="noopener noreferrer">${escapeHtml(member.cta || `Tip ${member.name}`)}</a>`
          : `<p class="staff-tips__fallback">Tip with cash or card at the register</p>`;

        return (
          `<article class="staff-tips__card">` +
          `<h3 class="staff-tips__name">${escapeHtml(member.name)}</h3>` +
          `<p class="staff-tips__role">${escapeHtml(member.role || 'Server')}</p>` +
          action +
          `</article>`
        );
      })
      .join('');

    mount.innerHTML =
      `<p class="section-tag reveal">Our Team</p>` +
      `<h2 class="staff-tips__title reveal" id="staff-tips-heading">${escapeHtml(cfg.heading || 'Tip our servers')}</h2>` +
      (cfg.lead ? `<p class="staff-tips__lead reveal">${escapeHtml(cfg.lead)}</p>` : '') +
      `<div class="staff-tips__grid reveal">${cards}</div>`;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();