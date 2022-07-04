import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

function Introduce(props) {

    useEffect(() => {
        AOS.init({
            duration : 3000
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
                <Grid item className='title_box'>
                    <h2 className='main_title' data-aos="fade-up">한스푼이란?</h2>
                </Grid>
                <Grid item className='text_box'>
                    <p className="info_text" data-aos="fade-up">
                        오늘 점심 뭐 먹지?<br />
                        오늘 하루 가장 중요한 고민<br />
                        어제 잠들기 전 밤부터 고민한 그 메뉴<br />
                        아 근데 누구랑 먹지? 여기 2인분 이상 주문이던데..<br />
                        한스푼에서 찾아보는건 어떨까요?<br />
                    </p>
                </Grid>
            </Box>
        </Grid>
    );
}

export default Introduce;