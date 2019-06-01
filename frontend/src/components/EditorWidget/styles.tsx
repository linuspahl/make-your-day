// libraries
import styled from 'styled-components'

export const PellEditor = styled.div`
  display: grid;
  grid-template-rows: 40px calc(100% - 40px);

  height: 100%;

  .pell-actionbar {
    overflow-x: auto;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .pell-content {
    width: 100%;
    height: 100%;

    margin: 0;
    padding: 20px;
    border: 0;

    overflow-y: auto;
    white-space: normal;
  }

  .pell-button {
    padding: 8px;
    min-width 40px;

    border-left: 0;
    border-top: 0;
    border-bottom: 0;
    border-right: 1px solid ${(props): string => props.theme.border};

    background-color: transparent;
    color: inherit;

    &:last-child {
      border-right: 0;
    }
    &:active {
      background-color: ${(props): string => props.theme.active};
    }
  }
  .pell-button-selected {
    background-color: #bbdefb;
  }
`
