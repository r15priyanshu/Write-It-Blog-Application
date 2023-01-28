import "./BaseComponent.css";
import React from "react";
import Footer from "./Footer";
import MyNavbar from "./MyNavbar";

function BaseComponent(props) {
  return (
    <>
      <div className="BaseComponent container-fluid p-0 m-0">
        <MyNavbar />
        {props.children}
        <Footer />
      </div>
    </>
  );
}

export default BaseComponent;
