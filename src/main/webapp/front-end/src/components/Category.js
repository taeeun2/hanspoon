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

const Category = ({ categoryList, callback }) => {

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

  return (      
    <MKBox component="section" className="category">
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <AppBar position="static">
                  <Tabs value={activeTab}>
                    {categoryList.map((list) => (
                      <Tab 
                        key={list.category_id}
                        label={list.category_name}
                        className={`selectTab ${activeTab == list.category_id ? 'active' : ''}`} 
                        onClick={() => handleTabClick(list.category_id)}
                        style={{
                          "fontFamily": 'NanumSquareRound',
                          "fontWeight" : 'bold',
                          "fontSize": '25px'
                          }}
                      />
                    ))}
                  </Tabs>
                </AppBar>
              </Box>
            </Box>
          </Grid>
        </Grid>
    </MKBox>        
    );
};

export default Category;