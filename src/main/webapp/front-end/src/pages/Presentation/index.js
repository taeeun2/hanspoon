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
import Step from 'containers/Step';

function Presentation() {

  const [categoryList, setCategoryList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [activeCategory, setActiveCategory] = useState({"category_id": 0, "category_name": "전체"});
  const [toggleChecked, setToggleChecked] = useState(true);

    //활성화된 Category ID 받아오기
    const categoryCallback = (c) => {
      setActiveCategory(categoryList[c]);
    };

    //토글 상태(전체보기/모집 중만 보기)에 따른 API 호출하기
    const handlePostApi = () => {
      if(toggleChecked){ //모집 중만 보기
        getValidPostList(activeCategory.category_id);
      }
      else {
        console.log(activeCategory);
        getAllPostList(activeCategory.category_id); //전체 보기
      }
    }
    /* ================= fetch ================= */

    // 카테고리 리스트 조회 API
    const getCategoryList = () => {
      fetch('http://localhost:8080/category')
        .then(res => {
          return res.json()
        })
        .then(data => {
          setCategoryList(data); 
        })
    }

    // 카테고리별 전체 게시글 리스트 조회 API
     const getAllPostList = (category_id) => {
     fetch(`http://localhost:8080/post/all/${category_id}`)
       .then(res => {
         return res.json()
       })
       .then(data => {
         setPostList(data);
       })
      }

     // 카테고리별 모집중인 게시글 리스트 조회 API 
     const getValidPostList = (category_id) => {
      fetch(`http://localhost:8080/post/valid/${category_id}`)
        .then(res => {
            return res.json()
          })
        .then(data => {
          setPostList(data);
        })
      }

    /* ================= useEffect ================= */

    // Mount 이벤트(카테고리 리스트 및 모집중인 전체 게시글 리스트 가져오기)
    useEffect(() => {
      getCategoryList();
      getValidPostList(0);
    }, []);

    // 카테고리 탭 변경시 이벤트
    useEffect(() => {
      if(activeCategory != undefined){
        handlePostApi();
      } 
      }, [activeCategory]);
    
    //토글 변경시 이벤트
      useEffect(() => {
        handlePostApi();
      },[toggleChecked]);

  /* ================= RENDER ================= */
  return (
    <>
      <Header />
      <MKBox 
        height="960px"
        width="100%">
          <Banner />
      </MKBox>
      <MKBox
        bgColor="light"
        minHeight="400px"
        width="100%">
          <Introduce />
      </MKBox>
      <MKBox
        minHeight="600px"
        width="100%">
          <Step />
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
          <Blogs category={activeCategory} post={postList}/>
      </MKBox>
      <MKBox
        minHeight="650px"
        width="100%">
          <Rank />
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
    </>
  );
}

export default Presentation;
