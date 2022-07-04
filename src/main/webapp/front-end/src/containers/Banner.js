import React, { useEffect } from 'react';
import { Col, Row } from "reactstrap";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';

import AOS from "aos";
import "aos/dist/aos.css";

// Material Kit 2 React components
import MKBox from "components/MKBox";


const Banner = () => {

    useEffect(() => {
        AOS.init({
            duration : 2000
        });
    });

    return (
        <Grid className='banner'  name='banner'
                sx={{ py: 20, }}>
            {/* <Grid container className='inner'> */}
                <Box className='content_box' sx={{ justifyContent: 'center', height: '100%' }}>
                    <Grid item className='title_box'>
                        <h1 className='main_title'  data-aos="fade-up">#Hanspoon</h1>
                    </Grid>
                    <Grid className='btn_box'>
                        <button type="button" className='btn_join'  data-aos="fade-up">
                            한스푼 참여하기
                        </button>
                        <button type="button" className='btn_join'  data-aos="fade-up">
                            내 한스푼 현황
                        </button>
                    </Grid>
                </Box>
            {/* </Grid> */}
        </Grid>
    );
};

export default Banner;