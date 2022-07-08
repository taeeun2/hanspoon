import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import AppBar from 'components/AppBar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DetailContent from './sections/DetailContent';
const DetailPost = () => {

    const [postData, setPostData] = useState(); //게시글 상세 정보

    const {clickedId} = useParams();// 링크의 파라메타 받기

    useEffect(() => {
        fetch(`http://172.27.1.33:8080/post/detail/${clickedId}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            setPostData(data);
        })
    },[]);

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
            
            <DetailContent clickedId = {clickedId} postData = {postData}/>


            </Card>
        </div>
    );
};

export default DetailPost;