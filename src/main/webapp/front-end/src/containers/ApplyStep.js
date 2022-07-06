import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import MKBox from 'components/MKBox';
import AOS from "aos";
import "aos/dist/aos.css";

function ApplyStep(props) {

    useEffect(() => {
        AOS.init({
            duration : 3000
        });
    });

    return (
        <Grid className='apply_step' id='apply_step'>
            <Box className='content_box'>
                <Grid item className='title_box'>
                    <h3 className='main_title' data-aos="fade-up">한스푼 모임 참여 방법</h3>
                </Grid>
                <MKBox component="section">
                    <Grid container  sx={{ justifyContent: 'center', height: '100%' }}>
                        <Grid item className='step_box' data-aos="fade-up" xs={12} sm={12} lg={10} key={0}>
                            <div className='step_01'>
                                <span className='create_step'>step.1</span>
                            </div>
                        </Grid>
                    </Grid>
                </MKBox>
            </Box>
        </Grid>
    );
}

export default ApplyStep;