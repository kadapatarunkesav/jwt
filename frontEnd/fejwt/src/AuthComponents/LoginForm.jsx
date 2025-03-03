import React, { useState } from "react";
import "./LoginForm.css";
import { Col, Form, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../assets/pexels-alteredsnaps-11794594.jpg";
import img2 from "../assets/pexels-tima-miroshnichenko-6091154.jpg";
import img3 from "../assets/pexels-tima-miroshnichenko-6204481.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({onLogin}) => {

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/authenticate/login', {
          email,
          password
      });
      console.log('Login response:', response);
      const accessToken = response.data.accessToken;

      if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('userEmail', email)
          navigate('/dashboard');
          console.log('Login successful! Token stored.');
      } else {
          setError('Invalid login response - token not found.');
      }
  } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials and try again.');
  }
};

  return (
    <>
      <div className="main">
        <div className="details">
          <div className="greet">
            <h1>Welcome to Stark Industries</h1>
            <h3>Login to account . . .</h3>
          </div>
          <div className="input">
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3"></Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Row />
            </Form>
          </div>
          <div className="acclogin">
            <button onClick={handleSubmit} type="submit">
              Login
            </button>
            <h4>
              Still Don't have an Account ? <a href="/register">SignUp</a>
            </h4>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
          <div className="links">
            <button>Policies</button>
          </div>
        </div>
        <div className="imgs">
          <Carousel fade>
            <Carousel.Item>
              <img src={img1} alt="they are one" />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src={img2} alt="they are two" />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src={img3} alt="they are three" />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
