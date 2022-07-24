import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import styled from "styled-components";

import { signout } from "../redux/userSlice";

import {
  AccountCircleOutlined,
  SearchOutlined,
  VideoCallOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Upload from "./Upload";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 60px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid red;
  color: red;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SignInUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #999;
`;

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    dispatch(signout());
    navigate("/auth");
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Search" />
            <SearchOutlined />
          </Search>

          {currentUser ? (
            <SignInUser>
              <VideoCallOutlined onClick={() => setIsOpen(true)} />
              <Img src={currentUser.img} onClick={handleSignOut} />
              {currentUser.name}
            </SignInUser>
          ) : (
            <Link to="auth" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlined />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {isOpen && <Upload setIsOpen={setIsOpen} />}
      <Outlet />
    </>
  );
};

export default NavBar;
