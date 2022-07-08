import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import "assets/css/mypage.css"

function PageHeader(props) {

    const [userName, setUserName] = useState('');
    const [spoonNum, setSpoonNum] = useState(0);

    // ============ 추가 ==============
    const [isLogin, setIsLogin] = useState(false)

    useEffect(()=>{
      if(sessionStorage.getItem('user_id') === null){
          // console.log('isLogin ?? :: ',isLogin)
      } else{
          setIsLogin(true)
    setUserName(sessionStorage.getItem('user_name'))
    setSpoonNum(sessionStorage.getItem('spoon_num'))
          // console.log('isLogin ?? :: ',isLogin)
      }	
    })

    const onLogout = () => {
      sessionStorage.removeItem('user_id')
      sessionStorage.removeItem('user_name')
      sessionStorage.removeItem('spoon_num')
      setIsLogin(false)
      // document.location.href = '/'
    }

    return (
        <Grid id="page_header" className='page_header' sx={{ py: 20, }} width='100%'>
            <Box className="header_box">
            <Grid container  direction="row" justifyContent="space-between" alignItems="center">
                <Grid item className="logo_box">
                    <h1>
                    <Link to="/" className="logo">
                        <span className="logo_text">Hanspoon</span>
                    </Link>
                    </h1>
                </Grid>
                <Grid item className="user_box">
                <Grid container className="gnb_list">
                    {isLogin ? 
                    <> <Grid item className="gnb_item">
                    <span style={{
                    "fontFamily": 'NanumSquareRound',
                    "fontWeight" : 'bold'}}>{userName} 님 (🥄{spoonNum})</span></Grid>
                    <Grid item className="gnb_item">
                    <button style={{
                    "fontFamily": 'NanumSquareRound',
                    "fontWeight" : 'bold'}} onClick = {onLogout}>로그아웃</button></Grid>
                    </>
                    :  <>
                    <Link to ="signup">
                    <Grid item className="gnb_item">
                        <span style={{
                        "fontFamily": 'NanumSquareRound',
                        "fontWeight" : 'bold'}}>회원가입
                        </span>
                    </Grid>
                    </Link>
                    <Link to ="signin">
                    <Grid item className="gnb_item">
                        <span style={{
                        "fontFamily": 'NanumSquareRound',
                        "fontWeight" : 'bold'}}>로그인
                        </span>
                    </Grid>
                    </Link></>}
                    </Grid>
                </Grid>
            </Grid>
            </Box>
        </Grid>
    );
}

export default PageHeader;