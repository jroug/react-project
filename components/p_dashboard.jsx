import React from "react";
import { Badge, Jumbotron, Table, NavLink, Button  }  from 'reactstrap';
import ConvertDate from "./convertDate.jsx";

const StatItem = ({title, amount}) => (
    <div className="col-sm-3" style={{textAlign: "center", padding: "10px"}} >
        {title} : <Badge>{amount}</Badge>
    </div>
);


const TableNames = () => (
    <thead>
        <tr>
        <th>Title</th>
        <th>Bookable</th>
        <th>Price</th>
        <th>Date</th>
        <th>Actions</th>
        </tr>
    </thead>
);
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
             <td><NavLink href={"/course/" + course.id} >View</NavLink></td> 
           </tr>
         ))}
    </tbody>
);

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
 
class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = { stats: [], courses: [] };
    }

    componentDidMount() {
        var _this = this;
       
        fetch('http://localhost:3000/stats', {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(function(response) {
           return response.json();
        })
        .then(function(myJson) {
          _this.setState({
              stats: [...myJson]
          });
        });

        fetch('http://localhost:3000/courses', {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(function(response) {
           return response.json();
        })
        .then(function(myJson) { 
          _this.setState({
             courses: [...myJson]
          });
        });

     }

    render() {
        return (
            <div>
                <div className="row" style={{border: "1px solid red"}} >
                    {this.state.stats.map(item => (
                        <StatItem key={item.id} title={item.title} amount={item.amount} />
                    ))}
                </div>
                <PanelMain courses={this.state.courses} />
            </div>
        );
    }
}




export default Dashboard;