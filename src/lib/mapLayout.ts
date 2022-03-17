import * as SI from 'seamless-immutable';
import { IMapLayout } from '../features/GameScreen/types';


export function getLayoutFromString(layoutString: string) {
  const newLayoutArray: string[][] = layoutString.split('map:')[1].trim().split('\n').map((s) => s.split(''));
  const newLayout: SI.Immutable<IMapLayout> | {} = {}

  newLayoutArray.forEach((row, rowIndex) => {
    (newLayout as IMapLayout)[rowIndex.toString()] = {}
    row.map((content, colIndex) => {
      (newLayout as IMapLayout)[rowIndex.toString()][colIndex.toString()] = content;
    });
  })

  return newLayout;
}
