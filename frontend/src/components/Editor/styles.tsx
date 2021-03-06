// libraries
import styled from 'styled-components'

export const PellEditor = styled.div`
  min-height: 20vh;
  height: 100%;

  display: grid;
  grid-template-rows: ${(props): string =>
    `${props.theme.padding * 2}rem minmax(1rem, 1fr)`};

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
    padding: ${(props): string =>
      `${props.theme.padding / 2}rem ${props.theme.padding}rem`};
    border: 0;

    white-space: normal;
    overflow-y: auto;
  }

  .pell-button {
    padding: ${(props): string => `${props.theme.padding / 4}rem`};
    min-width: 2.5rem;

    border-left: 0;
    border-top: 0;
    border-bottom: 0;
    border-right: 0.0625rem solid ${(props): string => props.theme.border};

    color: inherit;

    background-color: transparent;

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
