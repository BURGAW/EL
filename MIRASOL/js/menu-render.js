/**
 * Menu views: Breakfast | Daily Lunch | Dinner (compact).
 * Each item is a button; click opens description + modifiers.
 */
(function () {
  const EXCLUDED_FROM_DINNER = new Set(['breakfast', 'daily-lunch']);
  const SOLO_VIEWS = new Set(['breakfast', 'daily-lunch']);

  let activeView = 'dinner';
  let activeCategory = null;
  const itemRegistry = {};
  let modalState = { key: null, selections: {}, qty: 1 };

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getLang() {
    return window.MENU_LANG === 'es' ? 'es' : 'en';
  }

  function getSections() {
    return getLang() === 'es' ? window.MENU_DATA_ES : window.MENU_DATA;
  }

  function getDinnerSections(all) {
    return (all || []).filter((s) => !EXCLUDED_FROM_DINNER.has(s.id));
  }

  function getViewSections(all) {
    if (activeView === 'breakfast') {
      return (all || []).filter((s) => s.id === 'breakfast');
    }
    if (activeView === 'daily-lunch') {
      return (all || []).filter((s) => s.id === 'daily-lunch');
    }
    return getDinnerSections(all);
  }

  function resolveFromHash(all) {
    const hash = window.location.hash.replace('#', '');
    const dinner = getDinnerSections(all);

    if (hash === 'breakfast') {
      return { view: 'breakfast', category: 'breakfast' };
    }
    if (hash === 'daily-lunch') {
      return { view: 'daily-lunch', category: 'daily-lunch' };
    }
    if (hash === 'dinner' || !hash) {
      return { view: 'dinner', category: dinner[0]?.id || null };
    }
    if (dinner.some((s) => s.id === hash)) {
      return { view: 'dinner', category: hash };
    }
    return { view: 'dinner', category: dinner[0]?.id || null };
  }

  function setHashForView() {
    const target = activeView === 'dinner' ? activeCategory || 'dinner' : activeView;
    const next = `#${target}`;
    if (window.location.hash !== next) {
      history.replaceState(null, '', next);
    }
  }

  function getData() {
    const lang = getLang();
    return {
      lang,
      sections: getSections() || [],
      meats: lang === 'es' ? window.MEAT_CHOICES_ES : window.MEAT_CHOICES,
      meatsLabel: lang === 'es' ? 'Carnes' : 'Meats',
      tagLabels:
        lang === 'es'
          ? { signature: 'Especialidad', popular: 'Popular', weekend: 'Fin de semana' }
          : { signature: 'Signature', popular: 'Popular', weekend: 'Weekend Only' },
      emptyLabel: lang === 'es' ? 'Pr\u00f3ximamente' : 'Coming soon',
      customizeHint: lang === 'es' ? 'Toca para personalizar' : 'Tap to customize',
      detailsHint: lang === 'es' ? 'Toca para detalles' : 'Tap for details',
      noDesc: lang === 'es' ? 'Pregunte en el mostrador por detalles.' : 'Ask at the counter for details.',
      modalClose: lang === 'es' ? 'Cerrar' : 'Close',
      modifiersLabel: lang === 'es' ? 'Modificadores' : 'Modifiers',
    };
  }

  function parseBasePrice(price, item) {
    if (item?.sizePrices) {
      const s = item.sizePrices.Small ?? item.sizePrices.small;
      return typeof s === 'number' ? s : 0;
    }
    if (!price) return 0;
    const m = String(price).match(/\$([0-9]+(?:\.[0-9]{2})?)/);
    return m ? parseFloat(m[1]) : 0;
  }

  function formatPrice(amount) {
    return '$' + amount.toFixed(2);
  }

  function itemKey(sectionId, index) {
    return `${sectionId}-${index}`;
  }

  function customizationEnabled() {
    return window.SITE_CONFIG?.menu?.customizationEnabled === true;
  }

  function hasDualSize(item) {
    return window.MenuModifiers?.hasDualSize?.(item) === true;
  }

  function getItemModifierGroups(sectionId, item) {
    if (!window.MenuModifiers) return [];
    const all = window.MenuModifiers.getModifiersForItem(sectionId, item);
    if (customizationEnabled()) return all;
    if (hasDualSize(item)) return all.filter((g) => g.id === 'size');
    return [];
  }

  function itemHasModifiers(sectionId, item) {
    if (hasDualSize(item)) return true;
    return getItemModifierGroups(sectionId, item).length > 0;
  }

  function renderCard(sectionId, item, index) {
    const { tagLabels, detailsHint, customizeHint } = getData();
    const key = itemKey(sectionId, index);
    itemRegistry[key] = { sectionId, item, index };
    const dualSize = hasDualSize(item);
    const customizable = itemHasModifiers(sectionId, item);
    const hasDesc = Boolean(item.desc);
    const hint = customizable ? customizeHint : detailsHint;

    const p = parseBasePrice(item.price, item);
    const attrs = [];
    if (item.sku) attrs.push(`data-sku="${escapeHtml(item.sku)}"`);
    if (p) attrs.push(`data-price="${p.toFixed(2)}"`);
    if (customizable) attrs.push('data-customizable="true"');
    if (hasDesc) attrs.push('data-has-desc="true"');
    if (dualSize) attrs.push('data-dual-size="true"');

    const ariaLabel = [item.name, dualSize ? null : item.price, hint].filter(Boolean).join(' — ');
    attrs.push(`aria-label="${escapeHtml(ariaLabel)}"`);

    let html = `<button type="button" class="menu-card menu-card--btn menu-item${customizable ? ' menu-card--customizable' : ''}" data-item-key="${escapeHtml(key)}"${attrs.length ? ' ' + attrs.join(' ') : ''}>`;
    html += '<div class="menu-card__head">';
    html += `<span class="menu-card__name">${escapeHtml(item.name)}</span>`;
    if (item.price && !dualSize) {
      html += `<span class="menu-card__price">${escapeHtml(item.price)}</span>`;
    }
    html += '</div>';
    html += '<div class="menu-card__foot">';
    if (item.tag && tagLabels[item.tag]) {
      html += `<span class="menu-card__badge menu-badge menu-badge--${escapeHtml(item.tag)}">${escapeHtml(tagLabels[item.tag])}</span>`;
    }
    html += `<span class="menu-card__hint">${escapeHtml(hint)}</span>`;
    html += '</div>';
    html += '</button>';
    return html;
  }

  function setModalPhoto(sectionId, item) {
    const fig = document.getElementById('item-modal-photo');
    const img = document.getElementById('item-modal-photo-img');
    const dialog = document.querySelector('#item-modal .item-modal__dialog');
    if (!fig || !img) return;

    const photo = window.SITE_PHOTOS?.resolveItemPhoto?.(sectionId, item);
    if (!photo?.src) {
      fig.hidden = true;
      img.removeAttribute('src');
      img.alt = '';
      dialog?.classList.remove('item-modal__dialog--has-photo');
      return;
    }

    fig.hidden = false;
    dialog?.classList.add('item-modal__dialog--has-photo');
    const alt = photo.alt || item.name || '';
    const src = photo.src;
    if (img.getAttribute('src') !== src) img.src = src;
    img.alt = alt;
    img.classList.remove('item-modal__photo-img--crop-left', 'item-modal__photo-img--crop-right');
    if (photo.crop === 'left') img.classList.add('item-modal__photo-img--crop-left');
    if (photo.crop === 'right') img.classList.add('item-modal__photo-img--crop-right');
  }

  function clearModalPhoto() {
    const fig = document.getElementById('item-modal-photo');
    const img = document.getElementById('item-modal-photo-img');
    const dialog = document.querySelector('#item-modal .item-modal__dialog');
    if (fig) fig.hidden = true;
    if (img) {
      img.removeAttribute('src');
      img.alt = '';
      img.classList.remove('item-modal__photo-img--crop-left', 'item-modal__photo-img--crop-right');
    }
    dialog?.classList.remove('item-modal__dialog--has-photo');
  }

  function bindViewTabs() {
    document.querySelectorAll('.menu-view-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeView = btn.dataset.view;
        const all = getSections();
        const viewSections = getViewSections(all);
        activeCategory = viewSections[0]?.id || null;
        if (typeof window.setMenuHero === 'function') window.setMenuHero(activeView);
        setHashForView();
        render();
      });
    });
  }

  function renderViewTabs() {
    document.querySelectorAll('.menu-view-tab').forEach((btn) => {
      const on = btn.dataset.view === activeView;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  function bindCategoryTabs(sections) {
    const tabs = document.getElementById('menu-cat-tabs');
    if (!tabs) return;

    tabs.querySelectorAll('.menu-online-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.cat;
        setHashForView();
        renderPanel(sections);
        renderCategoryTabs(sections);
      });
    });
  }

  function renderCategoryTabs(sections) {
    const tabs = document.getElementById('menu-cat-tabs');
    const toolbar = document.getElementById('menu-cat-toolbar');
    if (!tabs) return;

    const showCats = activeView === 'dinner' && sections.length > 1;
    if (toolbar) toolbar.hidden = !showCats;

    if (!showCats) {
      tabs.innerHTML = '';
      return;
    }

    if (!activeCategory || !sections.some((s) => s.id === activeCategory)) {
      activeCategory = sections[0]?.id || null;
    }

    tabs.innerHTML = sections
      .map((s) => {
        const active = s.id === activeCategory ? ' is-active' : '';
        const pressed = s.id === activeCategory ? 'true' : 'false';
        return `<button type="button" class="menu-online-tab${active}" role="tab" data-cat="${escapeHtml(s.id)}" aria-selected="${pressed}" id="tab-${escapeHtml(s.id)}">${escapeHtml(s.title)}</button>`;
      })
      .join('');

    bindCategoryTabs(sections);
  }

  function initItemGridClicks() {
    const grid = document.getElementById('menu-grid');
    if (!grid || grid.dataset.delegateBound) return;
    grid.dataset.delegateBound = '1';
    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('.menu-card--btn[data-item-key]');
      if (btn) openItemModal(btn.dataset.itemKey);
    });
  }

  function renderPanel(sections) {
    const grid = document.getElementById('menu-grid');
    const heading = document.getElementById('menu-panel-title');
    const noteEl = document.getElementById('menu-section-note');
    const shell = document.querySelector('.menu-online');
    if (!grid) return;

    Object.keys(itemRegistry).forEach((k) => delete itemRegistry[k]);

    const section = sections.find((s) => s.id === activeCategory) || sections[0];
    if (!section) {
      grid.innerHTML = '';
      return;
    }

    activeCategory = section.id;

    const solo = SOLO_VIEWS.has(activeView);
    grid.classList.toggle('menu-online__grid--solo', solo);
    if (shell) shell.classList.toggle('menu-online--solo', solo);

    if (heading) {
      heading.textContent = solo ? '' : section.title;
      heading.hidden = solo;
    }

    if (noteEl) {
      if (section.note) {
        noteEl.textContent = section.note;
        noteEl.hidden = false;
      } else {
        noteEl.textContent = '';
        noteEl.hidden = true;
      }
    }

    const items = section.items || [];
    const { emptyLabel } = getData();

    if (!items.length) {
      grid.innerHTML = `<p class="menu-online__empty">${escapeHtml(section.note || emptyLabel)}</p>`;
    } else {
      grid.innerHTML = items.map((item, i) => renderCard(section.id, item, i)).join('');
    }

    grid.setAttribute('aria-labelledby', solo ? `view-tab-${activeView}` : `tab-${section.id}`);
  }

  function defaultSelections(groups) {
    const sel = {};
    groups.forEach((group) => {
      if (group.type === 'radio' && group.default) {
        sel[group.id] = group.default;
      }
      if (group.type === 'toggle' || group.type === 'checkbox') {
        group.options.forEach((opt) => {
          sel[opt.id] = false;
        });
      }
    });
    return sel;
  }

  function calcTotal(base, groups, selections) {
    let total = base;
    groups.forEach((group) => {
      if (group.type === 'radio') {
        const pick = group.options.find((o) => o.id === selections[group.id]);
        if (pick) total += pick.price || 0;
      } else {
        group.options.forEach((opt) => {
          if (selections[opt.id]) total += opt.price || 0;
        });
      }
    });
    return total;
  }

  function formatModifierLines(groups, selections) {
    const lines = [];
    groups.forEach((group) => {
      if (group.type === 'radio') {
        const pick = group.options.find((o) => o.id === selections[group.id]);
        if (pick && pick.id !== group.default) {
          lines.push(`${group.label}: ${pick.label}`);
        } else if (pick && group.id === 'size') {
          lines.push(`${group.label}: ${pick.label}`);
        }
      } else {
        group.options.forEach((opt) => {
          if (selections[opt.id]) lines.push(opt.label);
        });
      }
    });
    return lines;
  }

  function cartLineName(item, groups, selections) {
    let name = item.name;
    const sizeGroup = groups.find((g) => g.id === 'size');
    if (!sizeGroup) return name;

    const pickId = selections.size || sizeGroup.default || 'Small';
    const sizeLabel =
      pickId === 'Large' ? (getLang() === 'es' ? 'Grande' : 'Large')
      : pickId === 'Both' ? (getLang() === 'es' ? 'Ambos' : 'Both')
      : getLang() === 'es' ? 'Chico' : 'Small';
    return `${name} (${sizeLabel})`;
  }

  function buildLineItem(key, selections, qty) {
    const entry = itemRegistry[key];
    if (!entry) return null;
    const { item, sectionId } = entry;
    const groups = getItemModifierGroups(sectionId, item);
    const base = parseBasePrice(item.price, item);
    const unitPrice = calcTotal(base, groups, selections);
    const name = hasDualSize(item) ? cartLineName(item, groups, selections) : item.name;
    return {
      itemKey: key,
      name,
      sectionId,
      sku: item.sku || '',
      qty: Math.max(1, Math.min(99, qty || 1)),
      unitPrice,
      basePrice: base,
      selections: { ...selections },
      modifierLines: formatModifierLines(groups, selections),
      priceDisplay: formatPrice(unitPrice),
    };
  }

  function renderModifierChips(groups, selections) {
    return groups
      .map((group) => {
        let html = `<div class="mod-group" data-group="${escapeHtml(group.id)}">`;
        html += `<div class="mod-group__label">${escapeHtml(group.label)}</div>`;
        html += '<div class="mod-group__chips">';

        group.options.forEach((opt) => {
          let active = false;
          if (group.type === 'radio') {
            active = selections[group.id] === opt.id;
          } else {
            active = !!selections[opt.id];
          }

          const activeClass = active ? ' is-active' : '';
          const toggleClass = group.type === 'toggle' ? ' mod-chip--toggle' : '';
          html += `<button type="button" class="mod-chip${toggleClass}${activeClass}" data-group="${escapeHtml(group.id)}" data-opt="${escapeHtml(opt.id)}" data-type="${escapeHtml(group.type)}">${escapeHtml(opt.label)}</button>`;
        });

        html += '</div></div>';
        return html;
      })
      .join('');
  }

  function bindModifierChips(groups) {
    const container = document.getElementById('item-modal-modifiers');
    if (!container) return;

    container.querySelectorAll('.mod-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const groupId = chip.dataset.group;
        const optId = chip.dataset.opt;
        const type = chip.dataset.type;
        const group = groups.find((g) => g.id === groupId);
        if (!group) return;

        if (type === 'radio') {
          modalState.selections[groupId] = optId;
        } else {
          modalState.selections[optId] = !modalState.selections[optId];
        }

        refreshModalContent();
      });
    });
  }

  function refreshModalContent() {
    const entry = itemRegistry[modalState.key];
    if (!entry) return;

    const { item, sectionId } = entry;
    const groups = getItemModifierGroups(sectionId, item);
    const base = parseBasePrice(item.price, item);
    const total = calcTotal(base, groups, modalState.selections);

    const priceEl = document.getElementById('item-modal-price');
    if (priceEl) {
      priceEl.textContent = groups.length ? formatPrice(total) : item.price || '';
    }

    const modContainer = document.getElementById('item-modal-modifiers');
    if (modContainer) {
      if (groups.length) {
        modContainer.innerHTML = renderModifierChips(groups, modalState.selections);
        modContainer.hidden = false;
        bindModifierChips(groups);
      } else {
        modContainer.innerHTML = '';
        modContainer.hidden = true;
      }
    }
  }

  function openItemModal(key) {
    const entry = itemRegistry[key];
    const modal = document.getElementById('item-modal');
    if (!entry || !modal) return;

    const { item, sectionId, index } = entry;
    const { noDesc, modifiersLabel } = getData();
    const groups = getItemModifierGroups(sectionId, item);

    modalState = {
      key,
      selections: defaultSelections(groups),
      qty: 1,
    };

    const qtyEl = document.getElementById('item-modal-qty');
    if (qtyEl) qtyEl.textContent = '1';

    const title = document.getElementById('item-modal-title');
    const priceEl = document.getElementById('item-modal-price');
    const descEl = document.getElementById('item-modal-desc');
    const modHeading = document.getElementById('item-modal-mod-heading');

    if (title) title.textContent = item.name;
    setModalPhoto(sectionId, item);
    if (descEl) {
      descEl.textContent = item.desc || noDesc;
    }
    if (modHeading) {
      const sizeOnly = groups.length === 1 && groups[0].id === 'size';
      modHeading.textContent = sizeOnly ? groups[0].label : modifiersLabel;
      modHeading.hidden = !groups.length;
    }

    refreshModalContent();

    if (priceEl && !groups.length && item.price && !hasDualSize(item)) {
      priceEl.textContent = item.price;
    }

    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    window.dispatchEvent(
      new CustomEvent('elmirasol:menu-modal-open', { detail: { key, sectionId, name: item.name } })
    );

    const closeBtn = modal.querySelector('.item-modal__close');
    closeBtn?.focus();
  }

  function closeItemModal() {
    const modal = document.getElementById('item-modal');
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    clearModalPhoto();
    modalState = { key: null, selections: {}, qty: 1 };
  }

  function setModalQty(next) {
    modalState.qty = Math.max(1, Math.min(99, next));
    const qtyEl = document.getElementById('item-modal-qty');
    if (qtyEl) qtyEl.textContent = String(modalState.qty);
  }

  function addModalToCart() {
    if (!modalState.key || !window.OrderCart?.enabled?.()) return;
    const line = buildLineItem(modalState.key, modalState.selections, modalState.qty);
    if (!line) return;
    window.OrderCart.addLine(line);
    closeItemModal();
    window.OrderCart.openDrawer?.();
  }

  function initModal() {
    const modal = document.getElementById('item-modal');
    if (!modal) return;

    modal.querySelectorAll('[data-modal-close]').forEach((el) => {
      el.addEventListener('click', closeItemModal);
    });

    document.getElementById('item-modal-qty-minus')?.addEventListener('click', () => {
      setModalQty((modalState.qty || 1) - 1);
    });
    document.getElementById('item-modal-qty-plus')?.addEventListener('click', () => {
      setModalQty((modalState.qty || 1) + 1);
    });
    document.getElementById('item-modal-add-cart')?.addEventListener('click', addModalToCart);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) closeItemModal();
    });
  }

  function lookupItemByKey(key) {
    const match = String(key || '').match(/^(.+)-(\d+)$/);
    if (!match) return null;
    const sectionId = match[1];
    const index = parseInt(match[2], 10);
    const sections = getSections() || [];
    const section = sections.find((s) => s.id === sectionId);
    const item = section?.items?.[index];
    return item ? { sectionId, item, index } : null;
  }

  function resolveLineName(key, selections, storedName) {
    const entry = itemRegistry[key] || lookupItemByKey(key);
    if (entry) {
      const { item, sectionId } = entry;
      const groups = getItemModifierGroups(sectionId, item);
      const sel = selections || {};
      const resolved = hasDualSize(item) ? cartLineName(item, groups, sel) : item.name || '';
      if (resolved) return resolved;
    }

    const stored = String(storedName || '').trim();
    if (stored) return stored;
    return '';
  }

  window.MenuOrder = {
    buildLineItem,
    resolveLineName,
    getModalState: () => ({ ...modalState }),
    getEntry: (key) => itemRegistry[key] || null,
    customizationEnabled,
    getModifierLines: (key, selections) => {
      const entry = itemRegistry[key];
      if (!entry) return [];
      const groups = getItemModifierGroups(entry.sectionId, entry.item);
      return formatModifierLines(groups, selections || {});
    },
    parseBasePrice,
    calcTotal,
    formatPrice,
  };

  function render() {
    const all = getSections();
    if (!all || !all.length) return;

    const resolved = resolveFromHash(all);
    activeView = resolved.view;
    activeCategory = resolved.category;

    const viewSections = getViewSections(all);

    renderViewTabs();
    renderCategoryTabs(viewSections);
    renderPanel(viewSections);

    if (typeof window.setMenuHero === 'function') {
      window.setMenuHero(activeView);
    }

    window.dispatchEvent(new CustomEvent('elmirasol:menu-rendered'));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initModal();
    initItemGridClicks();
    bindViewTabs();
    render();
  });

  window.addEventListener('elmirasol:lang-change', () => {
    closeItemModal();
    render();
  });

  window.addEventListener('elmirasol:ui-applied', () => {
    if (typeof window.setMenuHero === 'function' && window.MENU_VIEW) {
      window.setMenuHero(window.MENU_VIEW);
    }
    renderViewTabs();
  });

  window.addEventListener('hashchange', render);
})();