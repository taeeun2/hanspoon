import React, { useState, useEffect } from 'react';
import MKBox from "components/MKBox";
import MKTypography from 'components/MKTypography';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MKButton from 'components/MKButton';
import RestaurantLocation from './RestaurantLocation';
import { useNavigate } from 'react-router-dom';
import date from "assets/images/hanspoon/detailPost/icon_date.png"
import map from "assets/images/hanspoon/detailPost/icon_map.png"
import link from "assets/images/hanspoon/detailPost/icon_link.png"

import "assets/css/detailPost.css"
import { Divider } from '@mui/material';
import GitHub from '@mui/icons-material/GitHub';

const DetailContent = ({clickedId, postData}) => {
    const [scope_name, setScope_name] = useState(false);
    const [scope_age, setScope_age] = useState(false);
    const [scope_company, setScope_company] = useState(false);
    const [scope_position_type, setScope_position_type] = useState(false);
    const [scope_gender, setScope_gender] = useState(false);
    const [scope_department, setScope_department] = useState(false);
    const [userId, setUserId] = useState(sessionStorage.getItem('user_id'));
    const [isGuest, setIsGuest] = useState(false)

    const navigate = useNavigate();
   

    useEffect(()=>{
        postData.guestInfo.map(guest => {
            if(parseInt(guest.id) === parseInt(userId)){
                setIsGuest(true)
            }
        })
    },[])

    
    const [num, setNum] = useState(0) //선택된 공개범위 개수
    const [isEdit, setIsEdit] = useState(false)//수정 버튼 클릭 시 true
    const [title, setTitle] = useState(postData.title)
    const [content, setContent] = useState(postData.content)
    const [contentMessage, setContentMessage] = useState('')


    /* 신청 API */
    function onClickApply() {
        if(sessionStorage.getItem('user_id') == null){
            alert('로그인 후 이용 가능합니다.')
        }
        else if(num < 2){
            alert('공개 범위를 2개 이상 선택해주세요.')
        } else {
            fetch('http://172.27.1.33:8080/applyPost', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    post_id : clickedId, 
                    user_id : sessionStorage.getItem('user_id'), 
                    scope_name : scope_name,
                    scope_gender :scope_gender,
                    scope_company : scope_company,
                    scope_position_type : scope_position_type,
                    scope_department :scope_department,
                    scope_age : scope_age
                })
            }).then(res => {
                alert('모임 신청이 완료되었습니다.')
                window.location.replace(`/detailPost/${clickedId}`)
            })
        }
    }


    // 모임 취소 api
    function onClickCancel(){
        fetch(`http://172.27.1.33:8080/cancelApply/${clickedId}?user=${userId}`)
        .then(res =>{
            alert('모임신청이 취소되었습니다.')
            window.location.replace(`/detailPost/${clickedId}`)
        })
    }

    //모임 삭제 api
    function onClickDelete(){
        if (window.confirm("삭제하시겠습니까?")){
                fetch(`http://172.27.1.33:8080/deletePost/${clickedId}`)
                .then(res =>{
                    alert('모임이 삭제되었습니다.');
                    navigate('/mypage');
                    
            })
        }
    }

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleContent = (e) => {
        setContent(e.target.value)
        if(content.length < 10){
            setContentMessage('최소 10자 이상 입력해주세요.')
        }else{
            setContentMessage('')
        }
    }
    function onClickEdit(){
        alert('제목과 한마디만 수정이 가능합니다.')
        setIsEdit(true)
    }

    function onClickEditCancel(){
        setIsEdit(false)
    }

    // 수정 api
    function onClickCompleteEdit(){
        if(title.length < 1){
            alert('제목을 입력해주세요.')
        }else if(content.length < 10){
            alert('한마디를 최소 10자 이상 입력해주세요.')
        }else{

            fetch('http://172.27.1.33:8080/editPost',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    post_id : clickedId,
                    title : title,
                    content : content
                })
            }).then(res =>{
                alert('모임 정보가 수정되었습니다.')
                window.location.replace(`/detailPost/${clickedId}`)
            })

        }
    }

    return (
        <div>
             <MKBox component="section" py={15}>
            <Container className='detailContent'>

                    <Grid container item xs={12} lg={12} mx="auto" mb={5} sx={{ justifyContent: 'center'}}>
                        {/* 글 제목 (수정 가능)*/}
                        {!isEdit ? 
                        <span className='detailTitle'>
                            {postData.title}
                        </span > : 
                        <input value={title} className='detailTitle' style={{"border" : "1.5px solid #bbbbbb", "fontFamily" : "NanumSquareRound", "width" : "100%"}}onChange={handleTitle}/>
                        }
                        
                        
                    </Grid>
                    
                    <Grid container item xs={12} lg={12} mx="auto" sx={{ justifyContent: 'center'}}>
                        {/* 작성자 정보 */}
                        <span className='detailHost' style={{"marginRight" : "10px"}}>{postData.hostInfo.name}</span>
                        <span className='detailHost' style={{"marginRight" : "10px"}}>🥄{postData.hostInfo.spoon_num}</span>
                        <span className='detailHost'>|</span>
                        {postData.hostInfo.company && <span className='detailHost'>{postData.hostInfo.company}</span>}
                        {postData.hostInfo.position && <span className='detailHost'>{postData.hostInfo.position}</span>}
                        {postData.hostInfo.department && <span className='detailHost'>{postData.hostInfo.department}</span>}
                        {postData.hostInfo.gender && <span className='detailHost'>{postData.hostInfo.gender}</span>}
                        {postData.hostInfo.age && <span className='detailHost'>{postData.hostInfo.age}</span>}

                    </Grid>
                    
                    <hr/>
                    <Grid container item xs={12} lg={12} mx="auto" direction="row">
                            
                            {/* 모임 정보 */}

                             {/* 왼쪽 페이지 */}
                            <Grid container md={7}>
                                    
                                  
                                    <Grid item xs={12} md={12} mt={3} >
                                    <img src={date}></img><span className='sub_title'>모임 정보</span>
                                    </Grid>
                                    
                                     {/* 식사 일시 */}
                                     <Grid item xs={12} md={3} mt={3}>
                                        <span className='content_label'>식사 일시</span>
                                    </Grid>

                                    <Grid item xs={12} md={8} mt={3}>
                                        <span className='content'>{postData.meet_date} {postData.meet_time}</span>
                                    </Grid>

                                    {/* 모집 인원 */}
                                    <Grid item xs={12} md={3} mt={3}>
                                        <span className='content_label'>모집 인원</span>
                                    </Grid>

                                    <Grid item xs={12} md={8} mt={3}>
                                        <span className='content'>🙋‍♂️{postData.participant_num}/{postData.capacity}</span>
                                        
                                        <Grid className='guest_box'mt={2}>
                                        
                                        <Grid container>
                                        <Grid md = {1.8}><span style={{"fontSize" : "17px", "marginLeft": "5px","fontWeight" : "bolder"}}>주최자</span></Grid>
                                            <Grid md ={10}>
                                                <Grid container>
                                                    
                                                    <Grid md={1.7}><span  style={{"fontSize" : "16px"}}>{postData.hostInfo.name}</span></Grid>
                                                    <Grid md={1.25}><span  style={{"fontSize" : "16px"}}>🥄{postData.hostInfo.spoon_num}</span></Grid>
                                                    <Grid md={0.5}><span  style={{"fontSize" : "16px"}}>|</span></Grid>
                                                    <Grid md={8}>
                                                    {postData.hostInfo.company && <span  style={{"fontSize" : "16px","marginRight" : "10px"}} >{postData.hostInfo.company}</span>}
                                                    {postData.hostInfo.position && <span  style={{"fontSize" : "16px","marginRight" : "10px"}}>{postData.hostInfo.position}</span>}
                                                    {postData.hostInfo.department && <span  style={{"fontSize" : "16px","marginRight" : "10px"}}>{postData.hostInfo.department}</span>}
                                                    {postData.hostInfo.gender && <span style={{"fontSize" : "16px","marginRight" : "10px"}}>{postData.hostInfo.gender}</span>}
                                                    {postData.hostInfo.age && <span  style={{"fontSize" : "16px","marginRight" : "10px"}}>{postData.hostInfo.age}</span>}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        {/* 모집된 인원 정보 */}
                                        {postData.guestInfo.length >= 1 && <>
                                            {/* <hr/> */}
                                            <Grid container>
                                            <Grid  mt ={2} md={1.8} >
                                            <span style={{"fontSize" : "17px", "marginLeft": "5px","fontWeight" : "bolder" }}>참여자</span>
                                            </Grid>
                                            <Grid  mt ={2} md={10} >
                                                
                                                {postData.guestInfo.map((guest, index)=>(
                                            <>
                                                <Grid container>
                                                <Grid md={1.7}><span style={{"fontSize" : "16px"}}>{guest.name}</span></Grid>
                                                <Grid md={1.25}><span style={{"fontSize" : "16px"}}>🥄{guest.spoon_num}</span></Grid>
                                                <Grid md={0.5}><span  style={{"fontSize" : "16px"}}>|</span></Grid>
                                                <Grid md={8}>
                                                {guest.company && <span style={{"fontSize" : "16px","marginRight" : "10px"}}>{guest.company}</span>}
                                                {guest.position && <span  style={{"fontSize" : "16px","marginRight" : "10px"}}>{guest.position}</span>}
                                                {guest.department && <span  style={{"fontSize" : "16px","marginRight" : "10px"}}>{guest.department}</span>}
                                                {guest.gender && <span  style={{"fontSize" : "16px","marginRight" : "10px"}}>{guest.gender}</span>}
                                                {guest.age && <span  style={{"fontSize" : "16px","marginRight" : "10px"}}>{guest.age}</span>}
                                                </Grid>
                                                </Grid>
                                          
                                            </>
                                            ))} </Grid>
                                            </Grid></>}
                                            </Grid>
                                            </Grid>
                                   
                                    
                                    {/* 카테 고리 */}
                                    <Grid item xs={12} md={3} mt={3}>
                                        <span className='content_label'>카테 고리</span>
                                    </Grid>

                                    <Grid item xs={12} md={8} mt={3}>
                                        <span className='content'>{postData.category.category_name}</span>
                                    </Grid>

                                

                                     {/* 식당 주소 */}
                                    <Grid item xs={12} md={3} mt={3}>
                                        <span className='content_label'>주소</span>
                                    </Grid>
                                    
                                    <Grid item xs={12} md={8} mt={3}>
                                        <span className='content'>{postData.restaurant_address}</span>
                                    </Grid>

                                    {/* 한 마디 (수정 가능) */}
                                    <Grid item xs={12} md={3} mt={3}>
                                        <span className='content_label'>한마디</span>
                                    </Grid>
                                    
                                    <Grid item xs={12} md={8} mt={3}>
                                        {!isEdit ? 
                                        
                                            <span className='content'>{postData.content}</span>
                                            
                                        :   <>
                                            <div className='cp_input_box_content'>
                                                <textarea  className='cp_input' rows = "4" style={{"resize" : "none"}} value ={content} onChange={handleContent}/>
                                            </div>
                                            <span style={{"color" : "red", "fontSize" : "15px"}}>{contentMessage}</span>
                                            </>
                                        }
                                        
                                    </Grid>
                                    

                                    {/* 참여할 때만 공개범위가 보이도록 설정 */}
                                    {postData.state === 'VALID' && <> {parseInt(postData.hostInfo.id) !== parseInt(userId) && <>{!isGuest &&
                                    <>
                                    <Grid item xs={12} md={3} mt={3} >
                                        <span className='content_label'>공개 범위</span>
                                    </Grid>
                                    <Grid item xs={12} md={2}  mt={3} mr ={1}>

                                        <label  className="chk_box" style={{ "fontSize" : "16px"}} >
                                            <input type="checkbox" id="name" name="scope" onChange={() => {setScope_name(!scope_name); if(!scope_name){ setNum(num+1)} else{setNum(num-1)}}} />
                                            <span className="on" style={{"width" : "25px", "height" : "25px", "marginTop" : "3px"}}></span>
                                            <span style={{"marginLeft" : "10px"}}>이름</span>
                                        </label>
                                        
                                        <br/><br/>

                                        <label  className="chk_box" style={{ "fontSize" : "16px"}}>
                                            <input type="checkbox" id="postion_type" name="scope" onChange={() => {setScope_position_type(!scope_position_type);if(!scope_position_type){ setNum(num+1)} else{setNum(num-1)}}} />
                                            <span className="on" style={{"width" : "25px", "height" : "25px", "marginTop" : "3px"}}></span>
                                            <span style={{"marginLeft" : "10px"}}>직급</span>
                                        </label>

                                    </Grid>
                                    <Grid item xs={12} md={2} mt={3} mr ={1}>

                                    <label  className="chk_box" style={{ "fontSize" : "16px"}}>
                                        <input type="checkbox" id="age" name="scope" onChange={() => {setScope_age(!scope_age); if(!scope_age){ setNum(num+1)} else{setNum(num-1)}}} />
                                        <span className="on" style={{"width" : "25px", "height" : "25px", "marginTop" : "3px"}}></span>
                                        <span style={{"marginLeft" : "10px"}}>연령대</span>
                                    </label>

                                    <br/><br/>

                                    <label  className="chk_box" style={{ "fontSize" : "16px"}}>
                                        <input type="checkbox" id="gender" name="scope" onChange={() =>  {setScope_gender(!scope_gender);if(!scope_gender){ setNum(num+1)} else{setNum(num-1)}}} />
                                        <span className="on" style={{"width" : "25px", "height" : "25px", "marginTop" : "3px"}}></span>
                                        <span style={{"marginLeft" : "10px"}}>성별</span>
                                    </label>
                                    
                                    </Grid>
                                    <Grid item xs={12} md={2} mt={3} mr ={1}>

                                        <label  className="chk_box" style={{ "fontSize" : "16px"}}> 
                                            <input type="checkbox" id="company" name="scope" onChange={() =>  {setScope_company(!scope_company);if(!scope_company){ setNum(num+1)} else{setNum(num-1)}}} />
                                            <span className="on" style={{"width" : "25px", "height" : "25px", "marginTop" : "3px"}}></span>
                                            <span style={{"marginLeft" : "10px"}}>소속회사</span>
                                        </label>

                                        <br/><br/>

                                        <label  className="chk_box" style={{ "fontSize" : "16px"}}>
                                            <input type="checkbox" id="department" name="scope" onChange={() =>  {setScope_department(!scope_department);if(!scope_department){ setNum(num+1)} else{setNum(num-1)}}} />
                                            <span className="on" style={{"width" : "25px", "height" : "25px", "marginTop" : "3px"}}></span>
                                            <span style={{"marginLeft" : "10px"}}>부서명</span>
                                        </label>
                                    </Grid>
                                
                                    </>
                                    
                                    }</>}</>}
                                   
                                    

                            </Grid>
                                    
                            {/* 오른쪽 페이지 */}
                            <Grid container spacing={3} md={5}>
                                <Grid item xs={12} md={12} mt={3} >
                                    <img src={map}></img><span className='sub_title'>모임 장소</span>
                                </Grid>
                                <Grid item xs={12} md={3} mt={3}>
                                        <span className='content_label'>식당 이름</span>
                                    </Grid>
                                <Grid item xs={12} md={8} mt={3} >
                                    <span>{postData.restaurant_name}</span>
                                </Grid>
                                <Grid item xs={12} md={12} mt={3}> 
                                    {/* 카카오 지도 api */}
                                    <RestaurantLocation restaurant =   {postData.restaurant_address + postData.restaurant_name} ></RestaurantLocation>
                                </Grid>

                                <Grid item xs={12} md={12} mt={2}>
                                    <img src={link}></img><button  style={{"marginLeft" : "10px"}}onClick={() => window.open(`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${postData.restaurant_name}`, '_blank')}>
                                        {postData.restaurant_name} 둘러보기</button>
                                </Grid>
                            </Grid>



                            {/* restNum이 1이상일 때만 버튼 활성화 */}
                            <Grid container item justifyContent="center" xs={12} my={2} mt = {12}>

                                {/* 모집 마감 상태이면서 작성자일 때 삭제 버튼만 보이도록 */}
                                {postData.state === 'EXPIRED' && <> 
                                    {parseInt(postData.hostInfo.id) === parseInt(userId) && <>
                                        <button className='buttonDesign' style={{"backgroundColor" : "rgb(185, 8, 8)"}}onClick={onClickDelete}>
                                        삭제하기
                                        </button>
                                    </>}
                                        
                                </>}


                                {/* 모집 마감 상태가 아닐 때*/}
                                {postData.state !== 'EXPIRED' && <>
                                    {/* 작성자일 때 수정/삭제 버튼 */}
                                    {parseInt(postData.hostInfo.id) === parseInt(userId) ?
                                        <>
                                        {/* 수정하기 클릭 여부에 따라 수정/삭제 or 수정완료/취소 버튼으로 나누기 */}
                                        {!isEdit ? <>
                                        <button className='buttonDesign'  onClick ={onClickEdit}>
                                        수정하기
                                        </button>
                                        <button className='buttonDesign'  style={{"backgroundColor" : "rgb(185, 8, 8)","marginLeft" : "15px"}} onClick={onClickDelete}>
                                        삭제하기
                                        </button></> : 
                                        <>
                                         <button className='buttonDesign' onClick={onClickCompleteEdit}>
                                        수정완료
                                        </button>
                                        <button className='buttonDesign'  style={{"backgroundColor" : "rgb(185, 8, 8)","marginLeft" : "15px"}} onClick={onClickEditCancel}>
                                        취소
                                        </button>
                                        </>
                                         }
                                        </>

                                    :
                                        <>
                                    {isGuest ?
                                        // 참가자 일 경우 취소 버튼
                                        <button className='buttonDesign' style={{"backgroundColor" : "rgb(185, 8, 8)"}} onClick={onClickCancel}>
                                        취소하기
                                        </button>
                                        // 참가자가 아니면서 인원 마감이 안됐을 경우 참여하기 버튼
                                        : <>{postData.state !=='FULL' && 
                                        <button className='buttonDesign' onClick={onClickApply}>
                                        참여하기
                                        </button>
                                        } </>
                                    }
                                        </> 
                                    }
                                    </>
                                }
                                </Grid>







                                
                    </Grid>  
            </Container>
            </MKBox>
        </div>
    );
};

export default DetailContent;