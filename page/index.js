import { bg, text, button, go, appState } from '../shared/ui';
Page({
  build() {
    bg(); const s = appState();
    text(10, 18, 172, 32, 'PARQUEO BAND 7', 18, 0x35e08f);
    text(10, 58, 172, 24, s.connection === 'CONNECTED' ? '● Conectado' : '● Sin conexión', 13, s.connection === 'CONNECTED' ? 0x35e08f : 0xff6b6b);
    text(10, 94, 172, 36, 'Espacios libres', 14, 0xb0b0b0);
    const free = s.availability ? s.availability.free : '--'; text(10, 126, 172, 62, free, 48, 0xffffff);
    button(218, 'Disponibilidad', () => go('page/availability'));
    button(278, 'Mi parqueo', () => go('page/parking'), 0x183650);
    button(338, 'Menú', () => go('page/menu'), 0x333333);
  }
});
