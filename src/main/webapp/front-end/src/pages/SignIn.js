import { AuthButton, InputWithLabel, RightAlignedLink } from "components/Auth";
import AuthWrapper from "components/Auth/AuthWrapper";



const SignIn = () => {
    return (
        <>
        <AuthWrapper sign='로그인'>  
            <InputWithLabel label="아이디" name="email" placeholder="아이디"/>
            <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password"/>
            <AuthButton>로그인</AuthButton>
            <RightAlignedLink to="/signup">회원가입</RightAlignedLink>
        </AuthWrapper>
        </>
    )
}

export default SignIn;