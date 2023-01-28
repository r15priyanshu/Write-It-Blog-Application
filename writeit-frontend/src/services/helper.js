import React from "react";
import axios from "axios";
export const BASEURL = "http://localhost:8080";
export const POST_IMAGE_SERVE_URL=BASEURL+"/api/images/servepostimage"
export const myaxios = axios.create({ baseURL: BASEURL });

export function CustomTextColorWrapper(props) {
  return <span style={{color:"#bb2d3b"}}>{props.children}</span>;
}

export const CustomDateFormatterFunc = (date) => {
  const d = new Date(date);
  return `${d.getDate()}-${
    d.getMonth() + 1
  }-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
};

//Helpers for authentication and related activities
export const isLoggedIn = () => {
  if (localStorage.getItem("loggedinuser")) return true;
  else return false;
};

//save the token as well as user in localStorage
export const doLoginFunc = (data, callback) => {
  //console.log("INSIDE doLoginFunc to save token and user details");
  //console.log(data);
  localStorage.setItem("loggedinuser", JSON.stringify(data));
  callback();
};

//delete the token as well as user in localStorage
export const doLogoutFunc = (callback) => {
  if (isLoggedIn) localStorage.removeItem("loggedinuser");
  callback();
};

//get user details from localStorage
export const getLoggedInUserDetails = () => {
  if (isLoggedIn()) {
    let result = JSON.parse(localStorage.getItem("loggedinuser"));
    return result;
  } else return null;
};
