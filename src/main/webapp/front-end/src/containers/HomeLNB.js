import Category from 'components/Category';
import React from 'react';
import { Col, Row, Button } from 'reactstrap';

const HomeLNB = () => {
    return (
        <div id='hlnb' className='align-middle'>
            <Row>
                <Col sm="12" lg="10" xl="10">
                    {/* <Category /> */}
                </Col>
                <Col sm="2" lg="2" xl="2">
                    <Button className="btn" outline color="success">모임 생성</Button>
                </Col>
            </Row>
        </div>
    );
};

export default HomeLNB;