/**
 * El Mirasol — "Text a Friend" invite with same-day 5% coupon
 */
(function () {
  const TZ = 'America/New_York';
  const COUPON_KEY = 'elmirasol-friend-coupon-v1';
  const PHONE = '(910) 789-1154';
  const ADDRESS = '211 U.S. Hwy 117 S, Burgaw, NC 28425';

  const DISHES = [
    'birria tacos with consommé for dipping',
    'sizzling campechanas fajitas',
    'fresh-pressed tortillas and house salsa',
    'a pineapple margarita with Tajín on the rim',
    'Sunday-morning chilaquiles',
    'molcajete straight off the plancha',
  ];

  const OPENER = [
    'Okay hear me out —',
    'Real talk:',
    'You need this in your life:',
    'I\'m putting you on:',
    'Trust me on this one:',
    'Plot twist for dinner tonight:',
    'Cancel your plans and read this:',
  ];

  const BODY = [
    'MIRASOL in Burgaw is the family-run Mexican spot everyone drives to for {dish}. 4.8★ on Google, made-from-scratch everything, and the kind of kitchen that actually cares.',
    'There\'s a little Mexican grill in Burgaw called MIRASOL — family-owned, hardworking, and obsessed with doing things right. Start with {dish} and thank me later.',
    'I found our new go-to: MIRASOL on US-117 in Burgaw. Homemade tortillas, bold salsas, and {dish} that will ruin every other version for you.',
    'MIRASOL in Burgaw hits different — not a chain, just a family kitchen putting love on every plate. I\'m talking {dish}, cold margaritas, the whole vibe.',
  ];

  const CLOSER = [
    'I\'m sending you 5% off — good TODAY ({date}) ONLY. Code: {code}. Show it when you order (dine-in or takeout).',
    'Here\'s 5% off if you go TODAY ({date}) — code {code}. One per visit, today only, mention it at the register.',
    'Bonus: 5% off TODAY ({date}) with code {code}. Valid only on the day I sent this — grab {dish} while it lasts.',
    'I got you 5% off for TODAY ({date}) only — use code {code} when you order. Expires at midnight, no exceptions.',
  ];

  const SIGNOFF = [
    'Let\'s go 🌮',
    'Say yes — you\'ll love it.',
    'Meet me there?',
    'Your taste buds will send a thank-you note.',
    'This is your sign to go.',
  ];

  function nowLocal() {
    return new Date(new Date().toLocaleString('en-US', { timeZone: TZ }));
  }

  function dateKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function formatDateLabel(d) {
    return d.toLocaleDateString('en-US', {
      timeZone: TZ,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  }

  function formatCodeDate(d) {
    const month = d.toLocaleDateString('en-US', { timeZone: TZ, month: 'short' }).toUpperCase().replace('.', '');
    const day = d.getDate();
    return `${month}${day}`;
  }

  function randomSuffix(len) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let out = '';
    for (let i = 0; i < len; i++) {
      out += chars[Math.floor(Math.random() * chars.length)];
    }
    return out;
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getCouponCode(d) {
    const key = dateKey(d);
    try {
      const stored = JSON.parse(localStorage.getItem(COUPON_KEY) || 'null');
      if (stored?.date === key && stored?.code) return stored.code;
    } catch {
      /* ignore */
    }
    const code = `MIRA5-${formatCodeDate(d)}-${randomSuffix(4)}`;
    localStorage.setItem(COUPON_KEY, JSON.stringify({ date: key, code, created: Date.now() }));
    return code;
  }

  function isClosedToday(d) {
    return d.getDay() === 2;
  }

  function buildMessage() {
    const d = nowLocal();
    const code = getCouponCode(d);
    const date = formatDateLabel(d);
    const dish = pick(DISHES);
    const dish2 = pick(DISHES.filter((x) => x !== dish));

    let msg =
      `${pick(OPENER)} ${pick(BODY).replace(/\{dish\}/g, dish)} ` +
      `${pick(CLOSER).replace(/\{date\}/g, date).replace(/\{code\}/g, code).replace(/\{dish\}/g, dish2)} ` +
      `${ADDRESS} · ${PHONE}. ${pick(SIGNOFF)}`;

    if (isClosedToday(d)) {
      msg += ' (We\'re closed Tuesdays — code works when you come Wed–Mon.)';
    }

    return msg;
  }

  function toast(msg, type) {
    if (typeof window.featToast === 'function') {
      window.featToast(msg, type);
      return;
    }
    if (window.FiestaAlive?.toast) {
      window.FiestaAlive.toast(msg, type);
    }
  }

  function openSms() {
    const body = buildMessage();
    const encoded = encodeURIComponent(body);
    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (mobile) {
      location.href = `sms:?&body=${encoded}`;
      return;
    }

    navigator.clipboard?.writeText(body).then(
      () => toast('Invite copied — paste into Messages or your texting app. 5% code is valid today only.'),
      () => toast(body)
    );
  }

  window.FriendText = {
    buildMessage,
    getCouponCode: () => getCouponCode(nowLocal()),
    openSms,
  };
})();