import { all } from 'redux-saga/effects';
import { watchMineCheck, watchRestartGame } from '../features/GameScreen/sagas';
import { watchSocketEvents, watchStartGame } from '../features/HomeScreen/sagas';
import { watchMapUpdates } from './socket.sagas';


export default function* rootSaga() {
  yield all([
      watchStartGame(),
      watchSocketEvents(),
      watchMapUpdates(),
      watchRestartGame(),
      watchMineCheck(),
  ]);
}