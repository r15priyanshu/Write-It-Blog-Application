import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardBody,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import UserContext from "../context/UserContext";
import {
  POST_IMAGE_SERVE_URL,
  CustomDateFormatterFunc,
  CustomTextColorWrapper,
  DEFAULT_POST_IMAGE_NAME,
} from "../services/helper";
import defaultpostimage from "../images/defaultpostimage.jpg"

function PostView({ post, handlePostDelete }) {
  const { userState } = useContext(UserContext);
  return (
    <div className="PostView mb-3">
      <Card>
        <img
          alt={post.image === DEFAULT_POST_IMAGE_NAME?defaultpostimage:`${POST_IMAGE_SERVE_URL}/${post.image}`}
          src={post.image === DEFAULT_POST_IMAGE_NAME?defaultpostimage:`${POST_IMAGE_SERVE_URL}/${post.pid}`}
          height="200px"
        />
        <CardBody>
          <CardTitle tag="h5">{post.title}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Category : {post.category.name}
          </CardSubtitle>
          <CardText
            dangerouslySetInnerHTML={{
              __html: post.content.substring(0, 70) + "...",
            }}
          ></CardText>
          <CardText>
            By{" "}
            <CustomTextColorWrapper>
              <b>{post?.user?.name}</b>
            </CustomTextColorWrapper>
            {"  "}
            On{" "}
            <CustomTextColorWrapper>
              <b> {CustomDateFormatterFunc(post.date)}</b>
            </CustomTextColorWrapper>
          </CardText>
          <CardText>
            <b>Total Comments : {post.comments.length}</b>
          </CardText>
          <CardText>
            {" "}
            <Link className="btn btn-sm btn-danger" to={`/posts/${post.pid}`}>
              Read More
            </Link>
            {userState.loggedIn && post.user.uid === userState.data.uid && (
              <>
                <Button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => {
                    handlePostDelete(userState.data.username, post.pid);
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </Button>
                <Button
                  tag={Link}
                  to={`/user/${userState.data.username}/editpost/${post.pid}`}
                  className="btn btn-sm btn-danger ms-2"
                >
                  <i className="fa-solid fa-pencil"></i>
                </Button>
              </>
            )}
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default PostView;
