import { AuthButton, InputWithLabel, RightAlignedLink } from "components/Auth";
import AuthWrapper from "components/Auth/AuthWrapper";
import 'bootstrap/dist/css/bootstrap.min.css';
import DropBoxWithLabel from "components/Auth/DropBoxWithLabel";
import SelectButtonGroup from "components/Auth/SelectButtonGroup";


const age = [
	{ value: "20대", name: "20대" },
	{ value: "30대", name: "30대" },
	{ value: "40대", name: "40대" },
    { value: "50대", name: "50대" },
    { value: "60대 이상", name: "60대 이상" },
];

const department = [
	{ value: "1", name: "사업관리팀" },
	{ value: "2", name: "DCS세일즈사업부" },
	{ value: "3", name: "DCS서비스사업부" },
    { value: "4", name: "DCS RnRD 센터" },
    { value: "5", name: "전략기획팀" },
];


const position_type = [
	{ value: "1", name: "선임" },
	{ value: "2", name: "책임" },
	{ value: "3", name: "수석" }
];



const SignUp = () => {
    return (
        <>
        <AuthWrapper sign='회원가입'>  
            <InputWithLabel style={{
                "width":200
            }} label="이메일" name="email" placeholder="이메일"/>
            <InputWithLabel style={{
                "width":300
            }} label="인증번호" name="number" placeholder="인증번호"/>
            <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password"/>
            <InputWithLabel label="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" type="password"/>
            <InputWithLabel label="이름" name="name" placeholder="이름"/>
            <DropBoxWithLabel label="연령대" name="age"menus={age}/>
            <SelectButtonGroup label="성별"/>
            <DropBoxWithLabel label="부서명" name="department" menus={department}/>
            <DropBoxWithLabel label="직급" name="position_type" menus={position_type}/>
            
            <AuthButton>회원가입</AuthButton>
            <RightAlignedLink to="/signin">로그인</RightAlignedLink>
        </AuthWrapper>
        </>
    )
}

export default SignUp;