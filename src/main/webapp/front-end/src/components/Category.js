import React from 'react';
import { ListGroup, ListGroupItem, Row, Button, Col } from "reactstrap"

const Category = () => {

    const CategoryType = [
        "한식", "중식", "일식", "양식", "기타"
    ];

    return (
        <div>
            <ListGroup horizontal>
                <ListGroupItem>전체</ListGroupItem>
                {CategoryType.map((type,index) => (
                    <ListGroupItem key={index}>
                        {type}
                    </ListGroupItem>
                 ))}
             </ListGroup>
        </div>
    );
};

export default Category;