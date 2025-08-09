import { Server } from 'http';
import { initializeWebSocketService } from '../utils/websocket';

export function attachWebSocketGateway(server: Server) {
  return initializeWebSocketService(server);
}


