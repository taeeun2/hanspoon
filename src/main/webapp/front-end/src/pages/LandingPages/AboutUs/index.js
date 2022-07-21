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
import { Link, useNavigate } from 'react-router-dom'

// @mui material components
import { Box } from '@mui/material';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// react-countup component
import CountUp from "react-countup";

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
import Blog from "components/Blog";
import Category from 'components/Category';
import Counters from "pages/Presentation/sections/Counters";
import PageHeader from 'components/PageHeader';
import DefaultCounterCard from 'examples/Cards/CounterCards/DefaultCounterCard';

function AboutUs() {

  const [activeCategory, setActiveCategory] = useState({"category_id": 0, "category_name": "신청내역"});
  const [postList, setPostList] = useState([]);
  const [visible, setVisible] = useState(8);
  const [userId, setUserId] = useState();
  const [isClicked, setIsClicked] = useState();
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState(0);
  const [spoonNum, setSpoonNum] = useState();
  const [spoonRank, setSpoonRank] = useState();
  const [gender, setGender] = useState();
  const [companyName, setCompanyName] = useState();
  const [department, setDepartment] = useState();
  const [position, setPosition] = useState();
  const [age, setAge] = useState();
  const [joinDuration, setJoinDuration] = useState();

  const CategoryType = [{
        category_id: 0,
        category_name: "신청내역",
    }, {
        category_id: 1,
        category_name: "지난모임",
    }, {
        category_id: 2,
        category_name: "작성이력",
    },
  ];
  
  //활성화된 Category 정보 받아오기
  const categoryCallback = (c) => {
    setActiveCategory(CategoryType[c]);
  };

  //더보기 버튼 클릭 이벤트
  const showMoreBlogs = () => {
    setVisible((preValue) => preValue + 8)
  }

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const handleTabClick = (list) => {
    setActiveTab(list.category_id);
    setActiveCategory(list);
  }


  /* ================= useEffect ================= */

  // 카테고리 탭 변경시 이벤트
  useEffect(() => {
    getMyPostList(activeCategory.category_id);
    }, [activeCategory]);

  //게시글 클릭시 이벤트
  const handleClick = (clickedId) => {
    setIsClicked(clickedId);
    navigate(`/detailPost/${clickedId}`)
  }

  useEffect(() => {
    setUserName(sessionStorage.getItem('user_name'))
    getUserInfo();
    console.log(postList[0])
  },[])

  const getMyPostList = (category_id) => {
    let user_id = sessionStorage.getItem('user_id');
    fetch(`http://172.27.1.33:8080/mypage/${category_id}?user=${user_id}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      setPostList(data);
    })
  }

  const getUserInfo = () => {
    let user_id = sessionStorage.getItem('user_id');
    fetch(`http://172.27.1.33:8080/mypage/userInfo?user=${user_id}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      setAge(data.age);
      setCompanyName(data.company_name);
      setDepartment(data.department_name);
      setGender(data.gender);
      setSpoonNum(data.spoon_num);
      setSpoonRank(data.spoon_rank);
      setJoinDuration(data.join_duration);
    })
  }


  return (
    <div className='my_page'>
      <PageHeader />
      <MKBox minHeight="320px" width="100%" className="banner"
              sx={{display: "grid", }}>
        <Grid container item direction="row" className='user_info_box'>
          <Grid item xs={12} lg={3} className="user_info">
            <h2 className='user_info_title'>{userName} 님</h2>
            <p className='user_info_sub'>{companyName}</p>
            <p className='user_info_sub'>{department} {position}</p>
            <p className='user_info_sub'>{age} {gender}</p>
            <Link to = "/editUser"><p className='info_link' style={{
                      "fontFamily": 'NanumSquareRound',
                      "fontSize" : '18px',
                      "color": '#217bff',
                      "cursor": 'pointer'}}>
                        개인정보 수정하기 ></p></Link>
          </Grid>
          <Grid item xs={12} lg={9}>
            <Grid container item direction="row" className="user_conunt_box">
              <Grid item xs={4} lg={4} className="user_conunt">
                <div className='count_icon1'><div className='count_title'>
                  숟가락 개수
                </div></div>
                <div className='count_num'>
                  <CountUp end={spoonNum} duration={1} />
                </div>
              </Grid>
              <Grid item xs={4} lg={4} className="user_conunt">
                <div className='count_icon2'><div className='count_title'>
                  숟가락 랭킹
                </div></div>
                <div className='count_num'>
                  <CountUp end={spoonRank} duration={1} />
                </div>
              </Grid>
              <Grid item xs={4} lg={4} className="user_conunt">
                <div className='count_icon3'><div className='count_title'>
                  한스푼과 함께 한 날
                </div></div>
                <div className='count_num'>
                  <CountUp end={joinDuration} duration={1} />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox minHeight="900px" component="section" width="100%" px={7}>
        <Grid container item justifyContent="center" alignItems="center" className='section_box'>
          <Grid container item className='tab_box' direction="row"
                xs={10} sm={8} lg={8}
                justifyContent="center" alignItems="center">
            {CategoryType.map((list) => (
              <Grid item xs={12} sm={12} lg={3} className='tab_box'>
                <div className={`tab ${activeTab == list.category_id ? 'active' : ''}`} 
                    onClick={() => handleTabClick(list)}
                >
                  {list.category_name}
                </div>
              </Grid>
            ))}
          </Grid>
          <Grid container item spacing={3} className="blog_list_box">
              {
                !(postList[0] === undefined) ?
                    postList.slice(0,visible).map((post, index) => (
                      <Grid item xs={12} sm={6} lg={3} key={index}>
                        <div onClick={() => {handleClick(post.post_id)}} className='blog_box'>
                          <Blog 
                            state = {post.state}
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
                    ))
                    : <Grid item xs={12} sm={12} lg={12} className='notice_text_box' >
                        <h3 className='notice_text'>해당 내역이 존재하지 않습니다.</h3>
                      </Grid>
              }

           
              {
                !(visible >= postList.length) &&
                <Grid item  xs={12} sm={12} lg={12}>
                  <Box display="flex" justifyContent="center">
                    <button type='button' className='btn_more' onClick={showMoreBlogs}>
                      더보기
                    </button>
                  </Box>
                </Grid> 
              }
            </Grid>             
        </Grid>
      </MKBox>
      <Footer />
    </div>
  );
}

export default AboutUs;
