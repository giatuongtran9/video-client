import React, { useState } from "react";
import { axiosInstance } from "../config";

import styled from "styled-components";
import Button from "../components/Button";

import FormInput from "../components/FormInput";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ResMsg = styled.p`
  color: white;
  font-size: 18px;
  font-weight: 500;
  margin: 20px 0;
  padding: 10px;
  width: max-content;
  border-radius: 10px;

  ${(props) => {
    if (props.status >= 400) {
      return `
        background-color: red;
      `;
    } else if (props.status === 200) {
      return `
        background-color: green;
      `;
    }
  }}
`;

const defaultValue = {
  name: "",
  email: "",
  password: "",
};

const defaultMsg = {
  status: 0,
  msg: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultValue);
  const [responseMsg, setResponseMsg] = useState(defaultMsg);
  const { name, email, password } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/register", formFields);
      setResponseMsg({
        status: res.status,
        msg: res.data.message,
      });

      setFormFields(defaultValue);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        setResponseMsg({
          status: err.response.status,
          msg: err.response.data.message,
        });
      }
    }
  };

  return (
    <Container>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          name="name"
          onChange={handleChange}
          value={name}
        />

        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          onChange={handleChange}
          value={password}
        />

        {responseMsg.msg && (
          <ResMsg status={responseMsg.status}>{responseMsg.msg}</ResMsg>
        )}

        <Button type="submit">Sign Up</Button>
      </form>
    </Container>
  );
};

export default SignUp;
