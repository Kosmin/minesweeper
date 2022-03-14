import React, { memo } from 'react';
import { ImmutableArray } from 'seamless-immutable';
import styled from '@emotion/styled'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { columnSelector, gameStatusSelector, mapLayoutSelector, recordSelector, rowSelector } from './selectors';
import { Cell } from './Cell';
import Typography from '@mui/material/Typography';
import { levelNameSelector, userNameSelector } from '../HomeScreen/selectors';
import { restartGame } from './actions';
import { IRecord } from './types';

interface IContainerProps {
  height?: string | number;
  width?: string | number;
  columns: string | number;
  rows: string | number;
}

const Container = styled.div<IContainerProps>`
  backgroundColor: rgb(186, 186, 186);
  border: 1px solid #999;
  boxShadow: box-shadow: 0px 5px 3px gray inset;
  display: grid;
  grid-template-columns: ${(props: IContainerProps) => `repeat(${props.columns}, 1fr)`};
  grid-template-rows: ${(props: IContainerProps) => `repeat(${props.rows}, 1fr)`};
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: ${(props: any) => props.height ? props.height : '150px'};
  overflow: auto;
  width: ${(props: any) => props.width ? props.width : '150px'};
`;

const Item = styled.div`
  backgroundColor: rgb(186, 186, 186);
  border: 2px solid #666;
  boxShadow: box-shadow: 0px 1px 3px gray inset;
  height: 8px;
  width: 8px;
`;

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
        <Container width={containerWidth} height={containerHeight} columns={cols} rows={rows}>
          {(mapLayout.length > 0 && mapLayout.map((row: ImmutableArray<string>, y: number) => row.map((cell: string, x: number) => (
            <Cell x={x} y={y} key={`cell_${x}_${y}`} />
          ))))}
        </Container>
      </Box>
    </>
  )
});