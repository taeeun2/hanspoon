import React, { useState } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Button, ButtonGroup } from 'reactstrap';
import '../../App.css';



// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
   {
        margin-top: 1rem;
    }
`;

const Label = styled.div`
    font-size: 1rem;
    color: ${oc.gray[6]};
    margin-bottom: 0.25rem;
`;



// rest 쪽에는 onChange, type, name, value, placeholder 등의 input 에서 사용 하는 값들을 넣어줄수 있다.
const SelectButtonGroup = ({label}) => {
    const [tab, setDealTab] = useState('curr');
    
    return(
    <Wrapper>
        <Label>{label}</Label>

        <Button
            className={`selectBtn ${tab === 'curr' ? 'active' : ''}`}  // tab 값이 'curr' 이면 active 클래스를 추가
            onClick={() => setDealTab('curr')} 			// 클릭했을 때 tab 값이 'curr'로 변경된다. 
            >
            남
            </Button>
            <Button
            className={`selectBtn ${tab === 'prev' ? 'active' : ''}`}  // tab 값이 'prev' 이면 active 클래스를 추가
            onClick={() => setDealTab('prev')}			 // 클릭했을 때 tab 값이 'prev'로 변경된다. 
            >
            여
        </Button>

       {/* <ButtonGroup>
                <Button
               className={`btn ${tab === 'curr' ? 'active' : ''}`}  // tab 값이 'curr' 이면 active 클래스를 추가
               onClick={() => setDealTab('curr')} 			// 클릭했을 때 tab 값이 'curr'로 변경된다. 
                
                >
                남
                </Button>

                
                <Button
                color="primary"
                onClick={function noRefCheck(){}}
                className="button_css"
                >
                여
                </Button>   
               
        </ButtonGroup> */}

    </Wrapper>
    );
    
};

export default SelectButtonGroup;