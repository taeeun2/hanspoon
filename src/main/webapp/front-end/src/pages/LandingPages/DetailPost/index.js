import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import AppBar from 'components/AppBar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DetailContent from './sections/DetailContent';
import PageHeader from 'components/PageHeader';
import { Grid } from '@mui/material';
import MKBox from 'components/MKBox';
import Container from 'assets/theme/components/container';
import Footer from '../Author/sections/Footer';
const DetailPost = () => {

    const [postData, setPostData] = useState(null); //게시글 상세 정보

    const {clickedId} = useParams();// 링크의 파라메타 받기

    useEffect(() => {
        fetch(`http://localhost:8080/post/detail/${clickedId}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            setPostData(data);
            console.log(data)
        })
    },[]);

    return (
        <div>
            <PageHeader />
            <Grid style={{"backgroundColor" : "white", "font-family": 'NanumSquareRound'}}>
            {postData &&  <DetailContent clickedId = {clickedId} postData = {postData}/>}
            </Grid>
            
            {/* </Card> */}
        </div>
    );
};

export default DetailPost;