import React, { useState } from 'react';
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

const Blogs = () => {

    const BlogData = [
        {
            post_id: 1,
            category: "한식",
            date: "2022.06.15",
            title: "나랑 밥 먹을 사람?",
            place: "고씨네 카레",
            participantNum: "2",
            capacity: "4",
            host: "익명",
            spoon: "3"
        },
    ];

    //테스트 데이터
    for (let index = 0; index < 20; index++) {
        BlogData.push({
            post_id: 2 + index,
            category: "한식",
            date: "2022.06.15",
            title: "나랑 밥 먹을 사람?"+index,
            place: "고씨네 카레",
            participantNum: "2",
            capacity: "4",
            host: "익명",
            spoon: "3"
        })        
    }
 
    const [isClicked, setIsClicked] = useState();
    const navigate = useNavigate();


    //게시글 클릭시 이벤트
    const handleClick = (clickedId) => {
      setIsClicked(clickedId);
      navigate(`/detailPost/${clickedId}`)
      console.log(clickedId);
    }


    return (
      <MKBox component="section" >
        <Container>
          {/* <Grid container item xs={12} lg={6}>
            <MKTypography variant="h3" mb={6}>
              Check my latest blogposts
            </MKTypography>
          </Grid> */}
          <Grid container spacing={3}>
            {BlogData.map((blog, index) => (
                <Grid item xs={12} sm={6} lg={3}>
                  <div onClick={() => {handleClick(blog.post_id)}}>
                    <Blog 
                      key={index}
                      category={blog.category}
                      date={blog.date}
                      title={blog.title}
                      place={blog.place}
                      participantNum={blog.participantNum}
                      capacity={blog.capacity}
                      host={blog.host}
                      spoon={blog.spoon}
                      />
                  </div>
                </Grid>
            ))}

          </Grid>
         
        </Container>
      </MKBox>       
    );
}

export default Blogs;