import { startDeviceTransport, stopDeviceTransport } from './shared/transport';
import { createParkingService } from './services/parking-service';

const initial = {
  mode: 'DEMO', state: 'IDLE', connection: 'CONNECTED', availability: null,
  activeParking: null, history: [], error: '', lastSyncAt: 0,
};

App({
  globalData: initial,
  onCreate() {
    const gd = this.globalData || initial;
    this.globalData = gd;
    this._options = this._options || {};
    this._options.globalData = gd;
    globalThis.__PARQUEO_GLOBAL__ = gd;
    globalThis.__PARQUEO_SERVICE__ = createParkingService({ mode: gd.mode });
    startDeviceTransport((message) => {
      if (message && message.type === 'PONG') gd.connection = 'CONNECTED';
      if (typeof globalThis.__PARQUEO_REFRESH__ === 'function') globalThis.__PARQUEO_REFRESH__();
    });
  },
  onDestroy() { stopDeviceTransport(); }
});
