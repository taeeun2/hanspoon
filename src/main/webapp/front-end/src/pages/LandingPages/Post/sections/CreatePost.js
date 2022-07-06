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


const CreatePost = () => {

    const [categorylist, setCategroyList] = useState([])
    // 카테고리 리스트 가져오기
    useEffect(() => {
        fetch('http://localhost:8080/category')
        .then(res => {
          return res.json()
        })
        .then(data => {
            setCategroyList(data)
        })
      }, []);
    const [category, setCategroy] = useState(1)
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

    const [meet_date, setMeetDate] = useState('')

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
            setMeetDate(dateTime)
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

    const handleMeetDate = (e) => {
        setMeetDate(e.target.value)
    }

    const handleContent = (e) => {
        if(e.target.value.length < 10){
            setContentMessage('최소 10자 이상 입력해주세요.')
        }else{
            setContentMessage('')
        }
        setContent(e.target.value)
    }

    const handleCategory = (e) => {
        setCategroy(e.target.value)
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

           console.log(meet_date)
            fetch('http://localhost:8080/createPost',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    title : title,
                    content : content,
                    restaurant_name : restaurantName,
                    meet_date : meet_date,
                    // user_id : sessionStorage.getItem('user_id'),
                    user_id : 6,
                    scope_name : scope_name,
                    scope_gender :scope_gender,
                    scope_company : scope_company,
                    scope_position_type : scope_position_type,
                    scope_department :scope_department,
                    capacity : num+1,
                    category_id : category
                })
            }).then(res=>{
                if(res.ok){
                    alert('모임이 생성되었습니다.')
                    document.location.href='/'
                }else{
                    alert('모임 생성에 실패하였습니다.')
                }                
            })

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
                                        name="meeting-time" value={meet_date} onChange={handleMeetDate}
                                        min={meet_date} style={{"fontSize" : "15px", "width" : "100%", "height" : "40px", "textAlign" : "center"}}></input>
                            </Grid>

                            
                            <Grid item xs={12} md={2.5} mt={1} textAlign="center">   
                                <MKTypography variant="h6"
                                    fontWeight="regular"
                                    color="dark">카테고리</MKTypography>
                            </Grid>
                            
                            <Grid item xs={12} md={9.5}>
                                <Form.Select value = {category} onChange = {handleCategory}>
                                    {categorylist.map(menu =>(menu.category_id!== 0 && <option key={menu.category_id} value={menu.category_id} >{menu.category_name}</option>))}
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