import Card from "@mui/material/Card";
import AppBar from 'components/AppBar';
import React from 'react';
import MKBox from "components/MKBox";
import bgImage from "assets/images/hanspoon/hanspoon-main-bg-2.jpg";
import CreatePost from "pages/LandingPages/Post/sections/CreatePost";
import Header from "components/Header";
import { Grid } from "@mui/material";
import PageHeader from "components/PageHeader";
import "assets/css/createPost.css?after"

const Post = () => {

    return (
        <div className='create_post'>
            <PageHeader />
            <MKBox minHeight="320px" width="100%" className="banner"
              sx={{display: "grid", }}> 
                <Grid className="title">
                    모임 생성
                </Grid>              
            </MKBox>

            <Grid style={{"backgroundColor" : "white"}}>
                <CreatePost/>
            </Grid>   
           
            {/* </Card> */}
        </div>
    )
}

export default Post;