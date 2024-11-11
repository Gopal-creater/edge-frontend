import React from "react";
import { Typography } from "antd";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const { Title } = Typography;

  return (
    <div className="home">
      <Title level={5}>Welcome To The Interview Assignment </Title>
      <Title level={3}>EDGE SIGNAL </Title>
      <Title level={5}>
        Proceed to <Link to={"signin"}>login</Link>
      </Title>
    </div>
  );
};

export default Home;
