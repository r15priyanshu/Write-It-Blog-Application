import "./PublicPosts.css";
import React, { useEffect, useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
  Card,
} from "reactstrap";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import BaseComponent from "../components/BaseComponent";
import { LoadAllCategoriesFunc } from "../services/category-service";
import {
  LoadAllPostsByCategoryFunc,
  DeletePostByPostIdFunc,
} from "../services/post-service";
import PostView from "../components/PostView";
import { CustomTextColorWrapper } from "../services/helper";
function PublicPosts(props) {
  const { categoryname } = useParams();
  const [categories, setCategories] = useState([]);
  const [postContent, setPostContent] = useState({});
  const [mostrecentfirst, SetMostrecentfirst] = useState(true);

  //console.log(categoryname);
  useEffect(() => {
    showAndChangeContent(0, 3);
  }, [categoryname]);

  useEffect(() => {
    //console.log("INSIDE EFFECT OF LOAD CATEGORIES");
    LoadAllCategoriesFunc()
      .then((data) => {
        //console.log(data);
        setCategories([...data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function showAndChangeContent(pagenumber, pagesize) {
    //console.log(pagenumber);
    LoadAllPostsByCategoryFunc(
      categoryname,
      pagenumber,
      pagesize,
      mostrecentfirst
    )
      .then((data) => {
        //console.log(data);
        setPostContent({ ...data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handlePostDelete(username, postid) {
    //console.log(username, postid);
    DeletePostByPostIdFunc(username, postid)
      .then((response) => {
        toast.success("Post Deleted Successfully!!");
        showAndChangeContent(0, 3);
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  return (
    <BaseComponent>
      <div className="PublicPosts container-fluid m-0"  style={{minHeight:"500px"}}>
        <div className="row">
          <div className="col-md-2">
            <div className="container mt-3 mb-3">
              <ListGroup>
                <ListGroupItem disabled>
                  <CustomTextColorWrapper>
                    <b>CATEGORY</b>
                  </CustomTextColorWrapper>
                </ListGroupItem>
                <ListGroupItem tag={Link} to={`/posts/category/All`}>
                  All
                </ListGroupItem>
                {categories.map((category) => {
                  return (
                    <ListGroupItem
                      key={category.cid}
                      tag={Link}
                      to={`/posts/category/${category.name}`}
                    >
                      {category.name}
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </div>
          </div>
          <div className="col-md-10">
            <div className="container mt-3 mb-3">
              <Container className="mt-2 mb-2 text-center">
                <Card>
                  <h2>Total Posts ( {postContent?.totalposts} )</h2>
                </Card>
              </Container>
              <div className="row">
                {postContent.posts?.map((post) => {
                  return (
                    <div key={post.pid} className="col-md-4">
                      <PostView
                        post={post}
                        handlePostDelete={handlePostDelete}
                      />
                    </div>
                  );
                })}
              </div>

              {postContent?.posts?.length > 0 && (
                <>
                  <div className="container">
                    <Pagination>
                      <PaginationItem
                        onClick={() => {
                          if (postContent.currentpage > 0)
                            showAndChangeContent(
                              postContent.currentpage - 1,
                              3
                            );
                        }}
                      >
                        <PaginationLink previous></PaginationLink>
                      </PaginationItem>

                      {Array.from({ length: postContent.totalpage }).map(
                        (item, index) => {
                          return (
                            <PaginationItem
                              key={index}
                              active={postContent.currentpage === index}
                              onClick={() => showAndChangeContent(index, 3)}
                            >
                              <PaginationLink>{index}</PaginationLink>
                            </PaginationItem>
                          );
                        }
                      )}

                      <PaginationItem
                        onClick={() => {
                          if (
                            postContent.currentpage <
                            postContent.totalpage - 1
                          )
                            showAndChangeContent(
                              postContent.currentpage + 1,
                              3
                            );
                        }}
                      >
                        <PaginationLink next></PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </BaseComponent>
  );
}

export default PublicPosts;
