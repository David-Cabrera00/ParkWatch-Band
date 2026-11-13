import { bg, text, button, go, appState } from '../shared/ui';
import { loadParking } from '../services/local-parking';
Page({
  build() {
    bg(); const s = appState();
    text(10, 18, 172, 32, 'PARQUEO BAND 7', 18, 0x35e08f);
    text(10, 58, 172, 24, s.connection === 'CONNECTED' ? '● Conectado' : '● Sin conexión', 13, s.connection === 'CONNECTED' ? 0x35e08f : 0xff6b6b);
    text(10, 94, 172, 36, 'Espacios libres', 14, 0xb0b0b0);
    const data = loadParking(); s.activeParking = data.active; s.history = data.history;
    text(10, 94, 172, 30, data.active ? 'PARQUEO ACTIVO' : 'SIN PARQUEO ACTIVO', 16, data.active ? 0x35e08f : 0xb0b0b0);
    button(150, data.active ? 'Ver parqueo' : 'Guardar parqueo', () => go(data.active ? 'page/parking' : 'page/new-parking'));
    button(210, 'Historial', () => go('page/history'), 0x183650);
    button(270, 'Más opciones', () => go('page/menu'), 0x333333);
  }
});
