import { IRootState } from "../../app/store";

export const userNameSelector = (state: IRootState) => state.home.name;
export const levelSelector = (state: IRootState) => state.home.level;
export const levelNameSelector = (state: IRootState) => {
  switch(state.home.level) {
    case 1: return 'easy'
    case 2: return 'medium'
    case 3: return 'hard'
    default: return 'very hard'
  }
};
export const errorSelector = (state: IRootState) => state.home.error;
export const loadingSelector = (state: IRootState) => state.home.loading;