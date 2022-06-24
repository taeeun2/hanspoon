import React, { useEffect, useState } from 'react';
import Blogs from 'containers/Blogs'
import Banner from 'containers/Banner';
import HomeLNB from 'containers/HomeLNB';
import 'pages/css/Home.css'



const Home = () => {

    const [isLogin, setIsLogin] = useState(false)

	useEffect(()=>{
		if(sessionStorage.getItem('user_id') === null){
			console.log('isLogin ?? :: ',isLogin)
		} else{
			setIsLogin(true)
			console.log('isLogin ?? :: ',isLogin)
		}	
	})


    return (
        <>
           

            <Banner />
            <HomeLNB />
            <Blogs/>
            

        </>
    )
}

export default Home;