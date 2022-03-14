import React, { memo, useEffect, useState } from 'react';
import styled from '@emotion/styled'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { levelSelector } from '../HomeScreen/selectors';
import { mapLayoutSelector, gameStatusSelector } from './selectors';
import { mineCheck } from './actions';

export interface ICellProps {
  x: number;
  y: number;
  key?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const CellBox = styled.div`
  background-color: #aaa;
  border: 2px solid #eee;
  box-shadow: 0px 1px 3px #333 outset;
  color: blue;
  height: 20px;
  text-align: center;
  width: 20px;

  &.closed {
    &:hover {
      background-color: #bbb;
      cursor: pointer;
    }

    &:active {
      cursor: pointer;
      background-color: #ccc;
      box-shadow: 0px 1px 3px #333 inset;
    }
  }

  &.open {
    box-shadow: 0px 1px 3px #333 inset;
    background-color: #cfe;
  }
`;

export const Cell = memo(({
  // x & y are coordinates on the map, not array positions
  x, y
}: ICellProps) => {
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

        {markedAsMine && (
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