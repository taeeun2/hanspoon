import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Form } from 'react-bootstrap';

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

const DropBoxWithLabel = ({label, menus}) => (
    <Wrapper>
        <Label>{label}</Label>
        <Form.Select>
            {menus.map(menu =>(<option key={menu.value} value={menu.value}>{menu.name}</option>))}
        </Form.Select>
    </Wrapper>
);

export default DropBoxWithLabel;