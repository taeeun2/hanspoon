import { useState } from "react";
import { Box, Grid } from '@mui/material';
import MKBox from "components/MKBox";
import "assets/css/login.css"
import Id_Icon from "assets/images/Icons/icon_ID.png"



const SignInTest = () => {
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
  
    function tomain(){
        document.location.href = '/'
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
        <>
         <Grid className='loginBackground'>
            <Box className='content_box'>
                 <Grid item className='title_box' style={{"marginTop" : "100px"}}>
                 <button className='login_title' onClick={()=>tomain()}>Hanspoon</button>
                </Grid>
                <MKBox component="section">
                    <Grid container  sx={{ justifyContent: 'center' }}>
                        <Grid item className='login_box' xs={12} sm={12} lg={4} key={0}>
                           
                            <Grid container  sx={{ justifyContent: 'center' }}>
                                <MKBox className="IDBox">
                                    <div className="ID_icon"><input className = "inputID" value={inputId} onChange={handleInputId} placeholder="Email address"
                                        onKeyPress={onKeyPress}/></div>
                                </MKBox>
                                <MKBox  mb={1}className="IDBox">
                                    <div className="PW_icon"><input className = "inputID" value={inputPw} onChange={handleInputPw}  type = "password" placeholder="Password"
                                     onKeyPress={onKeyPress}/></div>
                                </MKBox>
                                <Grid item mb = {1} style={{"width" : "100%"}}>
                                <span className="login_message">{message}</span>
                                </Grid>
                                <button type="button" className='buttonLogin' onClick={onClickLogin}>
                                    Login
                                </button>
                            </Grid>                         
                        </Grid>

                    </Grid>
                </MKBox>
            </Box>
        </Grid>
                </>
    )
}

export default SignInTest;