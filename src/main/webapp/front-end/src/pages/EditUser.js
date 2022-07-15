import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "assets/css/editUser.css"
import MKBox from 'components/MKBox';
import { Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const ageMenu = [
    { value: "TWENTY", name: "20대" },
    { value: "THIRTY", name: "30대" },
    { value: "FORTY", name: "40대" },
    { value: "FIFTY", name: "50대" },
    { value: "OVER_SIXTY", name: "60대 이상" },
];

const companyMenu = [
	{ company_id: "1", company_name: "한솔 인티큐브" },
	{ company_id: "2", company_name: "한솔 PNS" },
];

const EditUser = (props) => {

    const [position_typeMenu, setPosition_typeMenu] = useState([]);
    const [departmentMenu, setDepartmentMenu] = useState([]);
    const [age, setAge] = useState('')
    const [department, setDepartment] = useState(sessionStorage.getItem('user_department_id'));
    const [departmentMessage, setDepartmentMessage] = useState('')
    const [position_type, setPosition_type] = useState('')
    const [company, setCompany] = useState(sessionStorage.getItem('user_company_id'))

    const [email, setEmail] = useState(props.email)

    const [password, setPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('')
    const [passwordColor, setPasswordColor] = useState('')

    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')
    const [passwordConfirmColor, setPasswordConfirmColor] = useState('')


    const [userName, setUserName] = useState('')
    const [userNameMessage, setUserNameMessage] = useState('')


    const [gender, setGender] = useState('');
    const [isGender, setIsGender] = useState(true)
    const [genderMessage, setGenderMessage] = useState('');


    const [isPassword, setIsPassword] = useState(true)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(true)
    const [isUserName, setIsUserName] = useState(true)

    const navigate = useNavigate();
    useEffect(()=>{

        fetch('http://localhost:8080/select-all/position_type')
        .then(res=>{
            return res.json()
            
        })
        .then(data =>{
            setPosition_typeMenu(data)
        })

        
        // 사용자 정보 가져오기
        fetch('http://localhost:8080/login',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
             },
            body : JSON.stringify({
                email : email,
                password : props.inputPW
            })
        }).then(res => {
            return res.json();
        }).then(data=>{
            setUserName(data.user_name)
            setGender(data.gender)
            setAge(data.age)
            // setDepartment(data.department_id)
            // setCompany(data.company_id)
            setPosition_type(data.position_type_id)
            setDepartment(department)
        })

    },[])

    useEffect(()=>{
        const checkboxes = document.getElementsByName('gender')
        if(gender === 'MALE'){
            checkboxes[0].checked = true
            checkboxes[1].checked = false
        }
        else{
            checkboxes[1].checked = true
            checkboxes[0].checked = false

        }
    },[gender])
    
    useEffect(()=>{
        
        console.log(company)
        console.log(department)
        fetch(`http://localhost:8080/select/department/${company}`)
        .then(res=>{
            return res.json()
        })
        .then(data =>{
            setDepartmentMenu(data)
            setDepartment(department)
        })

        

    },[])
   
    //체크 박스 하나만 선택
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

   

    // 해당 회사의 부서 데이터 가져오기
    const handleCompany = (e) => {
        setCompany(e.target.value)
        fetch(`http://localhost:8080/select/department/${e.target.value}`)
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

     // 나이
     const handleAge = (e) => {
        setAge(e.target.value)
    }

     // 패스워드 유효성 검사
     const handlePassword = (e) => {
        setPasswordConfirm('')
        setPasswordConfirmMessage('')
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        setPassword(e.target.value)
        if(e.target.value.length < 1){
            setIsPassword(true)
            setPasswordMessage('')
            setIsPasswordConfirm(true)
        }
        else if(!passwordRegex.test(e.target.value)){
            setPasswordColor('red')
            setPasswordMessage('숫자+영문자+특수문자조합으로 8자리 이상 입력')
            setIsPassword(false)
        }
        else{
            setPasswordColor('green')
            setPasswordMessage('안전한 비밀번호입니다.')
            setIsPassword(true)
            setIsPasswordConfirm(false)

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


    //회원 정보 수정 api
    const editUser = () => {
        if(!isPassword){
            setPasswordMessage('숫자+영문자+특수문자조합으로 8자리 이상 입력')
            setPasswordColor('red')
        }else if(!isPasswordConfirm){
            alert('비밀번호를 확인해주세요.')
            setPasswordConfirmMessage('비밀번호를 확인해주세요.')
            setPasswordConfirmColor('red')
        }else if(!isUserName){
            alert('이름을 입력해주세요.')
            setUserNameMessage('이름을 입력해주세요.')
        
        }else if(!isGender){
            alert('성별을 선택해주세요')
            setGenderMessage('성별을 선택해주세요.')
        }else if(department === "== 부서 선택 ==" || department.length < 1){
            alert('부서를 선택해주세요.')
            setDepartmentMessage('부서를 선택해주세요.')
        }else{
           
            fetch('http://localhost:8080/edit',{
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
            }).then(data=>{
                if(data.email!== undefined){
                    alert('회원 정보 수정이 완료되었습니다.')
                    navigate('/mypage')
                }else{
                    alert('회원 정보 수정에 실패하였습니다.')
                }
            })
           
            



        }
    }



    return (
        <>
    <MKBox component="section" style={{"marginTop" : "40px", "width" : "60%"}}>
                <Grid item className='signup_box' xs={12} sm={12} lg={20} key={0}>
            <span className='editTitle'>회원 정보</span>
                <Grid container spacing={2} mt={4}>
                    <Grid md={6}>
                            <Grid container spacing={2}>
                                        <Grid md={4}>
                                            <Grid sx={{ textAlign : 'center' }}> 
                                                    <Grid item mb = {6} mt ={4}>
                                                        <span className="editLabel" >아이디(Email)</span>
                                                    </Grid> 
                                                    
                                                    <Grid item mb = {6}> 
                                                        <span className="editLabel" >비밀번호</span>
                                                    </Grid>
                                                    <Grid item mb = {7}>
                                                        <span className="editLabel" >비밀번호 확인</span>
                                                    </Grid>
                                                    <Grid item mb = {6}>
                                                        <span className="editLabel" >이름</span>
                                                    </Grid>
                                                    <Grid item mb = {5}>
                                                        <span className="editLabel" >성별</span>
                                                    </Grid>
                                            </Grid>

                                        </Grid>
                                        <Grid md={8}>
                                                    <Grid item mb = {6} mt ={4}>
                                                        <span className="editLabel" >{email}</span>
                                                    </Grid> 
                                                    
                                                    <Grid item mb = {1}> 
                                                        <input className="inputEdit" type = 'password'value={password} onChange={handlePassword} placeholder="새 비밀번호"></input>
                                                    </Grid>
                                                    <Grid item mb = {5} style={{"height" : "10px", "lineHeight" : "100%"}}>
                                                            <span className = "editMessage" style={{"color" :"black"}} >(비밀번호 변경 시 새 비밀번호를 입력하세요.)</span><br/>
                                                            <span className = "signupMessage" style={{"color" :passwordColor}} >{passwordMessage}</span>
                                                    </Grid>
                                                    <Grid item mb = {1}>
                                                        <input className="inputEdit" type = 'password' value = {passwordConfirm} onChange = {handlePasswordConfirm}></input>
                                                    </Grid>
                                                    <Grid item mb = {6} style={{"height" : "10px"}}>
                                                        <span className = "signupMessage" style={{"color" :passwordConfirmColor}} >{passwordConfirmMessage}</span>
                                                    </Grid> 
                                                    <Grid item mb = {1}>
                                                        <input className="inputEdit"  value = {userName} onChange = {handleUserName}></input>
                                                    </Grid>
                                                    <Grid item mb = {4} style={{"height" : "10px"}}>
                                                        <span className = "signupMessage" style={{"color" :"red"}} >{userNameMessage}</span>
                                                    </Grid>
                                                    <Grid item mb = {1}>
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
                                                    </Grid>
                                                    <Grid item mb = {4} style={{"height" : "10px"}}>
                                                        <span className = "signupMessage" style={{"color" :"red"}} >{genderMessage}</span>
                                                    </Grid>

                                        </Grid>

                            
                                </Grid>
                            </Grid>


                            <Grid md ={6}>
                            <Grid container spacing={2}>
                                        <Grid md={4}>
                                            <Grid sx={{ textAlign : 'center' }}> 
                                                    <Grid item mb = {6} mt ={4}>
                                                        <span className="editLabel" >나이</span>
                                                    </Grid> 
                                                    
                                                    <Grid item mb = {6}> 
                                                        <span className="editLabel" >직급</span>
                                                    </Grid>
                                                    <Grid item mb = {7}>
                                                        <span className="editLabel" >회사</span>
                                                    </Grid>
                                                    <Grid item mb = {6}>
                                                        <span className="editLabel" >부서</span>
                                                    </Grid>
                                            </Grid>

                                        </Grid>
                                        <Grid md={8}>
                                                    <Grid item mb = {6} mt ={4}>
                                                        <Form.Select className="selectValue" value = {age} onChange = {handleAge}>
                                                            {ageMenu.map(menu =>(<option key={menu.value} value={menu.value} >{menu.name}</option>))}
                                                        </Form.Select>
                                                    </Grid> 
                                                    
                                                    <Grid item mb = {5}> 
                                                        <Form.Select  className="selectValue" value = {position_type} onChange = {handlePositionType}>
                                                            {position_typeMenu.map(menu =>(<option key={menu.position_type_id} value={menu.position_type_id}>{menu.position_type_name}</option>))}
                                                        </Form.Select>
                                                    </Grid>
                                
                                                    <Grid item mb = {7}>
                                                        <Form.Select  className="selectValue" value = {company} onChange = {handleCompany}>
                                                            {companyMenu.map(menu =>(<option key={menu.company_id} value={menu.company_id}>{menu.company_name}</option>))}
                                                        </Form.Select>
                                                    </Grid>
                                                    <Grid item mb = {1}>
                                                        <Form.Select className="selectValue" value = {department} onChange ={handleDepartment}>
                                                            <option>== 부서 선택 ==</option>
                                                            {departmentMenu.map(menu =>(<option key={menu.department_id} value={menu.department_id}>{menu.name}</option>))}
                                                        </Form.Select>
                                                    </Grid>
                                                    <Grid item mb = {4} style={{"height" : "10px"}}>
                                                        <span className = "signupMessage" style={{"color" :"red"}} >{departmentMessage}</span>
                                                    </Grid>
                                                    

                                        </Grid>

                            
                                </Grid>

                                <Grid container  sx={{ justifyContent: 'right' }}>
                                <button type="button" className='buttonSignUp' onClick={editUser}>
                                    수정
                                </button>
                                </Grid>


                                
                            </Grid>
                        </Grid>

                        
                        
                </Grid>
                </MKBox>
                       
                </>
    );
};

export default EditUser;