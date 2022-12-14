import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from 'components/Header';
import Home from 'pages/Home';
import AboutUs from 'pages/LandingPages/AboutUs';
import MyPage from 'pages/MyPage';
import SignIn from 'pages/LandingPages/SignIn';
import SignUp from 'pages/LandingPages/SignUp';
import NotFound from 'pages/NotFound';
//import SignInBasic from 'pages/example/SignInBasic';
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// Material Kit 2 React themes
import theme from "assets/theme";
import Presentation from "pages/Presentation/index";
// Material Kit 2 React routes
import routes from "routes";
import Author from 'pages/LandingPages/Author';
import Post from 'pages/LandingPages/Post';
import DetailPost from 'pages/LandingPages/DetailPost';
import SignInTest from 'pages/SignInTest';
import SignUpTest from 'pages/SignUpTest';
import CreatePostTest from 'pages/CreatePostTest';
import FindPw from 'pages/FindPw';
import EditUser from 'pages/EditUser';
import EditUserConfirm from 'pages/LandingPages/EditUserConfirm';

const App = () => {
    const { pathname } = useLocation();
    // Setting page scroll to 0 when changing the route
    useEffect(() => {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }, [pathname]);
    const getRoutes = (allRoutes) =>
      allRoutes.map((route) => {
        if (route.collapse) {
          return getRoutes(route.collapse);
        }
        if (route.route) {
          return <Route exact path={route.route} element={route.component} key={route.key} />;
        }
        return null;
      });
  return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              {/* {getRoutes(routes)} */}
              <Route path="/" element={<Presentation />} />
              <Route path="/mypage/*" element={<AboutUs/>} />
              <Route path="/post/*" element={<Post/>} />
              <Route path="/detailPost/:clickedId" element={<DetailPost />} />
      
              <Route path='/findPW' element = {<FindPw/>}/>
              <Route path="/signin/*" element={<SignInTest />} />
              <Route path="/signup/*" element={<SignUpTest />} />
               {/* TEST */}
              <Route path="/editUser/*" element={<EditUserConfirm/>}/>
              <Route path="/postTest/*" element={<CreatePostTest/>}/>
            


              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ThemeProvider>
  );
}
export default App;