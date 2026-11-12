import { bg, text, button, go, appState, service } from '../shared/ui';
Page({
  build() {
    bg(); const s = appState(); const p = s.activeParking;
    text(8, 16, 176, 28, 'MI PARQUEO', 18, 0x35e08f);
    text(12, 62, 168, 40, p ? p.space : 'Sin parqueo activo', 30, p ? 0xffffff : 0xb0b0b0);
    if (p) { text(12, 112, 168, 26, p.plate || 'Sin placa', 17, 0xb0b0b0); text(12, 148, 168, 26, `Ingreso ${new Date(p.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, 14, 0xb0b0b0); text(12, 184, 168, 26, p.status === 'ACTIVE' ? '● ACTIVO' : p.status, 15, 0x35e08f); button(264, 'Finalizar parqueo', async () => { if (!p || !p.id) return; try { await service().finishParking(p.id); s.activeParking = null; s.state = 'PARKING_FINISHED'; go('page/parking'); } catch (e) { s.error = e.message; go('page/parking'); } }, 0x652727); }
    else button(264, 'Actualizar', async () => { try { s.activeParking = await service().getActiveParking(); go('page/parking'); } catch (_) { go('page/parking'); } });
    if (s.error) text(10, 334, 172, 30, s.error, 13, 0xff6b6b);
    button(398, 'Volver', () => go('page/index'), 0x333333);
  }
});
