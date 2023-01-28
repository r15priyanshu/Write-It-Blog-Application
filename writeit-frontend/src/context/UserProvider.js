import React, { useState,useEffect } from "react";
import UserContext from "./UserContext";
import { getLoggedInUserDetails,isLoggedIn } from "../services/helper";

function UserProvider(props) {
  const [userState, setUserState] = useState({data:getLoggedInUserDetails(),loggedIn:isLoggedIn()});
  return (
    <UserContext.Provider value={{ userState, setUserState}}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
