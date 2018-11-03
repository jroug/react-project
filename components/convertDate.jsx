import React from "react";

const convertDate = ({dateString}) => {
    // dates in the database are in US format we need Greek or do we??
    var date = new Date(dateString);
    return date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
}

export default convertDate;