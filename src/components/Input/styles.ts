import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFielded: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 5px;
  padding: 16px;
  width: 100%;

  border: 2px solid #fff;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #5f4ab7;
      border-color: #5f4ab7;
    `}

  ${props =>
    props.isFielded &&
    css`
      color: #5f4ab7;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #333;

    &::placeholder {
      color: #666360;
    }

    & + input {
      margin-top: 8px;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  > span {
    background: #C53030;
    color: #fff;
    &::before {
      border-color: #C53030 transparent;
  }
`;
