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

const PositionTypeDropBoxWithLabel = ({label, menus, ...rest}) => (
    <Wrapper>
        <Label>{label}</Label>
        <Form.Select {...rest}>
            {menus.map(menu =>(<option key={menu.position_type_id} value={menu.position_type_name}>{menu.position_type_name}</option>))}
        </Form.Select>
        
    </Wrapper>
);

export default PositionTypeDropBoxWithLabel;