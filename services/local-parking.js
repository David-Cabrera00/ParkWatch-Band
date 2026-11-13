const FILE = 'parking-data.json';
const EMPTY = { active: null, history: [] };

function encode(value) {
  const str = JSON.stringify(value);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i += 1) bytes[i] = str.charCodeAt(i) & 255;
  return bytes;
}

function decode(bytes) {
  let str = '';
  for (let i = 0; i < bytes.length; i += 1) str += String.fromCharCode(bytes[i]);
  return JSON.parse(str);
}

export function loadParking() {
  try {
    if (typeof hmFS === 'undefined' || typeof hmFS.stat !== 'function') return { active: null, history: [] };
    const statResult = hmFS.stat(FILE);
    const stat = statResult && statResult[0];
    if (!stat || !stat.size) return { active: null, history: [] };
    const file = hmFS.open(FILE, hmFS.O_RDONLY);
    const buffer = new Uint8Array(stat.size);
    hmFS.read(file, buffer.buffer, 0, buffer.length);
    hmFS.close(file);
    const value = decode(buffer);
    return { active: value.active || null, history: Array.isArray(value.history) ? value.history : [] };
  } catch (_) { return { active: null, history: [] }; }
}

export function saveParking(value) {
  if (typeof hmFS === 'undefined') return false;
  try {
    const bytes = encode(value);
    const flags = hmFS.O_RDWR | hmFS.O_CREAT | (hmFS.O_TRUNC || 0);
    const file = hmFS.open(FILE, flags);
    hmFS.write(file, bytes.buffer, 0, bytes.length);
    hmFS.close(file);
    return true;
  } catch (_) { return false; }
}

export function createParkingRecord(fields, now = Date.now()) {
  return { id: 'local-' + now, floor: fields.floor, row: fields.row, space: fields.space, distance: fields.distance, startedAt: now, status: 'ACTIVE' };
}

export function finishParking(data, now = Date.now()) {
  if (!data.active) return data;
  const ended = { ...data.active, endedAt: now, status: 'FINISHED', durationMinutes: Math.max(0, Math.round((now - data.active.startedAt) / 60000)) };
  return { active: null, history: [ended].concat(data.history || []).slice(0, 20) };
}

export { EMPTY };
