import React from 'react';
import { Col, Row } from "reactstrap";
import Blog from "components/Blog";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
  
const LIMIT = 10;

const Blogs = () => {

    const BlogData = [
        {
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


    return (
        // <div id='blogs'>
        //     <Row>
        //         {BlogData.map((blg, index) => (
        //         <Col sm="6" lg="6" xl="3" key={index}>
        //         <Blog
        //             category={blg.category}
        //             date={blg.date}
        //             title={blg.title}
        //             place={blg.place}
        //             participantNum={blg.participantNum}
        //             capacity={blg.capacity}
        //             host={blg.host}
        //             spoon={blg.spoon}
        //         />
        //         </Col>
        //          ))}
        //     </Row> 
        // </div>    
        <MKBox component="section" py={2}>
        <Container>
          <Grid container item xs={12} lg={6}>
            {/* 제목
            <MKTypography variant="h3" mb={6}>
              Check my latest blogposts
            </MKTypography> */}
          </Grid>
          <Grid container spacing={3}>
            {BlogData.map((blog, index) => (
                <Grid item xs={12} sm={6} lg={3}>
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
                </Grid>
            ))}
          </Grid>
        </Container>
      </MKBox>       
    );
}

export default Blogs;