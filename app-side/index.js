import { createApi } from './api';
const api = createApi({ baseUrl: '' });
try { if (typeof messaging !== 'undefined' && messaging.peerSocket) messaging.peerSocket.addListener('message', async (event) => {
  let message; try { message = typeof event.data === 'string' ? JSON.parse(event.data) : event.data; } catch (_) { return; }
  if (!message || !message.type) return;
  if (message.type === 'PING') messaging.peerSocket.send(JSON.stringify({ v: 1, requestId: message.requestId, type: 'PONG', payload: { connected: true } }));
  else if (message.type === 'GET_AVAILABILITY') { try { const data = await api.request('/availability'); messaging.peerSocket.send(JSON.stringify({ v: 1, requestId: message.requestId, type: 'AVAILABILITY_RESPONSE', payload: data })); } catch (error) { messaging.peerSocket.send(JSON.stringify({ v: 1, requestId: message.requestId, type: 'ERROR', payload: { message: error.message } })); } }
}); } catch (_) {}
