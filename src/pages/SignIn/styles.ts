import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signInBack from '../../assets/logoImg.svg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  position: relative;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 18px;
      color: #8872b2;
    }
  }

  > a {
    color: #8872b2;
    display: block;
    margin-top: 12px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;
    transition: background-color 0.2s;

    &:hover {
      color: ${shade(0.2, '#8872b2')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBack}) no-repeat 20% bottom;
  background-size: 400px 700px;

  @media (max-width: 768px) {
    display: none;
  }
`;
