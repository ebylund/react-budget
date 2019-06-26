import React from "react";

export default class Headers extends React.Component{
    constructor(props) {
        super(props);
    }

    headerClick(header) {
        console.log(header);
        this.props.toggleCaret.bind(this, header)();
    }

    render() {
        const caretImage = "images/caret-bottom.svg";
        return (
            <div id="transactions-header">
                <div className="header" id="header-date" onClick={this.headerClick.bind(this, "date")}>Date
                    <img className="direction-desc" data-direction="desc" src={caretImage} alt="caret"/>
                </div>

                <div className="header" id="header-description" onClick={this.headerClick.bind(this, "description")}>Description
                    <img className="" data-direction="off" src={caretImage} alt="caret"/>
                </div>

                <div className="header" id="header-category" onClick={this.headerClick.bind(this, "category")}>Category
                    <img className="" data-direction="off" src={caretImage} alt="caret"/>
                </div>

                <div className="header" id="header-amount" onClick={this.headerClick.bind(this, "amount")}>Amount
                    <img className="" data-direction="off" src={caretImage} alt="caret"/>
                </div>

                <div className="header" id="header-icons">Actions</div>
            </div>
        );
    }
}