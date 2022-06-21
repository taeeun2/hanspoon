import {
    Card,
    CardBody,
    CardText,
    CardTitle,
  } from "reactstrap";
  
  const Blog = (props) => {
    return (
      <Card>
        <CardBody className="p-4">
          <CardText className="mt-3">{props.category} | {props.date}</CardText>
          <CardTitle tag="h5">{props.title}</CardTitle>
          <CardText className="mt-3">{props.place}</CardText>
          <CardText className="mt-3">🙋‍♂️{props.participantNum}/{props.capacity}</CardText>
          <CardText className="mt-3">{props.host}🥄{props.spoon}</CardText>
        </CardBody>
      </Card>
    );
  };
  
  export default Blog;
  