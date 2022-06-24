import { AuthButton, InputWithLabel, RightAlignedLink } from "components/Auth";
import AuthWrapper from "components/Auth/AuthWrapper";
import { useState } from "react";



const SignIn = () => {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value)
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
            console.log(data)
        
            sessionStorage.setItem('user_id',inputId)
            document.location.href='/'
        })

    }

  
    return (
        <>
        <AuthWrapper sign='로그인'>  
            <InputWithLabel label="아이디" name="id" value = {inputId} placeholder="아이디" onChange={handleInputId} />
            <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" value = {inputPw} type="password" onChange={handleInputPw} />
            <AuthButton onClick={onClickLogin}>로그인</AuthButton>
            <RightAlignedLink to="/signup">회원가입</RightAlignedLink>
        </AuthWrapper>
        </>
    )
}

export default SignIn;