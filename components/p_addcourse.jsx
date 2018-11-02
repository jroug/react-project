import React from "react";
import { Badge, Jumbotron, Table, NavLink, Button  }  from 'reactstrap';
import ConvertDate from "./convertDate.jsx";

class AddNewCourse extends React.Component {
    constructor() {
        super();
        this.state = {
            id: "",
            title: "",
            imagePath: "",
            price: {
                normal: "",
                early_bird: ""
            },
            dates: {
                start_date: "",
                end_date: ""
            },
            duration: "",
            open: false,
            instructors: [],
            description: ""
        }
    }

    changeInputHandler = (event) => {  
        console.log(event.target.name);
        const newState = {...this.state};
        if (event.target.type=='text'){
            var _name = event.target.name;
            if ( _name.indexOf(".")>-1 ){
                var _nameParts = _name.split(".");
                newState[_nameParts[0]][_nameParts[1]] =  event.target.value;
            }else
                newState[_name] =  event.target.value;
        }else if(event.target.type=='checkbox'){
            newState[event.target.name] =  event.target.checked;
        }
        
        this.setState( newState );
    }
 

    postDataHandler = (e) => {
        e.preventDefault();
       // console.log(e);
        var instructors = [];
        if (this.state.title=='') {
            alert('We need a title for this course!');
            return;
        }
        const obj = {...this.state};
        console.log(obj);
        var dataToPost = JSON.stringify(obj);
        //console.log(dataToPost);

        fetch('http://localhost:3000/courses', {
            method: 'post',
            body: dataToPost,
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) { 
          alert('New Course Added!');
        });
    }

    render() {
        return (
            <Jumbotron style={{maxWidth:"1000px", margin:"auto", padding:"100px"}}>
                <form onSubmit={this.postDataHandler}  > 
                    <Table  style={{ padding: "10px", border:"1px solid black"}} >
                        <thead></thead>
                        <tbody>
                            <tr>
                                <td>ADD COURSE</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Title:</td>
                                <td><input type="text" name="title" value={this.state.title} onChange={ this.changeInputHandler } /></td>
                            </tr>
                            <tr>
                                <td>Duration:</td>
                                <td><input type="text" name="duration" value={this.state.duration} onChange={ this.changeInputHandler } /></td>
                            </tr>
                            <tr>
                                <td>Image Path:</td>
                                <td><input type="text" name="imagePath" value={this.state.imagePath} onChange={ this.changeInputHandler } /></td>
                            </tr>
                            <tr>
                                <td>Bookable:</td>
                                <td><input type="checkbox" name="open" checked={this.state.open} onChange={ this.changeInputHandler } /></td>
                            </tr>
                            <tr>
                                <td>Instructors:</td>
                                <td>
                                    <input type="checkbox" name="instructors"  value="01" />
                                    <input type="checkbox" name="instructors"  value="02" />
                                </td>
                            </tr>
                            <tr>
                                <td>Desciption:</td>
                                <td><input type="text" name="description" value={this.state.description} onChange={ this.changeInputHandler } /></td>
                            </tr>
                            <tr>
                                <td>DATES</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Start Date:</td>
                                <td><input type="text" name="dates.start_date" value={this.state.dates.start_date} onChange={ this.changeInputHandler } /></td>
                            </tr>
                            <tr>
                                <td>End Date:</td>
                                <td><input type="text" name="dates.end_date" value={this.state.dates.end_date} onChange={ this.changeInputHandler } /></td>
                            </tr>
                            <tr>
                                <td>PRICE</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Early Bird:</td>
                                <td><input type="text" name="price.early_bird" value={this.state.price.early_bird} onChange={ this.changeInputHandler } /></td>
                            </tr>
                            <tr>
                                <td>Normal:</td>
                                <td><input type="text" name="price.normal" value={this.state.price.normal} onChange={ this.changeInputHandler } /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><Button color="info" style={{float: "right"}} >SAVE</Button></td>
                            </tr>
                        </tbody>
                    </Table> 
                </form>
            </Jumbotron>
        );
    }
}

export default AddNewCourse;