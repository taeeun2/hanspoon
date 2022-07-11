import { Box } from '@mui/system';
import React from 'react';
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from 'react-router-dom';

function StaticBtn(props) {
    const navigate = useNavigate();

    function createPost(){
        if(sessionStorage.getItem('user_id') != null){
            navigate('/post')
        }else{
            alert("로그인 후 이용 가능합니다.")
        }
    }

    return (
        <Grid item xs={12} lg={12} className="static_button">
            <Box sx={{ width: '100%',
                     justifyContent: 'flex-end' }} className="static_button_box">
                <button type="button" className='static_button_create' onClick={createPost}>
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