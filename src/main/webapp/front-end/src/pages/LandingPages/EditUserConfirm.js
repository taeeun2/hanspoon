import { Grid } from '@mui/material';
import Header from 'components/Header';
import MKBox from 'components/MKBox';
import PageHeader from 'components/PageHeader';
import EditUser from 'pages/EditUser';
import React, { useEffect, useState } from 'react';
import dangerIcon from 'assets/images/Icons/danger_icon.png'
import { useNavigate } from 'react-router-dom';

const EditUserConfirm = () => {

    const [email, setEmail] = useState(sessionStorage.getItem('user_email'))
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [inputPW, setInputPW] = useState('')
    const [isConfirm, setIsConfirm] = useState(false)

    const handleInputPW = (e) => {
        setInputPW(e.target.value)
    }

    const navigate = useNavigate();

    //비밀번호 확인
    const onClickConfirm = () => {
        if(email == null){
            navigate('/signin')
        }
        else{
                fetch(`http://172.27.1.33:8080/getPassword?email=${email}`)
                .then(res=>{
                   return res.json()
                }).then(data=>{
                    if(data.password === inputPW){
                        setIsConfirm(true)
                    }else{
                        alert('비밀번호가 일치하지 않습니다.');
                        setInputPW('');
                    }
                })

                
            }
    }

    const onKeyPress = (e) => {
        if(e.key == 'Enter'){
            onClickConfirm()
        }
    }

    return (
        <div>
                <PageHeader/>
                    <Grid container  sx={{ justifyContent: 'center' }} mt={15}>
                        {isConfirm ?

                        <EditUser email={email} inputPW ={inputPW}/> :
                        
                        <Grid item className='edit_box' xs={12} sm={12} lg={4} key={0}> 
                            <Grid container spacing={2}>
                                <Grid md={5}><Grid container  sx={{ justifyContent: 'center' }}>
                                <img src={dangerIcon} style={{
                                    "width" : "70px",
                                    "height" : "70px",
                                    "marginTop" : "20px"
                                }}></img></Grid></Grid>
                                <Grid md={7} mt={3}> 
                                <span className='editUserTitle'>현재 사용중인 비밀번호</span>
                                <input className='inputEditConfirm' type="password" value ={inputPW} onChange={handleInputPW} onKeyPress={onKeyPress}></input>
                                <button className = "comfirmButton" onClick={onClickConfirm}>
                                    확인
                                </button>
                                </Grid>
                            </Grid>
                        </Grid> 
                        
                        }

                    </Grid>
                
        </div>
    );
};

export default EditUserConfirm;