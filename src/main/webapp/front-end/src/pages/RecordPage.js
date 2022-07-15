import React, { useEffect, useState } from 'react';
import meeting from "assets/images/hanspoon/recordPage/002.png"
import restarant from "assets/images/hanspoon/recordPage/008.png"
import company from "assets/images/hanspoon/recordPage/005.png"
import spoon from "assets/images/hanspoon/recordPage/007.png"
import { Grid } from '@mui/material';
import "assets/css/record.css"

import CountUp from "react-countup";
const RecordPage = () => {

    const [meetingNum, setMeetingNum] = useState(0)
    const [restaurantList, setRestaurantList] = useState([])
    const [companyName, setCompanyName] = useState('')
    const [spoonNum, setSpoonNum] = useState(0)
    useEffect(()=>{
        //모임 수
        fetch('http://172.27.1.33:8080/rank/numberOfMeetings')
        .then(res=> res.json())
        .then(data=> setMeetingNum(data))

        //인기 식당(top 3)
        fetch('http://172.27.1.33:8080/rank/popularRestaurant')
        .then(res=>res.json())
        .then(data=> {
            //top3 만 순서대로 가져오기
            var list = data.slice(0,3)
            setRestaurantList(list);
        })
        //가장 많은 숟가락을 모은 회사
        fetch('http://172.27.1.33:8080/rank/mostSpoonCompany')
        .then(res=>res.json())
        .then(data=> {
            setCompanyName(data[0])
        })

        //최대 숟가락 개수
        fetch('http://172.27.1.33:8080/rank/maxSpoonNum')
        .then(res=>res.json())
        .then(data=> {
            setSpoonNum(data)
        })



    },[])
    return (
        <div className='content'  style={{"overflow-x":"hidden"}}>
            <Grid container className="recordPage" >
                <Grid md={6} mb={4} ml={4}>
                    <img src={meeting} className="recordImg"></img>
                </Grid>
                <Grid md={5}  mt={7}  ml={1} justifyContent="center">
                    <span className='record_count_rabel'>한스푼에서 성사된 모임 수</span>
                    <span className='record_highlight'>
                        <span className='record_count_num'>
                        <CountUp end={meetingNum} duration={1} />
                        </span><span className ='record_count_font'>회</span>
                    </span>
                </Grid>
                <Grid md={6} mt={10} ml={3} style={{"textAlign" : "left"}}>
                <span className='record_count_rabel' style={{"marginLeft" : "20px"}}>한스푼에서 가장 인기있는 식당</span>
                    <Grid mt={4}  ml={1.5}>
                        {restaurantList.map((res,index) =><>
                            <span className='record_count_num_res'>
                                    {index+1}등
                            </span>
                            <span className='record_highlight_res'>
                                <span className='record_count_num_res' style={{"fontFamily": "NanumSquare_bold"}}>
                                    {res} 
                                </span>
                            </span>
                            <br/>
                            </>
                            )}
                        {/* <span className='record_highlight_res'>
                            <span className='record_count_num_res'>
                                {restaurantList[0]}
                            </span>
                        </span> */}
                    </Grid>
                </Grid>
                <Grid md={4} mt={5} ml={2}>
                    <img src={restarant} className="restaurantImg"></img>
                </Grid>
                <Grid md={5} mb={4} mt={7} ml={3}>
                    <img src={company} className="companyImg"></img>
                </Grid>
                <Grid md={6}  mt={15}  ml={2}>
                    <Grid mb={3}><span className='record_count_rabel'>가장 많은 숟가락을 모은 회사</span></Grid>
                    <span className='record_highlight_company'>
                        <span className='company_font'>
                        {companyName}
                        </span>
                    </span>
                </Grid>

                <Grid md={6} mt={10} ml={6}  style={{"textAlign" : "center"}}>
                    <Grid>
                        <div><span className='record_count_rabel'>가장 많은 숟가락을 모은 사람의</span></div>
                        <div><span className='record_count_rabel'>숟가락 개수</span></div>
                    </Grid>
                    <Grid>
                        <span className='record_highlight_spoon'>
                                <span className='record_count_num'>
                                <CountUp end={spoonNum} duration={1} />
                                </span><span className ='record_count_font'>개</span>
                        </span>
                    </Grid>
                </Grid>
                <Grid md={4} ml={3}>
                    <img src={spoon} className="spoonImage"></img>
                </Grid>

            

            </Grid>
        </div>
    );
};

export default RecordPage;