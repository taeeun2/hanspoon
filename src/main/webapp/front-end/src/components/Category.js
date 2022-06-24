import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

const Category = () => {

    const [activeTab, setActiveTab] = useState('0');
    const [category, setCategory] = useState([]);
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        getCategory();
    }, []);
    

    /* 카테고리 리스트 조회 API */
    const getCategory = () => {
        fetch('http://localhost:8080/category')
            .then(res => {
                return res.json()
            })
            .then(data => {
                setCategory(data)
            })
    }

    /* 더미 데이터 */
    const CategoryList = [
        {
            DataList: "전체 타입"
        }, {
            DataList: "한식 타입"
        }, {
            DataList: "중식 타입"
        }, {
            DataList: "일식 타입"
        }, {
            DataList: "양식 타입"
        }, {
            DataList: "기타 타입"
        }
    ];



    return (
        /* 카테고리별 카드 분류 */
        <div>
            {console.log(category)}
        <Nav tabs>
            <NavItem>
                <NavLink className={activeTab == 0 ? 'active' : ''} onClick={() => setActiveTab(0)}>
                    전체
                </NavLink>
            </NavItem>
          {category.map((type, index) => (
            <NavItem>
                <NavLink className={activeTab == index+1 ? 'active' : ''} onClick={() => setActiveTab(index+1)}>
                    {type.category_name}
                </NavLink>
            </NavItem>
          ))}
        </Nav>
        {CategoryList.map((list, index) => (
        <TabContent activeTab={activeTab}>
          <TabPane tabId={index}>
                {list.DataList}
            </TabPane>
        </TabContent>
        ))}
      </div>
      
    );
};

export default Category;