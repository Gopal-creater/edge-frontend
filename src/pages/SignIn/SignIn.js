import React from "react";
import { Button, Form, Input } from "antd";
import "./SignIn.css";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../store/actions/loginActions";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  //declarations
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth.login);
  const navigate = useNavigate();

  // Function for handling form submit
  const onFinish = (values) => {
    dispatch(loginAction(values, navigate));
  };

  return (
    <div className="signIn">
      <Form name="signinForm" className="signInForm" onFinish={onFinish}>
        {/* Username */}
        <Form.Item
          label="Username"
          name="userName"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* password */}
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* Button */}
        <Form.Item
          wrapperCol={{
            offset: 9,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            {loginState.loading ? "Loading" : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
