// libraries
import styled from 'styled-components'

export const PellEditor = styled.div`
  height: 100%;

  display: grid;
  grid-template-rows: ${(props): string =>
    `${props.theme.padding * 2}rem calc(100% - ${props.theme.padding * 2})`}

  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

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
    padding: ${(props): string => `${props.theme.padding}rem`};
    border: 0;

    white-space: normal;
  }

  .pell-button {
    padding: ${(props): string => `${props.theme.padding / 4}rem`};
    min-width: ${(props): string => `${props.theme.padding * 4}rem`};

    border-left: 0;
    border-top: 0;
    border-bottom: 0;
    border-right: 0.0625rem solid ${(props): string => props.theme.border};

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
