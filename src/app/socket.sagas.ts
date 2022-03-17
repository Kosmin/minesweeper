import { eventChannel } from "redux-saga";
import { call, put, select, take, takeEvery } from "redux-saga/effects";
import { incrementLosses, incrementWins, setMap, setStatus } from "../features/GameScreen/actions";
import { mapLayoutSelector } from "../features/GameScreen/selectors";
import { history } from "../lib/history";
import { IActionName, IGenericAction, ISaga, ISocketEventAction } from "./types";

export const SOCKET_URL = "ws://hometask.eg1236.com/game1/";
export let GameSocket: WebSocket | null = null;
export const SOCKET_EVENTS = {
  OPEN: 'open',
  CLOSE: 'close',
  ERROR: 'error',
  MESSAGE: 'message',
};

export const INIT_SOCKETS_CHANNEL: IActionName = "SOCKET/INIT_SOCKETS_CHANNEL";
export const WEBSOCKET_MESSAGE: IActionName = "SOCKET/WEBSOCKET_MESSAGE";
export const WEBSOCKET_OPEN: IActionName = "SOCKET/WEBSOCKET_OPEN";
export const WEBSOCKET_CLOSE: IActionName = "SOCKET/WEBSOCKET_CLOSE";
export const WEBSOCKET_ERROR: IActionName = "SOCKET/WEBSOCKET_ERROR";
export const WEBSOCKET_SEND: IActionName = "SOCKET/WEBSOCKET_SEND";

export const socketMessageReceived = (message: any): IGenericAction => ({
  type: WEBSOCKET_MESSAGE,
  payload: message,
})
export const socketOpen = (): IGenericAction => ({ type: WEBSOCKET_OPEN })
export const socketClose = (): IGenericAction => ({ type: WEBSOCKET_CLOSE })
export const socketError = (): IGenericAction => ({ type: WEBSOCKET_ERROR })
export const startSocketConnection = (): IGenericAction => ({
  type: INIT_SOCKETS_CHANNEL,
})

function* onSocketEvent({type, payload}: ISocketEventAction): ISaga {
  if(!type){ return; }
  switch (type) {
    case SOCKET_EVENTS.OPEN:
      yield put(socketOpen());
      break;
    case SOCKET_EVENTS.CLOSE:
      yield put(socketClose());
      break;
    case SOCKET_EVENTS.ERROR:
      yield put(socketError());
      break
    case SOCKET_EVENTS.MESSAGE:
      yield put(socketMessageReceived(payload));
      break
    default:
      break;
  }
}

function createEventChannel(socket: any) {
  return eventChannel(emit => {
    // call emit when a message is received
    socket.onmessage = (event: MessageEvent) => {
      emit({
        type: SOCKET_EVENTS.MESSAGE,
        payload: event,
      });
    }

    socket.onopen = () => {
      emit({
        type: SOCKET_EVENTS.OPEN
      });
    }

    socket.onclose = () => {
      emit({
        type: SOCKET_EVENTS.CLOSE
      });
    }

    socket.onerror = (event: MessageEvent) => {
      emit({
        type: SOCKET_EVENTS.ERROR,
        payload: event,
      });
    }

    // Return a function to be called when done listening
    return () => socket.close();
  });
}

export function* initSocketChannel(): any {
  GameSocket = new WebSocket(SOCKET_URL);
  const channel = yield call(createEventChannel, GameSocket);

  while (true) {
    const action = yield take(channel);
    const result = yield call(onSocketEvent, action);
  }
}

// Abstraction over socket.send, to allow sagas from elsewhere to send messages to the socket
export function* socketSend(message: string): any {
  // Avoid DOM exceptions if socket isn't ready, can implement spinners to show this later
  if (GameSocket?.readyState === 1) {
    GameSocket?.send(message);
  }
}
