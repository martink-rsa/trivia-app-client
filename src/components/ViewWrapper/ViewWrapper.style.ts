import styled from 'styled-components';

type WrapperProps = {
  backgroundColor: string;
};

export const Wrapper = styled.main<WrapperProps>`
  width: 100%;
  box-sizing: border-box;
  min-height: 100vh;
  background-color: ${(props) =>
    props.backgroundColor === 'primary'
      ? props.theme.color.primary
      : props.backgroundColor};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 50px 20px 50px 20px;
  form {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    width: 100%;
  }
`;
