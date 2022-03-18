import { eventChannel } from "redux-saga";
import { call, put, take } from "redux-saga/effects";
import { attachSocketEvents, closeSocket, GameSocketInstance, InitGameSocket } from "../lib/socket";
import { IActionName, IGenericAction, ISaga, ISocketEventAction } from "./types";

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

export function* onSocketEvent({type, payload}: ISocketEventAction): ISaga {
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

export let onmessageCallback: any,
  onopenCallback: any,
  oncloseCallback: any,
  onerrorCallback: any,
  emitter: any;

export const createOnMessageCallback = (emit: any) => {
  return onmessageCallback = (event: MessageEvent) => (
    emit({ type: SOCKET_EVENTS.MESSAGE, payload: event })
  )
}

export const createOnOpenCallback = (emit: any) => {
  return onopenCallback = () => emit({ type: SOCKET_EVENTS.OPEN });
}

export const createOnCloseCallback = (emit: any) => {
  return oncloseCallback = () => emit({ type: SOCKET_EVENTS.CLOSE });
}

export const createOnErrorCallback = (emit: any) => {
  return onerrorCallback = (event: Event) => (
    emit({ type: SOCKET_EVENTS.ERROR, payload: event })
  )
}

export function eventChannelCallback(emit: any) {
  emitter = emit;
  attachSocketEvents({
    onmessage: createOnMessageCallback(emit),
    onopen: createOnOpenCallback(emit),
    onclose: createOnCloseCallback(emit),
    onerror: createOnErrorCallback(emit),
  });

  // Return a function to be called when done listening
  return () => closeSocket();
}

export function createEventChannel() {
  return eventChannel(eventChannelCallback);
}

export function* initSocketChannel(): any {
  let loop = true
  InitGameSocket();
  const channel = yield call(createEventChannel);

  while (loop) {
    const action = yield take(channel);
    yield call(onSocketEvent, action);
  }
}
