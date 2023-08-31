import React, { useState } from "react";
import { Link } from "react-router-dom";
import Validation from "./SignupValidation";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const [errors, setErrors] = useState({});

  const validateAndSubmit = (event) => {
    console.log(values);
    event.preventDefault();
    setErrors(Validation(values));
    if (Object.keys(errors).length === 0) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Redirect to the login page or any other route
        navigate("/login");
      } else {
        console.log("bad request");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "black",
        height: "100vh",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "10px",
        }}
      >
        <h2>Sign Up</h2>
        <form onSubmit={validateAndSubmit}>
          <div>
            <label htmlFor="name">name</label>
            <input
              type="name"
              name="name"
              placeholder="Enter Name"
              onChange={handleInput}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleInput}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleInput}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <button type="submit">Sign up</button>
          <Link to="/login">Login</Link>
        </form>
      </div>
    </div>
  );
}
