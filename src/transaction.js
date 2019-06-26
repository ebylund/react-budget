import React from "react";

export default class Transaction extends React.Component {

    formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: "USD",
        minimumFractionDigits: 2
    });

    render() {
        const editIcon = "images/pencil-blue.svg";
        const deleteIcon = "images/trash-red.svg";
        const trans = this.props.transactions;
        return (
            <div className="transaction">
                <div className="item trans-date">{trans.date}</div>
                <div className="item trans-description">{trans.description}</div>
                <div className="item trans-category">{trans.category}</div>
                <div className="item trans-amount">{"-" + this.formatter.format(trans.amount)}</div>
                <div className="item trans-icons">

                    <div id="update" className="icon">
                        <img id="pencil" onClick={this.props.update.bind(this, trans.id)} src={editIcon} alt="pencil"/>
                    </div>

                    <div id="destroy" className="icon">
                        <img id="trash" onClick={this.props.remove.bind(this, trans.id)} src={deleteIcon} alt="trash"/>
                    </div>

                </div>
            </div>
        )
    }
}