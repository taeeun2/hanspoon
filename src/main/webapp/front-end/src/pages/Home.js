import React from 'react';
import Blogs from 'containers/Blogs'
import Banner from 'containers/Banner';
import HomeLNB from 'containers/HomeLNB';
import 'pages/css/Home.css'

const Home = () => {

    return (
        <>
            <Banner />
            <HomeLNB />
            <Blogs/>
        </>
    )
}

export default Home;