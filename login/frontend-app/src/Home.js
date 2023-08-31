import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUser = () => {
    fetch("http://localhost:8000/api/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Barer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((user) => {
        console.log(user);
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
        login();
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const login = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return <div>{user ? <p>welcome {user.name}</p> : <p>...loading</p>}</div>;
}
