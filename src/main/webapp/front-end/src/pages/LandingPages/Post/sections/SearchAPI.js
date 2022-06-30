import { Divider, Modal, Slide } from '@mui/material';
import MKBox from 'components/MKBox';
import MKButton from 'components/MKButton';
import MKInput from 'components/MKInput';
import MKTypography from 'components/MKTypography';
import React, { useEffect, useState } from 'react';
import MapContainer from './MapContainer';
import CloseIcon from "@mui/icons-material/Close";


const SearchAPI = ({show, searchRestaurant, handleRestaurantName}) => {
    const [InputText, setInputText] = useState('')

    const [Place, setPlace] = useState('')

    

    const onChange = (e) => {
        setInputText(e.target.value)
      }
    
      const handleSubmit = (e) => {
        e.preventDefault()
        setPlace(InputText)
        setInputText('')
      }
    return (
        <div>
            <Modal open={show} onClose={searchRestaurant} sx={{ display: "grid", placeItems: "center" }}  style={{"overflow" : "scroll"}}>
                <Slide direction="down" in={show} timeout={500}>
                    <MKBox
                    position="relative"
                    width="500px"
                    display="flex"
                    flexDirection="column"
                    borderRadius="xl"
                    bgColor="white"
                    shadow="xl"
                    >
                    <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
                        <MKTypography variant="h5">식당 검색</MKTypography>
                        <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={searchRestaurant} />
                    </MKBox>
                    <Divider sx={{ my: 0 }} />
                    <MKBox p={2}>
                        <form className="inputForm" onSubmit={handleSubmit}>
                            <MKInput label="Select a restaurant" style ={{"width" : "300px", "marginRight" : 5}} onChange={onChange} value={InputText} />
                            <MKButton variant="gradient" color="dark" type="submit" style ={{"width" : "100px"}}>
                                검색
                            </MKButton>
                        </form><br/>
                        <MapContainer searchPlace={Place} searchRestaurant={searchRestaurant} />
                    </MKBox>
                    <Divider sx={{ my: 0 }} />
                    <MKBox display="flex" justifyContent="space-between" p={1.5}>
                        {/* <MKButton variant="gradient" color="dark" onClick={searchRestaurant}>
                        close
                        </MKButton>
                        <MKButton variant="gradient" color="info">
                        save changes
                        </MKButton> */}
                    </MKBox>
                    </MKBox>
                </Slide>
            </Modal>
        </div>
    );
};

export default SearchAPI;