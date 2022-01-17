import { Button, Form, Container, Alert } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    return setInputs({ ...inputs, [key]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://127.0.0.1:8000/users/login/", {
        ...inputs,
      });
      localStorage.setItem("token", data.token);
      setInputs({ ...inputs, ...data });
      navigate("/");
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError({ message: err.message });
      }
    }
  };
  return (
    <Container className="d-flex flex-column align-items-center p-3">
      <h2>Ewallet App</h2>
      <br />
      <h4>Login</h4>
      <div className="w-50">
        {error ? (
          error.message ? (
            <Alert variant="danger">
              <p>{error.message}</p>
            </Alert>
          ) : error.error ? (
            <Alert variant="danger">
              <p>{error.error}</p>
            </Alert>
          ) : (
            Object.keys(error).map((message) => (
              <Alert variant="danger">
                <p>
                  {message}: {error[message][0]}
                </p>
              </Alert>
            ))
          )
        ) : (
          ""
        )}
      </div>
      <Form className="w-25">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={inputs.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={inputs.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Show password"
            onChange={() => setShowPassword(!showPassword)}
            checked={showPassword}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={(e) => handleLogin(e)}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
