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
import "assets/css/createPost.css?after"
import plusIcon from "assets/images/hanspoon/createPost/icon_cp_plus.png"
import { useNavigate } from 'react-router-dom';

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
    const [category, setCategroy] = useState('')
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
    
    const [categoryMessage, setCategoryMessage] = useState('')
    const [restaurantNameMessage, setRestaurantNameMessage] = useState('')
    const navigate = useNavigate();

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
        setCategoryMessage('')
    }

    function onClickCreate(){
        
        if(title.length <= 1){
            setTitleMessage('제목을 입력해주세요.')
        }else if(category === '카테고리 선택' || category === ''){
            
            setCategoryMessage('카테고리를 선택해주세요.')
        
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
                    restaurant_address : localStorage.getItem('restaurant_address'),
                    meet_date : meet_date,
                    user_id : sessionStorage.getItem('user_id'),
                    scope_name : scope_name,
                    scope_gender :scope_gender,
                    scope_company : scope_company,
                    scope_position_type : scope_position_type,
                    scope_department :scope_department,
                    scope_age : scope_age,
                    capacity : num+1,
                    category_id : category
                })
            }).then(res=>{
                return res.json()
                            
            }).then(data=>{
                if(data.post_id != null){
                    console.log(localStorage.getItem('restaurant_address'))
                    localStorage.removeItem('restaurant_address')
                    
                    alert('모임이 생성되었습니다.')
                    navigate(`/detailPost/${data.post_id}`)
                }else{
                    alert('모임 생성에 실패하였습니다.')
                    alert(data.errorMessage)
                }    
            })

        }
        
    }
   
    return (
        <>
            <Container>
                    <Grid container item  xs={12} lg={5} sx={{ mx: "auto" }}>
                    <MKBox width="100%" mt = {7}>
                        <Grid container spacing={3}>
                            
                            <Grid item xs={12} md={3.5}>
                                <span style={{"marginLeft" : "15px"}} className = "cp_label" value = {title} >제목</span>
                            </Grid>

                            <Grid item xs={12} md={8.5}>
                                <Grid>
                                <div className="cp_input_box">
                                    <input className = "cp_input"  onChange={handleTitle} placeholder="Title"/>
                                </div>
                                </Grid>
                                <Grid>
                                <span className='cp_message' >{titleMessage}</span>
                                </Grid>
                            </Grid>
                          
                               
                            
                            <Grid item xs={12} md={3.5}  textAlign="left">
                                <span className = "cp_label">식당 선택</span>
                            </Grid>

                            <Grid item xs={12} md={5.5}>
                                <Grid>
                                <div className="cp_input_box">
                                <input className = "cp_input"  placeholder="select a restaurant" value = {restaurantName} disabled/>
                                </div>
                                </Grid>
                                <Grid>
                                <span className='cp_message' >{restaurantNameMessage}</span>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <button className='cp_button' onClick = {searchRestaurant}>
                               검색
                                </button>
                            </Grid>

                            {/* 모달 */}
                            <SearchAPI  show = {show} searchRestaurant={searchRestaurant} setOnText = {setOnText} />




                            <Grid item xs={12} md={3.5} textAlign="left">
                                <span className = "cp_label">식사 일시</span>
                            </Grid>

                            <Grid item xs={12} md={8.5}>
                                <div className='cp_input_box'>
                                <input className ="cp_input" type="datetime-local" id="meeting-time"
                                        name="meeting-time" value={meet_date} onChange={handleMeetDate}
                                        min={meet_date} style={{"textAlign" : "left", "width" : "95%", "fontSize" : "14px"}}></input>
                                </div>
                            </Grid>

                            
                            <Grid item xs={12} md={3.5} textAlign="left">   
                                <span className = "cp_label">카테고리</span>
                            </Grid>
                            
                            <Grid item xs={12} md={8.5}>
                                <Grid>
                                <select className='cp_select' value = {category} onChange = {handleCategory} >
                                    <option>카테고리 선택</option>
                                    {categorylist.map(menu =>(menu.category_id!== 0 && <option key={menu.category_id} value={menu.category_id}  >{menu.category_name}</option>))}
                                </select>
                                </Grid>
                                <Grid>
                                <span className='cp_message' >{categoryMessage}</span>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={3.5} textAlign="left" >   
                                <span className = "cp_label">모집 인원</span>
                            </Grid>

                            <Grid item xs={12} md={8.5}>
                                <button style={{"width" : "1px"}} color="secondary" onClick = {decreaseNumber}><img src={plusIcon}></img></button>
                                <input className='cp_input'value = {number} label = "Number" style={{"width" : "80px","textAlign" : "center"}} onChange = {handleNumber} />
                                <button style={{"width" : "1px"}} color="secondary" onClick = {increaseNumber}><img src={plusIcon}></img></button>
                            </Grid>

                            
                            <Grid item xs={12} md={3.5} textAlign="left">
                                <span className = "cp_label">공개 범위</span><br/>
                                <span style={{"color" : "#FF91B3", "fontSize" : "12px", "marginRight" : "20px"}}>최소 2개 이상 선택</span>
                            </Grid>
                            <Grid item xs={12} md={2.5}>
                                <label  className="chk_box">
                                    <input type="checkbox" id="name" name="scope" onChange={() => {setScope_name(!scope_name); if(!scope_name){ setNum(num+1)} else{setNum(num-1)}}} />
                                    <span className="on"></span>
                                    이름
                                </label>
                                
                                <label  className="chk_box">
                                    <input type="checkbox" id="postion_type" name="scope" onChange={() => {setScope_position_type(!scope_position_type);if(!scope_position_type){ setNum(num+1)} else{setNum(num-1)}}} />
                                    <span className="on"></span>
                                    직급
                                </label>

                            </Grid>
                            <Grid item xs={12} md={2.5}>
                                <label  className="chk_box">
                                    <input type="checkbox" id="age" name="scope" onChange={() => {setScope_age(!scope_age); if(!scope_age){ setNum(num+1)} else{setNum(num-1)}}} />
                                    <span className="on"></span>
                                    연령대
                                </label>
                                <label  className="chk_box">
                                    <input type="checkbox" id="gender" name="scope" onChange={() =>  {setScope_gender(!scope_gender);if(!scope_gender){ setNum(num+1)} else{setNum(num-1)}}} />
                                    <span className="on"></span>
                                    성별
                                </label>
                            </Grid>
                            <Grid item xs={12} md={3.5}>
                                 <label  className="chk_box">
                                    <input type="checkbox" id="company" name="scope" onChange={() =>  {setScope_company(!scope_company);if(!scope_company){ setNum(num+1)} else{setNum(num-1)}}} />
                                    <span className="on"></span>
                                    소속회사
                                </label>

                                <label  className="chk_box">
                                    <input type="checkbox" id="department" name="scope" onChange={() =>  {setScope_department(!scope_department);if(!scope_department){ setNum(num+1)} else{setNum(num-1)}}} />
                                    <span className="on"></span>
                                    부서명
                                </label>
                            </Grid>



                            <Grid item xs={12} md={3.5} textAlign="left">
                                
                            </Grid>
                            <Grid item xs={12} md={8.5} textAlign="left">
                                <span className='cp_message' >{scopeMessage}</span>
                            </Grid>

                            <Grid item xs={12} md={3.5}  textAlign="left">

                            <span className = "cp_label" >한마디</span>
                            </Grid>
                            <Grid item xs={12} md={8.5} mb={5}>
                                <div className='cp_input_box_content'>
                                <textarea className="cp_input" rows="3" style={{"resize" : "none"}} placeholder="your Message" value ={content} onChange = {handleContent}/>
                                </div>
                                <span className = "cp_message" >{contentMessage}</span>

                                <br/>
                                <button className='cp_create_button'onClick={onClickCreate}>생성하기</button> 
                            </Grid>


                          

                            </Grid>



                            {/* <Grid container item justifyContent="center" xs={12} my={2}>
                                <MKButton  variant="gradient" color="dark" fullWidth onClick={onClickCreate}>
                                Create
                                </MKButton>
                            </Grid> */}



                        </MKBox>
                    
                    </Grid>
                </Container>
        </>
    );
};

export default CreatePost;