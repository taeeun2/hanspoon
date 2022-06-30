import React, { useState } from 'react';
import MKBox from "components/MKBox";
import MKTypography from 'components/MKTypography';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MKButton from 'components/MKButton';
import RestaurantLocation from './RestaurantLocation';

const DetailContent = ({clickedId}) => {
    const [scope_name, setScope_name] = useState(false);
    const [scope_age, setScope_age] = useState(false);
    const [scope_company, setScope_company] = useState(false);
    const [scope_position_type, setScope_position_type] = useState(false);
    const [scope_gender, setScope_gender] = useState(false);
    const [scope_department, setScope_department] = useState(false);


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
                                        <MKButton  onClick={() => setScope_name(!scope_name)} variant="gradient" color={scope_name?'light':'dark'} fullWidth style = {{"marginBottom" : "10px"}}>
                                            이름
                                        </MKButton>
                                        <MKButton onClick={() => setScope_position_type(!scope_position_type)} variant="gradient" color={scope_position_type?'light':'dark'} fullWidth>
                                            직급
                                        </MKButton>

                                    </Grid>
                                    <Grid item xs={12} md={2} mt={3} mr ={1}>
                                        <MKButton onClick={() => setScope_age(!scope_age)} variant="gradient" color={scope_age?'light':'dark'} fullWidth style = {{"marginBottom" : "10px"}}>
                                            연령대
                                        </MKButton>
                                        <MKButton onClick={() => setScope_gender(!scope_gender)} variant="gradient" color={scope_gender?'light':'dark'} fullWidth>
                                            성별
                                        </MKButton>
                                    </Grid>
                                    <Grid item xs={12} md={2} mt={3} mr ={1}>
                                        <MKButton onClick={() => setScope_company(!scope_company)} variant="gradient" color={scope_company?'light':'dark'} fullWidth style = {{"marginBottom" : "10px"}}>
                                            소속회사
                                        </MKButton>
                                        <MKButton onClick={() => setScope_department(!scope_department)} variant="gradient" color={scope_department?'light':'dark'} fullWidth>
                                            부서명
                                        </MKButton>
                                    </Grid>

                                    <Grid container item justifyContent="center" xs={12} my={2} mt = {5}>
                                        <MKButton type="submit" variant="gradient" color="info" fullWidth>
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