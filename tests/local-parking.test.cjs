const test = require('node:test');
const assert = require('node:assert/strict');
function finish(data, now) {
  if (!data.active) return data;
  const ended = { ...data.active, endedAt: now, status: 'FINISHED', durationMinutes: Math.max(0, Math.round((now - data.active.startedAt) / 60000)) };
  return { active: null, history: [ended].concat(data.history || []).slice(0, 20) };
}
test('finaliza un parqueo offline y lo agrega al historial', () => {
  const result = finish({ active: { id: 'x', floor: 2, row: 3, space: 14, distance: 80, startedAt: 1000, status: 'ACTIVE' }, history: [] }, 121000);
  assert.equal(result.active, null); assert.equal(result.history[0].status, 'FINISHED'); assert.equal(result.history[0].durationMinutes, 2);
});
test('conserva máximo veinte registros', () => {
  const history = Array.from({ length: 20 }, (_, i) => ({ id: i }));
  const result = finish({ active: { id: 'new', startedAt: 0 }, history }, 1);
  assert.equal(result.history.length, 20); assert.equal(result.history[0].id, 'new');
});
