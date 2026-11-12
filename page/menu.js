import { bg, text, button, go } from '../shared/ui';
Page({ build() { bg(); text(8, 18, 176, 32, 'MENÚ', 20, 0x35e08f); button(90, 'Mi parqueo', () => go('page/parking')); button(150, 'Historial', () => go('page/history')); button(210, 'Configuración', () => go('page/settings'), 0x333333); button(398, 'Inicio', () => go('page/index'), 0x333333); } });
