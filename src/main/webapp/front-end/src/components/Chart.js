import { Grid } from '@mui/material';
import React from 'react';

import MKBox from "components/MKBox";
import PieChart from './PieChart';


function Chart(props) {

    const [activeChart, setActiveChart] = React.useState(1);

    const handleTabClick = (tab_id) => {
        setActiveChart(tab_id);
    }

    return (
        <MKBox p={2} pt={4} width='100%' className='content'>
            <Grid container item justifyContent="center" alignItems="center" className='chart'>
                <Grid container item className='chart_title_box' direction="row">
                    <Grid item className="chart_title" xs={12} sm={12} lg={12}>
                        <span className='highlight'>
                            <span className="chart_title">
                                대상별 한스푼 가입 비율
                            </span>
                        </span>
                    </Grid>
                </Grid>
                <Grid container item className='chart_tab' direction="row" >
                        <Grid item className="tab_button" xs={12} sm={6} lg={4}>
                            <div className='rank_icon1'><div onClick={() => handleTabClick(1)}
                                 className={`chartList ${activeChart == 1 ? 'active' : ''}`} 
                            ><span className='hightlight2'>성별</span></div></div>
                            <div className='rank_icon2'><div onClick={() => handleTabClick(2)}
                                 className={`chartList ${activeChart == 2 ? 'active' : ''}`} 
                            ><span className='hightlight4'>소속회사</span></div></div>
                            <div className='rank_icon3'><div onClick={() => handleTabClick(3)}
                                className={`chartList ${activeChart == 3 ? 'active' : ''}`} 
                            ><span className='hightlight3'>연령대</span></div></div>
                            <div className='rank_icon4'><div onClick={() => handleTabClick(4)}
                                className={`chartList ${activeChart == 4 ? 'active' : ''}`} 
                            ><span className='hightlight2'>직급</span></div></div>
                        </Grid>
                        <Grid item className="chart_box" justifyContent="center" alignItems="center" xs={12} sm={6} lg={6}>
                            <PieChart activeChart={activeChart}/>
                        </Grid>
                    </Grid>
            </Grid>
        </MKBox>
    );
}

export default Chart;