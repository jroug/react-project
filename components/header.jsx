import React from "react";
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink }  from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from "../components/p_dashboard.jsx";
import AddNewCourse from "../components/p_addcourse.jsx";
import Courses from "../components/p_courses.jsx";
import Course from "../components/p_course.jsx";
 


const HeaderWidget = (props) => {
  let a = '';
  return (
    <>
      <Route exact path="/" render={ () => <h1 style={{textAlign: "center", padding: "10px"}} >Dashboard</h1>} />
      <Route path="/courses" render={() => <h1 style={{textAlign: "center", padding: "10px"}} >Courses</h1>} />
      <Route path="/addcourse" render={() => <h1 style={{textAlign: "center", padding: "10px"}} >AddNewCourse</h1>} />
      <Route path="/course/" render={() => <h1 style={{textAlign: "center", padding: "10px"}} >Course</h1>} />
      <Nav tabs>
        <NavItem>
          <NavLink href="/">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/courses">Courses</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/addcourse">Add new course</NavLink>
        </NavItem>
      </Nav>

      <Route exact path="/" component={Dashboard} />
      <Route path="/courses" component={Courses} />
      <Route path="/addcourse" component={AddNewCourse} />
      <Route path="/course/:id" component={Course} />
    </>
  )
};

export default HeaderWidget;