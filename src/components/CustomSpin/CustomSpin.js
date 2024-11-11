import { Spin } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const CustomSpin = ({ tip, indicator, fullscreen, size, ...props }) => {
  return (
    <Spin
      indicator={indicator || <LoadingOutlined spin />}
      fullscreen={fullscreen}
      size={size}
      tip={tip}
      {...props}
    />
  );
};

CustomSpin.defaultProps = {
  tip: "Loading...",
  size: "default",
  fullscreen: false,
};

export default CustomSpin;
