import React from 'react';
import MKButton from 'components/MKButton'
import MKTypography from 'components/MKTypography'
import { Grid } from '@mui/material'
const PlaceList = (props) => {

 

    return (
        <div>
            
                 <Grid item textAlign = "center">
                    <MKTypography variant="button" color="text" fontWeight="bold" textTransform="uppercase">
                     {props.index + 1}
                     </MKTypography>
                 </Grid>
                 <Grid item textAlign = "center">
                     <MKTypography variant="h6" >{props.place_name}</MKTypography>
                     <MKTypography variant="button" style={{"fontSize" : "12px"}} >{props.road_address_name}</MKTypography><br/>
                     <MKTypography variant="overline" style={{"marginLeft" : "3px"}}> 📞 {props.phone}</MKTypography><br/>
                     <button style={{"border" : 0, "outline" : 0, "color" : "#3C5A91", "fontSize" : "12px", "backgroundColor" : "white", "textDecoration": "underline", "textUnderlinePosition":"under"}} onClick={() =>
                         window.open(`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${props.place_name}`, '_blank')}>[네이버 검색 링크]</button>
                 </Grid>
     
             
        </div>
    );
};

export default PlaceList;