import { useState,useEffect } from "react";
import styled from 'styled-components';
import Link from "assets/theme/components/link";
import CenteredBlogCard from "examples/Cards/BlogCards/CenteredBlogCard";
import Button from '@mui/material/Button';

import {
    Card,
    CardHeader,
    CardBody,
    CardText,
    CardTitle,
    CardFooter
  } from "reactstrap";
import ButtonBase from "assets/theme/components/buttonBase";
import MKTypography from "./MKTypography";
  
  const Blog = (props) => {

    const [isHovering, setIsHovering] = useState(0);
    const [stateTitle, setStateTitle] = useState('');
    const [titleClass, setTitleClass] = useState('');

    useEffect(() => {
      if(props.state === 'VALID') {
        setStateTitle('모집중');
        setTitleClass('valid');
      }
      else if(props.state === 'EXPIRED') {
        setStateTitle('모집 마감');
        setTitleClass('expired')
      }
      else if(props.state === 'FULL') {
        setStateTitle('인원 마감');
        setTitleClass('full');
      }
    })

    return (
      <div  onMouseOver={() => setIsHovering(1)}
            onMouseOut={() => setIsHovering(0)}
            className={`hoverBlog ${isHovering ? 'active' : ''}`}
            >
        
          <Card id="blog">
          <div className={titleClass}>
          <CardHeader className="cardHeader" >
            {stateTitle}
          </CardHeader>
            <CardBody className="cardBody" >
              <MKTypography variant="subtitle2" color="secondary" 
                        className='cardText'
                        mt={1} mb={2} style={{
                        "fontFamily": 'NanumSquareRound',
                        "cursor": 'default'}}>
                {props.category} | {props.date}
              </MKTypography>
              <MKTypography variant="h4" mb={2} style={{
                        "fontFamily": 'NanumSquareRound',
                        "fontWeight" : 'bolder',
                        "cursor": 'default'}}
                        className='cardText'>
                <strong>{props.title}</strong>
              </MKTypography>
              <MKTypography variant="body1" mb={2} style={{
                        "fontFamily": 'NanumSquareRound',
                        "cursor": 'default',
                        "fontSize": '1.15rem'}}
                        className='cardText'>
                {props.place}
              </MKTypography>
              <MKTypography variant="body2" mb={2} style={{
                        "fontFamily": 'NanumSquareRound',
                        "cursor": 'default'}}
                        className='cardText'>
                참여 현황 ( {props.participantNum}명 / {props.capacity}명 ) 
              </MKTypography>
              <MKTypography variant="body2" mb={2} style={{
                        "fontFamily": 'NanumSquareRound',
                        "cursor": 'default'}}
                        className='cardText'>
                {props.host}  ( 🥄{props.spoon} )
              </MKTypography>
            </CardBody>
            </div>
          </Card>
        
       </div>
    );
  };
  
  export default Blog;
  