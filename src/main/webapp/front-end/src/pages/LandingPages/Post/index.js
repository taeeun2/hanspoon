import Card from "@mui/material/Card";
import AppBar from 'components/AppBar';
import React from 'react';
import MKBox from "components/MKBox";
import bgImage from "assets/images/hanspoon/hanspoon-main-bg-2.jpg";
import CreatePost from "pages/LandingPages/Post/sections/CreatePost";
import Header from "components/Header";
import { Grid } from "@mui/material";

const Post = () => {

    return (
        <>
            <Header />
            {/* <Card
                sx={{
                p: 2,
                mx: { xs: 2, lg: 3 },
                mt: 15, // margin-top
                mb: 4,
                backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
                backdropFilter: "saturate(200%) blur(30px)",
                boxShadow: ({ boxShadows: { xxl } }) => xxl,
                }}
            > */}
            <Grid mt={12}>
                <CreatePost/>
            </Grid>   
           
            {/* </Card> */}
        </>
    )
}

export default Post;