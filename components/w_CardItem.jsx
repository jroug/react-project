import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, NavLink } from 'reactstrap';
import ConvertDate from "./convertDate.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const CardItem = ({course}) => (
    <Card style={{float:"left", height:"500px",width:"300px", border: "1px solid green", padding:"10px", margin:"10px"}}>
        <CardImg top width="100%" src={course.imagePath}  />
        <CardBody>
            <CardTitle style={{color:"blue", fontWeight:"bold"}}>{course.title}</CardTitle>
            <CardSubtitle>Bookable:
                { 
                    course.open 
                    ? <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> 
                    : <span className="glyphicon-class">glyphicon glyphicon-remove</span> 
                }
            </CardSubtitle>
            <CardSubtitle>Price: {course.price.normal}&euro;</CardSubtitle>
            {
                 course.price.early_bird != null
                 ? <CardSubtitle>Early Bird: {course.price.early_bird}&euro;</CardSubtitle>
                 : ""
            }
            <CardText>Dates: 
                <ConvertDate dateString={course.dates.start_date} />
                - 
                <ConvertDate dateString={course.dates.end_date} />
            </CardText>
            <Link className="btn btn-info" to={ "/course/" + course.id } >View</Link>
        </CardBody>
    </Card>
);

export default CardItem;