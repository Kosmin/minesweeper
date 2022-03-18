export const SOCKET_URL = "wss://hometask.eg1236.com/game1/";
export let GameSocket: WebSocket | null = null;

export interface ISocketEvents {
  onclose?: ((this: WebSocket, ev: CloseEvent) => any) | null;
  onerror?: ((this: WebSocket, ev: Event) => any) | null;
  onmessage?: ((this: WebSocket, ev: MessageEvent) => any) | null;
  onopen?: ((this: WebSocket, ev: Event) => any) | null;
  close?: () => any;
}

export function GameSocketInstance() {
  return GameSocket;
};

export function InitGameSocket(url = SOCKET_URL) {
  return GameSocket = new WebSocket(url);
};

export function socketSend(message: string): void {
  if(GameSocket?.readyState === 1) {
    GameSocket?.send(message);
  }
}

export function closeSocket() {
  if(GameSocket && GameSocket.readyState === 1) {
    GameSocket.close();
  }
}

export const attachSocketEvents = (events: ISocketEvents) => {
  if(GameSocket) {
    if (events.onmessage) { GameSocket.onmessage = events.onmessage; }
    if (events.onopen) { GameSocket.onopen = events.onopen; }
    if (events.onclose) { GameSocket.onclose = events.onclose; }
    if (events.onerror) { GameSocket.onerror = events.onerror; }
  }
}