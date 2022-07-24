import { axiosInstance } from "../config";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import Comment from "./Comment";

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  padding: 10px;
  font-size: 14px;
  width: 100%;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/comments/find/${videoId}`);
        setComments(res.data);
      } catch (err) {
        console.log(err.response);
      }
    };

    fetchData();
  }, [videoId]);

  return (
    <div>
      <NewComment>
        <Img src={currentUser.img} />
        <Input placeholder="Add a comment" />
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
