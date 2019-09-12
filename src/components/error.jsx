import React from "react";

const Error = (props) => {
    const {error} = props;
    if(error){
        return <div className="error">{error}</div>
    }
    return <div></div>
}

export default Error;