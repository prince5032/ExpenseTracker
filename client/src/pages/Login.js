import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/Loginpage.css";
const Login = () => {
  const img =
      
 " https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4NjA1ODQ0NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="login-page ">
        {loading && <Spinner />}
        <div className="row container">
          <h1>Expense Bunny</h1>
          <h5>Your Personal Expense Tracker </h5>
          <div className="col-md-6">
            <img src={img} alt="login-img" width={"100%"} height="100%" />
          </div>
          <div className="col-md-4 login-form">
            <Form layout="vertical" onFinish={submitHandler}>
              <h1>Login Form</h1>

              <Form.Item label="Email" name="email">
                <Input type="email" required />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type="password" required />
              </Form.Item>
              <div className="d-flex justify-content-between">
                <Link to="/register">
                  Not a user ? Click Here to regsiter !
                </Link>
                <button className="btn">Login</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;