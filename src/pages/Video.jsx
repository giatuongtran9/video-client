import React, { useEffect, useState } from "react";

import styled from "styled-components";
import Button, { BUTTON_TYPE } from "../components/Button";

import {
  ThumbUpOutlined,
  ThumbDownAltOutlined,
  ThumbUp,
  ThumbDown,
  AddTaskOutlined,
} from "@mui/icons-material";

import Comments from "../components/Comments";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../config";
import { like, dislike, fetchSuccess } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";

const Container = styled.div`
  display: flex;
  gap: 30px;
`;

const Content = styled.div`
  flex: 5;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin: 20px 0 10px 0;
  color: ${({ theme }) => theme.text};
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.div`
  color: ${({ theme }) => theme.textSoft};
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  color: ${({ theme }) => theme.text};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 1px solid ${({ theme }) => theme.soft};
`;

const ChannelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Img = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #999;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelSub = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const VideoDesc = styled.p`
  font-size: 14px;
`;

const SubButton = styled.button`
  height: max-content;
`;

const VideoFrame = styled.video`
  width: 100%;
  height: 720px;
  object-fit: cover;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axiosInstance.get(`/videos/find/${path}`);
        const channelRes = await axiosInstance.get(
          `/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {}
    };

    fetchData();
  }, [path]);

  const handleLike = async () => {
    await axiosInstance.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };

  const handleDislike = async () => {
    await axiosInstance.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axiosInstance.put(`/users/unsub/${channel._id}`)
      : await axiosInstance.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  return (
    <Container>
      <Content>
        <div>
          <VideoFrame src={currentVideo.videoUrl} controls></VideoFrame>
        </div>

        <Title>{currentVideo.title}</Title>

        <Detail>
          <Info>
            {currentVideo.views} views • {format(currentVideo.createdAt)}
          </Info>

          <ButtonsContainer>
            <ButtonContainer onClick={handleLike}>
              {currentVideo.likes.includes(currentUser._id) ? (
                <ThumbUp></ThumbUp>
              ) : (
                <ThumbUpOutlined />
              )}{" "}
              {currentVideo.likes?.length}
            </ButtonContainer>

            <ButtonContainer onClick={handleDislike}>
              {currentVideo.dislikes.includes(currentUser._id) ? (
                <ThumbDown></ThumbDown>
              ) : (
                <ThumbDownAltOutlined />
              )}{" "}
              Dislike
            </ButtonContainer>

            <ButtonContainer>
              <AddTaskOutlined /> Save
            </ButtonContainer>
          </ButtonsContainer>
        </Detail>

        <Hr />

        <ChannelWrapper>
          <ChannelInfo>
            <Img src={channel.img} />

            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelSub>{channel.subscribers} subscribers</ChannelSub>
              <VideoDesc>{currentVideo.desc}</VideoDesc>
            </ChannelDetail>
          </ChannelInfo>
          {currentUser.name === channel.name ? (
            <></>
          ) : (
            <Button
              type="button"
              buttonType={BUTTON_TYPE.subscribe}
              onClick={handleSub}
            >
              {currentUser.subscribedUsers?.includes(channel._id)
                ? "SUBSCRIBED"
                : "SUBSCRIBE"}
            </Button>
          )}
        </ChannelWrapper>

        <Hr />

        <Comments videoId={currentVideo._id} />
      </Content>

      <Recommendation />
    </Container>
  );
};

export default Video;
