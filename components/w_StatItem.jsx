import React from "react";
import { Badge }  from 'reactstrap';

const StatItem = ({title, amount}) => (
    <div className="col-sm-3" style={{textAlign: "center", padding: "10px"}} >
        {title} : <Badge>{amount}</Badge>
    </div>
);

export default StatItem;