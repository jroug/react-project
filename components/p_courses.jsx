import React from "react";
import CardItem from "./w_CardItem.jsx";

class Courses extends React.Component {
    constructor() {
        super();
        this.state = { courses: [] };
    }

    componentDidMount() {
        fetch('http://localhost:3000/courses', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => { return response.json() })
        .then((myJson) => { this.setState({ courses: [...myJson] }) });
    }

    render() {
        return (
            <>
                {this.state.courses.map(item => (
                    <CardItem key={item.id} course={item}  />
                ))}
            </>
        );
    }
}

export default Courses;