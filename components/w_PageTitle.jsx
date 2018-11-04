import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const PageTitleWidget = () => {
    return (
        <h1 style={{textAlign: "center", padding: "10px"}} > 
            <Route exact path="/" render={ () => { return "Dashboard"} } />
            <Route path="/courses" render={ () => { return "Courses"} } />
            <Route path="/addcourse" render={ () => { return "Add New Course"} } />
            <Route path="/editcourse/:id" render={ () => { return "Edit Course"} } />
            <Route path="/course/:id" render={ () => { return "View Course"} } />
        </h1>
    )
}

export default PageTitleWidget;