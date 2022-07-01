import Card from "@mui/material/Card";
import AppBar from 'components/AppBar';
import React from 'react';
import MKBox from "components/MKBox";
import bgImage from "assets/images/hanspoon/hanspoon-main-bg-2.jpg";
import CreatePost from "pages/LandingPages/Post/sections/CreatePost";

const Post = () => {

    return (
        <>
            <AppBar />
            <Card
                sx={{
                p: 2,
                mx: { xs: 2, lg: 3 },
                mt: 4, // margin-top
                mb: 4,
                backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
                backdropFilter: "saturate(200%) blur(30px)",
                boxShadow: ({ boxShadows: { xxl } }) => xxl,
                }}
            >
            <CreatePost/>
            </Card>
        </>
    )
}

export default Post;