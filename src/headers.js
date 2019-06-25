import React from "react";

export default function Headers() {
    const caretImage = "images/caret-bottom.svg";
    return (
        <div id="transactions-header">
            <div className="header" id="header-date">Date
                <img className="direction-desc" data-direction="desc" src={caretImage} alt="caret"/>
            </div>

            <div className="header" id="header-description">Description
                <img className="" data-direction="off" src={caretImage} alt="caret"/>
            </div>

            <div className="header" id="header-category">Category
                <img className="" data-direction="off" src={caretImage} alt="caret"/>
            </div>

            <div className="header" id="header-amount">Amount
                <img className="" data-direction="off" src={caretImage} alt="caret"/>
            </div>

            <div className="header" id="header-icons">Actions</div>
        </div>
    );
}