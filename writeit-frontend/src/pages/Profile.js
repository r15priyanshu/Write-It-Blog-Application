import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, Table } from "reactstrap";
import BaseComponent from "../components/BaseComponent";
import { FetchUserDetailsFunc } from "../services/user-service";
import { BASEURL, DEFAULT_PROFILE_IMAGE_NAME } from "../services/helper";
import defaultprofileimage from "../images/default.png"

function Profile() {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    FetchUserDetailsFunc(username)
      .then((response) => {
        //console.log(response.data);
        setProfileData({ ...response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <BaseComponent>
      <div className="Profile container mt-4 mb-4" style={{minHeight:"500px"}}>
        <div className="row">
          <div className="col-md-8 offset-2">
            <Card>
              <CardBody>
                <h3 style={{ textAlign: "center" }}>User Profile Details</h3>
                <div className="container text-center mb-3">
                  {profileData && (
                    <img
                      src={profileData?.profilepic === DEFAULT_PROFILE_IMAGE_NAME?defaultprofileimage:`${BASEURL}/api/images/serveuserimage/${profileData?.username}`}
                      alt="Profile Picture"
                      height={"150px"}
                      width={"150px"}
                      className="img-fluid rounded-5"
                    />
                  )}
                </div>
                {profileData && (
                  <Table bordered striped className="text-center">
                    <tbody>
                      <tr>
                        <td>USER ID</td>
                        <td>USER{profileData.uid}</td>
                      </tr>
                      <tr>
                        <td>FULL NAME</td>
                        <td>{profileData.name}</td>
                      </tr>
                      <tr>
                        <td>USERNAME</td>
                        <td>{profileData.username}</td>
                      </tr>
                      <tr>
                        <td>ABOUT</td>
                        <td>{profileData.about}</td>
                      </tr>
                    </tbody>
                  </Table>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </BaseComponent>
  );
}

export default Profile;
