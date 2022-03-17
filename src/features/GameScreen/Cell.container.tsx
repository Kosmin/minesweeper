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
  x, y
}: ICellBoxProps) => {
  const mapLayout = useAppSelector(mapLayoutSelector);
  const status = useAppSelector(gameStatusSelector);
  const level = useAppSelector(levelSelector);
  const [markedAsMine, setMarkedAsMine] = useState(false);
  const dispatch = useAppDispatch();
  const checkForMine = () => dispatch(mineCheck({ x, y }));

  // Clear marks on game restart
  useEffect(() => {
    setMarkedAsMine(false);
  }, [status]);

  const handleRightClick = (event: React.MouseEvent) => {
    if (status != 'won' && status != 'lost' && mapLayout[y][x] == '□') {
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
  if (mapLayout && mapLayout[y] && mapLayout[y][x]) {
    return (
      <CellBox
        onClick={handleClick}
        onContextMenu={handleRightClick}
        className={(mapLayout[y][x] == '□') ? 'closed' : 'open' }
      >
         {mapLayout[y][x] == '*' && (
          <LocalFireDepartmentIcon fontSize="small" sx={{color: 'orange'}}/>
        )}

        {/* Ensure we don't keep poorly placed flags, if the board discovers 0 in that spot */}
        {markedAsMine && mapLayout[y][x] == '□' && (
          <GolfCourseIcon fontSize="small" sx={{color: 'red'}} />
        )}

        {!markedAsMine && mapLayout[y][x] != '□' && mapLayout[y][x] != '0' && (
          mapLayout[y][x]
        )}
      </CellBox>
    )
  } else {
    return <></>
  }
});