/* ---------- 마이페이지 ---------- */
/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useEffect, useState } from 'react';

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// About Us page sections
import Information from "pages/LandingPages/AboutUs/sections/Information";
import Team from "pages/LandingPages/AboutUs/sections/Team";
import Featuring from "pages/LandingPages/AboutUs/sections/Featuring";
import Newsletter from "pages/LandingPages/AboutUs/sections/Newsletter";
import Footer from "pages/LandingPages/Author/sections/Footer";

// Images
import bgImage from "assets/images/hanspoon/spoon-5.jpg";

import AppBar from 'components/AppBar';
import Blogs from 'containers/Blogs';
import Category from 'components/Category';
import Counters from "pages/Presentation/sections/Counters";

function AboutUs() {

  const [postList, setPostList] = useState([]);

  const CategoryType = [{
        category_id: 0,
        category_name: "신청내역"
    }, {
        category_id: 1,
        category_name: "지난모임"
    }, {
        category_id: 2,
        category_name: "작성이력"
    },
  ];

  /* ============임시 API============ */
  const getAllPostList = (category_id) => {
    fetch(`http://localhost:8080/post/all/${category_id}`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        setPostList(data);
      })
     }

     useEffect(() => {
      getAllPostList(0);
    }, []);
    /* =============================== */

  //활성화된 Category 정보 받아오기
  const categoryCallback = (c) => {
    console.log(c);
  };

  return (
    <>
      <AppBar />
      <MKBox
        minHeight="35vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "center" }}
          >
            <MKTypography
              variant="h2"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              마이페이지
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      {/* ==== 게시글(카드) 영역 ==== */}
      <Card
        sx={{
          p: 2,
          px: 7,
          mx: { xs: 2, lg: 5 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Counters />
        <Category 
          categoryList={CategoryType}
          callback={categoryCallback} />

        <MKBox bgColor="white">
          <Card
            sx={{
              p: 2,
              px: 5,
              mx: { xs: 2, lg: 3 },
              mt: 1,
              mb: 4,
              backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
            
            <Blogs post={postList}/>
          </Card>
          <Footer />
        </MKBox>
      </Card>
      {/* <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox> */}
    </>
  );
}

export default AboutUs;
