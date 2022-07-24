import { axiosInstance } from "../config";
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0;
`;

const Img = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;

const Name = styled.span`
  font-size: 12px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 11px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ comment }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/users/find/${comment.userId}`);

      setUser(res.data);
    };

    fetchData();
  }, [comment.userId]);

  return (
    <Container>
      <Img src={user.img} />

      <Detail>
        <Name>
          {user.name} <Date>{format(user.createdAt)}</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Detail>
    </Container>
  );
};

export default Comment;
