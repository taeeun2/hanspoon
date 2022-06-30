import React, { useState } from 'react';
import Card from "@mui/material/Card";
import AppBar from 'components/AppBar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DetailContent from './sections/DetailContent';
const DetailPost = () => {

    const {clickedId} = useParams();// 링크의 파라메타 받기

    return (
        <div>
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
            
            <DetailContent clickedId = {clickedId}/>


            </Card>
        </div>
    );
};

export default DetailPost;