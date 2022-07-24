import React from "react";

import styled from "styled-components";
import LogoImg from "../img/logo.png";

import {
  Home,
  ExploreOutlined,
  SubscriptionsOutlined,
  VideoLibraryOutlined,
  HistoryOutlined,
  SettingsOutlined,
  FlagOutlined,
  HelpOutline,
  SettingsBrightnessOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Button = styled.button`
  margin-top: 10px;
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

const SideBar = ({ mode, setMode }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <Container>
        <Wrapper>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>
              <Img src={LogoImg} />
              Tuong Tran
            </Logo>
          </Link>

          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Item>
              <Home />
              Home
            </Item>
          </Link>

          <Link
            to="/trend"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item>
              <ExploreOutlined />
              Explore
            </Item>
          </Link>

          <Link
            to="/subscription"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item>
              <SubscriptionsOutlined />
              Subscriptions
            </Item>
          </Link>

          <Hr />

          <Item>
            <VideoLibraryOutlined />
            Library
          </Item>

          <Item>
            <HistoryOutlined />
            History
          </Item>

          <Hr />

          {!currentUser && (
            <>
              <div>
                Sign in to like videos, comment and subscribe.
                <Link to="auth" style={{ textDecoration: "none" }}>
                  <Button>
                    <AccountCircleOutlined />
                    SIGN IN
                  </Button>
                </Link>
              </div>
              <Hr />
            </>
          )}

          <Item>
            <SettingsOutlined />
            Settings
          </Item>

          <Item>
            <FlagOutlined />
            Report
          </Item>

          <Item>
            <HelpOutline />
            Help
          </Item>

          <Item onClick={() => setMode(!mode)}>
            <SettingsBrightnessOutlined />
            {mode ? "Light" : "Dark"} Mode
          </Item>
        </Wrapper>
      </Container>
    </>
  );
};

export default SideBar;
