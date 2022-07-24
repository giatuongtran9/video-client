import { axiosInstance } from "../config";
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
`;

const Recommendation = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/videos/random`);
      setVideos(res.data);
    };

    fetchData();
  }, []);

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
