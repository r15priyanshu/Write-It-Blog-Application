import { myaxios } from "./helper";

//http://localhost:8080/api/users/anshu/posts/CSE
// export const AddNewPostFunc=(postdata,categoryname,username)=>{
//     //console.log(postdata)
//     const url=`/api/users/${username}/posts/${categoryname}`;
//     //console.log(url);
//     return myaxios.post(url,postdata);
// };

//this post function will send data as form data along with imagedata
export const AddNewPostWithFormDataFunc = (
  postdata,
  imagedata,
  categoryname,
  username
) => {
  //console.log(postdata)
  const url = `/api/users/${username}/posts/${categoryname}`;
  //console.log(url);
  const formdata = new FormData();
  formdata.append("post", JSON.stringify(postdata));
  formdata.append("image", imagedata);
  return myaxios.post(url, formdata);
};

//http://localhost:8080/api/users/anshu/posts/15
export const UpdatePostFunc = (postdata,username,postid) => {
  //console.log(postdata)
  const url = `/api/users/${username}/posts/${postid}`;
  return myaxios.put(url, postdata);
};

//http://localhost:8080/api/posts/category/Technology
//http://localhost:8080/api/posts/category/Technology?pagenumber=0&pagesize=1&mostrecentfirst=true
export const LoadAllPostsByCategoryFunc = (
  categoryname,
  pagenumber = 0,
  pagesize = 5,
  mostrecentfirst
) => {
  const url = `/api/posts/category/${categoryname}?pagenumber=${pagenumber}&pagesize=${pagesize}&mostrecentfirst=${mostrecentfirst}`;
  return myaxios.get(url).then((response) => {
    return response.data;
  });
};

//http://localhost:8080/api/users/anshu/posts?mostrecentfirst=false
export const LoadAllPostsByUsernameFunc = (username, mostrecentfirst) => {
  const url = `/api/users/${username}/posts?mostrecentfirst=${mostrecentfirst}`;
  return myaxios.get(url).then((response) => {
    return response.data;
  });
};

//http://localhost:8080/api/posts/8
export const LoadPostByPostIdFunc = (postid) => {
  const url = `/api/posts/${postid}`;
  return myaxios.get(url).then((response) => {
    return response.data;
  });
};

//add a comment to a post
//http://localhost:8080/api/users/anshu/posts/14/comments
export const AddNewCommentToPostFunc = (comment, username, postid) => {
  const url = `/api/users/${username}/posts/${postid}/comments`;
  return myaxios.post(url, comment);
};

//
//http://localhost:8080/api/users/anshu/posts/14
export const DeletePostByPostIdFunc = (username, postid) => {
  const url = `/api/users/${username}/posts/${postid}`;
  return myaxios.delete(url).then((response) => {
    return response.data;
  });
};
