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
import StaticBtn from 'components/StaticBtn';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
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
import Toggle from 'components/BlogToggle';

// Author page sections
import Profile from "pages/LandingPages/Author/sections/Profile";
import Posts from "pages/LandingPages/Author/sections/Posts";
import Contact from "pages/LandingPages/Author/sections/Contact";
import Footer from "pages/LandingPages/Author/sections/Footer";
import Blogs from 'containers/Blogs';
import Category from 'components/Category';
import HostFilter from 'components/HostFilter';

import Spot from 'containers/Spot';
import Introduce from 'containers/Introduce';
import Banner from 'containers/Banner';
import Rank from 'containers/Rank';

//css
import "assets/css/main.css"
import CreateStep from 'containers/CreateStep';
import ApplyStep from 'containers/ApplyStep';

function Presentation() {

  const [isLogin, setIsLogin] = React.useState('')

  React.useEffect(()=>{
    console.log(sessionStorage.getItem('user_id'))
    if(sessionStorage.getItem('user_id') !== null){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  },[])

  /* ================= RENDER ================= */
  return (
    <div>
      <Header />
      <StaticBtn />
      <MKBox 
        height="960px"
        width="100%"
        id="banner_box">
          <Banner isLogin={isLogin}/>
      </MKBox>
      <MKBox
        bgColor="light"
        minHeight="400px"
        width="100%">
          <Introduce />
      </MKBox>
      <MKBox
        minHeight="1100px"
        width="100%">
          <CreateStep />
      </MKBox>
      <MKBox
        minHeight="650px"
        width="100%">
          <ApplyStep />
      </MKBox>
      <MKBox
        minHeight="1140px"
        width="100%">
          {/* <Category 
            categoryList={categoryList} 
            callback={categoryCallback} 
          />
          <Toggle 
            checked = {toggleChecked}
            setChecked={setToggleChecked}
          /> */}
          <Blogs />
      </MKBox>
      <MKBox
        minHeight="300px"
        width="100%">
          <Footer />
      </MKBox>
      
      {/* <Card
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
          callback={categoryCallback} 
        />
        <Toggle 
          checked = {toggleChecked}
          setChecked={setToggleChecked}
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
      </Card> */}
    </div>
  );
}

export default Presentation;
