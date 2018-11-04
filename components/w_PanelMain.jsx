import React from "react";
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink }  from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {  Jumbotron, Table, Button  }  from 'reactstrap';
import TableNames from "./w_TableNames.jsx";
import TableSells from "./w_TableSells.jsx";


const PanelMain = ({courses}) => {
    return(
        <Jumbotron>
            <h3 style={{margin: "20px"}}>Last {courses.length} Courses</h3>
            <Table  style={{ padding: "10px", border:"1px solid black"}} >
                <TableNames />
                <TableSells courses={courses} />
            </Table>
            <Link className="btn btn-info" style={{float: "right"}} to="/courses" >View All</Link>
        </Jumbotron>
    );
}

export default PanelMain;