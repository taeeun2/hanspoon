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
            // <BrowserRouter>
            //  <Header />
            //  <Routes>
            //      <Route path="/" element={<Home/>}></Route>
            //      <Route path="/mypage/*" element={<MyPage/>}></Route>
            //      <Route path="/post/*" element={<Post/>}></Route>
            //      <Route path="/signin/*" element={<SignIn />}></Route>
            //      <Route path="/signup/*" element={<SignUp />}></Route>
            //      <Route path="*" element={<NotFound />}></Route>
            //  </Routes>
            // </BrowserRouter>
            
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              {/* {getRoutes(routes)} */}
              <Route path="/" element={<Presentation />} />
              <Route path="/mypage/*" element={<AboutUs/>} />
              <Route path="/post/*" element={<Post/>} />
              <Route path="/signin/*" element={<SignIn />} />
              <Route path="/signup/*" element={<SignUp />} />
              <Route path="/detailPost/:clickedId" element={<DetailPost />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ThemeProvider>
  );
}
export default App;