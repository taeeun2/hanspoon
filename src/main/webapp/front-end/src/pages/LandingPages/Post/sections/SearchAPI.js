import { Divider, Modal, Slide } from '@mui/material';
import MKBox from 'components/MKBox';
import MKButton from 'components/MKButton';
import MKInput from 'components/MKInput';
import MKTypography from 'components/MKTypography';
import React, { useEffect, useState } from 'react';
import MapContainer from './MapContainer';
import CloseIcon from "@mui/icons-material/Close";


const SearchAPI = ({show, searchRestaurant, setOnText}) => {
    const [InputText, setInputText] = useState('')

    const [Place, setPlace] = useState('')

    

    const onChange = (e) => {
        setInputText(e.target.value)
      }
    
      const handleSubmit = (e) => {
        e.preventDefault()
        if(InputText.length < 1){
            alert('검색어를 입력하세요.')
        }else{
            setPlace("상암동"+InputText) // 지역 상암동으로 제한
            setInputText('')
        }
      }
    return (
        <div>
            <Modal open={show} onClose={searchRestaurant} sx={{ display: "grid", placeItems: "center" }} className="cp_modal" >

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
                        <span className='modal_title' >상암동 식당 검색</span>
                        <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={searchRestaurant} />
                    </MKBox>
                    <Divider sx={{ my: 0 }} />
                    <MKBox p={2}>
                        <form className="inputForm" onSubmit={handleSubmit}>
                            <span className='cp_input_box_modal'>
                            <input className='cp_input' placeholder="select a restaurant" style ={{"width" : "300px", "marginRight" : 5}} onChange={onChange} value={InputText} />
                            </span>
                            <button className="cp_button_modal" type="submit" style ={{"width" : "100px"}}>
                                검색
                            </button>
                        </form><br/>
                        <MapContainer searchPlace={Place} searchRestaurant={searchRestaurant} setOnText={setOnText}/>
                    </MKBox>
                    <Divider sx={{ my: 0 }} />
                    <MKBox display="flex" justifyContent="space-between" p={1.5}>
                    </MKBox>
                    </MKBox>
                </Slide>
            </Modal>
        </div>
    );
};

export default SearchAPI;