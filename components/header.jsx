import React from "react";
import { Nav, NavItem}  from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from "../components/p_dashboard.jsx";
import AddNewCourse from "../components/p_addcourse.jsx";
import Courses from "../components/p_courses.jsx";
import Course from "../components/p_course.jsx";
import PageTitleWidget from "../components/w_PageTitle.jsx";
 

// here all the routing hapens

const HeaderWidget = ( ) => {
      return (
        <Router> 
          <div>
            <PageTitleWidget />
            <Nav tabs>
              <NavItem>
                <Link to="/" >Dashboard</Link>
              </NavItem>
              <NavItem>
                <Link to="/courses" >Courses</Link>
              </NavItem>
              <NavItem>
                <Link to="/addcourse" >Add new course</Link>
              </NavItem>
            </Nav>

            <Route exact path="/" component={Dashboard} />
            <Route path="/courses" component={Courses} />
            <Route path="/addcourse" component={AddNewCourse} />
            <Route path="/editcourse/:id" component={AddNewCourse} />
            <Route path="/course/:id" component={Course} />
          </div>
        </Router>
      );
}

export default HeaderWidget;