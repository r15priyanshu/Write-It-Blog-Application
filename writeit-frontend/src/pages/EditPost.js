import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  FormText,
} from "reactstrap";
import BaseComponent from "../components/BaseComponent";
import { LoadPostByPostIdFunc, UpdatePostFunc } from "../services/post-service";
import { LoadAllCategoriesFunc } from "../services/category-service";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";

function EditPost() {
  const navigate = useNavigate();
  const { userState } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [stateData, setStateData] = useState({
    title: "",
    content: ""
  });
  const [postData, setPostData] = useState(null);
  const { postid } = useParams();

  const textAreaEditor = useRef(null);
  useEffect(() => {
    LoadAllCategoriesFunc()
      .then((data) => {
        setCategories([...data]);
      })
      .catch((error) => {
        console.log(error);
      });

    LoadPostByPostIdFunc(postid)
      .then((data) => {
        console.log(data);
        setPostData({ ...data });
        setStateData({
          title: data.title,
          content: data.content,
        });
      })
      .catch((error) => {
        toast.error("Not Able To Load The Post");
        navigate(`/user/${userState.data.username}/addpost`);
      });
  }, []);

  useEffect(() => {
    if (postData != null) {
      if (postData.user.uid !== userState.data.uid) {
        toast.error("This is not your post!!");
        navigate(`/user/${userState.data.username}/addpost`);
      }
    }
  }, [postData]);

  function handleChange(event) {
    if (event?.target)
      setStateData({ ...stateData, [event.target.name]: event.target.value });
    else setStateData({ ...stateData, content: event });
  }


  function handleSubmit(event) {
    event.preventDefault();
    if(stateData.content==='' || stateData.title===''){
        toast.error("Fields cannot be empty");
        return;
    }
    UpdatePostFunc({...stateData},userState.data.username,postid).then((response)=>{
        //console.log(response.data);
        toast.success("Post Updated Successfully!!")
        navigate(`/user/${userState.data.username}/addpost`)
    }).catch((error)=>{
        console.log(error)
    });
  }
  return (
    <BaseComponent>
      <div className="EditPost container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <Card className="my-2 shadow">
              <CardHeader className="text-center">
                <h3>Edit Your Post</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter Post Title"
                      type="text"
                      value={stateData.title}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="content">Content</Label>
                    <JoditEditor
                      ref={textAreaEditor}
                      value={stateData.content}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Container className="text-center">
                    <Button className="btn btn-sm btn-danger">Update Post</Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </BaseComponent>
  );
}

export default EditPost;
