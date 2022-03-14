import { all, takeEvery } from 'redux-saga/effects';
import { watchIncrementAsync, watchAddAsync } from '../features/counter/sagas';
import { watchMineCheck, watchRestartGame } from '../features/GameScreen/Game.sagas';
import { watchSocketEvents, watchStartGame } from '../features/HomeScreen/sagas';
import { watchMapUpdates } from './socket.sagas';


export default function* rootSaga() {
  yield all([
      watchIncrementAsync(),
      watchAddAsync(),
      watchStartGame(),
      watchSocketEvents(),
      watchMapUpdates(),
      watchRestartGame(),
      watchMineCheck(),
  ]);
}