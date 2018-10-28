import React from "react";

class AddNewCourse extends React.Component {
    constructor() {
        super();
        this.state = {value: 'AddNewCourse'};
    }
    render() {
        return (
            <h1>{this.state.value}</h1>
        );
    }
}

export default AddNewCourse;