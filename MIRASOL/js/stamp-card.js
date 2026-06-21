/**
 * El Mirasol — Clover-linked Fiesta stamp card.
 * Auth: name, phone, username, password (see js/account-auth.js).
 * Stamps earn on completed purchases when loyalty.stampCard.enabled is true.
 */
(function () {
  const TZ = 'America/New_York';
  const LOCAL_PREFIX = 'elmirasol-stamps-account-';

  const cfg = () => window.SITE_CONFIG?.loyalty?.stampCard || {};

  function nowLocal() {
    return new Date(new Date().toLocaleString('en-US', { timeZone: TZ }));
  }

  function toast(msg, type) {
    if (typeof window.featToast === 'function') window.featToast(msg, type);
  }

  function isEnabled() {
    return cfg().enabled === true;
  }

  function goal() {
    const n = parseInt(cfg().stampsPerReward, 10);
    return Number.isFinite(n) && n > 0 ? n : 5;
  }

  function stampOnPurchase() {
    return cfg().stampOnPurchase !== false;
  }

  async function getSession() {
    if (window.ElMirasolAuth?.getSession) return window.ElMirasolAuth.getSession();
    return null;
  }

  function localKey(accountId) {
    return `${LOCAL_PREFIX}${accountId}`;
  }

  function readLocalState(accountId) {
    try {
      const raw = localStorage.getItem(localKey(accountId));
      if (!raw) return { stamps: 0, lastOrderDay: '', redeemedPending: false };
      const data = JSON.parse(raw);
      return {
        stamps: Math.min(goal(), Math.max(0, parseInt(data.stamps, 10) || 0)),
        lastOrderDay: data.lastOrderDay || '',
        redeemedPending: Boolean(data.redeemedPending),
        lastOrderId: data.lastOrderId || '',
      };
    } catch (_) {
      return { stamps: 0, lastOrderDay: '', redeemedPending: false };
    }
  }

  function writeLocalState(accountId, state) {
    try {
      localStorage.setItem(localKey(accountId), JSON.stringify(state));
    } catch (_) { /* private browsing */ }
  }

  async function apiHeaders(extra) {
    if (window.ElMirasolAuth?.authHeaders) return window.ElMirasolAuth.authHeaders(extra);
    return { Accept: 'application/json', ...(extra || {}) };
  }

  async function fetchStampState(accountId) {
    const api = cfg().clover?.api || cfg().api || {};
    if (api.baseUrl && accountId && api.stampsPath) {
      try {
        const res = await fetch(`${api.baseUrl.replace(/\/$/, '')}${api.stampsPath}`, {
          method: 'GET',
          credentials: 'include',
          headers: await apiHeaders(),
        });
        if (res.ok) {
          const data = await res.json();
          return {
            stamps: Math.min(goal(), Math.max(0, parseInt(data.stamps, 10) || 0)),
            lastOrderDay: data.lastOrderDay || '',
            redeemedPending: Boolean(data.redeemedPending),
            lastOrderId: data.lastOrderId || '',
          };
        }
      } catch (_) { /* local bridge */ }
    }
    return readLocalState(accountId);
  }

  async function postEarnStamp(accountId, order) {
    const api = cfg().clover?.api || cfg().api || {};
    if (api.baseUrl && accountId && api.stampPath) {
      try {
        const res = await fetch(`${api.baseUrl.replace(/\/$/, '')}${api.stampPath}`, {
          method: 'POST',
          credentials: 'include',
          headers: await apiHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({
            accountId,
            cloverCustomerId: order.cloverCustomerId,
            orderId: order.orderId,
            purchasedAt: order.purchasedAt || new Date().toISOString(),
          }),
        });
        if (res.ok) return await res.json();
      } catch (_) { /* local bridge */ }
    }

    const state = readLocalState(accountId);
    const today = nowLocal().toDateString();
    const g = goal();

    if (cfg().oneStampPerOrderDay !== false && state.lastOrderDay === today) {
      return { ok: false, reason: 'already-stamped-today', stamps: state.stamps };
    }
    if (state.lastOrderId === order.orderId) {
      return { ok: false, reason: 'duplicate-order', stamps: state.stamps };
    }

    let stamps = state.stamps;
    if (stamps < g) stamps++;
    writeLocalState(accountId, {
      stamps,
      lastOrderDay: today,
      lastOrderId: order.orderId,
      redeemedPending: stamps >= g,
    });
    return { ok: true, stamps, unlocked: stamps >= g };
  }

  async function onPurchaseComplete(order) {
    if (!isEnabled()) return { ok: false, reason: 'disabled' };
    if (!stampOnPurchase()) return { ok: false, reason: 'manual-mode' };
    if (!order?.orderId) return { ok: false, reason: 'missing-order' };

    const session = await getSession();
    const accountId = order.accountId || session?.accountId;
    if (!accountId) return { ok: false, reason: 'not-signed-in' };

    const result = await postEarnStamp(accountId, {
      ...order,
      cloverCustomerId: order.cloverCustomerId || session?.cloverCustomerId,
    });
    refresh();
    if (result.ok && result.unlocked) {
      toast('Pass complete — complimentary dessert earned.', 'review');
    } else if (result.ok) {
      toast(`Punch ${result.stamps} of ${goal()} added to your Fiesta Pass.`);
    }
    return result;
  }

  async function redeemCard(accountId) {
    const api = cfg().clover?.api || cfg().api || {};
    if (api.baseUrl && accountId && api.redeemPath) {
      try {
        const res = await fetch(`${api.baseUrl.replace(/\/$/, '')}${api.redeemPath}`, {
          method: 'POST',
          credentials: 'include',
          headers: await apiHeaders(),
        });
        if (res.ok) {
          refresh();
          return true;
        }
      } catch (_) { /* local bridge */ }
    }
    writeLocalState(accountId, { stamps: 0, lastOrderDay: '', redeemedPending: false, lastOrderId: '' });
    refresh();
    return true;
  }

  let root;
  let authWrap;
  let memberWrap;
  let form;
  let formError;
  let submitBtn;
  let toggleBtn;
  let signOutBtn;
  let row;
  let reward;
  let accountEl;
  let btn;
  let lead;
  let formMode = 'register';
  let activeAccountId = null;

  function setFormMode(mode) {
    formMode = mode === 'sign-in' ? 'sign-in' : 'register';
    root?.classList.toggle('fiesta-stamps--sign-in', formMode === 'sign-in');
    if (submitBtn) {
      submitBtn.textContent = formMode === 'sign-in' ? 'Sign In' : 'Create My Stamp Card';
    }
    if (toggleBtn) {
      toggleBtn.textContent = formMode === 'sign-in'
        ? 'Need a card? Create one'
        : 'Already have a card? Sign in';
    }
    const nameInput = form?.elements.name;
    const phoneInput = form?.elements.phone;
    if (nameInput) nameInput.required = formMode === 'register';
    if (phoneInput) phoneInput.required = formMode === 'register';
    const pwInput = form?.elements.password;
    if (pwInput) pwInput.autocomplete = formMode === 'sign-in' ? 'current-password' : 'new-password';
    if (formError) formError.hidden = true;
  }

  function showAuthView() {
    authWrap.hidden = false;
    memberWrap.hidden = true;
    activeAccountId = null;
    root?.classList.remove('fiesta-stamps--active');
    if (lead) {
      lead.textContent = window.ElMirasolAuth?.usesCloverApi?.()
        ? 'Create your stamp card with name, phone, username, and password — synced to Clover at checkout.'
        : 'Create your stamp card with name, phone, username, and password. Stamps will track automatically once Clover is connected.';
    }
  }

  function renderStamps(stamps) {
    const g = goal();
    row.innerHTML = Array.from({ length: g }, (_, i) => {
      const filled = i < stamps;
      const isReward = i === g - 1;
      const label = filled
        ? `Punch ${i + 1} collected`
        : isReward
          ? `Punch ${i + 1} — dessert reward`
          : `Punch ${i + 1} empty`;
      return (
        `<div class="fiesta-stamp-slot${filled ? ' is-punched' : ''}${isReward ? ' is-reward' : ''}" aria-label="${label}">` +
        `<span class="fiesta-stamp-slot__ring" aria-hidden="true"></span>` +
        `<span class="fiesta-stamp-slot__core" aria-hidden="true"></span>` +
        (isReward ? `<span class="fiesta-stamp-slot__reward" aria-hidden="true">★</span>` : '') +
        `<span class="fiesta-stamp-slot__num" aria-hidden="true">${i + 1}</span>` +
        `</div>`
      );
    }).join('');
  }

  async function showMemberView(session) {
    authWrap.hidden = true;
    memberWrap.hidden = false;
    root?.classList.add('fiesta-stamps--active');
    activeAccountId = session.accountId;

    const state = await fetchStampState(session.accountId);
    const stamps = state.stamps;
    const g = goal();
    renderStamps(stamps);

    const label = session.name || session.username || 'Member';
    accountEl.textContent = session.cloverCustomerId
      ? `${label} · Clover #${session.cloverCustomerId}`
      : `${label} · ${session.phone || session.username}`;

    if (!isEnabled()) {
      reward.className = 'fiesta-stamps__reward';
      reward.textContent = 'Card saved — stamps start when Clover checkout goes live.';
      btn.disabled = true;
      btn.textContent = 'Stamps Coming Soon';
      btn.setAttribute('aria-disabled', 'true');
      btn.dataset.action = 'none';
      if (lead) {
        lead.textContent = 'You are signed in. Stamps will add automatically once Clover is connected.';
      }
      return;
    }

    if (stamps >= g) {
      reward.className = 'fiesta-stamps__reward is-unlocked';
      reward.textContent = 'Pass complete — complimentary dessert awaits at the register.';
      btn.disabled = false;
      btn.textContent = 'Start New Card';
      btn.removeAttribute('aria-disabled');
      btn.dataset.action = 'redeem';
    } else {
      const left = g - stamps;
      reward.className = 'fiesta-stamps__reward';
      reward.textContent = `${left} punch${left === 1 ? '' : 'es'} until your dessert reward.`;
      btn.disabled = true;
      btn.textContent = 'Stamp Added at Checkout';
      btn.setAttribute('aria-disabled', 'true');
      btn.dataset.action = 'none';
    }

    if (lead) {
      lead.textContent = 'Each completed Clover order adds one stamp. No need to tap — it happens automatically.';
    }
  }

  async function refresh() {
    if (!root) return;
    if (!syncHubVisibility()) return;
    const session = await getSession();
    if (session?.accountId) {
      await showMemberView(session);
      return;
    }
    showAuthView();
    setFormMode(formMode);
  }

  function showFormError(message) {
    if (!formError) return;
    formError.textContent = message;
    formError.hidden = !message;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    showFormError('');
    const data = new FormData(form);
    const payload = {
      name: data.get('name'),
      phone: data.get('phone'),
      username: data.get('username'),
      password: data.get('password'),
    };

    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    try {
      if (formMode === 'sign-in') {
        await window.ElMirasolAuth.signIn({
          username: payload.username,
          password: payload.password,
        });
        toast('Welcome back!');
      } else {
        await window.ElMirasolAuth.register(payload);
        toast('Stamp card created!');
      }
      form.reset();
      await refresh();
    } catch (err) {
      showFormError(err.message || 'Something went wrong. Please try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
    }
  }

  let initialized = false;

  const HUB_SUB_ON =
    'Spin the wheel to pick a dish. Collect a punch on your Fiesta Pass each visit.';
  const HUB_SUB_OFF = 'Spin the wheel to pick a dish from our menu.';

  function syncHubVisibility() {
    const hub = document.getElementById('fiesta-hub');
    const sub = hub?.querySelector('.fiesta-hub__head p');
    const on = isEnabled();

    if (root) {
      root.hidden = !on;
      root.setAttribute('aria-hidden', on ? 'false' : 'true');
    }
    hub?.classList.toggle('fiesta-hub--no-stamps', !on);
    if (sub) sub.textContent = on ? HUB_SUB_ON : HUB_SUB_OFF;
    return on;
  }

  function init() {
    if (initialized) {
      refresh();
      return;
    }
    root = document.getElementById('fiesta-stamps');
    if (!root) return;

    if (!syncHubVisibility()) {
      initialized = true;
      return;
    }

    authWrap = document.getElementById('fiesta-stamps-auth');
    memberWrap = document.getElementById('fiesta-stamps-member');
    form = document.getElementById('fiesta-stamps-form');
    formError = document.getElementById('fiesta-stamps-form-error');
    submitBtn = document.getElementById('fiesta-stamp-submit');
    toggleBtn = document.getElementById('fiesta-stamps-toggle');
    signOutBtn = document.getElementById('fiesta-stamps-signout');
    row = memberWrap?.querySelector('.fiesta-stamps__row');
    reward = memberWrap?.querySelector('.fiesta-stamps__reward');
    accountEl = document.getElementById('fiesta-stamps-account');
    btn = document.getElementById('fiesta-stamp-btn');
    lead = root.querySelector('.fiesta-card__lead');

    if (!authWrap || !memberWrap || !form || !row || !reward || !btn) return;

    form.addEventListener('submit', handleSubmit);
    toggleBtn?.addEventListener('click', () => {
      setFormMode(formMode === 'sign-in' ? 'register' : 'sign-in');
    });
    signOutBtn?.addEventListener('click', () => {
      window.ElMirasolAuth?.signOut?.();
      form.reset();
      setFormMode('register');
      toast('Signed out.');
    });

    btn.addEventListener('click', async () => {
      if (btn.dataset.action === 'redeem' && activeAccountId) {
        await redeemCard(activeAccountId);
        toast('New stamp card started.');
      }
    });

    setFormMode('register');
    initialized = true;
    refresh();
  }

  window.ElMirasolStampCard = {
    init,
    refresh,
    isEnabled,
    syncHubVisibility,
    onPurchaseComplete,
    getSession,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();