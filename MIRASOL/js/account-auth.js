/**
 * El Mirasol — Clover stamp card auth (name, phone, username, password only).
 *
 * Frontend never talks to Clover directly. Point loyalty.stampCard.clover.api.baseUrl
 * at your server; it should:
 *   POST registerPath  → create Clover customer + store credentials
 *   POST loginPath     → verify username/password, return session + cloverCustomerId
 *   GET  sessionPath   → current session (optional)
 *
 * Expected register/login JSON response:
 *   { accountId, cloverCustomerId?, name, phone, username, token? }
 */
(function () {
  const SESSION_KEY = 'elmirasol-clover-session-v1';
  const LOCAL_USERS_KEY = 'elmirasol-clover-users-v1';

  const cfg = () => window.SITE_CONFIG?.loyalty?.stampCard || {};
  const cloverApi = () => cfg().clover?.api || cfg().api || {};

  function normalizePhone(phone) {
    const digits = String(phone || '').replace(/\D/g, '');
    if (digits.length === 10) return digits;
    if (digits.length === 11 && digits.startsWith('1')) return digits.slice(1);
    return digits;
  }

  function readSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function writeSession(session) {
    try {
      if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      else localStorage.removeItem(SESSION_KEY);
    } catch (_) { /* private browsing */ }
  }

  function readLocalUsers() {
    try {
      const raw = localStorage.getItem(LOCAL_USERS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (_) {
      return {};
    }
  }

  function writeLocalUsers(users) {
    try {
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
    } catch (_) { /* ignore */ }
  }

  function sessionFromPayload(data) {
    if (!data?.accountId) return null;
    return {
      accountId: data.accountId,
      cloverCustomerId: data.cloverCustomerId || data.customerId || '',
      name: data.name || '',
      phone: data.phone || '',
      username: data.username || '',
      token: data.token || '',
    };
  }

  async function apiPost(path, body) {
    const api = cloverApi();
    if (!api.baseUrl || !path) return null;
    const res = await fetch(`${api.baseUrl.replace(/\/$/, '')}${path}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...body,
        merchantId: cfg().clover?.merchantId || '',
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data.message || data.error || 'Request failed');
      err.code = data.code || res.status;
      throw err;
    }
    return data;
  }

  function localRegister({ name, phone, username, password }) {
    const users = readLocalUsers();
    const key = String(username || '').trim().toLowerCase();
    if (!key) throw Object.assign(new Error('Username is required.'), { code: 'username' });
    if (users[key]) throw Object.assign(new Error('That username is already taken.'), { code: 'duplicate' });

    const accountId = `local-${key}`;
    users[key] = {
      accountId,
      name: String(name || '').trim(),
      phone: normalizePhone(phone),
      username: String(username || '').trim(),
      password: String(password || ''),
      cloverCustomerId: '',
    };
    writeLocalUsers(users);
    return {
      accountId,
      cloverCustomerId: '',
      name: users[key].name,
      phone: users[key].phone,
      username: users[key].username,
    };
  }

  function localSignIn({ username, password }) {
    const users = readLocalUsers();
    const key = String(username || '').trim().toLowerCase();
    const user = users[key];
    if (!user || user.password !== String(password || '')) {
      throw Object.assign(new Error('Username or password is incorrect.'), { code: 'auth' });
    }
    return {
      accountId: user.accountId,
      cloverCustomerId: user.cloverCustomerId || '',
      name: user.name,
      phone: user.phone,
      username: user.username,
    };
  }

  async function register({ name, phone, username, password }) {
    const payload = {
      name: String(name || '').trim(),
      phone: normalizePhone(phone),
      username: String(username || '').trim(),
      password: String(password || ''),
    };

    if (!payload.name) throw Object.assign(new Error('Name is required.'), { code: 'name' });
    if (payload.phone.length < 10) throw Object.assign(new Error('Enter a valid 10-digit phone number.'), { code: 'phone' });
    if (!payload.username) throw Object.assign(new Error('Username is required.'), { code: 'username' });
    if (payload.password.length < 6) throw Object.assign(new Error('Password must be at least 6 characters.'), { code: 'password' });

    const api = cloverApi();
    let data;
    if (api.baseUrl && api.registerPath) {
      data = await apiPost(api.registerPath, payload);
    } else {
      data = localRegister(payload);
    }

    const session = sessionFromPayload(data);
    writeSession(session);
    window.ElMirasolStampCard?.refresh?.();
    return session;
  }

  async function signIn({ username, password }) {
    const payload = {
      username: String(username || '').trim(),
      password: String(password || ''),
    };
    if (!payload.username || !payload.password) {
      throw Object.assign(new Error('Username and password are required.'), { code: 'auth' });
    }

    const api = cloverApi();
    let data;
    if (api.baseUrl && api.loginPath) {
      data = await apiPost(api.loginPath, payload);
    } else {
      data = localSignIn(payload);
    }

    const session = sessionFromPayload(data);
    writeSession(session);
    window.ElMirasolStampCard?.refresh?.();
    return session;
  }

  async function getSession() {
    if (typeof window.__EL_MIRASOL_DEV_SESSION__ === 'object' && window.__EL_MIRASOL_DEV_SESSION__) {
      return window.__EL_MIRASOL_DEV_SESSION__;
    }

    const cached = readSession();
    if (!cached?.accountId) return null;

    const api = cloverApi();
    if (api.baseUrl && api.sessionPath) {
      try {
        const headers = { Accept: 'application/json' };
        if (cached.token) headers.Authorization = `Bearer ${cached.token}`;
        const res = await fetch(`${api.baseUrl.replace(/\/$/, '')}${api.sessionPath}`, {
          method: 'GET',
          credentials: 'include',
          headers,
        });
        if (res.ok) {
          const data = await res.json();
          const session = sessionFromPayload(data) || cached;
          writeSession(session);
          return session;
        }
        if (res.status === 401) writeSession(null);
      } catch (_) { /* use cached session */ }
    }

    return cached;
  }

  function signOut() {
    writeSession(null);
    window.__EL_MIRASOL_DEV_SESSION__ = null;
    window.ElMirasolStampCard?.refresh?.();
  }

  async function authHeaders(extra) {
    const session = await getSession();
    const headers = { Accept: 'application/json', ...(extra || {}) };
    if (session?.token) headers.Authorization = `Bearer ${session.token}`;
    return headers;
  }

  window.ElMirasolAuth = {
    register,
    signIn,
    getSession,
    signOut,
    authHeaders,
    isConfigured: () => Boolean(cloverApi().baseUrl),
    usesCloverApi: () => Boolean(cloverApi().baseUrl && cloverApi().registerPath),
  };
})();