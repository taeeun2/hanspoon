import React from 'react';
import { Col, Row } from "reactstrap";
import Rank from 'components/Rank';
import restaurant from 'assets/images/Icons/restaurant.png'
import spoon from 'assets/images/Icons/spoon.png'

const Banner = () => {

    const RankData = [
        {
            icon: restaurant,
            dataName: "금주의 숟가락 랭킹",
            first: "홍길동",
            second: "김민수",
            third: "이수지"
        },
        {
            icon: spoon,
            dataName: "금주의 맛집",
            first: "고씨네 카레",
            second: "하노이의 아침",
            third: "김영섭 초밥"
        },
    ];

    return (
        <div id='banner' className='row align-items-start'>
            {RankData.map((rank,index) => (
                <div key={index} className='col-lg-6 align-self-center'>
                    <div className='row align-items-start d-flex justify-content-center'>
                        <div className='col-lg-2'>
                             <img src={rank.icon} width="100" height="100" />
                        </div>
                        <div  className='col-lg-4'>
                            <Rank
                                dataName={rank.dataName}
                                first={rank.first}
                                second={rank.second}
                                third={rank.third}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Banner;