import React  from "react";
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

export default InstructorsWidget;