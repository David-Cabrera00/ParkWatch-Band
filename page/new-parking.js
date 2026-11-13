import { bg, text, button, go, appState } from '../shared/ui';
import { createParkingRecord, loadParking, saveParking } from '../services/local-parking';

function step(y, label, value, min, max, change) {
  text(10, y, 82, 28, label, 14, 0xb0b0b0);
  text(88, y, 44, 28, value, 18, 0xffffff);
  buttonAt(136, y - 2, 24, 28, '−', () => change(Math.max(min, value - 1)));
  buttonAt(164, y - 2, 24, 28, '+', () => change(Math.min(max, value + 1)));
}
function buttonAt(x, y, w, h, label, click_func) { return hmUI.createWidget(hmUI.widget.BUTTON, { x, y, w, h, radius: 8, normal_color: 0x254d3c, press_color: 0x39765a, text: label, text_size: 16, color: 0xffffff, click_func }); }
let draft = { floor: 1, row: 1, space: 1, distance: 0 };

Page({
  build() {
    bg(); const data = loadParking();
    if (data.active) { text(8, 40, 176, 70, 'Ya tienes un\nparqueo activo', 22, 0xffc857); button(180, 'Ver parqueo', () => go('page/parking')); button(398, 'Volver', () => go('page/index'), 0x333333); return; }
    const state = draft;
    text(8, 14, 176, 28, 'GUARDAR PARQUEO', 18, 0x35e08f);
    const redraw = () => { draft = state; go('page/new-parking'); };
    step(60, 'Piso', state.floor, 0, 20, (v) => { state.floor = v; redraw(); });
    step(112, 'Fila', state.row, 1, 50, (v) => { state.row = v; redraw(); });
    step(164, 'Puesto', state.space, 1, 200, (v) => { state.space = v; redraw(); });
    step(216, 'Metros', state.distance, 0, 999, (v) => { state.distance = v; redraw(); });
    button(292, 'Guardar ubicación', () => { try { const next = { active: createParkingRecord(state), history: loadParking().history }; if (saveParking(next)) { draft = { floor: 1, row: 1, space: 1, distance: 0 }; appState().activeParking = next.active; go('page/parking'); } } catch (_) {} });
    button(398, 'Cancelar', () => { draft = { floor: 1, row: 1, space: 1, distance: 0 }; go('page/index'); }, 0x333333);
  }
});
