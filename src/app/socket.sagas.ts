import { eventChannel } from "redux-saga";
import { call, put, select, take, takeEvery } from "redux-saga/effects";
import { incrementLosses, incrementWins, setMap, setStatus } from "../features/GameScreen/actions";
import { mapLayoutSelector } from "../features/GameScreen/selectors";
import { IMapLayout } from "../features/GameScreen/types";
import { history } from "../lib/history";
import { IActionName, IGenericAction, ISaga, ISocketEventAction } from "./types";
import * as SI from 'seamless-immutable';

// DEBUG
declare global {
  interface Window { minesocket: any; }
}

window.minesocket = window.minesocket || {};

export const SOCKET_URL = "ws://hometask.eg1236.com/game1/";
export let socket: WebSocket | null = null;
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
  socket = new WebSocket(SOCKET_URL);
  // DEBUG
  window.minesocket = socket;
  const channel = yield call(createEventChannel, socket);

  while (true) {
    const action = yield take(channel);
    const result = yield call(onSocketEvent, action);
  }
}

// Abstraction over socket.send, to allow sagas from elsewhere to send messages to the socket
export function* socketSend(message: string): any {
  // Avoid DOM exceptions if socket isn't ready, can implement spinners to show this later
  if (socket?.readyState === 1) {
    socket?.send(message);
  }
}

// Main function used to update our map state from the socket messages
// This could go in its own library if it gets too big
export function* updateMap({ payload }: ISocketEventAction): ISaga {
  // Interpret socket messages
  if (payload.data) {
    if (payload.data == 'new: OK') {
      yield socketSend("map");
    } else if(payload.data.startsWith("open: You lose")) {
      // yield socketSend("map");
      yield put(setStatus('lost'));
      yield put(incrementLosses());
    } else if(payload.data.startsWith("open: You win")) {
      yield put(setStatus('won'));
      yield put(incrementWins());
    } else if(payload.data.startsWith("map:")) {
      const mapLayout: any = yield select(mapLayoutSelector);

      // Update Map
      yield put( setMap( payload.data.split('map:')[1] ) );

      // Auto-navigate on first map load
      if (!mapLayout || mapLayout.length <= 0) {
        history.push('/game');
      }
    }
  }
}

export function* watchMapUpdates(): ISaga {
  yield takeEvery(WEBSOCKET_MESSAGE, updateMap);
}
