import http from 'node:http';
import { chargePickupOrder, envFromProcess } from './clover.mjs';

const PORT = Number(process.env.PORT) || 8787;
const ALLOWED_ORIGINS = new Set(
  (process.env.ALLOWED_ORIGINS || 'https://burgaw.github.io,http://127.0.0.1:5500,http://localhost:5500')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
);

function corsHeaders(origin) {
  const headers = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    Vary: 'Origin',
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) reject(new Error('payload_too_large'));
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('invalid_json'));
      }
    });
    req.on('error', reject);
  });
}

function send(res, status, body, origin) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
    ...corsHeaders(origin),
  });
  res.end(payload);
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || '';
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders(origin));
    res.end();
    return;
  }

  if (req.method === 'GET' && url.pathname === '/health') {
    const env = envFromProcess();
    send(
      res,
      200,
      {
        ok: true,
        merchantId: env.CLOVER_MERCHANT_ID,
        ecomm: Boolean(env.CLOVER_ECOMM_PRIVATE_TOKEN),
        platform: Boolean(env.CLOVER_PLATFORM_TOKEN),
        kitchenDevice: Boolean(env.CLOVER_KITCHEN_DEVICE_ID),
      },
      origin
    );
    return;
  }

  if (req.method === 'POST' && url.pathname === '/v1/charges/pickup') {
    try {
      const body = await readJson(req);
      const result = await chargePickupOrder(body, envFromProcess());
      send(res, 200, result, origin);
    } catch (err) {
      const status = err.status || 500;
      send(
        res,
        status,
        {
          ok: false,
          error: err.message || 'server_error',
          details: err.details || undefined,
        },
        origin
      );
    }
    return;
  }

  send(res, 404, { ok: false, error: 'not_found' }, origin);
});

server.listen(PORT, () => {
  console.log(`MIRASOL Clover pickup server listening on :${PORT}`);
});