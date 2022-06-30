import React from 'react';
import MKBox from "components/MKBox";
import MKTypography from 'components/MKTypography';
import Grid from "@mui/material/Grid";
import { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Switch from "@mui/material/Switch";

// Material Kit 2 React components
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

import { Form } from "react-bootstrap";

import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import MapContainer from './MapContainer';
import SearchAPI from './SearchAPI';


const category = [
    { value: "1", name: "한식" },
    { value: "2", name: "중식" },
    { value: "3", name: "양식" },
    { value: "4", name: "기타" },
];

const CreatePost = () => {
    const [number, setNumber] = useState(1);
    const [show, setShow] = useState(false);

    const [scope_name, setScope_name] = useState(false);
    const [scope_age, setScope_age] = useState(false);
    const [scope_company, setScope_company] = useState(false);
    const [scope_position_type, setScope_position_type] = useState(false);
    const [scope_gender, setScope_gender] = useState(false);
    const [scope_department, setScope_department] = useState(false);

    const searchRestaurant = () => {
        setShow(!show);
    };

 
    const [restaurantName, setRestaurantName] = useState('')
  
   
    
    function decreaseNumber(){
        if(parseInt(number)-1 >= 1){
            setNumber(parseInt(number)-1)
        }else{
            setNumber(1)
        }
    }

    function increaseNumber(){
        setNumber(parseInt(number)+1)
    }

    const handleNumber = (e) => {
        if(e.target.value <= 1){
            setNumber(1)
        }

        else{
            setNumber(e.target.value)
        }
    }

    const handleRestaurantName = (name) => {
        setRestaurantName(name)
    }
    return (
        <div>
            <MKBox component="section" py={2}>
            <Container>
                    <Grid container item justifyContent="center" xs={12} lg={5} mx="auto" textAlign="center">
                    <MKTypography variant="h3" mb={1}>
                        모임 생성
                    </MKTypography>
                    </Grid>
                    <Grid container item xs={12} lg={5} sx={{ mx: "auto" }}>
                    <MKBox width="100%">
                        
                        <MKBox p={3}>
                        <Grid container spacing={3}>
                            
                            <Grid item xs={12} md={2.5} mt={1} textAlign="center">
                                <MKTypography variant="h6"
                                    fontWeight="regular"
                                    color="dark">제목</MKTypography>
                            </Grid>

                            <Grid item xs={12} md={9.5}>
                                <MKInput label="Title" fullWidth />
                            </Grid>
                            
                            <Grid item xs={12} md={2.5} mt={1} textAlign="center">
                            
                            <MKTypography variant="h6"
                                fontWeight="regular"
                                color="dark">식당 선택</MKTypography>
                            </Grid>

                            <Grid item xs={12} md={7}>
                                <MKInput label="Select a restaurant" fullWidth value = {restaurantName} disabled/>
                            </Grid>

                            <Grid item xs={12} md={2.5}>
                                <MKButton variant="gradient" color="dark" onClick = {searchRestaurant} fullWidth>
                               검색
                                </MKButton>
                            </Grid>

                            {/* 모달 */}
                            <SearchAPI  show = {show} searchRestaurant={searchRestaurant} handleRestaurantName = {handleRestaurantName} />




                            <Grid item xs={12} md={2.5} mt={1} textAlign="center">
                                <MKTypography variant="h6"
                                    fontWeight="regular"
                                    color="dark">식사 일시</MKTypography>
                            </Grid>

                            <Grid item xs={12} md={9.5}>
                                <input type="datetime-local" id="meeting-time"
                                        name="meeting-time" value="2022-06-30T19:30"
                                        min="2022-06-30T00:00" style={{"fontSize" : "15px", "width" : "100%", "height" : "40px", "textAlign" : "center"}}></input>
                            </Grid>

                            
                            <Grid item xs={12} md={2.5} mt={1} textAlign="center">   
                                <MKTypography variant="h6"
                                    fontWeight="regular"
                                    color="dark">카테고리</MKTypography>
                            </Grid>
                            
                            <Grid item xs={12} md={9.5}>
                                <Form.Select>
                                    {category.map(menu =>(<option key={menu.value} value={menu.value} >{menu.name}</option>))}
                                </Form.Select>
                            </Grid>

                            <Grid item xs={12} md={2.5} mt={1}textAlign="center" >   
                                <MKTypography variant="h6"
                                    fontWeight="regular"
                                    color="dark">참여자 수</MKTypography>
                            </Grid>

                            <Grid item xs={12} md={9.5}>
                                <MKButton style={{"width" : "1px"}} color="secondary" onClick = {decreaseNumber}>-</MKButton>
                                <MKInput value = {number} label = "Number" style={{"width" : "80px"}} onChange = {handleNumber} />
                                <MKButton style={{"width" : "1px"}} color="secondary" onClick = {increaseNumber}>+</MKButton>
                            </Grid>


                            <Grid item xs={12} md={2.5} mt={1} textAlign="center">
                                <MKTypography variant="h6"
                                    fontWeight="regular"
                                    color="dark">공개 범위</MKTypography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <MKButton  onClick={() => setScope_name(!scope_name)} variant="gradient" color={scope_name?'light':'dark'} fullWidth style = {{"marginBottom" : "10px"}}>
                                    이름
                                </MKButton>
                                <MKButton onClick={() => setScope_position_type(!scope_position_type)} variant="gradient" color={scope_position_type?'light':'dark'} fullWidth>
                                    직급
                                </MKButton>

                            </Grid>
                            <Grid item xs={12} md={3}>
                                <MKButton onClick={() => setScope_age(!scope_age)} variant="gradient" color={scope_age?'light':'dark'} fullWidth style = {{"marginBottom" : "10px"}}>
                                    연령대
                                </MKButton>
                                <MKButton onClick={() => setScope_gender(!scope_gender)} variant="gradient" color={scope_gender?'light':'dark'} fullWidth>
                                    성별
                                </MKButton>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <MKButton onClick={() => setScope_company(!scope_company)} variant="gradient" color={scope_company?'light':'dark'} fullWidth style = {{"marginBottom" : "10px"}}>
                                    소속회사
                                </MKButton>
                                <MKButton onClick={() => setScope_department(!scope_department)} variant="gradient" color={scope_department?'light':'dark'} fullWidth>
                                    부서명
                                </MKButton>
                            </Grid>

                            <Grid item xs={12} md={2.5} mt={1} textAlign="center">

                            <MKTypography variant="h6"
                                fontWeight="regular"
                                color="dark">한마디</MKTypography>
                            </Grid>
                            <Grid item xs={12} md={9.5} >

                                <MKInput variant="standard" label="Your Message" multiline fullWidth rows={4} />
                            </Grid>


                          

                            </Grid>



                            <Grid container item justifyContent="center" xs={12} my={2}>
                                <MKButton type="submit" variant="gradient" color="dark" fullWidth>
                                Create
                                </MKButton>
                            </Grid>



                        </MKBox>
                    </MKBox>
                    </Grid>
                </Container>
            </MKBox>
        </div>
    );
};

export default CreatePost;