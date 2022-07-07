import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import MKBox from 'components/MKBox';
import AOS from "aos";
import "aos/dist/aos.css";

function ApplyStep(props) {

    useEffect(() => {
        AOS.init({
            duration : 1500
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
                        <Grid item className='step_box' data-aos="fade-up" xs={12} sm={12} lg={3} key={0}>
                            <div className='step_01'>
                                <span className='step_title'>step.1</span>
                                <strong className='step_sub_title'>
                                    한스푼 모임 리스트에서 참여하고 싶은 모임 선택
                                </strong>
                            </div>
                        </Grid>
                        <Grid item className='step_box' data-aos="fade-up" xs={12} sm={12} lg={3} key={0}>
                            <div className='step_02'>
                                <span className='step_title'>step.2</span>
                                <strong className='step_sub_title'>
                                    모임 상세 정보 확인 후, 게시글에  공개할 정보 2개 이상 선택
                                </strong>
                            </div>
                        </Grid>
                        <Grid item className='step_box' data-aos="fade-up" xs={12} sm={12} lg={3} key={0}>
                            <div className='step_03'>
                                <span className='step_title'>step.3</span>
                                <strong className='step_sub_title'>
                                    참여하기 버튼 클릭!
                                </strong>
                            </div>
                        </Grid>
                    </Grid>
                </MKBox>
            </Box>
        </Grid>
    );
}

export default ApplyStep;