import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import "assets/css/signup.css"
import "assets/css/login.css"

import { Form } from "react-bootstrap";
import { Box } from "@mui/material";
import MKBox from "components/MKBox";
import { useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';

const ageMenu = [
    { value: "TWENTY", name: "20대" },
    { value: "THIRTY", name: "30대" },
    { value: "FORTY", name: "40대" },
    { value: "FIFTY", name: "50대" },
    { value: "OVER_SIXTY", name: "60대 이상" },
];

const companyMenu = [
	{ value: "1", name: "한솔 인티큐브" },
	{ value: "2", name: "한솔 PNS" },
];

const SignUpTest= () => {
    const [position_typeMenu, setPosition_typeMenu] = useState([]);
    const [departmentMenu, setDepartmentMenu] = useState([]);

    useEffect(()=>{
        fetch('http://172.27.1.33:8080/select-all/position_type')
        .then(res=>{
            return res.json()
            
        })
        .then(data =>{
            setPosition_typeMenu(data)
        })

        fetch(`http://172.27.1.33:8080/select/department/1`)
        .then(res=>{
            return res.json()
        })
        .then(data =>{
            setDepartmentMenu(data)
            
        })
    },[])

    const [email, setEmail] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [emailColor, setEmailColor] = useState('')

    const [authCode, setAuthCode] = useState('');
    const [inputAuthCode, setInputAuthCode] = useState('');
    const [authCodeMessage, setAuthCodeMessage] = useState('')
    const [authCodeColor, setAuthCodeColor] = useState('')

    const [password, setPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('')
    const [passwordColor, setPasswordColor] = useState('')

    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')
    const [passwordConfirmColor, setPasswordConfirmColor] = useState('')

    const [userName, setUserName] = useState('')
    const [userNameMessage, setUserNameMessage] = useState('')

    const [age, setAge] = useState('TWENTY')

    const [gender, setGender] = useState('');
    const [genderMessage, setGenderMessage] = useState('');

    const [department, setDepartment] = useState('');
    const [departmentMessage, setDepartmentMessage] = useState('')
    const [position_type, setPosition_type] = useState(1)
    const [company, setCompany] = useState(1)

    const [isEmail, setIsEmail] = useState(false)
    const [isAuthCode, setIsAuthCode] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)
    const [isUserName, setIsUserName] = useState(false)
    const [isGender, setIsGender] = useState(false)

    const navigate = useNavigate();

    // 체크 박스 하나만 선택
    const checkGender= (checkThis) => {
        const checkboxes = document.getElementsByName('gender')
        setGender(checkThis.id)
        var sum = 0
        for (let i = 0; i < checkboxes.length; i++) {
          if(checkboxes[i].checked == false){
            sum+=1
          }
          if (checkboxes[i] !== checkThis) {
            checkboxes[i].checked = false
          }
        }

        if(sum == 2){
            setIsGender(false)
        }else{
            setIsGender(true)
            setGenderMessage('')
        }

      }


    // 이메일 유효성 검사
    const handleInputEmail = (e) => {
        setEmailMessage('')
        const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        setEmail(e.target.value)
        if(e.target.value.length >= 1){
            if(!emailRegex.test(e.target.value)){
                setEmailColor('red')
                setEmailMessage('이메일 형식이 맞지 않습니다.')
            }else{
                setEmailColor('green')
                setEmailMessage('올바른 이메일 형식입니다.')
            }
            setIsEmail(true)
        }else{
            setIsEmail(false)
        }

        
       
        setInputAuthCode('')
        setIsAuthCode(false)
        setAuthCodeMessage('')
    }

    // 인증 코드
    const handleInputAuthCode = (e) => {
        setAuthCodeMessage('')
        setInputAuthCode(e.target.value)
    }

    // 패스워드 유효성 검사
    const handlePassword = (e) => {
        setPasswordConfirm('')
        setPasswordConfirmMessage('')
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        setPassword(e.target.value)

        if(!passwordRegex.test(e.target.value)){
            setPasswordColor('red')
            setPasswordMessage('숫자+영문자+특수문자조합으로 8자리 이상 입력해주세요')
            setIsPassword(false)
        }
        else{
            setPasswordColor('green')
            setPasswordMessage('안전한 비밀번호입니다.')
            setIsPassword(true)
        }
    }
    
    // 비밀번호 일치 여부 확인
    const handlePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value)
        if(isPassword){
            if(password === e.target.value){
                setPasswordConfirmColor('green')
                setPasswordConfirmMessage('비밀번호가 일치합니다.')
                setIsPasswordConfirm(true)
            }
            else{
                setPasswordConfirmColor('red')
                setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.')
                setIsPasswordConfirm(false)
            }
    }
    }

    // 사용자 이름
    const handleUserName = (e) => {
        setUserNameMessage('')
        setIsUserName(false)
        setUserName(e.target.value)
        if(e.target.value.length >= 1){
            setIsUserName(true)
        }
    }


    // 나이
    const handleAge = (e) => {
        setAge(e.target.value)
    }


    // 해당 회사의 부서 데이터 가져오기
    const handleCompany = (e) => {
        setCompany(e.target.value)
        
        fetch(`http://172.27.1.33:8080/select/department/${e.target.value}`)
        .then(res=>{
            return res.json()
        })
        .then(data =>{
            setDepartmentMenu(data)
            setDepartment('')

        })
    }
    
    // 부서 
    const handleDepartment = (e) => {
        setDepartment(e.target.value)
        if(e.target.value !== "== 부서 선택 =="){
          setDepartmentMessage('')
        }else{
          setDepartmentMessage('부서를 선택해주세요.')
        }
    }

    // 직급
    const handlePositionType = (e) => {
        setPosition_type(e.target.value)
    }

    // 이메일 전송 api
    const sendEmail = () => {
        if(isEmail){
            fetch(`http://172.27.1.33:8080/sendEmail?email=${email}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                // console.log(data.errorMessage!== null)
                if(data.errorMessage!== null){
                    setEmailColor('red')
                    setEmailMessage(data.errorMessage)
                }else{
                    alertify.alert('Hanspoon<hr>', '인증번호가 전송되었습니다.',function(){});
                    setAuthCode(data.authCode)
                    console.log(data.authCode)
                    setIsEmail(true)
                }
            })
        }else{
            setEmailMessage('이메일을 입력해주세요.')
            setEmailColor('red');
        }
    }

    // 인증 코드 확인
    const confirmAuthCode = () => {
        if(authCode === inputAuthCode && authCode != ''){
            setAuthCodeMessage('이메일 인증이 완료되었습니다.')
            setAuthCodeColor('green')
            setEmailMessage('')
            setIsAuthCode(true)
        }
        else{
            setInputAuthCode('')
            setAuthCodeMessage('인증번호를 확인해주세요.')
            setAuthCodeColor('red')
        }
    }
    
    // 회원가입 api
    const onClickSignUp = () => {


        if(!isEmail){
            setEmailMessage('이메일을 인증해주세요.')
            setEmailColor('red')
        }else if(!isAuthCode){
            setAuthCodeMessage('인증번호를 입력해주세요.')
            setAuthCodeColor('red')
        }else if(!isPassword){
            setPasswordMessage('비밀번호를 입력해주세요.')
            setPasswordColor('red')
        }else if(!isPasswordConfirm){
            setPasswordConfirmMessage('비밀번호를 확인해주세요.')
            setPasswordConfirmColor('red')
        }else if(!isUserName){
            setUserNameMessage('이름을 입력해주세요.')
        
        }else if(!isGender){
            setGenderMessage('성별을 선택해주세요.')
        }else if(department === "== 부서 선택 ==" || department.length < 1){
            setDepartmentMessage('부서를 선택해주세요.')
        }
        else{
            
            // var email_ID = email.split('@')
      
          fetch('http://172.27.1.33:8080/signUp',{
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
              email : email,
              password : password,
              user_name : userName,
              age : age,
              gender : gender,
              department_id : parseInt(department),
              position_type_id : parseInt(position_type),
              company_id : parseInt(company),

            })
          }).then(res=>{
                return res.json();
          })
          .then(data=>{
            if(data.email!== undefined){
              alertify.alert('Hanspoon<hr>', '회원가입이 완료되었습니다.', function(){    navigate('/signin');});
            }else{
              setEmailMessage(data.errorMessage)
              setEmailColor('red')
            }
          })
        }
    }

    function tomain(){
        document.location.href="/"
    }

    return (
        <>
         <Grid className='signUpBackground'>
            <Box className='signup_content_box'>
                <Grid item className='title_box' style={{"marginTop" : "40px" ,"textAlign": "center"}} mb={3}>
                 <button className='login_title' onClick={()=>tomain()}>Hanspoon</button>
                </Grid>

                <MKBox component="section">
                    <Grid container  sx={{ justifyContent: 'center' }}>
                        <Grid item className='signup_box' xs={12} sm={12} lg={8.5} key={0} px={10}>
                            <Grid container spacing={2}>
                                <Grid item md={6.5}>
                                    <Grid container spacing={3}>
                                        <Grid sx={{ textAlign : 'right' }}> 
                                                <Grid item mb = {6} mt ={4}>
                                                    <span className="signUpLabel" >아이디(Email)</span>
                                                </Grid>
                                                
                                                <Grid item mb = {6}> 
                                                    <span className="signUpLabel" >인증번호</span>
                                                </Grid>
                                                <Grid item mb = {7}>
                                                    <span className="signUpLabel" >비밀번호</span>
                                                </Grid>
                                                <Grid item mb = {6}>
                                                    <span className="signUpLabel" >비밀번호 확인</span>
                                                </Grid>
                                                <Grid item mb = {5}>
                                                    <span className="signUpLabel" >이름</span>
                                                </Grid>
                                        </Grid>
                                        <Grid item md={5}>
                                            <Grid item mt ={1}>
                                            <input className="inputSignUp" placeholder="예) hanspoon12@hansol.com" 
                                                value={email} onChange={handleInputEmail} style={{"border-left-width":0,
                                                    "border-right-width":0,
                                                    "border-top-width":0 }}/>
                                            </Grid>
                                            <Grid item mb = {4} style={{"height" : "10px", "lineHeight" : "100%"}}>
                                                <span className = "signupMessage" style={{"color" :emailColor}} >{emailMessage}</span>
                                            </Grid>
                                            <Grid item mb = {1}> 
                                            <input className="inputSignUp" style={{"border-left-width":0,
                                                    "border-right-width":0,
                                                    "border-top-width":0 }}placeholder="인증번호 입력" 
                                                value={inputAuthCode} onChange={handleInputAuthCode}/>
                                            </Grid>
                                            <Grid item mb = {4} style={{"height" : "10px"}}>
                                                <span className = "signupMessage" style={{"color" :authCodeColor}} >{authCodeMessage}</span>
                                            </Grid>
                                            <Grid item mb = {1}> 
                                            <input className="inputSignUp" style={{"border-left-width":0,
                                                    "border-right-width":0,
                                                    "border-top-width":0 }} type = "password" placeholder="비밀번호 입력" 
                                                value = {password} onChange={handlePassword}/>
                                            </Grid>
                                            <Grid item mb = {4}  style={{"height" : "15px", "lineHeight" : "100%"}}>
                                                <span className = "signupMessage" style={{"color" :passwordColor}} >{passwordMessage}</span>
                                            </Grid>
                                            <Grid item mb = {1}> 
                                            <input className="inputSignUp" style={{"border-left-width":0,
                                                    "border-right-width":0,
                                                    "border-top-width":0 }} type = "password"placeholder="비밀번호 확인"  
                                                value = {passwordConfirm} onChange = {handlePasswordConfirm} />
                                            </Grid>
                                            <Grid item mb = {4} style={{"height" : "10px"}}>
                                                <span className = "signupMessage" style={{"color" :passwordConfirmColor}} >{passwordConfirmMessage}</span>
                                            </Grid>
                                            <Grid item mb = {1}> 
                                            <input className="inputSignUp"  style={{"border-left-width":0,
                                                    "border-right-width":0,
                                                    "border-top-width":0 }} placeholder="실명을 입력하세요"
                                                 value = {userName} onChange = {handleUserName}/>
                                            </Grid>
                                            <Grid item mb = {4} style={{"height" : "10px"}}>
                                                <span className = "signupMessage" style={{"color" :"red"}} >{userNameMessage}</span>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={4} ml={1}>
                                            <Grid item mt ={1} mb = {1}>
                                            <button className="emailButton" onClick={sendEmail}>인증번호 발송</button><br/><br/>
                                            </Grid>
                                            <button className="emailButton" onClick = {confirmAuthCode} >인증번호 확인</button>
                                        </Grid>
                                    </Grid>
                                </Grid> 

                                <Grid item md={5.5}>
                                    <Grid container spacing={2}>
                                        <Grid item mb={2} md={2}>
                                            <Grid item mb = {6} mt ={1}>
                                                <span className="signUpLabel">성별 </span><br/>
                                            </Grid>
                                            <Grid item mb = {5}>
                                            <span className="signUpLabel" >나이 </span><br/>
                                            </Grid>
                                            <Grid item mb = {6}>
                                            <span className="signUpLabel" >직급 </span><br/>
                                            </Grid>
                                            <Grid item mb = {5}>
                                            <span className="signUpLabel" >회사 </span><br/>
                                            </Grid>
                                            <Grid item mb = {5}>
                                            <span className="signUpLabel" >부서 </span><br/>
                                            </Grid>
                                        </Grid>
                                        <Grid item mb={2} md={9}>
                                            <Grid item mb = {1} mt ={1}>
                                            <label  className="chk_box">
                                                <input type="checkbox" id="MALE" name="gender" onChange={(e) => checkGender(e.target)} />
                                                <span className="on"></span>
                                                남자
                                            </label>
                                            <label  className="chk_box">
                                                <input type="checkbox" id="FEMALE" name="gender" onChange={(e) => checkGender(e.target)}/>
                                                <span className="on"></span>
                                                여자
                                            </label>
                                            <Grid item mb = {4} style={{"height" : "10px"}}>
                                                <span className = "signupMessage" style={{"color" :"red"}} >{genderMessage}</span>
                                            </Grid>
                                            </Grid>
                                            <Grid item mb = {5}>
                                            <Form.Select className="selectValue" value = {age} onChange = {handleAge}>
                                                {ageMenu.map(menu =>(<option key={menu.value} value={menu.value} >{menu.name}</option>))}
                                            </Form.Select>
                                            </Grid>
                                            <Grid item mb = {5}>
                                            <Form.Select  className="selectValue" value = {position_type} onChange = {handlePositionType}>
                                                {position_typeMenu.map(menu =>(<option key={menu.position_type_id} value={menu.position_type_id}>{menu.position_type_name}</option>))}
                                            </Form.Select>
                                            </Grid>
                                            <Grid item mb = {5}>
                                            <Form.Select  className="selectValue" value = {company} onChange = {handleCompany}>
                                                {companyMenu.map(menu =>(<option key={menu.value} value={menu.value}>{menu.name}</option>))}
                                            </Form.Select>
                                            </Grid>
                                            <Grid item mb = {5}>
                                            <Form.Select className="selectValue" value = {department} onChange ={handleDepartment}>
                                                <option>== 부서 선택 ==</option>
                                                {departmentMenu.map(menu =>(<option key={menu.department_id} value={menu.department_id}>{menu.name}</option>))}
                                            </Form.Select>
                                            <Grid item mb = {4} style={{"height" : "10px"}}>
                                                <span className = "signupMessage" style={{"color" :"red"}} >{departmentMessage}</span>
                                            </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container  sx={{ justifyContent: 'center' }}>
                                <button type="button" className='buttonSignUp'onClick={onClickSignUp}>
                                    Sign up
                                </button>
                                </Grid>
                            </Grid>
                          
                        </Grid>
                    </Grid>
                </MKBox>
            </Box>
         </Grid>
        </>
    )
}

export default SignUpTest;