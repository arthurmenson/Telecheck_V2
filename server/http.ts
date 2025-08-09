import http from 'http';
import { createApp } from './app';
import { initializeWebSocketService } from './utils/websocket';

const app = createApp();
const server = http.createServer(app);

// Initialize WebSocket service on the same HTTP server
initializeWebSocketService(server);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on :${PORT}`);
});


