import { useState } from "react";
import styled from 'styled-components';
import Link from "assets/theme/components/link";
import CenteredBlogCard from "examples/Cards/BlogCards/CenteredBlogCard";
import Button from '@mui/material/Button';

import {
    Card,
    CardBody,
    CardText,
    CardTitle,
  } from "reactstrap";
import ButtonBase from "assets/theme/components/buttonBase";
  
  const Blog = (props) => {

    const [isHovering, setIsHovering] = useState(0);

    return (
      <div onMouseOver={() => setIsHovering(1)}
            onMouseOut={() => setIsHovering(0)}
            className={`hoverBlog ${isHovering ? 'active' : ''}`}>
        <Card className="blog">
          <CardBody className="p-4">
            <CardText className="mt-3">{props.category} | {props.date}</CardText>
            <CardTitle tag="h5">{props.title}</CardTitle>
            <CardText className="mt-3">{props.place}</CardText>
            <CardText className="mt-3">🙋‍♂️{props.participantNum}/{props.capacity}</CardText>
            <CardText className="mt-3">{props.host}🥄{props.spoon}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  };
  
  export default Blog;
  