import { Box } from '@mui/system';
import React from 'react';
import Grid from "@mui/material/Grid";

function StaticBtn(props) {
    return (
        <Grid item xs={12} lg={12} className="static_button">
            <Box sx={{ width: '100%',
                     justifyContent: 'flex-end' }} className="static_button_box">
                <button type="button" className='static_button_create'>
                    모임 생성
                </button>
                <a href='#banner'>
                    <button type="button" className='static_button_up'>
                    </button>
                </a>
            </Box> 
        </Grid>
    );
}

export default StaticBtn;