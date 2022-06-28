/* ---------- 메인 화면 ---------- */
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
import Header from 'components/Header';
import React, { useEffect, useState } from 'react';
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKSocialButton from "components/MKSocialButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Images
import bgImage from "assets/images/hanspoon/hanspoon-main-bg-2.jpg";

import AppBar from 'components/AppBar';

// Author page sections
import Profile from "pages/LandingPages/Author/sections/Profile";
import Posts from "pages/LandingPages/Author/sections/Posts";
import Contact from "pages/LandingPages/Author/sections/Contact";
import Footer from "pages/LandingPages/Author/sections/Footer";
import Blogs from 'containers/Blogs';
import Category from 'components/Category';

function Presentation() {

      const CategoryType = [{
            Id: 1,
            Name: "전체"
        }, {
            Id: 2,
            Name: "한식"
        }, {
            Id: 3,
            Name: "중식"
        }, {
            Id: 4,
            Name: "양식"
        }, {
            Id: 5,
            Name: "기타"
        }
    ];

      /* 카테고리 리스트 조회 API */
      // const [category, setCategory] = useState(all);

      // const getCategory = () => {
      //   fetch('http://localhost:8080/main/category')
      //       .then(res => {
      //           return res.json()
      //       })
      //       .then(data => {
      //           setCategory([...category, {data}])
      //       })
      //   }

      //   useEffect(() => {
      //     getCategory();
      //   }, []);

    //테스트 데이터
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

    for (let index = 0; index < 100; index++) {
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
    <>
      <AppBar />
      <MKBox
        minHeight="50vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
      </MKBox>

     {/* ==== 게시글(카드) 영역 ==== */}
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Category categoryList={CategoryType} />
        <MKBox bgColor="white">
          <Card
            sx={{
              p: 2,
              mx: { xs: 2, lg: 3 },
              mt: -8,
              mb: 4,
              backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
            <Blogs />
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

export default Presentation;
