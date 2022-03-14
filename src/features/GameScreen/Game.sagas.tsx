import { takeEvery } from "redux-saga/effects";
import { socketSend } from "../../app/socket.sagas";
import { ISaga } from "../../app/types";
import { executeRestartGame } from "../HomeScreen/sagas";
import { MINE_CHECK, RESTART_GAME } from "./actions";
import { IMineCheckAction } from "./types";


export function* mineCheckAsync(action: IMineCheckAction): ISaga {
  yield socketSend(`open ${action.payload.x} ${action.payload.y}`);
  yield socketSend(`map`);
}

export function* watchRestartGame(): ISaga {
  yield takeEvery(RESTART_GAME, executeRestartGame)
}

export function* watchMineCheck(): ISaga {
  yield takeEvery(MINE_CHECK, mineCheckAsync)
}
