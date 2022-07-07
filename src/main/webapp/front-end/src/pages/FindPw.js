import React from 'react';
import { Box, Grid } from '@mui/material';
import MKBox from "components/MKBox";
import "assets/css/login.css"
import FindPwComponent from './LandingPages/SignIn/components/FindPwComponet';

const FindPw = () => {
    function tomain(){
        document.location.href = '/'
    }
    return (
        <>
        <Grid className='loginBackground'>
           <Box className='loginContentBox'>
                <Grid item style={{"marginTop" : "100px", "textAlign" : "center","marginBottom": "20px"}}>
                <button className='login_title' onClick={()=>tomain()}>Hanspoon</button>
               </Grid>
               <MKBox component="section">
                   <Grid container  sx={{ justifyContent: 'center' }}>
                       <Grid item className='findPW_box' xs={12} sm={12} lg={4} key={0}>
                        
                        <FindPwComponent/>

                       </Grid>

                   </Grid>
               </MKBox>
           </Box>
       </Grid>
        </>
    );
};

export default FindPw;