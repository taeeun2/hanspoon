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
    },[])

    return (
      <div  onMouseOver={() => setIsHovering(1)}
            onMouseOut={() => setIsHovering(0)}
            className={`hoverBlog ${isHovering ? 'active' : ''}`}>
        <Card id="blog" className="blog text-center"> 
        <CardHeader className={titleClass}>
          {stateTitle}
        </CardHeader>
          <CardBody className="p-3">
            <MKTypography variant="subtitle1" color="secondary" mt={3} mb={2} style={{
                      "fontFamily": 'NanumSquareRound',
                      "cursor": 'default'}}>
              {props.category} | {props.date}
            </MKTypography>
            <MKTypography variant="h4" mb={2} style={{
                      "fontFamily": 'NanumSquareRound',
                      "fontWeight" : 'bold',
                      "cursor": 'default'}}>
              {props.title}
            </MKTypography>
            <MKTypography variant="body1" mb={2} style={{
                      "fontFamily": 'NanumSquareRound',
                      "cursor": 'default'}}>
              {props.place}
            </MKTypography>
            <MKTypography variant="body2" mb={2} style={{
                      "fontFamily": 'NanumSquareRound',
                      "cursor": 'default'}}>
              🙋‍♂️ {props.participantNum} / {props.capacity}  
            </MKTypography>
            <MKTypography variant="body2" mb={2} style={{
                      "fontFamily": 'NanumSquareRound',
                      "cursor": 'default'}}>
              {props.host}  🥄{props.spoon}
            </MKTypography>
          </CardBody>
        </Card>
      </div>
    );
  };
  
  export default Blog;
  