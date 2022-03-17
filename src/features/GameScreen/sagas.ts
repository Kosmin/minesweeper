import { put, select, takeEvery } from "redux-saga/effects";
import { socketSend, WEBSOCKET_MESSAGE } from "../../app/socket.sagas";
import { ISaga, ISocketEventAction } from "../../app/types";
import { history } from "../../lib/history";
import { executeRestartGame } from "../HomeScreen/sagas";
import { incrementLosses, incrementWins, MINE_CHECK, RESTART_GAME, setMap, setStatus } from "./actions";
import { gameStatusSelector, mapLayoutSelector } from "./selectors";
import { IMineCheckAction } from "./types";


// Main function used to update our map state from the socket messages
// This could go in its own library if it gets too big
export function* updateMap({ payload }: ISocketEventAction): ISaga {
  // Interpret socket messages
  if (payload.data) {
    if (payload.data === 'new: OK') {
      yield socketSend("map");
    } else if(payload.data.startsWith("open: You lose")) {
      yield put(setStatus('lost'));
      yield put(incrementLosses());
    } else if(payload.data.startsWith("open: You win")) {
      yield put(setStatus('won'));
      yield put(incrementWins());
    } else if(payload.data.startsWith("map:")) {
      const mapLayout: any = yield select(mapLayoutSelector);

      // Update Map
      yield put( setMap( payload.data ) );

      // Auto-navigate on first map load
      if (!mapLayout || Object.keys(mapLayout).length <= 0) {
        history.push('/game');
      }
    }
  }
}

export function* mineCheckAsync(action: IMineCheckAction): ISaga {
  const status = yield select(gameStatusSelector);
  if(status === 'started') {
    yield socketSend(`open ${action.payload.col} ${action.payload.row}`);
    yield socketSend(`map`);
  }
}

export function* watchGameSagas(): ISaga {
  yield takeEvery(WEBSOCKET_MESSAGE, updateMap);
  yield takeEvery(RESTART_GAME, executeRestartGame);
  yield takeEvery(MINE_CHECK, mineCheckAsync);
}
