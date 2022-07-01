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

// 메인화면 배너 이미지
import bgImage1 from "assets/images/hanspoon/banner-1.jpg";
import bgImage2 from "assets/images/hanspoon/banner-2.jpg";

import AppBar from 'components/AppBar';

// Author page sections
import Profile from "pages/LandingPages/Author/sections/Profile";
import Posts from "pages/LandingPages/Author/sections/Posts";
import Contact from "pages/LandingPages/Author/sections/Contact";
import Footer from "pages/LandingPages/Author/sections/Footer";
import Blogs from 'containers/Blogs';
import Category from 'components/Category';
import HostFilter from 'components/HostFilter';

//carousel css
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Presentation() {

    //캐러셀 설정값
    const settings = {
      slide: 'div',
      arrows : true, 
      infinite: true,
      speed: 600,
      autoplay : true,
      slidesToShow: 1,
      slidesToScroll: 1
    };

      const [categoryList, setCategoryList] = useState([]);
      const [postList, setPostList] = useState([]);
      const [activeCategory, setActiveCategory] = useState({});

      /* 카테고리 리스트 조회 API */
      const getCategoryList = () => {
        fetch('http://localhost:8080/category')
            .then(res => {
                return res.json()
            })
            .then(data => {
                setCategoryList(data); 
            })
        }

        /* 전체 게시글 리스트 조회 API */
        const getAllPostList = () => {
          fetch('http://localhost:8080/post/all')
            .then(res => {
              return res.json()
            })
            .then(data => {
              setPostList(data);
            })
        }

        /* 모집중인 게시글 리스트 조회 API */
        const getValidPostList = () => {
          fetch('http://localhost:8080/post/valid')
          .then(res => {
            return res.json()
          })
          .then(data => {
            setPostList(data);
          })
        }

        useEffect(() => {
          getCategoryList();
          getAllPostList();
        }, []);

    //활성화된 Category ID 받아오기
    const categoryCallback = (c) => {
      if(c != undefined) {
        setActiveCategory(categoryList[c]);
      } 
      // console.log(activeCategory);
    };

    //활성화된 HostFilter ID 받아오기
    const hostFilteryCallback = (h) => {
      // console.log(h);
    };

  return (
    <>
      <AppBar />
      <MKBox
        minHeight="35vh"
        width="100%"
        // sx={{
        //   backgroundImage: `url(${bgImage})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "top",
        //   display: "grid",
        //   placeItems: "center",
        // }}
      >
        {/* 캐러셀 */}
        <Slider {...settings}>
          <MKBox
            minHeight="35vh"
            width="100%"
            sx={{
            backgroundImage: `url(${bgImage1})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            display: "grid",
            placeItems: "center",
           }} />
          <MKBox
            minHeight="35vh"
            width="100%"
            sx={{
            backgroundImage: `url(${bgImage2})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            display: "grid",
            placeItems: "center",
           }} />
          {/* <div>
            <img src={bgImage}  />
          </div> */}
        </Slider>
      </MKBox>

     {/* ==== 게시글(카드) 영역 ==== */}
      <Card
        sx={{
          p: 2,
          px: 5,
          mx: { xs: 2, lg: 5 },
          mt: -6,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Category 
          categoryList={categoryList} 
          page="Main" 
          callback={categoryCallback} 
        />

        <HostFilter 
          callback={categoryCallback}
        />

        <MKBox bgColor="white" mt={2}>
          <Card
            sx={{
              p: 2,
              px: 3,
              mx: { xs: 2, lg: 3 },
              mt: 1,
              mb: 4,
              backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
            <Blogs category={activeCategory} post={postList}/>
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
