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
import MKTypography from "./MKTypography";
  
  const Blog = (props) => {

    const [isHovering, setIsHovering] = useState(0);

    return (
      <div onMouseOver={() => setIsHovering(1)}
            onMouseOut={() => setIsHovering(0)}
            className={`hoverBlog ${isHovering ? 'active' : ''}`}>
        <Card className="blog text-center">
          <CardBody className="p-3">
            <MKTypography variant="subtitle1" color="secondary" mt={3} mb={2}>
              {props.category} | {props.date}
            </MKTypography>
            <MKTypography variant="h4" mb={2}>
              {props.title}
            </MKTypography>
            <MKTypography variant="body1" mb={2}>
              {props.place}
            </MKTypography>
            <MKTypography variant="body2" mb={2}>
              🙋‍♂️ {props.participantNum} / {props.capacity}  
            </MKTypography>
            <MKTypography variant="body2" mb={2}>
              {props.host}  🥄{props.spoon}
            </MKTypography>
          </CardBody>
        </Card>
      </div>
    );
  };
  
  export default Blog;
  