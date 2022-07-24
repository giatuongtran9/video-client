import React from "react";
import styled from "styled-components";

const BaseButton = styled.button`
  min-width: 165px;
  width: auto;
  height: max-content;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  text-transform: uppercase;
  font-weight: bolder;
  border: none;
  cursor: pointer;
`;

const GoogleSignInButton = styled(BaseButton)`
  background-color: #4285f4;
  color: white;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

const SubscribeButton = styled(BaseButton)`
  background-color: #cc1a00;
  color: white;
  border-radius: 5px;
`;

export const BUTTON_TYPE = {
  base: "base",
  google: "google-signin",
  subscribe: "subscribe",
};

const getButton = (type = BUTTON_TYPE.base) =>
  ({
    [BUTTON_TYPE.base]: BaseButton,
    [BUTTON_TYPE.google]: GoogleSignInButton,
    [BUTTON_TYPE.subscribe]: SubscribeButton,
  }[type]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);

  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
