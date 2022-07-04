import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import AOS from "aos";
import "aos/dist/aos.css";

function Rank(props) {

    useEffect(() => {
        AOS.init({
            duration : 3000
        });
    });

    return (
        // <div class="section_benefit">
        //     <div class="icon_09" data-top-bottom="transform:translateY(-100px)"
        //         data-bottom-top="transform:translateY(100px)"></div>
        //     <div class="icon_10" data-top-bottom="transform:translateY(-50px)"
        //         data-bottom-top="transform:translateY(50px)"></div>
        //     <span class="deco" data-top-bottom="transform:translateY(-50px)"
        //         data-bottom-top="transform:translateY(100px)"></span>
        //     <div className='inner'>
        //         <div className='title_box'>
        //             <h3 className='inner_title'>
        //                 인기순위
        //             </h3>
        //         </div>
        //     </div>
        // </div>
        <Grid className='rank' id='rank'>
            <Box className='content_box'>
                <Grid item className='title_box'>
                    <h3 className='main_title' data-aos="fade-up">인기순위</h3>
                </Grid>
            </Box>
        </Grid>
    );
}

export default Rank;