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
import styled from "styled-components";

const Header = () => {

  const [isOpen, setIsOpen] = React.useState(false);

  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };


  // ============ 추가 ==============
  const [isLogin, setIsLogin] = useState(false)

	useEffect(()=>{
		if(sessionStorage.getItem('user') === null){
			console.log('isLogin ?? :: ',isLogin)
		} else{
			setIsLogin(true)
			console.log('isLogin ?? :: ',isLogin)
		}	
	})

    const onLogout = () => {
        console.log(isLogin);
        sessionStorage.removeItem('user')
        setIsLogin(false)
        // document.location.href = '/'
    }
  // ================================

  return (
    // <Navbar id="header" color="primary" dark expand="md">
    //   <div className="d-flex align-items-center">
    //     <NavbarBrand href="/" className="d-lg-none">
    //       <LogoWhite />
    //     </NavbarBrand>
    //   </div>
    //   <div className="hstack gap-2">
    //     <Button
    //       color="primary"
    //       size="sm"
    //       className="d-sm-block d-md-none"
    //       onClick={Handletoggle}
    //     >
    //       {isOpen ? (
    //         <i className="bi bi-x"></i>
    //       ) : (
    //         <i className="bi bi-three-dots-vertical"></i>
    //       )}
    //     </Button>
    //   </div>

    //   <Collapse navbar isOpen={isOpen}>
    //     <Nav className="me-auto" navbar>
    //       <NavItem>
    //         <Link to="/" className="nav-link">
    //           Hanspoon
    //         </Link>
    //       </NavItem>
    //       <NavItem>
    //         {isLogin && <Link to="/mypage" className="nav-link">
    //           마이페이지
    //         </Link>}
            
    //       </NavItem>
    //       <NavItem>
           
    //         {isLogin ?  < Button style={{
    //          "border":"none"
    //         }} onClick={onLogout}>로그아웃</Button>: <Link to="/signin" className="nav-link">
    //           로그인
    //         </Link>}  
    //       </NavItem>
    //     </Nav>
    //   </Collapse>
    // </Navbar>

    <div>
      <div className="container">
        <div id="header" className="scroll">
          <div className="inner">
            <h1>
              <Link to="/" className="logo">
                <span className="blind">Hanspoon</span>
              </Link>
            </h1>
            <div className="gnb_box">
              <ul className="gnb_list">
                <a href="#introduce">
                  <li className="gnb_item">
                    <span style={{
                      "fontFamily": 'NanumSquareRound',
                      "fontWeight" : 'bold'}}>한스푼이란?
                    </span>
                  </li>
                </a>
                <a  href="#step">
                  <li className="gnb_item">
                    <span style={{
                      "fontFamily": 'NanumSquareRound',
                      "fontWeight" : 'bold'}}>참여방법
                    </span>
                  </li>
                </a> 
                <a href="#blogs">
                  <li className="gnb_item">
                    <span style={{
                      "fontFamily": 'NanumSquareRound',
                      "fontWeight" : 'bold'}}>함께하는 한스푼
                    </span>
                  </li>
                </a>
                <a href="#rank">
                  <li className="gnb_item">
                    <span style={{
                      "fontFamily": 'NanumSquareRound',
                      "fontWeight" : 'bold'}}>인기순위
                    </span>
                  </li>
                </a>
              </ul>
            </div>

            {/* (태은님) 로그인, 회원가입 */}
            <div className="nav_box"> 
              <ul className="gnb_list">
                <li className="gnb_item">
                  <span style={{
                    "fontFamily": 'NanumSquareRound',
                    "fontWeight" : 'bold'}}>회원가입
                  </span>
                </li>
                <li className="gnb_item">
                  <span style={{
                    "fontFamily": 'NanumSquareRound',
                    "fontWeight" : 'bold'}}>로그인
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
