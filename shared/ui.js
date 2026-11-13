import { COLORS } from './constants';
import { createParkingService } from '../services/parking-service';
let parkingService = null;
export function bg() { hmUI.createWidget(hmUI.widget.FILL_RECT, { x: 0, y: 0, w: 192, h: 490, color: COLORS.bg }); }
export function text(x, y, w, h, value, size = 16, color = COLORS.white, click_func) { const props = { x, y, w, h, text: String(value), text_size: size, color, align_h: hmUI.align.CENTER_H, align_v: hmUI.align.CENTER_V }; if (typeof click_func === 'function') props.click_func = click_func; return hmUI.createWidget(hmUI.widget.TEXT, props); }
export function button(y, label, click_func, color = 0x163a2b) { return hmUI.createWidget(hmUI.widget.BUTTON, { x: 14, y, w: 164, h: 50, radius: 18, normal_color: color, press_color: 0x285843, text: label, text_size: 15, color: COLORS.white, click_func }); }
export function go(url) { try { hmApp.gotoPage({ url }); } catch (_) {} }
export function appState() { const app = typeof getApp === 'function' ? getApp() : null; return (app && app.globalData) || globalThis.__PARQUEO_GLOBAL__ || {}; }
export function service() { if (!parkingService) parkingService = createParkingService({ mode: appState().mode || 'DEMO' }); return parkingService; }
