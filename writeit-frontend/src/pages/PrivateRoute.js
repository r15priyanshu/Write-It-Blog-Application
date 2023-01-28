import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import UserContext from '../context/UserContext';

function PrivateRoute() {
  const {userState}=useContext(UserContext)
  //console.log(userState);
  return userState.loggedIn?<Outlet/>:<Navigate to={"/login"}/>
}

export default PrivateRoute