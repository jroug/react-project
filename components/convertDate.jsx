import React from "react";

const convertDate = ({dateString}) => {
    var date = new Date(dateString);
    return date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
}

export default convertDate;