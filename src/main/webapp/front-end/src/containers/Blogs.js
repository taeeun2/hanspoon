import React, { useEffect, useState } from 'react';
import { Col, Row } from "reactstrap";
import Blog from "components/Blog";
import Category from 'components/Category';
import Toggle from 'components/BlogToggle';
import AOS from "aos";
import "aos/dist/aos.css";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DetailPost from 'pages/LandingPages/DetailPost';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

const Blogs = () => {
 
    const [categoryList, setCategoryList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [activeCategory, setActiveCategory] = useState({"category_id": 0, "category_name": "전체"});
    const [toggleChecked, setToggleChecked] = useState(true);
    const [isClicked, setIsClicked] = useState();
    const navigate = useNavigate();

    //활성화된 Category ID 받아오기
    const categoryCallback = (c) => {
      setActiveCategory(categoryList[c]);
    };

    //토글 상태(전체보기/모집 중만 보기)에 따른 API 호출하기
    const handlePostApi = () => {
      if(toggleChecked){ //모집 중만 보기
        getValidPostList(activeCategory.category_id);
      }
      else {
        console.log(activeCategory);
        getAllPostList(activeCategory.category_id); //전체 보기
      }
    }

    //게시글 클릭시 이벤트
    const handleClick = (clickedId) => {
      setIsClicked(clickedId);
      navigate(`/detailPost/${clickedId}`)
    }

    // useEffect(() => {
    //   console.log(props.category);
    // }, []);

    /* ================= fetch ================= */

    // 카테고리 리스트 조회 API
    const getCategoryList = () => {
      fetch('http://localhost:8080/category')
        .then(res => {
          return res.json()
        })
        .then(data => {
          setCategoryList(data); 
        })
    }

    // 카테고리별 전체 게시글 리스트 조회 API
     const getAllPostList = (category_id) => {
     fetch(`http://localhost:8080/post/all/${category_id}`)
       .then(res => {
         return res.json()
       })
       .then(data => {
         setPostList(data);
       })
      }

     // 카테고리별 모집중인 게시글 리스트 조회 API 
     const getValidPostList = (category_id) => {
      fetch(`http://localhost:8080/post/valid/${category_id}`)
        .then(res => {
            return res.json()
          })
        .then(data => {
          setPostList(data);
        })
      }
      
    /* ================= useEffect ================= */

    // Mount 이벤트(카테고리 리스트 및 모집중인 전체 게시글 리스트 가져오기)
    useEffect(() => {
      getCategoryList();
      getValidPostList(0);
    }, []);

    // 카테고리 탭 변경시 이벤트
    useEffect(() => {
      if(activeCategory != undefined){
        handlePostApi();
      } 
      }, [activeCategory]);
    
    //토글 변경시 이벤트
      useEffect(() => {
        handlePostApi();
      },[toggleChecked]);

    //AOS 설정값
    useEffect(() => {
      AOS.init({
          duration : 3000
      });
     });


    /* ================= RENDER ================= */
    return (
      <Grid className='blogs' id='blogs'>
        <Box className='content_box'>
          <Grid item className='title_box'>
            <h2 className='main_title' data-aos="fade-up">한스푼 모임리스트</h2>
          </Grid>
          <MKBox component="section" >
            <Grid container  sx={{ justifyContent: 'center', height: '100%' }}>
              <Grid item className='step_box' data-aos="fade-up" xs={12} sm={12} lg={10} key={0}>
              {/* <Grid container item xs={12} lg={6}>
                <MKTypography variant="h3" mb={6}>
                  Check my latest blogposts
                </MKTypography>
              </Grid> */}
                <Category 
                  categoryList={categoryList} 
                  callback={categoryCallback} 
                />
                <Toggle 
                  checked = {toggleChecked}
                  setChecked={setToggleChecked}
                />
                    <Grid container spacing={3} className="blog_list_box">
                      {postList.map((post, index) => (
                          <Grid item xs={12} sm={6} lg={4} key={index}>
                            <div onClick={() => {handleClick(post.post_id)}}>
                              <Blog 
                                category={post.category.category_name}
                                date={post.meet_date}
                                title={post.title}
                                place={post.restaurant_name}
                                participantNum={post.participant_num}
                                capacity={post.capacity}
                                host={post.hostInfo.name}
                                spoon={post.spoon_num}
                                />
                            </div>
                          </Grid>
                      ))}
                </Grid>
              </Grid>
            </Grid>
          </MKBox>  
        </Box>
      </Grid>

    );
}

export default Blogs;