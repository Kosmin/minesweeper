import React from 'react';
import { put, select, takeEvery } from 'redux-saga/effects'
import { ISaga, IUserStartGameAction } from './types';
import {
  START_GAME,
  clearError,
  setUserName,
  showError,
  startLoading,
  stopLoading,
  setLevel
} from './actions';
import { startSocketConnection, WEBSOCKET_OPEN, WEBSOCKET_ERROR, INIT_SOCKETS_CHANNEL, initSocketChannel, socketSend } from '../../app/socket.sagas';
import { history } from '../../lib/history';
import { levelSelector } from './selectors';
import { setStatus } from '../GameScreen/actions';
import { mapLayoutSelector } from '../GameScreen/selectors';

function* executeStartGame(action: IUserStartGameAction): ISaga {
  if (!action.payload.name || action.payload.name.length < 3) {
    yield put(showError("Invalid username, please use at least 3 characters"));
  } else if (!action.payload.level || action.payload.level < 1 || action.payload.level > 4) {
    yield put(showError("Invalid level, please select a level"));
  } else {
    // Set game variables
    yield put(setUserName(action.payload.name));
    yield put(setLevel(action.payload.level));
    yield put(clearError());

    // Open Socket
    yield put(startLoading());
    yield put(startSocketConnection());
    yield put(setStatus('started'));
  }
}

// TODO: split this function up, should decouple name setting
export function* executeRestartGame(): ISaga {
  yield put(clearError());
  // Open Socket
  yield put(startLoading());
  yield put(startSocketConnection());
  yield put(setStatus('started'));
}

export function* watchStartGame(): ISaga {
  yield takeEvery(START_GAME, executeStartGame)
}

export function* showSocketError(): ISaga {
  yield put(
    showError("Could not connect to websocket; Please refresh the page and try again.")
  );
  yield put(stopLoading());
}

export function* socketOpen(): ISaga {
  const level = yield(select(levelSelector));
  yield socketSend(`new ${level}`);
  yield put(stopLoading());

  const mapLayout: any = yield select(mapLayoutSelector);
  // Auto-navigate if not first page load
  if (mapLayout && Object.keys(mapLayout).length > 0) {
    history.push('/game');
  }
}

export function* watchSocketEvents(): ISaga {
  yield takeEvery(INIT_SOCKETS_CHANNEL, initSocketChannel)
  yield takeEvery(WEBSOCKET_ERROR, showSocketError)
  yield takeEvery(WEBSOCKET_OPEN, socketOpen)
}

