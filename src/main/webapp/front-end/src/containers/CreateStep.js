import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import MKBox from 'components/MKBox';
import AOS from "aos";
import "aos/dist/aos.css";

function CreateStep(props) {

    useEffect(() => {
        AOS.init({
            duration : 1500
        });
    });

    return (
        // <div className="section_schedule">
        //     <div className="icon_03" data-top-bottom="transform:translateY(-50px)"
        //         data-bottom-top="transform:translateY(50px)"></div>
        //     <div className='inner'>
        //         <div className="title_box">
        //             <h3> {/* className="inner_title" */}
        //                 <span>참여방법</span>
        //             </h3>
        //             <p class="info_text">
        //                 일주일에 한 번 일기쓰고 선물받자!<br />
        //                 <strong>6월 6일부터 12월 4일까지,<br class="mo" /> 매주 월요일 00:00 ~ 일요일 23:59</strong>
        //             </p>
        //             <p class="info_text icon">8월 29일 ~ 9월 4일, 10월 31일 ~ 11월 6일은<br class="mo" /> 한 주 차씩 쉬어갑니다.</p>
        //         </div>
        //     </div>
        // </div>
        <Grid className='create_step' id='create_step'>
            <Box className='content_box'>
                <Grid item className='title_box'>
                    <h3 className='main_title' data-aos="fade-up">한스푼 모임 생성 방법</h3>
                </Grid>
                <MKBox component="section">
                    <Grid container  sx={{ justifyContent: 'center', height: '100%' }}>
                        <Grid item className='step_box' data-aos="fade-up" xs={12} sm={12} lg={4} key={0}>
                            <div className='step_01'>
                                <span className='step_title'>Step.1</span>
                                <strong className='step_sub_title'>
                                    우측 하단의 '모임 생성' 버튼을 눌러<br />
                                    모임 생성 화면으로 이동해주세요
                                </strong>
                                <div className='img_box'></div>
                                <p className='info_text'>모임 생성은 로그인 후 가능합니다</p>
                            </div>
                        </Grid>
                        <Grid item className='step_box' data-aos="fade-up" xs={12} sm={12} lg={4} key={1}>
                            <div className='step_02'>
                                <span className='step_title'>Step.2</span>
                                <strong className='step_sub_title'>
                                    식당 선택 버튼을 클릭하여<br />
                                    상암동 식당을 검색하고 선택해주세요
                                </strong>
                                <div className='img_box'></div>
                                <p className='info_text'>맛집, 메뉴 이름과 같은 키워드로도 검색 가능합니다</p>
                            </div>
                        </Grid>
                        <Grid item className='step_box' data-aos="fade-up" xs={12} sm={12} lg={4} key={1}>
                            <div className='step_03'>
                                <span className='step_title'>Step.3</span>
                                <strong className='step_sub_title'>
                                    모임에 관한 정보를 입력해주세요<br />
                                    (제목, 식사 일시, 카테고리, 모집 인원, 한마디)
                                </strong>
                                <div className='img_box'></div>
                            </div>
                        </Grid>
                        <Grid item className='step_box' data-aos="fade-up" xs={12} sm={12} lg={4} key={1}>
                            <div className='step_04'>
                                <span className='step_title'>Step.4</span>
                                <strong className='step_sub_title'>
                                    게시글에 공개할 작성자 정보를<br />
                                    2개 이상 선택해주세요
                                </strong>
                                <div className='img_box'></div>
                                <p className='info_text'>
                                    다른 사용자들이 모임 조회시<br />
                                    확인 가능한 정보입니다 
                                </p>
                            </div>
                        </Grid>
                    </Grid>
                </MKBox>
            </Box>
        </Grid>
    );
}

export default CreateStep;