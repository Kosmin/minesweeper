import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import counterReducer from '../features/counter/reducers';
import HomeReducer from '../features/HomeScreen/Home.reducer';
import GameReducer from '../features/GameScreen/Game.reducer';
import rootSaga from './sagas';

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  counter: counterReducer,
  home: HomeReducer,
  game: GameReducer,
});

const middlewares = applyMiddleware(sagaMiddleware)

export const store = createStore(rootReducer, middlewares)

sagaMiddleware.run(rootSaga)