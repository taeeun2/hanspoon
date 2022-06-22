import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
    {
        margin-top: 1rem;
    }
`;

const Countries = [
    { label: "이름"},
    { label: "연령대"},
    { label: "소속회사"},
    { label: "직급"},
    { label: "성별"},
    { label: "부서명"}
  ];
  
const Label = styled.div`
    font-size: 1rem;
    color: ${oc.gray[6]};
    margin-bottom: 0.25rem;
`;

const animatedComponents = makeAnimated();

const MultiSelectDropdown = ({label, menus}) => {
    return (

        <Wrapper>
        <Label>{label}</Label>
        {/* <Select options={option} noOptionsMessage={"연령대"} /> */}
        <Select options={Countries} components={animatedComponents}
              isMulti />
    </Wrapper>
    //     <div className="container">
    //     <div className="row">
    //       <div className="col-md-3"></div>
    //       <div className="col-md-6">
    //         <Select options={Countries} components={animatedComponents}
    //           isMulti />
    //       </div>
    //       <div className="col-md-4"></div>
    //     </div>
    //   </div>
    );
};

export default MultiSelectDropdown;