import { Button } from "reactstrap";
import Container from 'assets/theme/components/container';
import React, { useEffect, useState } from 'react';

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography"

import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import MKButton from './MKButton';

const filterBtn = [
    {id: 1, name: "이름"},
    {id: 2, name: "연령대"},
    {id: 3, name: "성별"},
    {id: 4, name: "소속회사"},
    {id: 5, name: "부서명"},
    {id: 6, name: "직급"},
];

const HostFilter = ({ callback }) => {

    const [activeBtn, setActiveBtn] = useState();

    // update시 activeBtn Id 전달
    useEffect(() => {
        callback(activeBtn);
    })

    return (
        <MKBox component="section" mb={1} px={7}>
            <Grid container>
                <Grid item xs={12} lg={12} mb={1}>
                    <MKTypography variant="h5" mb={1}>
                        작성자 공개 범위
                    </MKTypography> 
                </Grid>
                <Grid item xs={12} lg={12}>
                    {filterBtn.map((btn, index) => (
                            <Button 
                                key={index}
                                className={`selectBtn ${activeBtn === btn.id ? 'active' : ''}`}
                                onClick={() => activeBtn === btn.id ? setActiveBtn() : setActiveBtn(btn.id)}>
                                {btn.name}      
                            </Button>             
                    ))}   
                </Grid>
            </Grid>
        </MKBox>

    );
}

export default HostFilter;