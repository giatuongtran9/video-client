import React from "react";

import styled, { css } from "styled-components";

const shrinkLabel = css`
  top: -15px;
  font-size: 12px;
  color: ${({ theme }) => theme.text};
`;

const InputLabel = styled.label`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  ${({ shrink }) => shrink && shrinkLabel};
`;

const InputText = styled.input`
  background: none;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  padding: 10px;
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.text};

  &:focus {
    outline: none;
  }

  &:focus ~ ${InputLabel} {
    ${shrinkLabel}
  }
`;

const Container = styled.div`
  position: relative;
  margin: 45px 0;
`;

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Container>
      <InputText {...otherProps} />
      {label && (
        <InputLabel shrink={otherProps.value?.length}>{label}</InputLabel>
      )}
    </Container>
  );
};

export default FormInput;
