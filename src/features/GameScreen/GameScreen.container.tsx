import React, { memo } from 'react';
import { ImmutableArray } from 'seamless-immutable';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { columnSelector, gameStatusSelector, mapLayoutSelector, recordSelector, rowSelector } from './selectors';
import { Cell } from './Cell.container';
import Typography from '@mui/material/Typography';
import { levelNameSelector, userNameSelector } from '../HomeScreen/selectors';
import { restartGame } from './actions';
import { IRecord } from './types';
import { BoardContainer } from './components/BoardContainer';

export const GameScreen = memo(() => {
  const mapLayout = useAppSelector(mapLayoutSelector);
  const cols: number = useAppSelector(columnSelector);
  const rows: number = useAppSelector(rowSelector);
  const name: string = useAppSelector(userNameSelector);
  const levelName: string = useAppSelector(levelNameSelector);
  const status: string = useAppSelector(gameStatusSelector);
  const record: IRecord = useAppSelector(recordSelector);
  const dispatch = useAppDispatch();
  const restart = (): any => dispatch(restartGame());


  let containerHeight: number | string = rows * 20;
  let containerWidth: number | string = cols * 20;

  if (cols <= 0 || rows <= 0) return <></>;

  if (cols > 50) {
    containerHeight = "1000px";
    containerWidth = "1000px";
  }

  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ textAlign: 'center', mt: 1, mb:0 }}
      >
        Welcome, {name}
      </Typography>
      <Typography
        variant="body1"
        noWrap
        component="div"
        sx={{ fontSize: 12, textAlign: 'center', my: 0 }}
      >
        your level: <u>{levelName}</u><br/>
        game status: <b>{status}</b><br/>
        your record (w/l): {record.wins} - {record.losses}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="outlined" sx={{ mt: 1, float: 'none' }} onClick={restart}>
          Restart!
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <BoardContainer width={containerWidth} height={containerHeight} columns={cols} rows={rows}>
          {(mapLayout.length > 0 && mapLayout.map((row: ImmutableArray<string>, y: number) => row.map((_, x: number) => (
            <Cell x={x} y={y} key={`cell_${x}_${y}`} />
          ))))}
        </BoardContainer>
      </Box>
    </>
  )
});