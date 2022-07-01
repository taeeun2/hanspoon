import React, { useEffect } from 'react';
import MKBox from "components/MKBox";
import MKTypography from 'components/MKTypography';
import Grid from "@mui/material/Grid";
import { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";

// Material Kit 2 React components
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

import { Form } from "react-bootstrap";
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

    const [title, setTitle] = useState('');
    const [titleMessage, setTitleMessage] = useState('')

    const [scope_name, setScope_name] = useState(false);
    const [scope_age, setScope_age] = useState(false);
    const [scope_company, setScope_company] = useState(false);
    const [scope_position_type, setScope_position_type] = useState(false);
    const [scope_gender, setScope_gender] = useState(false);
    const [scope_department, setScope_department] = useState(false);
    
    const [num, setNum] = useState(0)
    const [scopeMessage, setScopeMessage] = useState('')

    const [currentTime, setCurrentTime] = useState('')

    const [content, setContent] = useState('')
    const [contentMessage, setContentMessage] = useState('')

    useEffect(()=>{
        fetch('http://localhost:8080/getCurrentTime')
        .then(res=>{
            return res.json()
            
        })
        .then(data =>{
            var str = data.split('.')
            var dateTimeSecond = str[0].split(':')
            var dateTime = dateTimeSecond[0] + ':'+ dateTimeSecond[1]
            setCurrentTime(dateTime)
        })
    },[])

    const searchRestaurant = () => {
        setShow(!show);
    };

 
    const [restaurantName, setRestaurantName] = useState('')

    function setOnText(name){
        setRestaurantName(name)
    }
   
   

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
    const handleTitle = (e) => {
        setTitleMessage('')
        setTitle(e.target.value)
    }

    const handleNumber = (e) => {
        if(e.target.value <= 1){
            setNumber(1)
        }

        else{
            setNumber(e.target.value)
        }
    }

    const handleCurrentTime = (e) => {
        setCurrentTime(e.target.value)
    }

    const handleContent = (e) => {
        if(e.target.value.length < 10){
            setContentMessage('최소 10자 이상 입력해주세요.')
        }else{
            setContentMessage('')
        }
        setContent(e.target.value)
    }

    function onClickCreate(){
        
        if(title.length <= 1){
            setTitleMessage('제목을 입력해주세요.')
        }else if(num < 2){
            setScopeMessage('공개 범위를 2개 이상 선택해주세요.')
        }else if(content.length < 10){
            setScopeMessage('')
            setContentMessage('최소 10자 이상 입력해주세요.')
        }else{
            

        }
        
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
                                    color="dark" value = {title} >제목</MKTypography>
                                
                            </Grid>

                            <Grid item xs={12} md={9.5}>
                                <MKInput label="Title" fullWidth onChange={handleTitle}/>
                                <MKTypography variant="button" style={{"color" :"red"}} >{titleMessage}</MKTypography>
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
                            <SearchAPI  show = {show} searchRestaurant={searchRestaurant} setOnText = {setOnText} />




                            <Grid item xs={12} md={2.5} mt={1} textAlign="center">
                                <MKTypography variant="h6"
                                    fontWeight="regular"
                                    color="dark">식사 일시</MKTypography>
                            </Grid>

                            <Grid item xs={12} md={9.5}>
                                <input type="datetime-local" id="meeting-time"
                                        name="meeting-time" value={currentTime} onChange={handleCurrentTime}
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
                                    color="dark">모집 인원</MKTypography>
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
                                <MKTypography variant="caption"
                                    color="info">최소 2개 <br/> 이상 선택</MKTypography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <MKButton  onClick={() => {setScope_name(!scope_name); if(!scope_name){ setNum(num+1)} else{setNum(num-1)}}} variant="gradient" color={scope_name?'light':'dark'} fullWidth style = {{"marginBottom" : "10px"}}>
                                    이름
                                </MKButton>
                                <MKButton onClick={() => {setScope_position_type(!scope_position_type);if(!scope_position_type){ setNum(num+1)} else{setNum(num-1)}}} variant="gradient" color={scope_position_type?'light':'dark'} fullWidth>
                                    직급
                                </MKButton>

                            </Grid>
                            <Grid item xs={12} md={3}>
                                <MKButton onClick={() => {setScope_age(!scope_age); if(!scope_age){ setNum(num+1)} else{setNum(num-1)}}} variant="gradient" color={scope_age?'light':'dark'} fullWidth style = {{"marginBottom" : "10px"}}>
                                    연령대
                                </MKButton>
                                <MKButton onClick={() => {setScope_gender(!scope_gender);if(!scope_gender){ setNum(num+1)} else{setNum(num-1)}}} variant="gradient" color={scope_gender?'light':'dark'} fullWidth>
                                    성별
                                </MKButton>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <MKButton onClick={() =>{setScope_company(!scope_company);if(!scope_company){ setNum(num+1)} else{setNum(num-1)}}} variant="gradient" color={scope_company?'light':'dark'} fullWidth style = {{"marginBottom" : "10px"}}>
                                    소속회사
                                </MKButton>
                                <MKButton onClick={() => {setScope_department(!scope_department); if(!scope_department){ setNum(num+1)} else{setNum(num-1)}}} variant="gradient" color={scope_department?'light':'dark'} fullWidth>
                                    부서명
                                </MKButton>
                            </Grid>



                            <Grid item xs={12} md={2.5} mt={1} textAlign="center">
                                
                            </Grid>
                            <Grid item xs={12} md={9.5} textAlign="center">
                                <MKTypography variant="button" style={{"color" :"red"}} >{scopeMessage}</MKTypography>
                            </Grid>

                            <Grid item xs={12} md={2.5} mt={1} textAlign="center">

                            <MKTypography variant="h6"
                                fontWeight="regular"
                                color="dark" >한마디</MKTypography>
                            </Grid>
                            <Grid item xs={12} md={9.5} >
                                <MKInput variant="standard" label="Your Message" value ={content} onChange = {handleContent}  multiline fullWidth rows={4} />
                                <MKTypography variant="button" style={{"color" :"red"}} >{contentMessage}</MKTypography>
                            </Grid>


                          

                            </Grid>



                            <Grid container item justifyContent="center" xs={12} my={2}>
                                <MKButton  variant="gradient" color="dark" fullWidth onClick={onClickCreate}>
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