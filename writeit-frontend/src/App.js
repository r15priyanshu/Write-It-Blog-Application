import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Profile from "./pages/Profile";
import PrivateRoute from "./pages/PrivateRoute";
import React from "react";
import Posts from "./pages/Posts";
import PublicPosts from "./pages/PublicPosts";
import FullPostView from "./pages/FullPostView";
import UserProvider from "./context/UserProvider";
import EditPost from "./pages/EditPost";
//using this we will pass userstate to every component
//export const UserContext = React.createContext();

function App() {
  return (
   <UserProvider>
      <div className="App">
        <BrowserRouter>
          <ToastContainer position="bottom-right" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts/:postid" element={<FullPostView />} />
            <Route
              path="/posts/category/:categoryname"
              element={<PublicPosts />}
            />
            <Route path="/user/:username" element={<PrivateRoute />}>
              <Route path="profile" element={<Profile />} />
              <Route path="addpost" element={<Posts />} />
              <Route path="editpost/:postid" element={<EditPost />} />
            </Route>
            <Route path="/*" element={<h1>NOT FOUND</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
