import React from "react";

const caretImage = "images/caret-bottom.svg";

function generateHeader(field, props) {
    const direction = props.sortDirection ? "desc" : "asc";
    const className = props.sortField === field ? `direction-${direction}` : "";

    return <div key={field} className="header" id={`header-${field}`} onClick={props.sort.bind(this, field)}>{field} &nbsp;
        <img className={className} data-direction={direction} src={caretImage} alt="caret"/>
    </div>
}

export default function Headers(props) {
    const headers = ["date", "description", "category", "amount"].map((field) => {
        return generateHeader(field, props);
    });

    return (
        <div id="transactions-header">
            {headers}
            <div className="header" id="header-icons">Actions</div>
        </div>
    );
}