import React, { useEffect } from 'react';
import { Col, Row } from "reactstrap";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';

import AOS from "aos";
import "aos/dist/aos.css";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import { Link } from 'react-router-dom';
import AboutUs from 'pages/LandingPages/AboutUs';

const Banner = ({ isLogin }) => {

    useEffect(() => {
        AOS.init({
            duration : 1500
        });
    });

      //헤더 크기를 제외하고 페이지 내부 이동하기
    const handleClick = (e) => {
        console.log(e)
        console.log(e.target.parentElement)
        e.preventDefault()
        const target = e.target.parentElement.getAttribute('href');
        console.log(target)
        const location = document.querySelector(target).offsetTop;
        console.log(location)

        window.scrollTo({
            left:0,
            top:location - 60 //헤더의 크기만큼 빼준다.
        })
    } 

    const handleIsLogin = () => {
        if(isLogin) {
            document.location.href = '/mypage'
        }
        else {
            alert('로그인 후 이용 가능합니다.')
        }
    }

    return (
        <Grid className='banner'  id='banner'
                sx={{ py: 20, }}>
            {/* <Grid container className='inner'> */}
                <Box className='content_box' sx={{ justifyContent: 'center', height: '100%' }}>
                    <div className='banner_image_box'>
                        <ul className='banner_image_list'>
                            <li class="banner_img_item_01">
                                <div class="banner_img_01" ></div>
                            </li>
                            <li class="banner_img_item_02">
                                <div class="banner_img_02"></div>
                            </li>
                            <li class="banner_img_item_03">
                                <div class="banner_img_03"></div>
                            </li>
                        </ul>
                    </div>
                    <Grid item className='title_box'>
                        <Box className='sub_title_box'>
                            <h3 className='banner_sub_title' data-aos="fade-up">한끼 식사, 새로운 만남</h3>
                        </Box>
                        <Box className='main_title_box'>
                            <h1 className='banner_main_title' data-aos="fade-up">#HANSPOON</h1>
                        </Box>
                    </Grid>
                    <Grid className='btn_box'>
                        <a href="#blogs" onClick={handleClick}>
                            <button type="button" className='btn_join'  data-aos="fade-up">
                                한스푼 참여하기
                            </button>
                        </a>
                            <button type="button" className='btn_join' data-aos="fade-up"
                                    onClick={handleIsLogin}>
                                내 한스푼 현황
                            </button>
                    </Grid>
                </Box>
            {/* </Grid> */}
        </Grid>
    );
};

export default Banner;