import React from "react";
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
            <Button color="info" style={{float: "right"}} >View All</Button>
        </Jumbotron>
    );
}

export default PanelMain;