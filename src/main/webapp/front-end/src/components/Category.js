import { type } from '@testing-library/user-event/dist/type';
import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

//Tabs
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
    /* children: TabPanel내용, value: 탭 인덱스*/
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const Category = ({ categoryList }) => {

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [activeTab, setActiveTab] = useState(0);
    // const [category, setCategory] = useState([props.categoryList]);
    const [cardData, setCardData] = useState([]);

    return (      
    <MKBox component="section" py={3} mb={8}>
      <Container>
        <Grid container item xs={12} lg={9} sx={{ mx: "auto" }}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        {categoryList.map((type, index) => (
                            <Tab label={type.Name} {...a11yProps(index)} 
                                className={activeTab == index+1 ? 'active' : ''} onClick={() => setActiveTab(index+1)} />
                        ))}
                    </Tabs>
                </Box>
                {/* <TabPanel value={value} index={0}>
                    {value}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {value}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {value}
                </TabPanel> */}
            </Box>
        </Grid>
      </Container>
    </MKBox>        
    );
};

export default Category;