import React from "react";
import styled from "styled-components";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  align-items: center;
  height: calc(100vh - 150px);
  max-width: 800px;
`;

const Authentication = () => {
  return (
    <Container>
      <SignIn />
      <SignUp />
    </Container>
  );
};

export default Authentication;
