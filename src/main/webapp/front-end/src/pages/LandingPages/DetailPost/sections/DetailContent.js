import React, { useState, useEffect } from 'react';
import MKBox from "components/MKBox";
import MKTypography from 'components/MKTypography';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MKButton from 'components/MKButton';
import RestaurantLocation from './RestaurantLocation';

const DetailContent = ({clickedId, postData}) => {
    const [scope_name, setScope_name] = useState(false);
    const [scope_age, setScope_age] = useState(false);
    const [scope_company, setScope_company] = useState(false);
    const [scope_position_type, setScope_position_type] = useState(false);
    const [scope_gender, setScope_gender] = useState(false);
    const [scope_department, setScope_department] = useState(false);

    /* 테스트 필요 */
    const [num, setNum] = useState(0) //선택된 공개범위 개수
    // const [postId, setPostId] = useState(postData.post_id)
    // const [userId, setUserID] = useState(sessionStorage.getItem('user'))
    // const [restNum, setRestNum] = useState(postData.capacity - postData.participant_num) //신청 가능한 인원수

    useEffect(() => {
        console.log(postData);
    },[])

    /* 신청 API */
    function onClickApply() {
        if(num < 2){
            alert('공개 범위를 2개 이상 선택해주세요.')
        } else {
            fetch('http://localhost:8080/applyPost', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    post_id : 18,
                    user_id : 10,
                    scope_name : scope_name,
                    scope_gender :scope_gender,
                    scope_company : scope_company,
                    scope_position_type : scope_position_type,
                    scope_department :scope_department,
                    scope_age : scope_age
                })
            }).then(res => {
                alert('모임 신청이 완료되었습니다.')
                document.location.href='/'
            })
        }
    }

    return (
        <div>
             <MKBox component="section" py={2}>
            <Container>
                    <Grid container item xs={12} lg={6} mx="auto" mb={2} >
                        <MKTypography variant="h2">
                            나랑 밥먹을 사람{clickedId}
                        </MKTypography >
                       
                    </Grid>
                    <Grid container item xs={12} lg={6} mx="auto" >
                        <MKTypography variant="h6" mr = {8}>익명🥄3</MKTypography>
                        <MKTypography variant="h6">한솔 인티큐브 | 선임</MKTypography>
                    </Grid>

                    <Grid container item xs={12} lg={6} mx="auto" >
                        <MKBox width="100%">
                            <hr/>
                            <Grid container >
                                    <Grid item xs={12} md={3} mt={3}>
                                        <MKTypography variant="h6">식사 일시</MKTypography>
                                    </Grid>

                                    <Grid item xs={12} md={8} mt={3}>
                                        <MKTypography variant="h6" style={{"fontWeight" : "lighter"}}>2022.06.29</MKTypography>
                                    </Grid>

                                    
                                    <Grid item xs={12} md={3} mt={3}>
                                        <MKTypography variant="h6">모집 인원</MKTypography>
                                    </Grid>

                                    <Grid item xs={12} md={8} mt={3}>
                                        <MKTypography variant="h6" style={{"fontWeight" : "lighter"}}>🙋‍♂️2/4</MKTypography>
                                    </Grid>

                                    <Grid item xs={12} md={3} mt={3}>
                                        <MKTypography variant="h6">카테 고리</MKTypography>
                                    </Grid>

                                    <Grid item xs={12} md={8} mt={3}>
                                        <MKTypography variant="h6" style={{"fontWeight" : "lighter"}}>한식</MKTypography>
                                    </Grid>

                                    <Grid item xs={12} md={3} mt={3}>
                                        <MKTypography variant="h6">식당 이름</MKTypography>
                                    </Grid>

                                    <Grid item xs={12} md={8} mt={3}>
                                        <MKTypography variant="h6" style={{"fontWeight" : "lighter"}}>고씨네 카레 상암 DMC점</MKTypography>
                                    </Grid>

                                    <Grid item xs={12} md={3} mt={3}>
                                        <MKTypography variant="h6">위치</MKTypography>
                                    </Grid>

                                    <Grid item xs={12} md={8} mt={3}>
                                        <RestaurantLocation restaurant = {'고씨네 카레 상암 DMC점'}></RestaurantLocation>
                                    </Grid>

                                    <Grid item xs={12} md={3} mt={3}>
                                        <MKTypography variant="h6">한마디</MKTypography>
                                    </Grid>

                                    <Grid item xs={12} md={8} mt={3}>
                                        <MKTypography variant="h6" style={{"fontWeight" : "lighter"}}>함께 식사해요!</MKTypography>
                                    </Grid>

                                    <Grid item xs={12} md={3} mt={3} >
                                        <MKTypography variant="h6">공개 범위</MKTypography>
                                    </Grid>
                                    <Grid item xs={12} md={2}  mt={3} mr ={1}>
                                        <MKButton  onClick={() => {setScope_name(!scope_name); if(!scope_name) setNum(num+1); else{setNum(num-1)}}} variant="gradient" color={scope_name?'light':'dark'} fullWidth style = {{"marginBottom" : "10px"}}>
                                            이름
                                        </MKButton>
                                        <MKButton onClick={() => {setScope_position_type(!scope_position_type); if(!scope_position_type) setNum(num+1); else{setNum(num-1)}}} variant="gradient" color={scope_position_type?'light':'dark'} fullWidth>
                                            직급
                                        </MKButton>

                                    </Grid>
                                    <Grid item xs={12} md={2} mt={3} mr ={1}>
                                        <MKButton onClick={() => {setScope_age(!scope_age); if(!scope_age) setNum(num+1); else{setNum(num-1)}}} variant="gradient" color={scope_age?'light':'dark'} fullWidth style = {{"marginBottom" : "10px"}}>
                                            연령대
                                        </MKButton>
                                        <MKButton onClick={() => {setScope_gender(!scope_gender); if(!scope_gender) setNum(num+1); else{setNum(num-1)}}} variant="gradient" color={scope_gender?'light':'dark'} fullWidth>
                                            성별
                                        </MKButton>
                                    </Grid>
                                    <Grid item xs={12} md={2} mt={3} mr ={1}>
                                        <MKButton onClick={() => {setScope_company(!scope_company); if(!scope_company) setNum(num+1); else{setNum(num-1)}}} variant="gradient" color={scope_company?'light':'dark'} fullWidth style = {{"marginBottom" : "10px"}}>
                                            소속회사
                                        </MKButton>
                                        <MKButton onClick={() => {setScope_department(!scope_department); if(!scope_department) setNum(num+1); else{setNum(num-1)}}} variant="gradient" color={scope_department?'light':'dark'} fullWidth>
                                            부서명
                                        </MKButton>
                                    </Grid>
                                    
                                    {/* restNum이 1이상일 때만 버튼 활성화 */}
                                    <Grid container item justifyContent="center" xs={12} my={2} mt = {5}>
                                        <MKButton type="submit" variant="gradient" color="info" fullWidth  onClick={onClickApply}>
                                        참여하기
                                        </MKButton>
                                    </Grid>

                            </Grid>
                            
                        </MKBox>
                                
                    </Grid>  
            </Container>
            </MKBox>
        </div>
    );
};

export default DetailContent;