import React, { useEffect, useState } from "react";
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

const Header = () => {

 

  const [isOpen, setIsOpen] = React.useState(false);

  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };


  // ============ 추가 ==============
  const [isLogin, setIsLogin] = useState(false)

	useEffect(()=>{
		if(sessionStorage.getItem('user_id') === null){
			console.log('isLogin ?? :: ',isLogin)
		} else{
			setIsLogin(true)
			console.log('isLogin ?? :: ',isLogin)
		}	
	})

    const onLogout = () => {
        console.log(isLogin);
        sessionStorage.removeItem('user_id')
        setIsLogin(false)
        // document.location.href = '/'
    }
  // ================================

  return (
    <Navbar color="primary" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <LogoWhite />
        </NavbarBrand>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/" className="nav-link">
              Hanspoon
            </Link>
          </NavItem>
          <NavItem>
            {isLogin && <Link to="/mypage" className="nav-link">
              마이페이지
            </Link>}
            
          </NavItem>
          <NavItem>
           
            {isLogin ?  < Button style={{
             "border":"none"
            }} onClick={onLogout}>로그아웃</Button>: <Link to="/signin" className="nav-link">
              로그인
            </Link>}  
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
