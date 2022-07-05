import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import Spot from 'containers/Spot'
import 'assets/css/main.css'
import Introduce from 'containers/Introduce';
import CreateStep from 'containers/CreateStep';
import Posts from 'containers/Posts';
import Rank from 'containers/Rank';
import Bottom from 'containers/Bottom';

const Home = () => {

    /* 로그인 관련 코드 */
  //   const [isLogin, setIsLogin] = useState(false)

	// useEffect(()=>{
	// 	if(sessionStorage.getItem('user') === null){
	// 		console.log('isLogin ?? :: ',isLogin)
	// 	} else{
	// 		setIsLogin(true)
	// 		console.log('isLogin ?? :: ',isLogin)
	// 	}	
	// })
    return (
      <div>
          <Header />
          <Spot />
          <div className='content'>
            <Introduce />
            <CreateStep />
            <Posts />
            <Rank />
          </div>
          <Bottom />
      </ div>      
    )
}

export default Home;