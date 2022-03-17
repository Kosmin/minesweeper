import { all } from 'redux-saga/effects';
import { watchGameSagas } from '../features/GameScreen/sagas';
import { watchSocketEvents, watchStartGame } from '../features/HomeScreen/sagas';


export default function* rootSaga() {
  yield all([
      watchStartGame(),
      watchSocketEvents(),
      watchGameSagas(),
  ]);
}