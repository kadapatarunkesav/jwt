import React, { useState } from "react";
import "./Registration.css";
import myImage from "../assets/pngwing.com.png";
import { Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if passwords match
    if (password !== repassword) {
      setError("Passwords do not match");
      return;
    }

    // Basic check for empty fields
    if (!firstname || !lastname || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      // POST request with form data
      const response = await axios.post(
        "http://localhost:8080/authenticate/register",
        {
          firstname,
          lastname,
          email,
          password,
        }
      );

      // Handle successful response
      console.log(response.data);
      const accessToken = response.data.accessToken;

      if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('userEmail', email)
          navigate('/dashboard');
          console.log('Login successful! Token stored.');
      } else {
          setError('Invalid login response - token not found.');
      }
      
      setSuccess("Registration successful!");
      setError("");
      navigate("/dashboard");
    } catch (error) {
      // Handle errors
      setError(error.response?.data?.message || "Registration failed");
    }
  };
  return (
    <>
      <div className="main">
        <div className="info">
          <div className="logo">
            <img src={myImage} alt="Stark Industries Logo" />
          </div>
          <div className="appinfo">
            <h1>Stark Management Platform</h1>
          </div>
          <div className="data">
            <h4>Stark employee Portal.</h4>
          </div>
          <div className="links">
            <button>Learn more</button>
            <button>Policies</button>
          </div>
        </div>
        <div className="card">
          <div className="greet">
            <h1>Welcome to Stark Industries</h1>
            <h3>Register your account</h3>
          </div>

          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstname"
                  //  value={formData.firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  placeholder="First Name"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridAddress2">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="lasttname"
                  //  value={formData.lasttname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  placeholder="Last Name"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  //  value={formData.email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  //  value={formData.password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label> Reenter Password</Form.Label>
                <Form.Control
                  name="reenterPassword"
                  //  value={formData.reenterPassword}

                  onChange={(e) => setRepassword(e.target.value)}
                  required
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
            </Row>
          </Form>

          <div className="acclogin">
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <button onClick={handleSubmit} type="submit" className="">
              Create Account
            </button>
            <h4>
              Already have an Account ? Please, <a href="/"> Login</a>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
