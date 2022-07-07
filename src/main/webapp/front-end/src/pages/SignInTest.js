import { useState } from "react";
import { Box, Grid } from '@mui/material';
import MKBox from "components/MKBox";
import "assets/css/login.css"
import Login from "./LandingPages/SignIn/components/Login";



const SignInTest = () => {
   
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
                        <Grid item className='login_box' xs={12} sm={12} lg={4} key={0}>
                           
                        <Login/>            

                        </Grid>

                    </Grid>
                </MKBox>
            </Box>
        </Grid>
                </>
    )
}

export default SignInTest;