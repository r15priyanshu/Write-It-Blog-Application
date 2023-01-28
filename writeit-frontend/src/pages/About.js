import React from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import BaseComponent from "../components/BaseComponent";
function About() {
  return (
    <BaseComponent>
      <div className="About" style={{ minHeight: "500px" }}>
        <Card
          className="p-3 m-3"
          style={{ backgroundColor: "rgb(255,255,255,0.9)" }}
        >
          <h3
            style={{
              textAlign: "center",
              color: "#BB2D3B",
              fontStyle: "italic",
            }}
          >
            Who Are We ?
          </h3>
          <div className="container text-center" >
            <p style={{textAlign:"justify"}}>
              A blog, short for weblog, is a frequently updated web page used
              for personal commentary or business content. Blogs are often
              interactive and include sections at the bottom of individual blog
              posts where readers can leave comments.
            </p>
            <p style={{textAlign:"justify"}}>
              Most are written in a conversational style to reflect the voice
              and personal views of the blogger. Some businesses use blogs to
              connect with target audiences and sell products. Blogs were
              originally called weblogs, which were websites that consisted of a
              series of entries arranged in reverse chronological order, so the
              newest posts appeared at the top. They were frequently updated
              with new information about various topics.
            </p>
            <p style={{textAlign:"justify"}}>
              Today's blogs are more likely to be a personal online journal or
              commentary related to a business that's frequently updated and
              intended for general public consumption. Blogs are still often
              defined by their format, consisting of a series of entries posted
              to a single page in reverse chronological order. Many blogs are
              collaborative and include multiple authors often writing on a
              single theme such as Engadget, a tech blog with multiple authors.
            </p>
            <p style={{textAlign:"justify"}}>
              A blog is usually devoted to a subject of interest to a target
              audience -- such as fashion, politics or information technology.
              Blogs can be thought of as providing ongoing commentary on a
              theme. They're intended to engage with a community interested in a
              topic and the personality or products of the blogger or sponsoring
              business. Bloggers often pick unique domain names that reflect the
              topic at hand, such as Not Another Cooking Show, a food blog.
            </p>
            <Link to="/signup" className="btn btn-sm btn-danger mt-2 mb-4">
              SignUp Now
            </Link>
          </div>
        </Card>
      </div>
    </BaseComponent>
  );
}

export default About;
