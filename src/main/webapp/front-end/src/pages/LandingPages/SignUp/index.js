/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";
import 'App.css';
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
import routes from "routes";

// Images
import bgImage from "assets/images/bg-sign-image.jpg";
import { DropBoxWithLabel } from "components/Auth";
import { Form } from "react-bootstrap";
import { Button } from "reactstrap";

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

function SignUpBasic() {
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
    },[])

    useEffect(()=>{
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

    const [tab, setDealTab] = useState('curr');
    const [gender, setGender] = useState('MALE');


    const [department, setDepartment] = useState('');
    const [departmentMessage, setDepartmentMessage] = useState('')
    const [position_type, setPosition_type] = useState(1)
    const [company, setCompany] = useState(1)

    const [isEmail, setIsEmail] = useState(false)
    const [isAuthCode, setIsAuthCode] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)
    const [isUserName, setIsUserName] = useState(false)
    

    useEffect(()=>{
        if(tab === 'curr'){
            setGender('MALE')
        }else{
            setGender('FEMALE')
        }
    },[tab])



    const handleInputEmail = (e) => {
        
        setEmail(e.target.value)
        if(e.target.value.length >= 1){
            setIsEmail(true)
        }else{
            setIsEmail(false)
        }
        setEmailMessage('')
        setInputAuthCode('')
        setIsAuthCode(false)
        setAuthCodeMessage('')
    }

    const handleInputAuthCode = (e) => {
        setAuthCodeMessage('')
        setInputAuthCode(e.target.value)
    }

    const handlePassword = (e) => {
        setPasswordConfirm('')
        setPasswordConfirmMessage('')
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        setPassword(e.target.value)

        if(!passwordRegex.test(e.target.value)){
            setPasswordColor('red')
            setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요')
            setIsPassword(false)
        }
        else{
            setPasswordColor('green')
            setPasswordMessage('안전한 비밀번호입니다.')
            setIsPassword(true)
        }
    }

    const handlePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value)
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

    const handleUserName = (e) => {
        setUserNameMessage('')
        setIsUserName(false)
        setUserName(e.target.value)
        if(e.target.value.length >= 1){
            setIsUserName(true)
        }
    }

    const handleAge = (e) => {
        setAge(e.target.value)
    }

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
    const handleDepartment = (e) => {
        setDepartment(e.target.value)
        console.log(e.target.value)
        if(e.target.value !== "== 부서 선택 =="){
          setDepartmentMessage('')
        }else{
          setDepartmentMessage('부서를 선택해주세요.')
        }
    }

    const handlePositionType = (e) => {
        setPosition_type(e.target.value)
    }

    const sendEmail = () => {
        if(isEmail){
            fetch(`http://172.27.1.33:8080/sendEmail?email=${email}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setAuthCode(data.authCode)
                console.log(data.authCode)
                setEmailColor('green')
                setEmailMessage('인증번호가 전송되었습니다.')
                setIsEmail(true)
            })
        }else{
            setEmailMessage('이메일을 입력해주세요.')
            setEmailColor('red');
        }
    }

    const confirmAuthCode = () => {
        if(authCode === inputAuthCode){
            setAuthCodeMessage('이메일 인증이 완료되었습니다.')
            setAuthCodeColor('green')
            setEmailMessage('')
            setIsAuthCode(true)
        }
        else{
            setInputAuthCode('')
            setAuthCodeMessage('인증번호 확인 후 다시 입력해주세요.')
            setAuthCodeColor('red')
        }
    }
    
    
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
            
        }else if(department === "== 부서 선택 ==" || department.length < 1){
            setDepartmentMessage('부서를 선택해주세요.')
        }
        else{
          // console.log(email)
          // console.log(password)
          // console.log(userName)
          // console.log(age)
          // console.log(gender)
          // console.log(department)
          // console.log(position_type)
          // console.log(company)
      
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
            // if(res.ok){
            //   alert('회원가입이 완료되었습니다.')
            //   document.location.href='/signin'
            // }else{
            //   // setEmailMessage(res.json().errorMessage)
            //   // console.log(res.json())
            // }
          })
          .then(data=>{
            if(data.email!== undefined){
              alert('회원가입이 완료되었습니다.')
              document.location.href='/signin'
            }else{
              setEmailMessage(data.errorMessage)
              setEmailColor('red')
            }
          })
        }
    }


  return (
    <>
      {/* <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-react",
          label: "free download",
          color: "info",
        }}
        transparent
        light
      /> */}
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          {/* <Grid item xs={11} sm={9} md={5} lg={4} xl={3}> */}
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={1}
                mt={-4}
                p={2}
               
                textAlign="center"
              >
                <MKTypography component={Link}
                        to="/" variant="h4" fontWeight="medium" color="white" mt={1}>
                  Hanspoon
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form" >

                 {/* 이메일 */}
                  <MKBox mb={1}>
                    <MKInput type="text" label="Email" style={{
                      "width" : "30%"
                    }} value={email} onChange={handleInputEmail}/> 
                    <MKTypography variant="button" style={{"color" : "black", "marginLeft" : 10, "marginRight" : 10}} 
                    >@hansol.com</MKTypography>
                    <MKButton  variant="gradient" color = "secondary" onClick={sendEmail}>인증번호 발송</MKButton><br/>
                    <MKTypography variant="button" style={{"color" :emailColor}} >{emailMessage}</MKTypography>
                  </MKBox>
                {/* 인증번호 */}
                  <MKBox mb={1}>
                     <MKInput label="AuthCode" style={{"width" : "56%", "marginRight" : 7}} value={inputAuthCode} onChange={handleInputAuthCode}/> 
                     <MKButton  onClick = {confirmAuthCode} variant="gradient" color="secondary">확인</MKButton><br/>
                     <MKTypography variant="button" style={{"color" :authCodeColor}} >{authCodeMessage}</MKTypography>
                  </MKBox>
                {/* 비밀번호 */}
                  <MKBox mb={1}>
                    <MKInput type="password" label="Password" fullWidth value = {password} onChange={handlePassword}/>
                    <MKTypography variant="button" style={{"color" :passwordColor}} >{passwordMessage}</MKTypography>
                  </MKBox>
                {/* 비밀번호 확인 */}
                  <MKBox mb={1}>
                    <MKInput type="password" label="Password Confirm" fullWidth value = {passwordConfirm} onChange = {handlePasswordConfirm}/>
                    <MKTypography variant="button" style={{"color" :passwordConfirmColor}} >{passwordConfirmMessage}</MKTypography>
                  </MKBox>
                {/* 이름 */}
                  <MKBox mb={1}>
                    <MKInput label="Name" fullWidth  value = {userName} onChange = {handleUserName}/>
                    <MKTypography variant="button" style={{"color" :"red"}} >{userNameMessage}</MKTypography>
                  </MKBox>
                {/* 성별 */}
                <MKTypography variant="caption">gender</MKTypography><br/>
                <Grid textAlign="center">
                    <MKBox mb={1}>
                      
                      <Button
                          className={`selectBtn ${tab === 'curr' ? 'active' : ''}`}  // tab 값이 'curr' 이면 active 클래스를 추가
                          onClick={() => setDealTab('curr')} 			// 클릭했을 때 tab 값이 'curr'로 변경된다. 
                          > MALE </Button>
                          <Button
                          className={`selectBtn ${tab === 'prev' ? 'active' : ''}`}  // tab 값이 'prev' 이면 active 클래스를 추가
                          onClick={() => setDealTab('prev')}			 // 클릭했을 때 tab 값이 'prev'로 변경된다. 
                          > FEMALE
                      </Button>
                  </MKBox>
                 </Grid>
                 {/* 선택 */}
                  <MKBox mb={1}>
                        <MKTypography variant="caption">Age</MKTypography>
                        <Form.Select value = {age} onChange = {handleAge}>
                            {ageMenu.map(menu =>(<option key={menu.value} value={menu.value} >{menu.name}</option>))}
                        </Form.Select>
                        <MKTypography variant="caption">PostitionType</MKTypography>
                        <Form.Select  value = {position_type} onChange = {handlePositionType}>
                            {position_typeMenu.map(menu =>(<option key={menu.position_type_id} value={menu.position_type_id}>{menu.position_type_name}</option>))}
                        </Form.Select>
                        <MKTypography variant="caption">Company</MKTypography>
                        <Form.Select value = {company} onChange = {handleCompany}>
                            {companyMenu.map(menu =>(<option key={menu.value} value={menu.value}>{menu.name}</option>))}
                        </Form.Select>
                        <MKTypography variant="caption">Department</MKTypography>
                        <Form.Select value = {department} onChange ={handleDepartment}>
                            <option>== 부서 선택 ==</option>
                            {departmentMenu.map(menu =>(<option key={menu.department_id} value={menu.department_id}>{menu.name}</option>))}
                        </Form.Select>
                        <MKTypography variant="button" style={{"color" :"red"}} >{departmentMessage}</MKTypography>
                  </MKBox>
                  


                  <MKBox mt={2} mb={1}>
                    <MKButton variant="gradient" color="info" fullWidth onClick={onClickSignUp} >
                      sign up
                    </MKButton>
                  </MKBox>
                  <MKBox mt={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                        Do you have an ID?{" "}
                      <MKTypography
                        component={Link}
                        to="/signin"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign in
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      
    </>
  );
}

export default SignUpBasic;
