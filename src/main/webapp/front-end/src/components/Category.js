import { useEffect, useState } from "react";

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

  const [activeTab, setActiveTab] = useState(0);

  const handleTabType = (event, newValue) => {
      setActiveTab(newValue);
      callback(newValue);
  }

  //mount시 activeTab Id 전달
  useEffect(()=>{
    callback(activeTab); }
    , []);

  //메인 화면에서만 토글(모집 중만 보기) 활성화
  let toggle;
  if(page == "Main"){
    toggle = <BlogToggle />;
  } else {
    toggle = null;
  }

  return (      
    <MKBox component="section" py={3} px={3}>
        <Container>
          <Grid container>
              <Grid item xs={12} lg={7}>
                  <Box sx={{ width: '80%' }}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <AppBar position="static">
                          <Tabs value={activeTab} onChange={handleTabType}>
                            {categoryList.map((type) => (
                            <Tab 
                              label={type.Name}
                              className={activeTab == type.Id ? 'active' : ''} 
                              onClick={() => setActiveTab(type.Id)} 
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
        </Container>
    </MKBox>        
    );
};

export default Category;