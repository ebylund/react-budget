import React from "react";
import {AmountInput, CategoryInput, DateInput, DescriptionInput} from "./post-inputs";

export default class TransactionInputFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateInput: "",
            descriptionInput: "",
            categoryInput: "",
            amountInput: "",
        }
    }

    onDateChange = (e) => { this.setState({dateInput: e.target.value})};
    onDescriptionChange = (e) => {this.setState({descriptionInput: e.target.value})};
    onCategoryChange = (e) => {this.setState({categoryInput: e.target.value})};
    onAmountChange = (e) => {this.setState({amountInput: e.target.value})};

    // TODO: abstract input change logic to a single function
    // onInputChange = (e) => {this.setState({})};

    render() {
        const isEnabled =
            this.state.dateInput &&
            this.state.descriptionInput &&
            this.state.categoryInput &&
            this.state.amountInput !== null;

        return (
            <div id="transaction-input-fields">
                <DateInput value={this.state.dateInput} onDateChange={this.onDateChange}/>
                <DescriptionInput value={this.state.descriptionInput} onDescriptionChange={this.onDescriptionChange}/>
                <CategoryInput value={this.state.categoryInput} onCategoryChange={this.onCategoryChange}/>
                <AmountInput value={this.state.amountInput} onAmountChange={this.onAmountChange}/>
                <button id="add-transaction" disabled={!isEnabled} onClick={this.addTransaction.bind(this)} className="btn btn-primary">+</button>
            </div>
        );
    }

    addTransaction() {
        var props = this.props;
        var trans = {
            "transaction": {
                "date": this.state.dateInput,
                "description": this.state.descriptionInput,
                "category": this.state.categoryInput,
                "amount": parseFloat(this.state.amountInput),
            }
        };
        this.setState({
            dateInput: "",
            descriptionInput: "",
            categoryInput: "",
            amountInput: 0,
        });
        fetch("http://localhost:4000/api/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(trans)
        }).then(function (data) {
            props.refreshTransactions();
        });
    }
}