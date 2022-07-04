import React, { useEffect, useState } from 'react';
import { Col, Row } from "reactstrap";
import Blog from "components/Blog";
import AOS from "aos";
import "aos/dist/aos.css";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DetailPost from 'pages/LandingPages/DetailPost';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
  
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

    useEffect(() => {
      AOS.init({
          duration : 3000
      });
     });

    return (
      <Grid className='blogs' id='blogs'>
        <Box className='content_box'>
          <Grid item className='title_box'>
            <h2 className='main_title' data-aos="fade-up">함께하는 한스푼</h2>
          </Grid>
          <MKBox component="section" >
              {/* <Grid container item xs={12} lg={6}>
                <MKTypography variant="h3" mb={6}>
                  Check my latest blogposts
                </MKTypography>
              </Grid> */}
              <Grid container spacing={3}>
                {post.map((post, index) => (
                    <Grid item xs={12} sm={6} lg={3} key={index} data-aos="fade-up">
                      <div onClick={() => {handleClick(post.post_id)}}>
                        <Blog 
                          category={post.category.category_name}
                          date={post.meet_date}
                          title={post.title}
                          place={post.restaurant_name}
                          participantNum={post.participant_num}
                          capacity={post.capacity}
                          host={post.hostInfo.name}
                          spoon={post.spoon_num}
                          />
                      </div>
                    </Grid>
                ))}
            </Grid>
          </MKBox>  
        </Box>
      </Grid>

    );
}

export default Blogs;