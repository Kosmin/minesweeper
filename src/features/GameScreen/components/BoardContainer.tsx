import styled from '@emotion/styled'
import { IBoardContainerProps } from './BoardContainer.d';

export const BoardContainer = styled.div<IBoardContainerProps>`
  backgroundColor: rgb(186, 186, 186);
  border: 1px solid #999;
  boxShadow: box-shadow: 0px 5px 3px gray inset;
  display: grid;
  grid-template-columns: ${(props: IBoardContainerProps) => `repeat(${props.columns}, 1fr)`};
  grid-template-rows: ${(props: IBoardContainerProps) => `repeat(${props.rows}, 1fr)`};
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: ${(props: any) => props.height ? props.height : '150px'};
  overflow: auto;
  width: ${(props: any) => props.width ? props.width : '150px'};
`;
