import React, { useContext, useEffect, useRef, useState } from "react";
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
  Container,FormText
} from "reactstrap";
import { LoadAllCategoriesFunc } from "../services/category-service";
import { toast } from "react-toastify";
import {  AddNewPostWithFormDataFunc } from "../services/post-service";

import UserContext from "../context/UserContext";

function PostForm({ LoadPostsByUsername }) {
  const { userState } = useContext(UserContext);
  const [imagedata,setImagedata]=useState(null);
  const [stateData, setStateData] = useState({
    title: "",
    content: "",
    categoryname: "",
  });

  const textAreaEditor = useRef(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    //console.log("INSIDE EFFECT OF LOAD CATEGORIES");
    LoadAllCategoriesFunc()
      .then((data) => {
        setCategories([...data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleFileChange(event){
    console.log(event.target.files[0]);
    setImagedata(event.target.files[0]);

  }

  function handleChange(event) {
    if (event?.target)
      setStateData({ ...stateData, [event.target.name]: event.target.value });
    else setStateData({ ...stateData, content: event });
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    console.log(stateData);
    if (stateData.categoryname.trim() === "") {
      toast.error("Select Category!!");
      return;
    }
    if (stateData.title.trim() === "") {
      toast.error("Title Cannot be Empty!!");
      return;
    }
    if (stateData.content.trim() === "") {
      toast.error("Content Cannot be Empty!!");
      return;
    }

    AddNewPostWithFormDataFunc(stateData,imagedata, stateData.categoryname, userState.data.username)
      .then((response) => {
        //console.log(response.data);
        setStateData({
          title: "",
          content: "",
          categoryname: "",
        });
        setImagedata(null);
        document.getElementById("image").value=null;
        LoadPostsByUsername(userState.data.username, true);
        toast.success("Post Added Successfully!!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something Went Wrong!!");
      });
  }
  function handleReset(event) {
    setStateData({
      title: "",
      content: "",
      categoryname: "",
    });
    setImagedata(null);
  }

  return (
    <div className="PostForm container">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <Card className="my-2 shadow">
            <CardHeader className="text-center">
              <h3>What's on Your Mind ?</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="category">Select</Label>
                  <Input
                    id="categoryname"
                    name="categoryname"
                    type="select"
                    onChange={handleChange}
                    defaultValue={0}
                  >
                    <option disabled value={0}>
                      --Select Category--
                    </option>
                    {categories.map((category) => (
                      <option key={category.cid} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
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
                    //
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="image">Select Post Banner</Label>
                  <Input id="image" name="image" type="file" onChange={handleFileChange}/>
                  <FormText>
                    Image selected above will become the main image for your post!!
                  </FormText>
                </FormGroup>
                <Container className="text-center">
                  <Button className="btn btn-sm">Add Post</Button>
                  <Button
                    color="danger"
                    type="reset"
                    onClick={handleReset}
                    className="btn btn-sm ms-2"
                  >
                    Reset
                  </Button>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
