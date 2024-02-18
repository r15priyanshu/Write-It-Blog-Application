import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardText,
  Container,
  FormGroup,
  Form,
  Input,
  Button,
} from "reactstrap";
import BaseComponent from "../components/BaseComponent";
import {
  POST_IMAGE_SERVE_URL,
  CustomDateFormatterFunc,
  CustomTextColorWrapper,
  DEFAULT_POST_IMAGE_NAME,
} from "../services/helper";
import {
  AddNewCommentToPostFunc,
  LoadPostByPostIdFunc,
} from "../services/post-service";

import UserContext from "../context/UserContext";
import { toast } from "react-toastify";
import defaultpostimage from "../images/defaultpostimage.jpg"

function FullPostView() {
  const { userState } = useContext(UserContext);
  const { postid } = useParams();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState({ comment: "" });
  useEffect(() => {
    LoadPostByPostIdFunc(postid)
      .then((data) => {
        //console.log(data);
        setPost({ ...data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleCommentChange(event) {
    //console.log(event.target.value);
    setComment({ comment: event.target.value });
  }

  function handleCommentSubmit(event) {
    event.preventDefault();
    if (comment.comment === "") {
      toast.error("Comment Cannot Be Empty!!");
      return;
    }
    AddNewCommentToPostFunc(comment, userState.data.username, postid)
      .then((response) => {
        //console.log(response.data);
        //setComment({comment:""})
        //setIscommentadded(!iscommentadded)
        setPost({ ...post, comments: [...post.comments, response.data] });
        toast.success("Comment Added Successfully!!");
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  return (
    <BaseComponent>
      <div className="container">
        <Card className="mt-4 mb-2">
          {post && (
            <>
              <CardBody>
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
                <h2>Title : {post.title}</h2>
                <h6>CATEGORY : {post.category?.name}</h6>
                <div className="container text-center">
                  {post.image && (
                    <img
                      src={post.image === DEFAULT_POST_IMAGE_NAME?defaultpostimage:`${POST_IMAGE_SERVE_URL}/${post?.pid}`}
                      alt="defaultimage"
                      height={"350px"}
                      width={"350px"}
                    />
                  )}
                </div>
                <CardText
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></CardText>
              </CardBody>
            </>
          )}
        </Card>
        <Card className="mt-4 mb-2">
          {post && (
            <>
              <CardBody>
                <h3>Comments ( {post.comments?.length} )</h3>
                <Container>
                  {userState.loggedIn && (
                    <Form onSubmit={handleCommentSubmit}>
                      <FormGroup>
                        <Input
                          id="comment"
                          name="comment"
                          type="textarea"
                          placeholder="Enter Comment"
                          value={comment.comment}
                          onChange={handleCommentChange}
                        />
                      </FormGroup>
                      <Button color="danger" size="sm">
                        Add Comment
                      </Button>
                    </Form>
                  )}

                  <Container className="mt-3">
                    {post?.comments?.map((com) => {
                      return (
                        <div
                          key={com.cid}
                          style={{
                            border: "1px solid #BB2D3B",
                            borderRadius: "5px",
                            margin: "10px",
                            padding: "10px",
                          }}
                        >
                          <h5>{com.comment}</h5>

                          <p style={{ fontSize: "13px" }}>
                            By{" "}
                            <CustomTextColorWrapper>
                              {com.user?.name}{" "}
                            </CustomTextColorWrapper>
                            ON{" "}
                            <CustomTextColorWrapper>
                              {CustomDateFormatterFunc(com.commentdate)}
                            </CustomTextColorWrapper>
                          </p>
                        </div>
                      );
                    })}
                  </Container>
                </Container>
              </CardBody>
            </>
          )}
        </Card>
      </div>
    </BaseComponent>
  );
}

export default FullPostView;
