import { useEffect, useState } from "react";
import * as React from 'react';

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from '@mui/material/Box';

// Material Kit 2 React components
import MKBox from "components/MKBox";

import BlogToggle from 'components/BlogToggle';

const Category = ({ categoryList, page, callback }) => {

  const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (event, newValue) => {
      setActiveTab(newValue);
      callback(newValue);
  }

  const handleTabClick = (category_id) => {
      setActiveTab(category_id);
      callback(category_id);
  }

  //mount시 activeTab Id 전달
  // useEffect(()=>{
  //   callback(activeTab); }
  //   , []);

  //메인 화면에서만 토글(모집 중만 보기) 활성화
  let toggle;
  if(page == "Main"){
    toggle = <BlogToggle />;
  } else {
    toggle = null;
  }

  return (      
    <MKBox component="section" py={3} px={3}>
      <Grid container>
        <Grid item xs={12} lg={7}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <AppBar position="static">
                  <Tabs value={activeTab}>
                    {categoryList.map((list) => (
                      <Tab 
                        key={list.category_id}
                        label={list.category_name}
                        className={activeTab == list.category_id ? 'active' : ''} 
                        onClick={() => handleTabClick(list.category_id)}
                      />
                    ))}
                  </Tabs>
                </AppBar>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={5}>
            <Box sx={{ width: '100%', justifyContent: 'flex-end' }} >
              {toggle}
            </Box>
          </Grid>
        </Grid>
    </MKBox>        
    );
};

export default Category;