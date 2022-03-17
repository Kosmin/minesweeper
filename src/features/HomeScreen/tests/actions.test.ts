import * as actions from '../actions';

describe("HomeScreen Actions", () => {
  it('startGame', () => {
    const payload = { name: 'test', level: 3}
    expect(actions.startGame(payload)).toEqual({type: 'HOME/START_GAME', payload})
  });

  it('setUsername', () => {
    const name = 'test';
    expect(actions.setUserName(name)).toEqual({type: 'HOME/SET_USER_NAME', payload: name})
  });

  it('setLevel', () => {
    expect(actions.setLevel(3)).toEqual({type: 'HOME/SET_LEVEL', payload: 3 })
  });

  it('showError', () => {
    const error = 'test error, not a real error';
    expect(actions.showError(error)).toEqual({type: 'HOME/SHOW_ERROR', payload: error })
  });

  it('clearError', () => {
    expect(actions.clearError()).toEqual({type: 'HOME/CLEAR_ERROR'})
  });

  it('startLoading', () => {
    expect(actions.startLoading()).toEqual({type: 'HOME/START_LOADING'})
  });

  it('stopLoading', () => {
    expect(actions.stopLoading()).toEqual({type: 'HOME/STOP_LOADING'})
  });

  it('mapLoaded', () => {
    expect(actions.mapLoaded()).toEqual({type: 'HOME/MAP_LOADED'})
  });
});