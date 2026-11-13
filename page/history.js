import { bg, text, button, go, appState } from '../shared/ui';
import { loadParking } from '../services/local-parking';
Page({ build() { bg(); const s = appState(); const h = loadParking().history; s.history = h; text(8, 16, 176, 28, 'HISTORIAL LOCAL', 18, 0x35e08f); if (!h.length) text(10, 100, 172, 40, 'Sin registros guardados', 15, 0xb0b0b0); h.slice(0, 5).forEach((p, i) => text(10, 68 + i * 46, 172, 38, `P${p.floor} F${p.row} #${p.space} · ${p.durationMinutes}m`, 13, 0xffffff)); button(400, 'Volver', () => go('page/menu'), 0x333333); } });
