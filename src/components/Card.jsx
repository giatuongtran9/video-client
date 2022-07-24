import React, { useState, useEffect } from "react";
import { axiosInstance } from "../config";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";

import styled from "styled-components";

const Container = styled.div`
  width: ${({ type }) => type !== "sm" && "360px"};
  margin-bottom: ${({ type }) => (type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  gap: 10px;
  display: ${({ type }) => type === "sm" && "flex"};
`;

const Image = styled.img`
  width: 100%;
  height: ${({ type }) => (type === "sm" ? "120px" : "200px")};

  flex: 1;
  background-color: #999;
`;

const Detail = styled.div`
  display: flex;

  margin-top: ${({ type }) => type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: ${({ type }) => type === "sm" && "none"};
  background-color: #999;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const navigate = useNavigate();
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axiosInstance.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    };

    fetchChannel();
  }, [video.userId]);

  const handleClick = async () => {
    await axiosInstance.put(`/videos/view/${video._id}`);
    navigate(`/video/${video._id}`);
  };

  return (
    <Container type={type} onClick={handleClick}>
      <Image type={type} src={video.imgUrl} />

      <Detail type={type}>
        <ChannelImage type={type} src={channel.img} />

        <div>
          <Title>{video.title}</Title>
          <ChannelName>{channel.name}</ChannelName>
          <Info>
            {video.views} views • {format(video.createdAt)}
          </Info>
        </div>
      </Detail>
    </Container>
  );
};

export default Card;
