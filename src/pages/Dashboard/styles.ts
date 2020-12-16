import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #f4ede8;
  z-index: 2;
  position: sticky;
  top: 0;
  left: 0;
  box-shadow: 2px #333;
`;

export const Line = styled.div`
  height: 2px;
  width: 100%;
  background: #8872b2;
  position: absolute;
  bottom: 0;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #8872b2;
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 1024px) {
    > img {
      height: 50px;
      margin-left: 40px;
    }

    > button {
      margin-right: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 40px;

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #8872b2;
      font-size: 21px;
    }

    strong {
      text-decoration: none;
      color: #5f4ab7;
      font-size: 21px;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  @media (max-width: 520px) {
    > div {
      align-items: center;
      justify-content: center;
      height: 40px;
      margin-left: 20px;

      > span {
        font-size: 14px;
      }
      > strong {
        font-size: 14px;
      }
    }
  }
`;

export const Content = styled.main`
  margin: auto;
  max-width: 1120px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 9px 19px 20px;
    max-height: 100vh;
    overflow-y: auto;
  }
`;

export const Schedule = styled.div`
  flex: 1;
  padding-left: 48px;
  margin-top: 48px;
  border-left: 1px solid #5f4ab7;

  h1 {
    font-size: 36px;
    color: #5f4ab7;
  }

  p {
    margin-top: 8px;
    color: #8872b2;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #8872b2;
      margin: 0 8px;
    }
  }

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > span {
    margin-bottom: 12px;
    color: #8872b2;
  }

  > p {
    color: #999591;
  }
`;

export const SectionAgenda = styled.div`
  padding: 40px;

  @media (max-width: 500px) {
    width: 100%;
    padding: 10px;
  }
`;
export const Agendar = styled.div``;

export const Button = styled.button`
  width: 100px;
  height: 35px;
  background: #8872b2;
  border: none;
  border-radius: 5px;
  margin-top: 8px;
  color: #fff;
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #8872b2;
    width: 70px;

    svg {
      color: #8872b2;
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: #f4ede8;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin: 8px 24px;
    border: 1px solid #8872b2;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #8872b2;
      font-size: 20px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;
  margin: auto;

  .DayPicker {
    background: #f4ede8;
    border-radius: 10px;
    border: 1px solid #8872b2;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #8e8b81;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #8872b2 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
