import './shared/device-polyfill';
import { MessageBuilder } from './shared/message';

const APP_ID = 1000017;
const messageBuilder = new MessageBuilder({ appId: APP_ID });
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
    messageBuilder.connect();
  },
  onDestroy() { messageBuilder.disConnect(); }
});
