import { type } from '@testing-library/user-event/dist/type';
import React, { useState } from 'react';
// import { ListGroup, ListGroupItem, Row, Button, Col } from "reactstrap"
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

const Category = () => {

    const CategoryType = [
        {
            Category: "전체",
            CategoryList: "전체 타입"
        }, {
            Category: "한식",
            CategoryList: "한식 타입"
        }, {
            Category: "중식",
            CategoryList: "중식 타입"
        }, {
            Category: "양식",
            CategoryList: "양식 타입"
        }, {
            Category: "기타",
            CategoryList: "기타 타입"
        }
    ];

    const [activeTab, setActiveTab] = useState('0');

    return (
        // <div>
        //     <ListGroup horizontal>
        //         <ListGroupItem>전체</ListGroupItem>
        //         {CategoryType.map((type,index) => (
        //             <ListGroupItem key={index}>
        //                 {type}
        //             </ListGroupItem>
        //          ))}
        //      </ListGroup>
        // </div>

        /* 카테고리별 카드 분류 */
        <div>
        <Nav tabs>
          {CategoryType.map((type, index) => (
            <NavItem>
                <NavLink className={activeTab == index ? 'active' : ''} onClick={() => setActiveTab(index)}>
                    {type.Category}
                </NavLink>
            </NavItem>
          ))}
        </Nav>
        {CategoryType.map((type, index) => (
        <TabContent activeTab={activeTab}>
          <TabPane tabId={index}>
                {type.CategoryList}
            </TabPane>
        </TabContent>
        ))}
      </div>
      
    );
};

export default Category;