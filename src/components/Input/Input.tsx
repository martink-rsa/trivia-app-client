import React from 'react';
import styled from 'styled-components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  styleType?: 'normal' | 'border';
  label?: string;
  children?: React.ReactNode;
}

type StyleProps = {};

/** Main wrapper that holds label and button */
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
`;

/** Label for button */
const Label = styled.label`
  margin-left: 10px;
  margin-bottom: 5px;
  white-space: nowrap;
`;

/** Baseline styling for input */
const BaselineInput = styled.input<StyleProps>`
  font-size: 1.125rem;
  background: #fff;
  border: none;
  border-radius: 35px;
  padding: 8px 20px;
`;

const BorderInput = styled(BaselineInput)`
  border: 4px solid ${(props) => props.theme.color.primary};
`;

function Input({
  label,
  id,
  name,
  styleType = 'normal',
  children,
  ...props
}: Props) {
  switch (styleType) {
    case 'normal':
      return (
        <Wrapper>
          <Label htmlFor={id}>{label}</Label>
          <BaselineInput id={id} name={name} {...props}></BaselineInput>
        </Wrapper>
      );
    case 'border':
      return (
        <Wrapper>
          <Label htmlFor={id}>{label}</Label>
          <BorderInput id={id} name={name} {...props}></BorderInput>
        </Wrapper>
      );
    default:
      return (
        <Wrapper>
          <Label htmlFor={id}>{label}</Label>
          <BaselineInput id={id} name={name} {...props}></BaselineInput>
        </Wrapper>
      );
  }
}

export default Input;
