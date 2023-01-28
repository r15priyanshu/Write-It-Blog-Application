import { myaxios } from "./helper";

export const SignUpFunc = (userdata) => {
  return myaxios.post("/api/users", userdata);
};

export const LoginFunc = (userdata) => {
  return myaxios.post("/api/login", userdata);
};

//http://localhost:8080/api/users/anshu
export const FetchUserDetailsFunc=(username)=>{
  return myaxios.get(`/api/users/${username}`);
}

