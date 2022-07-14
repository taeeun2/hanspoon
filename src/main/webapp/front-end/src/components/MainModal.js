import React from 'react';
import { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";

// @mui icons
import CloseIcon from "@mui/icons-material/Close";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import Chart from './Chart';
import RecordPage from 'pages/RecordPage';

function MainModal({ show, toggleModal }) {

    const [activeTab, setActiveTab] = React.useState(1);

    const handleTabClick = (tab_id) => {
        setActiveTab(tab_id);
      }

    let content;
    if(activeTab === 1){
        content = <Chart />     
    }
    else {
        content = <RecordPage />
    }
    

    return (
        <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
            <Slide direction="down" in={show} timeout={500}>
            <MKBox
                className="mainModal"
                position="relative"
                width="700px"
                height="700px"
                display="flex"
                flexDirection="column"
                borderRadius="xl"
                bgColor="white"
                shadow="xl"
            >
                <MKBox display="flex" alginItems="center" justifyContent="flex-end" p={2}>
                    <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
                </MKBox>
                {/* <Divider sx={{ my: 0 }} /> */}
                <MKBox p={2} pt={0} >
                    <Grid container item justifyContent="center" alignItems="center">
                        <Grid container item className='tab_box' direction="row"
                                xs={10} sm={8} lg={8}
                                justifyContent="center" alignItems="center">
                            <Grid item xs={12} sm={12} lg={4} className='tab_box'>
                            <div className={`tab ${activeTab == 1 ? 'active' : ''}`} 
                                onClick={() => handleTabClick(1)}
                            >참여자 현황</div>
                            </Grid>   
                            <Grid item xs={12} sm={12} lg={4} className='tab_box'>
                            <div className={`tab ${activeTab == 2 ? 'active' : ''}`} 
                                onClick={() => handleTabClick(2)}
                            >한스푼의 기록</div>
                            </Grid>            
                        </Grid>
                    </Grid>
                    <Grid container item className="modal_content_box" >
                        {content}
                    </Grid>
                {/* <MKTypography variant="body2" color="secondary" fontWeight="regular">
                    Society has put up so many boundaries, so many limitations on what&apos;s right
                    and wrong that it&apos;s almost impossible to get a pure thought out.
                    <br />
                    <br />
                    It&apos;s like a little kid, a little boy, looking at colors, and no one told him
                    what colors are good, before somebody tells you you shouldn&apos;t like pink
                    because that&apos;s for girls, or you&apos;d instantly become a gay two-year-old.
                </MKTypography> */}
                </MKBox>
                {/* <Divider sx={{ my: 0 }} /> */}
                {/* <MKBox display="flex" justifyContent="space-between" p={1.5}>
                <MKButton variant="gradient" color="dark" onClick={toggleModal}>
                    close
                </MKButton>
                <MKButton variant="gradient" color="info">
                    save changes
                </MKButton>
                </MKBox> */}
            </MKBox>
            </Slide>
        </Modal>
    );
}

export default MainModal;