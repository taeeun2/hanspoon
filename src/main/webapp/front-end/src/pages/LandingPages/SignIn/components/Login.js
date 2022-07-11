import { useState } from "react";
import { Box, Grid } from '@mui/material';
import MKBox from "components/MKBox";
import "assets/css/login.css"
import { Link } from "react-router-dom";
const Login = () => {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [message, setMessage] = useState('')
  
    const [isId, setIsId] = useState(false)
    const [isPw, setIsPw] = useState(false)
  
    const handleInputId = (e) => {
        setInputId(e.target.value)
        setMessage('')
        if(e.target.value.length >= 1){
          setIsId(true)
        }else{
          setIsId(false)
        }
    }
  
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
        setMessage('')
        if(e.target.value.length >= 1){
          setIsPw(true)
        }else{
          setIsPw(false)
        }
    }
  
    const onClickLogin = () => {
  
        fetch('http://localhost:8080/login',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
             },
            body : JSON.stringify({
                email : inputId,
                password : inputPw
            })
        }).then(res => {
            return res.json();
        })
        .then(data =>{
    
            if(isId === false){
              setMessage('아이디를 입력해주세요.')
            }else if(isPw === false){
              setMessage('비밀번호를 입력해주세요.')
            }else if(data.user_id !== undefined){
                sessionStorage.setItem('user_id',data.user_id)
                sessionStorage.setItem('user_email',data.email)
                sessionStorage.setItem('user_company_id',data.company_id)
                sessionStorage.setItem('user_department_id',data.department_id)
                sessionStorage.setItem('user_name',data.user_name)
                sessionStorage.setItem('spoon_num',data.spoon_num)
                document.location.href='/'
            }else{
                setMessage(data.errorMessage)
            }
    
        
        })
      }
  
      const onKeyPress = (e) => {
          if(e.key == 'Enter'){
              onClickLogin()
          }
      }
    
    
    return (
        <div>
               
               <Grid container  sx={{ justifyContent: 'center' }}>
                                <MKBox className="IDBox">
                                    <div className="ID_icon"><input className = "inputID" value={inputId} onChange={handleInputId} placeholder="Email address"
                                        onKeyPress={onKeyPress}/></div>
                                </MKBox>
                                <MKBox  mb={1}className="IDBox">
                                    <div className="PW_icon"><input className = "inputID" value={inputPw} onChange={handleInputPw}  type = "password" placeholder="Password"
                                     onKeyPress={onKeyPress}/></div>
                                </MKBox>
                                <Grid item mb = {1} style={{"width" : "100%", "textAlign" : "center"}}>
                                <span className="login_message" >{message}</span>
                                </Grid>
                                <button type="button" className='buttonLogin' onClick={onClickLogin}>
                                    Login
                                </button>
                                <Grid item mb = {1} style={{"width" : "100%", "textAlign" : "center"}}>
                                    <Link to="/findPw"><span className="findPw_message" >비밀번호 찾기</span></Link>
                                    <span className="findPw_message" >  |  </span>
                                    <Link to="/signup"><span className="findPw_message" >회원 가입</span></Link>
                                </Grid>
                            </Grid>        
        </div>
    );
};

export default Login;