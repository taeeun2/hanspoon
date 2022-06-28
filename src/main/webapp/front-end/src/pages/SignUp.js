import { AuthButton, InputWithLabel, RightAlignedLink } from "components/Auth";
import AuthWrapper from "components/Auth/AuthWrapper";
import 'bootstrap/dist/css/bootstrap.min.css';
import DropBoxWithLabel from "components/Auth/DropBoxWithLabel";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import styled from 'styled-components';
import 'App.css';
import oc from 'open-color';
import { Form } from "react-bootstrap";
import PositionTypeDropBoxWithLabel from "components/Auth/PostionTypeDropBoxWithLabel";

const Label = styled.div`
    font-size: 1rem;
    color: ${oc.gray[6]};
    margin-bottom: 0.25rem;
`;

const ageMenu = [
	{ value: "20대", name: "20대" },
	{ value: "30대", name: "30대" },
	{ value: "40대", name: "40대" },
    { value: "50대", name: "50대" },
    { value: "60대 이상", name: "60대 이상" },
];

const departmentMenu = [
	{ value: "1", name: "사업관리팀" },
	{ value: "2", name: "DCS세일즈사업부" },
	{ value: "3", name: "DCS서비스사업부" },
    { value: "4", name: "DCS RnRD 센터" },
    { value: "5", name: "전략기획팀" },
];


// const position_typeMenu = [
// 	{ value: "1", name: "선임" },
// 	{ value: "2", name: "책임" },
// 	{ value: "3", name: "수석" }
// ];

const Wrapper = styled.div`
    {
        margin-bottom: 1rem;
    }
`;




const SignUp = () => {

    const [departmentMenu, setDepartmentMenu] = useState([]);
    const [position_typeMenu, setPosition_typeMenu] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:8080/select-all/position_type')
        .then(res=>{
            return res.json()
            
        })
        .then(data =>{
            setPosition_typeMenu(data)
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

    const [age, setAge] = useState('20대')

    const [tab, setDealTab] = useState('curr');
    const [gender, setGender] = useState('MALE');


    const [department, setDepartment] = useState('');

    const [position_type, setPosition_type] = useState('')


    const [isEmail, setIsEmail] = useState(false)
    const [isAuthCode, setIsAuthCode] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)
    const [isUserName, setIsUserName] = useState(false)
    

    useEffect(()=>{
        if(tab !== 'curr'){
            setGender('MALE')
        }else{
            setGender('FEMALE')
        }
    },[tab])


    const handleInputEmail = (e) => {
        setEmail(e.target.value)
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
        console.log(e.target.value)
    }

    const handleDepartment = (e) => {
        setDepartment(e.target.value)
        console.log(e.target.value)
    }

    const handlePositionType = (e) => {
        setPosition_type(e.target.value)
        console.log(e.target.value)
    }

    const sendEmail = () => {
        fetch(`http://localhost:8080/sendEmail?email=${email}`)
        .then(res => {
            console.log(email)
            return res.json()
        })
        .then(data => {
            console.log(data.authCode)
            setAuthCode(data.authCode)
            setEmailColor('green')
            setEmailMessage('인증번호가 전송되었습니다.')
            setIsEmail(true)
        })
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
            setAuthCodeMessage('인증번호를 입력해주세요')
            setAuthCodeColor('red')
        }else if(!isPassword){
            setPasswordMessage('비밀번호를 입력해주세요.')
            setPasswordColor('red')
        }else if(!isPasswordConfirm){
            setPasswordConfirmMessage('비밀번호를 확인해주세요.')
            setPasswordConfirmColor('red')
        }else if(!isUserName){
            setUserNameMessage('이름을 입력해주세요.')
            
        }
    }


    return (
        <>
        <AuthWrapper sign='회원가입'>
            <Wrapper> 
                <InputWithLabel style={{
                    "width":150,
                    "marginRight":5
                }} label="이메일" name="id" placeholder="이메일" value={email} onChange={handleInputEmail}/> 
                @hansol.com <Button onClick={sendEmail}>인증번호 발송</Button>
                <p style={{"color" : emailColor}}>{emailMessage}</p>
            </Wrapper> 
            
            <Wrapper>
                <InputWithLabel style={{
                    "width":250
                }} label="인증번호" name="number" placeholder="인증번호" value={inputAuthCode} onChange={handleInputAuthCode}/>
                <Button onClick = {confirmAuthCode} style={{
                    "marginLeft":10
                }}>확인</Button>
                <p style={{"color" :authCodeColor}}>{authCodeMessage}</p>
            </Wrapper>
            
            <Wrapper>
                <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password" value = {password} onChange={handlePassword}/>
                <p style={{"color" :passwordColor}}>{passwordMessage}</p>
            </Wrapper>
            <Wrapper>
                <InputWithLabel label="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" type="password" value = {passwordConfirm} onChange = {handlePasswordConfirm}/>
                <p style={{"color" :passwordConfirmColor}}>{passwordConfirmMessage}</p>
            </Wrapper>
            <Wrapper>
                <InputWithLabel label="이름" name="name" placeholder="이름" value = {userName} onChange = {handleUserName}/>
                <p style={{"color" :'red'}}>{userNameMessage}</p>
            </Wrapper>  
            <Wrapper>
                {/* <DropBoxWithLabel label="연령대" name="age"menus={ageMenu} value = {age} onChange = {handleAge}/> */}
            </Wrapper>
            <Wrapper>
                <Label>성별</Label>
                <Button
                className={`selectBtn ${tab === 'curr' ? 'active' : ''}`}  // tab 값이 'curr' 이면 active 클래스를 추가
                onClick={() => setDealTab('curr')} 			// 클릭했을 때 tab 값이 'curr'로 변경된다. 
                > 남 </Button>
                <Button
                className={`selectBtn ${tab === 'prev' ? 'active' : ''}`}  // tab 값이 'prev' 이면 active 클래스를 추가
                onClick={() => setDealTab('prev')}			 // 클릭했을 때 tab 값이 'prev'로 변경된다. 
                > 여</Button>
            </Wrapper>
            <Wrapper>
                {/* <DropBoxWithLabel label="부서명" name="department" menus={departmentMenu} value = {department} onChange = {handleDepartment}/> */}
            </Wrapper>
            <Wrapper>
                <PositionTypeDropBoxWithLabel label="직급" name="position_type_name" menus={position_typeMenu} value = {position_type} onChange = {handlePositionType}/>
            </Wrapper>
            <AuthButton onClick={onClickSignUp}>회원가입</AuthButton>
            <RightAlignedLink to="/signin">로그인</RightAlignedLink>
        </AuthWrapper>
        </>
    )
}

export default SignUp;