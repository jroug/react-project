import React  from "react";
import { Badge, Jumbotron, Table, NavLink, Button  }  from 'reactstrap';
import ConvertDate from "./convertDate.jsx";


const InstructorsWidget = ({objInstr}) => {
    return (
        <>
            <h3>{objInstr.name.first} {objInstr.name.last} (<ConvertDate dateString={objInstr.dob} />)</h3>
            <h4>{objInstr.bio}</h4>
            <h4>{objInstr.email}</h4>
            <h4>{objInstr.linkedin}</h4>
        </>
    );
}

class Course extends React.Component {
    constructor({ match }) {
        super();
        this.state = { 
            filterId: match.params.id, 
            course: [], 
            instructors: [] 
        };
    }

    deleteHandler = (e) => {  
        var courseId =this.state.course[0].id;
        fetch('http://localhost:3000/courses/' + courseId, {
            method: 'DELETE',
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            alert('Course has been deleted!');
            location.href="/courses/";
        });
    }

    componentDidMount() {
        var _this = this;
       
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
            // get the correct course 
            let filterCourse = myJson.filter( function(number) {
                return number.id == _this.state.filterId;
            });

            fetch('http://localhost:3000/instructors', {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(myJsonInstr) {
                //console.log( myJsonInstr );
                let instrHelperArray = [];
                filterCourse[0].instructors.filter( function(thisVal) {
                    let instObj = myJsonInstr.filter( function(number) {
                        return number.id == thisVal;
                    });
                    //console.log(instObj);
                    if (instObj.length) instrHelperArray.push(instObj[0]);   
                });
                // console.log("instrHelperArray");
                // console.log(instrHelperArray);
                _this.setState({
                    course: filterCourse,
                    instructors: instrHelperArray
                });
            });

             

        });

     }

    render() {
        if (!this.state.course[0]) {
            return (<Jumbotron />);
        }else{
            let course = this.state.course[0];
            let instructors = this.state.instructors;
            console.log(instructors);
            return (
                <Jumbotron style={{maxWidth:"1000px", margin:"auto", padding:"100px"}}>
                    <img src={course.imagePath} style={{ width:"100%" }} />
                    <h1>{course.title}</h1>
                    <p>Bookable:&nbsp; 
                        { 
                            course.open 
                            ? <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> 
                            : <span className="glyphicon-class">glyphicon glyphicon-remove</span> 
                        }
                    </p>
                    <p>Price: {course.price.normal}&euro; 
                    {
                        course.price.early_bird != null
                        ? " - Early Bird: " + course.price.early_bird + "€"
                        : ""
                    }
                    </p>
                    <p>Duration: {course.duration} </p>
                    <p>Dates:&nbsp;  
                        <ConvertDate dateString={course.dates.start_date} />
                        - 
                        <ConvertDate dateString={course.dates.end_date} />
                    </p>
                    <div dangerouslySetInnerHTML={{ __html:course.description}} ></div>
                    <br />
                                        
                    <p>
                        <Button className="btn-primary">Edit</Button>
                        <Button className="btn-danger" onClick={this.deleteHandler} >Delete</Button>
                    </p> 

                    <h2>Instructors</h2>
                    {instructors.map( (item, k) => (
                        <InstructorsWidget key={k} objInstr={item} />
                    ))}
                </Jumbotron>
            );
        }  
    }
}

export default Course;