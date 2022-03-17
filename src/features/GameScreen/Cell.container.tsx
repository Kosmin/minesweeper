import React, { memo, useEffect, useState } from 'react';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { levelSelector } from '../HomeScreen/selectors';
import { mapLayoutSelector, gameStatusSelector } from './selectors';
import { mineCheck } from './actions';
import { CellBox } from './components/CellBox';
import { ICellBoxProps } from './types';

export const Cell = memo(({
  // x & y are coordinates on the map, not array positions
  row, col
}: ICellBoxProps) => {
  const mapLayout = useAppSelector(mapLayoutSelector);
  const status = useAppSelector(gameStatusSelector);
  const level = useAppSelector(levelSelector);
  const [markedAsMine, setMarkedAsMine] = useState(false);
  const dispatch = useAppDispatch();
  const checkForMine = () => dispatch(mineCheck({ row, col }));

  // Clear marks on game restart
  useEffect(() => {
    setMarkedAsMine(false);
  }, [status]);

  const handleRightClick = (event: React.MouseEvent) => {
    if (status != 'won' && status != 'lost' && mapLayout[row][col] == '□') {
      setMarkedAsMine(!markedAsMine);
      event.preventDefault();
      event.stopPropagation();
    }
  }

  const handleClick = () => {
    if (status != 'won' && status != 'lost') {
      if (!markedAsMine) {
        checkForMine();
      }
    }
  }

  // Avoid breaking the screen if there are any socket errors in the data
  if (mapLayout && mapLayout[row] && mapLayout[row][col]) {
    return (
      <CellBox
        onClick={handleClick}
        onContextMenu={handleRightClick}
        className={(mapLayout[row][col] == '□') ? 'closed' : 'open' }
      >
         {mapLayout[row][col] == '*' && (
          <LocalFireDepartmentIcon fontSize="small" sx={{color: 'orange'}}/>
        )}

        {/* Ensure we don't keep poorly placed flags, if the board discovers 0 in that spot */}
        {markedAsMine && mapLayout[row][col] == '□' && (
          <GolfCourseIcon fontSize="small" sx={{color: 'red'}} />
        )}

        {!markedAsMine && mapLayout[row][col] != '□' && mapLayout[row][col] != '0' && (
          mapLayout[row][col]
        )}
      </CellBox>
    )
  } else {
    return <></>
  }
});