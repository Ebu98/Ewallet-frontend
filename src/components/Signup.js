import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    user_type: "noob",
    currency: "",
    value: 0.0,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    return setInputs({ ...inputs, [key]: value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/users/register/",
        {
          ...inputs,
        }
      );
      setInputs({ ...inputs, ...data });
      navigate("/login");
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
      <h4>Register</h4>
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
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter Username"
            value={inputs.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={inputs.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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
        <Form.Group className="mb-3">
          <Form.Label>User Type</Form.Label>
          <Form.Check
            type="radio"
            name="user_type"
            value="noob"
            label="Noob"
            checked={inputs.user_type === "noob"}
            onChange={(e) => handleChange("user_type", "noob")}
          />
          <Form.Check
            type="radio"
            name="user_type"
            value="elite"
            label="Elite"
            checked={inputs.user_type === "elite"}
            onChange={(e) => handleChange("user_type", "elite")}
          />
          <Form.Check
            type="radio"
            name="user_type"
            value="admin"
            label="Admin"
            checked={inputs.user_type === "admin"}
            onChange={(e) => handleChange("user_type", "admin")}
          />
        </Form.Group>
        {inputs.user_type !== "admin" ? (
          <Form.Group className="mb-3 border p-3">
            <Row>
              <Col xs={4}>
                <Form.Label>Currency</Form.Label>
                <Form.Control
                  type="text"
                  name="currency"
                  placeholder="NGN"
                  onChange={(e) => handleChange("currency", e.target.value)}
                  value={inputs.currency}
                />
              </Col>
              <Col xs={6}>
                <Form.Label>Value</Form.Label>
                <Form.Control
                  type="text"
                  name="value"
                  placeholder="Enter Value"
                  value={inputs.value}
                  onChange={(e) => handleChange("value", e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
        ) : (
          ""
        )}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleRegister(e)}
        >
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
