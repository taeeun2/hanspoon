import React, { useState, useEffect } from 'react';
import MKBox from "components/MKBox";
import MKTypography from 'components/MKTypography';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MKButton from 'components/MKButton';
import RestaurantLocation from './RestaurantLocation';
import { useNavigate } from 'react-router-dom';


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

    /* 테스트 필요 */
    const [num, setNum] = useState(0) //선택된 공개범위 개수
    // const [postId, setPostId] = useState(postData.post_id)
    // const [userId, setUserID] = useState(sessionStorage.getItem('user'))
    // const [restNum, setRestNum] = useState(postData.capacity - postData.participant_num) //신청 가능한 인원수

    /* 신청 API */
    function onClickApply() {
        if(sessionStorage.getItem('user_id') == null){
            alert('로그인 후 이용 가능합니다.')
        }
        else if(num < 2){
            alert('공개 범위를 2개 이상 선택해주세요.')
        } else {
            fetch('http://localhost:8080/applyPost', {
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


    function onClickCancel(){
        fetch(`http://localhost:8080/cancelApply/${clickedId}?user=${userId}`)
        .then(res =>{
            alert('모임신청이 취소되었습니다.')
            window.location.replace(`/detailPost/${clickedId}`)
        })
    }

    function onClickDelete(){
        fetch(`http://localhost:8080/deletePost/${clickedId}`)
        .then(res =>{
            alert('모임이 삭제되었습니다.');
            navigate('/mypage');
    })
    }

    return (
        <div>
             <MKBox component="section" py={2}>
            <Container>

                    <Grid container item xs={12} lg={6} mx="auto" mb={2} >

                        {/* 글 제목 */}
                        <MKTypography variant="h2">
                            {postData.title}
                        </MKTypography >
                        
                    </Grid>
                    <Grid container item xs={12} lg={6} mx="auto" >
                        {/* 작성자 정보 */}
                        <MKTypography variant="h6" mr = {8}>{postData.hostInfo.name}🥄{postData.hostInfo.spoon_num}</MKTypography>
                        {postData.hostInfo.company && <MKTypography variant="h6" mr={3}>{postData.hostInfo.company}</MKTypography>}
                        {postData.hostInfo.position && <MKTypography variant="h6"  mr={3}>{postData.hostInfo.position}</MKTypography>}
                        {postData.hostInfo.department && <MKTypography variant="h6"  mr={3}>{postData.hostInfo.department}</MKTypography>}
                        {postData.hostInfo.gender && <MKTypography variant="h6"  mr={3}>{postData.hostInfo.gender}</MKTypography>}
                        {postData.hostInfo.age && <MKTypography variant="h6" >{postData.hostInfo.age}</MKTypography>}
                    </Grid>

                    <Grid container item xs={12} lg={6} mx="auto" >
                        <MKBox width="100%">
                            <hr/>
                            {/* 모임 정보 */}
                            <Grid container >

                                    {/* 식사 일시 */}
                                    <Grid item xs={12} md={3} mt={3}>
                                        <MKTypography variant="h6">식사 일시</MKTypography>
                                    </Grid>

                                    <Grid item xs={12} md={8} mt={3}>
                                        <MKTypography variant="h6" style={{"fontWeight" : "lighter"}}>{postData.meet_date} {postData.meet_time}</MKTypography>
                                    </Grid>


                                    {/* 모집 인원 */}
                                    <Grid item xs={12} md={3} mt={3}>
                                        <MKTypography variant="h6">모집 인원</MKTypography>
                                    </Grid>

                                    <Grid item xs={12} md={8} mt={3}>
                                        <MKTypography variant="h6" style={{"fontWeight" : "lighter"}}>🙋‍♂️{postData.participant_num}/{postData.capacity}</MKTypography>
                                        
                                        {/* 모집된 인원 정보 */}
                                        {postData.guestInfo && <>{postData.guestInfo.map((guest, index)=>(
                                            <div style={{"border" : "1px solid gray","margin" : "3px"}}>
                                            <span style={{"fontSize" : "13px","marginRight" : "10px"}} key={index}>{guest.name}🥄{guest.spoon_num}</span>
                                            {guest.company && <span style={{"fontSize" : "13px","marginRight" : "10px"}}>{guest.company}</span>}
                                            {guest.position && <span  style={{"fontSize" : "13px","marginRight" : "10px"}}>{guest.position}</span>}
                                            {guest.department && <span  style={{"fontSize" : "13px","marginRight" : "10px"}}>{guest.department}</span>}
                                            {guest.gender && <span  style={{"fontSize" : "13px","marginRight" : "10px"}}>{guest.gender}</span>}
                                            {guest.age && <span  style={{"fontSize" : "13px","marginRight" : "10px"}}>{guest.age}</span>}
                                            </div>
                                            ))}</>}
                                        
                                    </Grid>
                                    
                                    {/* 카테 고리 */}
                                    <Grid item xs={12} md={3} mt={3}>
                                        <MKTypography variant="h6">카테 고리</MKTypography>
                                    </Grid>

                                    <Grid item xs={12} md={8} mt={3}>
                                        <MKTypography variant="h6" style={{"fontWeight" : "lighter"}}>{postData.category.category_name}</MKTypography>
                                    </Grid>

                                    {/* 식당 이름 */}
                                    <Grid item xs={12} md={3} mt={3}>
                                        <MKTypography variant="h6">식당 이름</MKTypography>
                                    </Grid>

                                    <Grid item xs={12} md={8} mt={3}>
                                        <MKTypography variant="h6" style={{"fontWeight" : "lighter"}}>{postData.restaurant_name}</MKTypography>
                                    </Grid>

                                    {/* 식당 위치 */}
                                    <Grid item xs={12} md={3} mt={3}>
                                        <MKTypography variant="h6">위치</MKTypography>
                                    </Grid>

                                    <Grid item xs={12} md={8} mt={3}>
                                        {/* 카카오 지도 api */}
                                        <RestaurantLocation restaurant =   {postData.restaurant_address + postData.restaurant_name} restaurant_name = {postData.restaurant_name}></RestaurantLocation>
                                    </Grid>

                                     {/* 식당 주소 */}
                                    <Grid item xs={12} md={3} mt={3}>
                                        <MKTypography variant="h6">주소</MKTypography>
                                    </Grid>
                                    
                                    <Grid item xs={12} md={8} mt={3}>
                                        <MKTypography variant="h6" style={{"fontWeight" : "lighter"}}>{postData.restaurant_address}</MKTypography>
                                    </Grid>

                                    {/* 한 마디 */}
                                    <Grid item xs={12} md={3} mt={3}>
                                        <MKTypography variant="h6">한마디</MKTypography>
                                    </Grid>

                                    <Grid item xs={12} md={8} mt={3}>
                                        <MKTypography variant="h6" style={{"fontWeight" : "lighter"}}>{postData.content}</MKTypography>
                                    </Grid>
                                    

                                    {/* 참여할 때만 공개범위가 보이도록 설정 */}
                                    {postData.state === 'VALID' && <> {parseInt(postData.hostInfo.id) !== parseInt(userId) && <>{!isGuest &&
                                    <>
                                    <Grid item xs={12} md={3} mt={3} >
                                        <MKTypography variant="h6">공개 범위</MKTypography>
                                    </Grid>
                                    <Grid item xs={12} md={2}  mt={3} mr ={1}>

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
                                    <Grid item xs={12} md={2} mt={3} mr ={1}>

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
                                    <Grid item xs={12} md={2} mt={3} mr ={1}>

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
                                
                                    </>
                                    
                                    }</>}</>}
                                   
                                    {/* restNum이 1이상일 때만 버튼 활성화 */}
                                    <Grid container item justifyContent="center" xs={12} my={2} mt = {5}>

                                    {/* 모집 마감 상태이면서 작성자일 때 삭제 버튼만 보이도록 */}
                                    {postData.state === 'EXPIRED' && <> 
                                        {parseInt(postData.hostInfo.id) === parseInt(userId) && <>
                                            <MKButton type="submit" variant="gradient" color="info" onClick={onClickDelete}>
                                             삭제하기
                                           </MKButton>
                                        </>}
                                            
                                    </>}

                                    
                                    {/* 모집 마감 상태가 아닐 때*/}
                                    {postData.state !== 'EXPIRED' && <>
                                        {/* 작성자일 때 수정/삭제 버튼 */}
                                        {parseInt(postData.hostInfo.id) === parseInt(userId) ?
                                            <>
                                            <MKButton type="submit" variant="gradient" color="info"  style={{
                                                "marginRight" : "15px"  
                                            }}>
                                             수정하기
                                            </MKButton>
                                            <MKButton type="submit" variant="gradient" color="info" onClick={onClickDelete}>
                                             삭제하기
                                           </MKButton>
                                           </>

                                           :
                                            <>
                                           {isGuest ?
                                            // 참가자 일 경우 취소 버튼
                                            <MKButton type="submit" variant="gradient" color="info" fullWidth onClick={onClickCancel}>
                                            취소하기
                                            </MKButton>
                                            // 참가자가 아니면서 인원 마감이 안됐을 경우 참여하기 버튼
                                            : <>{postData.state !=='FULL' && 
                                            <MKButton type="submit" variant="gradient" color="info" fullWidth onClick={onClickApply}>
                                            참여하기
                                            </MKButton>
                                            } </>
                                        }
                                            </> 
                                        }
                                        </>
                                    }
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