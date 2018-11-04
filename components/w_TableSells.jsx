import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ConvertDate from "./convertDate.jsx";

const TableSells = ({courses}) => (
    <tbody>
        {courses.map(course => (
           <tr key={course.id}>
             <td>{course.title}</td> 
             <td>
                { 
                    course.open 
                    ? <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> 
                    : <span className="glyphicon-class">glyphicon glyphicon-remove</span> 
                }
             </td> 
             <td>
                {course.price.normal}&euro; 
                {
                    course.price.early_bird != null
                    ? " - E.B. " + course.price.early_bird + "€" 
                    : ""
                }
             </td> 
             <td>
                 <ConvertDate dateString={course.dates.start_date} />
                 -
                 <ConvertDate dateString={course.dates.end_date} />
             </td> 
             <td><Link to={"/course/" + course.id} >View</Link></td> 
           </tr>
         ))}
    </tbody>
);

export default TableSells;