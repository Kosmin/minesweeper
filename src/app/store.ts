import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import HomeReducer from '../features/HomeScreen/reducer';
import GameReducer from '../features/GameScreen/reducer';
import rootSaga from './sagas';

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  home: HomeReducer,
  game: GameReducer,
});

const middlewares = applyMiddleware(sagaMiddleware)

export const store = createStore(rootReducer, middlewares)

sagaMiddleware.run(rootSaga)