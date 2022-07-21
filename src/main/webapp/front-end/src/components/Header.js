import React, { useEffect, useState } from "react";
import "assets/css/common.css"
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  Button,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "assets/images/logos/xtremelogowhite.svg";
import styled, { ServerStyleSheet } from "styled-components";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

const Header = () => {

  // const [userName, setUserName] = useState(sessionStorage.getItem('user_name'));
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  }

  useEffect(()=>{
    window.addEventListener('scroll', updateScroll);
  });

  const handleLogoClick = () => {
    window.scrollTo({
      left:0,
      top:0 
    })
  }

  //헤더 크기를 제외하고 페이지 내부 이동하기
  const handleClick = (e) => {
    e.preventDefault()
    const target = e.target.parentElement.getAttribute('href');
    const location = document.querySelector(target).offsetTop;

    window.scrollTo({
      left:0,
      top:location - 60 //헤더의 크기만큼 빼준다.
    })
  }


  // ============ 추가 ==============
  const [isLogin, setIsLogin] = useState(false)

	useEffect(()=>{
		if(sessionStorage.getItem('user_id') === null){
			// console.log('isLogin ?? :: ',isLogin)
		} else{
			setIsLogin(true)
			// console.log('isLogin ?? :: ',isLogin)
		}	
	})

    const onLogout = () => {
        sessionStorage.removeItem('user_id')
        sessionStorage.removeItem('user_name')
        sessionStorage.removeItem('spoon_num')
        setIsLogin(false)
        document.location.href = '/'
    }
  // ================================

  return (

    <Grid className={scrollPosition < 300 ? "top_header" : "change_header"} 
          id="main_header" sx={{ py: 20, }} width='100%'>
      <Box className="header_box">
        <Grid container  direction="row" justifyContent="space-between" alignItems="center">
          <Grid item className="logo_box">
              <h1>
                <Link to="/" className="logo" onClick={handleLogoClick}>
                  <span className="logo_text">Hanspoon</span>
                </Link>
              </h1>
          </Grid>
          <Grid item className="gnb_box">
            <Grid container  direction="row" className="gnb_list" width='100%'>
              <Grid item className="gnb_item_box">
                <a href="#introduce" onClick={handleClick}>
                  <span className="gnb_item" id="introduce_gnb_item1">
                    한스푼이란?
                  </span>
                </a>
              </Grid>
              <Grid item className="gnb_item_box" >
                <a  href="#create_step"  onClick={handleClick}>
                  <span className="gnb_item">
                    모임 생성 방법
                  </span>
                </a>
              </Grid> 
              <Grid item className="gnb_item_box">
                <a href="#apply_step" onClick={handleClick}>
                  <span className="gnb_item">
                    모임 참여 방법
                  </span>
                </a>
              </Grid>
              <Grid item className="gnb_item_box">
                <a href="#blogs"  onClick={handleClick}>
                  <span className="gnb_item">
                  모임 리스트
                  </span>
                </a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className="user_box">
            <Grid container className="gnb_list">
                {isLogin ? 
               <> <Grid item className="gnb_item">
               <span style={{
                 "fontFamily": 'NanumSquareRound',
                 "fontWeight" : 'bold'}}>{sessionStorage.getItem('user_name')} 님</span></Grid>
                 <Grid item className="gnb_item">
               <span style={{
                 "fontFamily": 'NanumSquareRound',
                 "fontWeight" : 'bold',
                 "cursor": 'pointer'}} onClick = {onLogout}>로그아웃</span></Grid>
                 </>
                :  <>
                <Link to ="signup">
                <Grid item className="gnb_item">
                  <span style={{
                    "fontFamily": 'NanumSquareRound',
                    "fontWeight" : 'bold'}}>회원가입
                  </span>
                </Grid>
                </Link>
                <Link to ="signin">
                <Grid item className="gnb_item">
                  <span style={{
                    "fontFamily": 'NanumSquareRound',
                    "fontWeight" : 'bold'}}>로그인
                  </span>
                </Grid>
                </Link></>}
              </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>

    // <div>
    //   <div className="container">
    //     <div id="header">
    //       <div className="inner">
    //         <h1>
    //           <Link to="/" className="logo">
    //             <span className="blind">Hanspoon</span>
    //           </Link>
    //         </h1>
    //         <div className="gnb_box">
    //           <ul className="gnb_list">
    //             <a href="#introduce" onClick={handleClick}>
    //               <li className="gnb_item">
    //                 <span style={{
    //                   "fontFamily": 'NanumSquareRound',
    //                   "fontWeight" : 'bold'}}>한스푼이란?
    //                 </span>
    //               </li>
    //             </a>
    //             <a  href="#create_step"  onClick={handleClick}>
    //               <li className="gnb_item">
    //                 <span style={{
    //                   "fontFamily": 'NanumSquareRound',
    //                   "fontWeight" : 'bold'}}>모임 생성 방법
    //                 </span>
    //               </li>
    //             </a> 
    //             <a href="#apply_step"  onClick={handleClick}>
    //               <li className="gnb_item">
    //                 <span style={{
    //                   "fontFamily": 'NanumSquareRound',
    //                   "fontWeight" : 'bold'}}>모임 참여 방법
    //                 </span>
    //               </li>
    //             </a>
    //             <a href="#blogs"  onClick={handleClick}>
    //               <li className="gnb_item">
    //                 <span style={{
    //                   "fontFamily": 'NanumSquareRound',
    //                   "fontWeight" : 'bold'}}>모임 리스트
    //                 </span>
    //               </li>
    //             </a>
    //           </ul>
    //         </div>

            
    //         <div className="nav_box"> 
    //           <ul className="gnb_list">
    //             {isLogin ? 
    //            <> <li className="gnb_item">
    //            <span style={{
    //              "fontFamily": 'NanumSquareRound',
    //              "fontWeight" : 'bold'}}>{userName} 님 환영합니다.(🥄{spoonNum})</span></li>
    //              <li className="gnb_item">
    //            <button style={{
    //              "fontFamily": 'NanumSquareRound',
    //              "fontWeight" : 'bold'}} onClick = {onLogout}>로그아웃</button></li>
    //              </>
    //             :  <>
    //             <Link to ="/signup">
    //             <li className="gnb_item">
    //               <span style={{
    //                 "fontFamily": 'NanumSquareRound',
    //                 "fontWeight" : 'bold'}}>회원가입
    //               </span>
    //             </li>
    //             </Link>
    //             <Link to ="/signin">
    //             <li className="gnb_item">
    //               <span style={{
    //                 "fontFamily": 'NanumSquareRound',
    //                 "fontWeight" : 'bold'}}>로그인
    //               </span>
    //             </li>
    //             </Link></>}
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div> 
  );
};

export default Header;
