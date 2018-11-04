import React from "react";
import { Jumbotron, Table, Button  }  from 'reactstrap';


class AddNewCourse extends React.Component {
    constructor({ match }) {
        let _id=''; 
        let _isNew=true;

        if (match.params.id){
            _id = match.params.id;
            _isNew = false;
        } 
        super();

        // state has to tell us if we have a new course 
        // or if we edit an old one
        // state must also keep the instructors
        // we need to populate them dynamically in the form

        this.state = {
            isNew: _isNew,
            course: {
                id: _id,
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
            },
            instructors: []
        }
    }

    componentDidMount(){
      
        if (!this.state.isNew){ // for old project get the data from the server
            fetch('http://localhost:3000/courses/' + this.state.course.id, {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => { return response.json() })
            .then((myJsonInstr) => {
                const _newState = {... this.state};
                _newState.course = myJsonInstr;
                this.setState( _newState );
            });
        }else{ // for new project get the maximum id+1
            fetch('http://localhost:3000/courses?_sort=id&_order=desc&_limit=1', {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => { return response.json() })
            .then((myJsonInstr) => {
                 const _newState = {...this.state};
                 _newState.course.id = parseInt(myJsonInstr[0].id) + 1;
                 this.setState( _newState );
            });
        }

        // get instructors
        fetch('http://localhost:3000/instructors', {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => { return response.json() })
            .then((myJsonInstr) => {
                const _newState = {...this.state};
                _newState.instructors = myJsonInstr;
                this.setState( _newState );
            });            
    }

    changeInputHandler = (event) => {  
        //console.log(event.target.name);
        const newState = {...this.state};

        
        if (event.target.name=='instructors[]'){ //special case of checkboxes - instructors
            var _name = event.target;
            if (_name.checked) 
                newState.course.instructors.push(_name.value);
            else 
                newState.course.instructors.splice( newState.course.instructors.indexOf(_name.value), 1 );    
            console.log(newState.course.instructors)

        }else if (event.target.type=='text'){// text fields 
            var _name = event.target.name;
            if ( _name.indexOf(".")>-1 ){ // for objects within objects like dates prices
                var _nameParts = _name.split(".");
                newState.course[_nameParts[0]][_nameParts[1]] =  event.target.value;
            }else{ // for simple cases
                newState.course[_name] =  event.target.value;
            }

        }else if(event.target.type=='checkbox'){// for checkboxes
            newState.course[event.target.name] =  event.target.checked;
        }
        
        // bind input with state
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
         
        var dataToPost = JSON.stringify(obj.course);
        //console.log(dataToPost);
        let _url = '';
        let _method = '';

        if (!obj.isNew) { // put data for the edit action
            _url = 'http://localhost:3000/courses/' + this.state.course.id;
            _method = 'PUT';
        }else{ // post data for adding a new course
            _url = 'http://localhost:3000/courses';
            _method = 'POST';
        }
            
        // do the request
        fetch(_url, {
            method: _method,
            body: dataToPost,
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => { return response.json() })
        .then((myJson) => { 
            let saveMessage = 'Course Added';
            if (!this.state.isNew) saveMessage = 'Course Updated';
            alert(saveMessage);
            location.href="/editcourse/" + myJson.id ;
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
                                <td><input type="text" name="title" value={this.state.course.title} onChange={ this.changeInputHandler } /></td>
                            </tr>
                            <tr>
                                <td>Duration:</td>
                                <td><input type="text" name="duration" value={this.state.course.duration} onChange={ this.changeInputHandler } /></td>
                            </tr>
                            <tr>
                                <td>Image Path:</td>
                                <td><input type="text" name="imagePath" value={this.state.course.imagePath} onChange={ this.changeInputHandler } /></td>
                            </tr>
                            <tr>
                                <td>Bookable:</td>
                                <td><input type="checkbox" name="open" checked={this.state.course.open} onChange={ this.changeInputHandler } /></td>
                            </tr>
                            <tr>
                                <td>Instructors:</td>
                                <td>
                                {
                                    this.state.instructors.map(
                                        (k) => ( 
                                            <div key={k.id} >
                                                <input checked={ Boolean( this.state.course.instructors.find( (v) =>  k.id==v ) ) } type="checkbox" name="instructors[]" onChange={ this.changeInputHandler } value={k.id} />
                                                <span>{k.name.first} {k.name.last}</span>
                                            </div>
                                        )
                                    )
                                }
                                </td>
                            </tr>
                            <tr>
                                <td>Desciption:</td>
                                <td><input type="text" name="description" value={this.state.course.description} onChange={ this.changeInputHandler } /></td>
                            </tr>
                            <tr>
                                <td>DATES</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Start Date:</td>
                                <td><input type="text" name="dates.start_date" value={this.state.course.dates.start_date} onChange={ this.changeInputHandler } /></td>
                            </tr>
                            <tr>
                                <td>End Date:</td>
                                <td><input type="text" name="dates.end_date" value={this.state.course.dates.end_date} onChange={ this.changeInputHandler } /></td>
                            </tr>
                            <tr>
                                <td>PRICE</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Early Bird:</td>
                                <td><input type="text" name="price.early_bird" value={ this.state.course.price.early_bird==null ? '' : this.state.course.price.early_bird } onChange={ this.changeInputHandler } /></td>
                            </tr>
                            <tr>
                                <td>Normal:</td>
                                <td><input type="text" name="price.normal" value={this.state.course.price.normal} onChange={ this.changeInputHandler } /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    {
                                        this.state.isNew
                                        ? <Button color="info" style={{float: "right"}} >ADD NEW</Button>
                                        : <Button color="info" style={{float: "right"}} >UPDATE</Button>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </Table> 
                </form>
            </Jumbotron>
        );
    }
}

export default AddNewCourse;