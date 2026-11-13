import { bg, text, button, go, appState } from '../shared/ui';
import { finishParking as finishLocal, loadParking, saveParking } from '../services/local-parking';
Page({
  build() {
    bg(); const s = appState(); const data = loadParking(); s.activeParking = data.active; s.history = data.history; const p = data.active;
    text(8, 16, 176, 28, 'MI PARQUEO', 18, 0x35e08f);
    text(12, 62, 168, 40, p ? p.space : 'Sin parqueo activo', 30, p ? 0xffffff : 0xb0b0b0);
    if (p) { text(12, 112, 168, 26, `Piso ${p.floor} · Fila ${p.row}`, 16, 0xb0b0b0); text(12, 148, 168, 26, `Puesto ${p.space} · ${p.distance} m`, 16, 0xb0b0b0); text(12, 184, 168, 26, '● ACTIVO · OFFLINE', 15, 0x35e08f); button(264, 'Finalizar parqueo', () => { const next = finishLocal(data); if (saveParking(next)) { s.activeParking = null; s.history = next.history; s.state = 'PARKING_FINISHED'; go('page/parking'); } }, 0x652727); }
    else { text(12, 120, 168, 32, 'No hay parqueo activo', 16, 0xb0b0b0); button(264, 'Guardar parqueo', () => go('page/new-parking')); }
    if (s.error) text(10, 334, 172, 30, s.error, 13, 0xff6b6b);
    button(398, 'Volver', () => go('page/index'), 0x333333);
  }
});
