import { encodeMessage, decodeMessage } from './protocol';
let handler = null;
export function startDeviceTransport(onMessage) {
  handler = onMessage;
  try {
    if (typeof messaging !== 'undefined' && messaging.peerSocket) messaging.peerSocket.addListener(messaging.peerSocket.event.MESSAGE, (event) => { try { handler && handler(decodeMessage(event.data)); } catch (_) {} });
  } catch (_) {}
}
export function stopDeviceTransport() { handler = null; }
export function sendDeviceMessage(message) {
  try { if (typeof messaging !== 'undefined' && messaging.peerSocket && messaging.peerSocket.readyState === messaging.peerSocket.OPEN) { messaging.peerSocket.send(encodeMessage(message)); return true; } } catch (_) {}
  return false;
}
