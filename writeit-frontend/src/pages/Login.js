import React, { useContext, useState } from "react";
import BaseComponent from "../components/BaseComponent";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginFunc } from "../services/user-service";
import { toast } from "react-toastify";
import { doLoginFunc } from "../services/helper";
import UserContext from "../context/UserContext";

function Login(props) {
  const { setUserState } = useContext(UserContext);
  const navigate = useNavigate();

  const [stateData, setStateData] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    setStateData((oldStateData) => {
      return { ...oldStateData, [event.target.name]: event.target.value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (stateData.username.trim() === "" || stateData.password.trim() === "") {
      toast.error("Username Or Password cannot be blank!!");
      return;
    }

    LoginFunc(stateData)
      .then((response) => {
        const user = response.data;
        //console.log(response.data)
        doLoginFunc(user, () => {
          //after login set user data in global state and then redirect to profile page
          setUserState({ data:{...user},loggedIn:true });
          navigate("/user/" + user.username + "/profile");
        });
        toast.success("Login Successfull for username : " + user.username);
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(JSON.stringify(error.response.data.message));
      });
  }

  function handleReset(event) {
    setStateData({
      username: "",
      password: "",
    });
  }

  return (
    <BaseComponent>
      <div className="Login container" style={{minHeight:"500px"}}>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Card className="my-2 shadow" style={{backgroundColor:"rgb(255,255,255,0.4)"}}>
              <CardHeader>
                <h2 style={{textAlign:"center"}}>LOGIN</h2>
              </CardHeader>
              <CardBody>
                <div className="LoginForm">
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        placeholder="Enter Username"
                        type="text"
                        value={stateData.username}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        type="password"
                        value={stateData.password}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <div className="container text-center">
                    <Button className="btn btn-sm">Submit</Button>
                    <Button className="btn btn-sm btn-danger ms-2" type="reset" onClick={handleReset}>
                      Reset
                    </Button>
                    </div>
                    
                  </Form>
                </div>
              </CardBody>
              <CardFooter className="text-center">
                <NavLink to="/signup" style={{ color: "red" }}>
                  Haven't signed up yet? SignUp now !!
                </NavLink>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </BaseComponent>
  );
}

export default Login;
