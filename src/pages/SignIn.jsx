import { axiosInstance } from "../config";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Button, { BUTTON_TYPE } from "../components/Button";

import FormInput from "../components/FormInput";
import { signinFailure, signinStart, signinSuccess } from "../redux/userSlice";
import { signInWithGooglePopUp } from "../utils/firebase/firebase.utils";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  color: ${({ theme }) => theme.text};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
  email: "",
  password: "",
};

const defaultMsg = {
  status: 0,
  msg: "",
};

const SignIn = () => {
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState(defaultValue);
  const [responseMsg, setResponseMsg] = useState(defaultMsg);
  const { email, password } = formFields;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    dispatch(signinStart());

    signInWithGooglePopUp()
      .then((result) => {
        axiosInstance
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(signinSuccess(res.data.userDoc));

            setResponseMsg({
              status: res.status,
              msg: res.data.message,
            });

            setFormFields(defaultValue);

            navigate("/");
          });
      })
      .catch((err) => {
        dispatch(signinFailure());

        if (err.response) {
          console.log(err.response.data);
          setResponseMsg({
            status: err.response.status,
            msg: err.response.data.message,
          });
        }
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signinStart());
    try {
      const res = await axiosInstance.post("/auth/signin", formFields);
      dispatch(signinSuccess(res.data.others));

      setResponseMsg({
        status: res.status,
        msg: res.data.message,
      });

      navigate("/");
    } catch (err) {
      dispatch(signinFailure());

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
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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

        <ButtonContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonContainer>
      </form>
    </Container>
  );
};

export default SignIn;
