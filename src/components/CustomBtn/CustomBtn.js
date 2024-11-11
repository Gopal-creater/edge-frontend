import React from "react";
import { Button } from "antd";
import "./CustomBtn.css";

const CustomButton = ({ icon, onClick, className, children, ...props }) => {
  return (
    <Button
      icon={icon}
      onClick={onClick}
      className={`customBtn ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

CustomButton.defaultProps = {
  text: "Button",
};

export default CustomButton;
