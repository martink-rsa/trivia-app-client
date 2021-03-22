import styled from 'styled-components';

export const MainContainer = styled.div`
  flex-grow: 1;
`;

export const PlayersList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
  margin: 0;
  padding: 0;
  list-style: none;
  @media (max-width: 360px) {
    grid-gap: 0 10px;
  }
  @media (max-width: 300px) {
    grid-template-columns: 1fr;
    grid-gap: 30px 0;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 50px;
  padding-left: 10px;
  border: 4px solid ${(props) => props.theme.color.primary};
  font-size: 1.125rem;
  background: #fff;
  border-radius: 35px;
  padding: 8px 20px;
  margin-bottom: 30px;
`;

export const ControlsContainer = styled.div`
  display: flex;
  @media (max-width: 360px) {
    flex-direction: column;
  }
`;

export const ControlContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  :first-child {
    margin-right: 10px;
    @media (max-width: 360px) {
      margin-right: 0;
    }
  }
  :last-child {
    margin-left: 10px;
    @media (max-width: 360px) {
      margin-left: 0;
    }
  }
`;
