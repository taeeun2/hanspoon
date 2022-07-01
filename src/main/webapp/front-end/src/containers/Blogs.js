import React, { useEffect, useState } from 'react';
import { Col, Row } from "reactstrap";
import Blog from "components/Blog";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DetailPost from 'pages/LandingPages/DetailPost';
import { useNavigate } from 'react-router-dom';
  
const LIMIT = 10;

const Blogs = ({ category, post }) => {
 
    const [isClicked, setIsClicked] = useState();
    const navigate = useNavigate();


    //게시글 클릭시 이벤트
    const handleClick = (clickedId) => {
      setIsClicked(clickedId);
      navigate(`/detailPost/${clickedId}`)
    }

    // useEffect(() => {
    //   console.log(props.category);
    // }, []);


    return (
      <MKBox component="section" >
          {/* <Grid container item xs={12} lg={6}>
            <MKTypography variant="h3" mb={6}>
              Check my latest blogposts
            </MKTypography>
          </Grid> */}
          <Grid container spacing={3}>
            {post.map((post, index) => (
                <Grid item xs={12} sm={6} lg={3}>
                  <div onClick={() => {handleClick(post.post_id)}}>
                    <Blog 
                      key={index}
                      category={post.category.category_name}
                      date={post.meet_date}
                      title={post.title}
                      place={post.restaurant_name}
                      participantNum={post.participantNum}
                      capacity={post.capacity}
                      host={post.hostInfo.name}
                      spoon={post.spoon_num}
                      />
                  </div>
                </Grid>
              
            ))}
        </Grid>
      </MKBox>       
    );
}

export default Blogs;