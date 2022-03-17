import styled from '@emotion/styled'

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