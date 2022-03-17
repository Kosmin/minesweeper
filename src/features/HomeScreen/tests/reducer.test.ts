import HomeReducer from '../reducer';
import * as actions from '../actions';
import * as SI from 'seamless-immutable';

describe('HomeReducer', () => {
  it('returns the initial state', () => {
    expect(HomeReducer(undefined, {})).toEqual(SI.from({
      name: '',
      error: '',
      loading: false,
      level: 1,
    }))
  });
  it('handles SET_USER_NAME', () => {
    expect(HomeReducer(undefined, {
      type: actions.SET_USER_NAME,
      payload: 'test name'
    }).name).toEqual('test name')
  });
  it('handles SET_LEVEL', () => {
    expect(HomeReducer(undefined, {
      type: actions.SET_LEVEL,
      payload: 3
    }).level).toEqual(3)
  });

  it('handles SHOW_ERROR', () => {
    expect(HomeReducer(undefined, {
      type: actions.SHOW_ERROR,
      payload: 'some test error'
    }).error).toEqual('some test error')
  });

  it('handles CLEAR_ERROR', () => {
    const errorState = SI.from({
      name: '',
      error: '',
      loading: false,
      level: 1,
    });
    expect(HomeReducer(errorState, {
      type: actions.CLEAR_ERROR
    }).error).toEqual('')
  });

  it('handles START_LOADING', () => {
    expect(HomeReducer(undefined, {
      type: actions.START_LOADING
    }).loading).toEqual(true)
  });

  it('handles STOP_LOADING', () => {
    expect(HomeReducer(undefined, {
      type: actions.STOP_LOADING
    }).loading).toEqual(false)
  });
});