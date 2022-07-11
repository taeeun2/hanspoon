import React from 'react';
import MKButton from 'components/MKButton'
import MKTypography from 'components/MKTypography'
import { Grid } from '@mui/material'
const PlaceList = (props) => {

 

    return (
        <>

                 <Grid item textAlign = "left">
                     <span style={{"fontSize" : "15px", "color" : "black"}}>{props.place_name}</span><br/>
                     <span style={{"fontSize" : "12px"}}>{props.road_address_name}</span><br/>
                     <span style={{"fontSize" : "12px"}}> 📞 {props.phone}</span><br/>
                     <button style={{"border" : 0, "outline" : 0, "color" : "#3C5A91", "fontSize" : "12px", "backgroundColor" : "white", "textDecoration": "underline", "textUnderlinePosition":"under"}} onClick={() =>
                         window.open(`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${props.place_name}`, '_blank')}>[네이버 검색 링크]</button>
                 </Grid>
     
             
        </>
    );
};

export default PlaceList;