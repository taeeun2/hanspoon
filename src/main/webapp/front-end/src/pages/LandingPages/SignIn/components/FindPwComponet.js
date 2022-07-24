import { useState } from "react";
import { Grid } from '@mui/material';
import MKBox from "components/MKBox";
import "assets/css/login.css"
import "assets/css/findPW.css"
import { Link } from "react-router-dom";
import alertify from "alertifyjs";
const FindPwComponent = () => {
    const [inputId, setInputId] = useState('')
    const [inputName, setInputName] = useState('')
    const [message, setMessage] = useState('')
  
    const [isId, setIsId] = useState(false)
    const [isName, setIsName] = useState(false)

    const handleInputId = (e) => {
        setInputId(e.target.value)
        setMessage('')
        if(e.target.value.length >= 1){
          setIsId(true)
        }else{
          setIsId(false)
        }
    }

    const handleInputName = (e) => {
        setInputName(e.target.value)
        setMessage('')
        if(e.target.value.length >= 1){
          setIsName(true)
        }else{
          setIsName(false)
        }
    }

    const onKeyPress = (e) => {
        if(e.key == 'Enter'){
            onClickfindPW()
        }
    }

    const onClickfindPW = () => {


        fetch('http://172.27.1.33:8080/findPw',{
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        email : inputId,
                        user_name : inputName
                    })
                }).then(res =>{
                    return res.json();
                }).then(data=>{
                    if(data.errorMessage == undefined){
                     alertify.alert('Hanspoon<hr>', '이메일로 임시 비밀번호가 발급되었습니다.',function(){});
                    }else{
                        setMessage(data.errorMessage)
                    }

                })

    }
    return (
        <div>
               
               <Grid container  sx={{ justifyContent: 'center' }}>

                                <span className="findPW_title"></span>
                                <MKBox className="findPWinputBox">
                                    <input className = "findPWinputID" value={inputId} onChange={handleInputId} placeholder="아이디(이메일) 입력"
                                        onKeyPress={onKeyPress}/>
                                </MKBox>
                                <MKBox  mb={1}className="findPWinputBox">
                                    <input className = "findPWinputID" value={inputName} onChange={handleInputName} placeholder="사용자 이름 입력"
                                        onKeyPress={onKeyPress}/>
                                </MKBox>
                                <Grid item mb = {1} style={{"width" : "100%", "textAlign" : "center"}}>
                                    <span className="login_message" >{message}</span>
                                </Grid>
                                <Grid item mb = {1} style={{"width" : "80%", "textAlign" : "center"}}>
                                <button type="button" className='buttonLogin' onClick={onClickfindPW}>
                                비밀번호 찾기
                                </button>
                                <Grid item mb = {1} style={{"width" : "100%", "textAlign" : "center"}}>
                                    <Link to="/signin"><span className="findPw_message" >로그인</span></Link>
                                </Grid>
                                </Grid>
                            </Grid>        
        </div>
    );
};

export default FindPwComponent;