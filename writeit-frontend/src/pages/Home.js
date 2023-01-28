import React from "react";
import { Card } from "reactstrap";
import BaseComponent from "../components/BaseComponent";
import Typewriter from "typewriter-effect";
import blog from "../images/blog.jpg";
import { Link } from "react-router-dom";
function Home() {
  return (
    <BaseComponent>
      <div className="Home container" style={{ minHeight: "500px" }}>
        <Card
          className="p-3 m-3"
          style={{ backgroundColor: "rgb(255,255,255,0.9)" }}
        >
        <h3 style={{
              textAlign: "center",
              color: "#BB2D3B",
              fontStyle:"italic"
            }}>Hey There..</h3>
          <h1
            style={{
              textAlign: "center",
              color: "#212529",
              fontStyle:"italic"
            }}
            className="m-2 rounded-5"
          >
            <Typewriter
              options={{
                strings: [
                  "Welcome to Write-It...",
                  "It's more than a website. Give it a try !!",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <div className="container text-center">
            <img
              src={blog}
              alt="Blog Image"
              height={"250px"}
              width={"300px"}
              className="rounded-5"
            />
            <br />
            <Link to="/signup" className="btn btn-sm btn-danger mt-2 mb-4">
              SignUp Now
            </Link>
            <h3>Why Us ??</h3>
            <ul style={{listStyle:"none"}}>
              <li>Ease of Use...</li>
              <li>Support from Real People...</li>
              <li>A Really Good Content Editor...</li>
              <li>Ability to Manage Many Bloggers...</li>
              <li>Share Share Share...</li>
            </ul>
          </div>
        </Card>
      </div>
    </BaseComponent>
  );
}

export default Home;
