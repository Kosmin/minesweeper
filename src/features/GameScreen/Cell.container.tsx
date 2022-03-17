import React, { memo, useEffect, useState } from 'react';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { mineCheck } from './actions';
import { CellBox } from './components/CellBox';
import { ICellBoxProps } from './types';
import { gameStatusSelector } from './selectors';

// This can be further optimized by implmenting custom shouldComponentUpdate hook
// to prevent rendering even in the Virtual DOM when cells haven't been discovered
// and have no minefield flags
export const Cell = memo(({
  // x & y are coordinates on the map, not array positions
  row, col, content
}: ICellBoxProps) => {
  const status = useAppSelector(gameStatusSelector);
  const [markedAsMine, setMarkedAsMine] = useState(false);
  const dispatch = useAppDispatch();
  const checkForMine = () => dispatch(mineCheck({ row, col }));

  // Clear marks on game restart
  useEffect(() => {
    // When cell content is reset, also reset the flag status
    if(content === '□') {
      setMarkedAsMine(false);
    }
  }, [content]);

  // This can be further optimized
  useEffect(() => {
    // When cell content is reset, also reset the flag status
    if(status === 'lost' || status === 'won') {
      setMarkedAsMine(false);
    }
  }, [status]);

  const handleRightClick = (event: React.MouseEvent) => {
    // Don't allow flags on already discovered cells
    if (content === '□') {
      setMarkedAsMine(!markedAsMine);
      event.preventDefault();
      event.stopPropagation();
    }
  }

  const handleClick = () => {
    if (!markedAsMine) {
      checkForMine();
    }
  }

  // Avoid breaking the screen if there are any socket errors in the data
  if (content) {
    return (
      <CellBox
        onClick={handleClick}
        onContextMenu={handleRightClick}
        className={(content === '□') ? 'closed' : 'open' }
      >
         {content === '*' && (
          <LocalFireDepartmentIcon fontSize="small" sx={{color: 'orange'}}/>
        )}

        {/* Ensure we don't keep poorly placed flags, if the board discovers 0 in that spot */}
        {markedAsMine && content === '□' && (
          <GolfCourseIcon fontSize="small" sx={{color: 'red'}} />
        )}

        {!markedAsMine && content !== '□' && content !== '0' && (content)}
      </CellBox>
    )
  } else {
    return <></>
  }
});