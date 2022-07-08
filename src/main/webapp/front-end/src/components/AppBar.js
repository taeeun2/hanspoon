import * as React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MKButton from './MKButton';

const pages = [
    {
        name: '마이페이지', 
        route: '/mypage',
    },
    {
        name: '로그인',
        route: '/signin',
    }];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  // 로그인 여부로 헤더 다르게 보여주기
  const [isLogin, setIsLogin] = React.useState('')

  React.useEffect(()=>{
    console.log(sessionStorage.getItem('user_id'))
    if(sessionStorage.getItem('user_id') !== null){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  },[])
  const onLogout = () => {
        console.log(isLogin);
        sessionStorage.removeItem('user_id')
        setIsLogin(false)
        document.location.href = '/'
    }

  //==================================

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toolbarStyle = {
    minHeight: '80px',
  };

  return (
    <AppBar style={toolbarStyle} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h2"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Hanspoon
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={page.route}>
                        {page.name}
                    </Link>
                    
                 </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Roboto',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Hanspoon
          </Typography>
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

          </Box>
          <Box sx={{ flexGrow: 0 }}>
             {isLogin ? <Button onClick={onLogout}sx={{ color: 'white', display: 'block' }}>
                  로그아웃</Button> : <Button sx={{  color: 'white', display: 'block' }}>
                    <Link to = "/signin"> 로그인 </Link></Button>}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLogin ? <Button sx={{  color: 'white', display: 'block' }}
              ><Link to = "/mypage"> 마이페이지 </Link></Button>: <Button sx={{  color: 'white', display: 'block' }}>
              <Link to = "/signin"> 마이페이지 </Link></Button>}
          </Box>
          

          <Box sx={{ flexGrow: 0 }}>
          {isLogin ? 
            <Button>
                <Link to="/post">
                    모임생성
                </Link>
            </Button>: <Button sx={{  color: 'white', display: 'block' }}>
                    <Link to = "/signin"> 모임생성 </Link></Button>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
