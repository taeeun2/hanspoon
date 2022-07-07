import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

function Introduce(props) {

    useEffect(() => {
        AOS.init({
            duration : 1500
        });
    });

    return (
        // <div className='section_info'>
        //     <div className="icon_01" data-top-bottom="transform:translateY(-50px)"
        //         data-bottom-top="transform:translateY(0px)"></div>
        //     <div className="icon_02" data-top-bottom="transform:translateY(-30px)"
        //         data-bottom-top="transform:translateY(50px)"></div>
        //     <div className='inner'>
        //         <div className="title_box">
        //             <h3> {/* className="inner_title" */}
        //                 <span>한스푼이란?</span>
        //             </h3>
        //             <p> {/*  className="info_text" */}
        //                 한 주간의 일상을 한 번에 모아 쓰는 일기입니다.<br />
        //                 <strong>주 1회 x 4주</strong> 주간일기로, 조금은 느슨하지만<br className="mo" /> 꾸준하게<br className="pc_tb_show" />
        //                 블로그 기록 루틴을 이어가 보는건<br className="mo" /> 어떨까요?
        //             </p>
        //             <a href="#" target="_blank">주간일기를 쓰는 사람들 > </a>
        //         </div>
        //     </div>
        // </div>
        <Grid className='introduce' id='introduce'>
            <Box className='content_box'>
                <Grid item className='title_box' data-aos="fade-up">
                    <h2 className='main_title'>한스푼이란?</h2>
                </Grid>
                <Grid item className='text_box' data-aos="fade-up">
                    <p className="info_text">
                        나와 음식 취향이 같은,<br />
                        나와 식단 관리를 함께 할,<br />
                        2인 이상 주문 메뉴를 함께 먹을 동료를<br />
                        한스푼에서 찾아보는건 어떨까요?<br />
                    </p>
                    <p className="info_text">
                        한스푼 모임에 참여하고, 숟가락을 모아 본인의 친화력을 보여주세요!<br />
                    </p>
                    <p className='info_link' style={{
                      "fontFamily": 'NanumSquareRound',
                      "fontWeight" : 'bold',
                      "color": 'blue'}}>
                        한스푼 참여현황 보기 >
                    </p>
                </Grid>
            </Box>
        </Grid>
    );
}

export default Introduce;