import React from 'react';
import {DateUpdateInput, DescriptionUpdateInput, CategoryUpdateInput, AmountUpdateInput} from "./update-inputs";

require('dotenv').config();

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:4000";

export default class UpdateTransactionInputFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedResponse: false,
            dateUpdateInput: "",
            descriptionUpdateInput: "",
            categoryUpdateInput: "",
            amountUpdateInput: 0,
        }
    }

    fetchAndPopulateInputValues() {
        const that = this;
        fetch(`${baseUrl}/api/transactions/${this.props.updateId}`)
            .then(function (response) {
                return response.json();
            })
            .then(function(json) {
                console.log(json);
                const transaction = json.data;
                that.setState({
                    ...that.state,
                    fetchedResponse: true,
                    dateUpdateInput: transaction.date,
                    descriptionUpdateInput: transaction.description,
                    categoryUpdateInput: transaction.category,
                    amountUpdateInput: transaction.amount,
                })
            })
    }

    updateTransaction() {
        const props = this.props;
        const trans = {
            "transaction": {
                "date": this.state.dateUpdateInput,
                "description": this.state.descriptionUpdateInput,
                "category": this.state.categoryUpdateInput,
                "amount": parseFloat(this.state.amountUpdateInput),
            }
        };
        this.setState({
            dateUpdateInput: "",
            descriptionUpdateInput: "",
            categoryUpdateInput: "",
            amountUpdateInput: 0,
        });
        fetch(`${baseUrl}/api/transactions/${this.props.updateId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(trans)
        }).then(function () {
            props.refreshTransactions();
            props.closeModal();
        });
    }

    componentDidMount() {this.fetchAndPopulateInputValues()}

    onDateChange = (e) => {this.setState({dateUpdateInput: e.target.value})};
    onDescriptionChange = (e) => {this.setState({descriptionUpdateInput: e.target.value})};
    onCategoryChange = (e) => {this.setState({categoryUpdateInput: e.target.value})};
    onAmountChange = (e) => {this.setState({amountUpdateInput: e.target.value})};

    render() {
        if (!this.state.fetchedResponse) return <div>Loading...</div>;
        return (
            <div id="transaction-input-fields">
                <DateUpdateInput value={this.state.dateUpdateInput} onDateChange={this.onDateChange}/>
                <DescriptionUpdateInput value={this.state.descriptionUpdateInput} onDescriptionChange={this.onDescriptionChange}/>
                <CategoryUpdateInput value={this.state.categoryUpdateInput} onCategoryChange={this.onCategoryChange}/>
                <AmountUpdateInput value={this.state.amountUpdateInput} onAmountChange={this.onAmountChange} />
                <button id="update-transaction" onClick={this.updateTransaction.bind(this)} className="btn btn-primary">update</button>
            </div>
        );
    }
}
