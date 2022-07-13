import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { useState } from "react";
import MainModal from 'components/MainModal';


function Introduce(props) {

    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);

    useEffect(() => {
        AOS.init({
            duration : 1500
        });
    });

    return (
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
                      "color": '#217bff',
                      "cursor": 'default'}}
                      onClick={toggleModal}>
                        한스푼 참여현황 보기 >
                    </p>
                    <MainModal show={show} toggleModal={toggleModal}/>
                </Grid>
            </Box>
        </Grid>
    );
}

export default Introduce;