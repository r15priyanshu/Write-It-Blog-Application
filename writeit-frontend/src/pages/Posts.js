import React, { useContext, useEffect, useState } from "react";
import { Card, Container } from "reactstrap";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import BaseComponent from "../components/BaseComponent";
import PostForm from "../components/PostForm";
import PostView from "../components/PostView";
import {
  DeletePostByPostIdFunc,
  LoadAllPostsByUsernameFunc,
} from "../services/post-service";
import { toast } from "react-toastify";
function Posts() {
  const { usernameparam } = useParams();
  const { userState, setUserState } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [mostrecentfirst, setMostrecetfirst] = useState(true);

  //for first time page load handling
  useEffect(() => {
    LoadPostsByUsername(userState.data.username, mostrecentfirst);
  }, []);

  //reusable function for loading
  function LoadPostsByUsername(username, mostrecentfirst) {
    LoadAllPostsByUsernameFunc(username, mostrecentfirst)
      .then((data) => {
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handlePostDelete(username, postid) {
    console.log(username, postid);
    DeletePostByPostIdFunc(username, postid)
      .then((response) => {
        toast.success("Post Deleted Successfully!!");
        LoadPostsByUsername(userState.data.username,mostrecentfirst);
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  return (
    <BaseComponent>
      <PostForm LoadPostsByUsername={LoadPostsByUsername}/>
      <Container className="mt-2 mb-2 text-center">
        <Card>
          <h2>Total Posts ( {posts.length} )</h2>
        </Card>
      </Container>

      <div className="container">
        <div className="row justify-content-center">
          {userState &&
            posts?.map((post) => {
              return (
                <div key={post.pid} className="col-md-4">
                  <PostView post={post} handlePostDelete={handlePostDelete} />
                </div>
              );
            })}
        </div>
      </div>
    </BaseComponent>
  );
}

export default Posts;
