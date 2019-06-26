import React from "react";

class DateInput extends React.Component {
    render() {
        return (
            <input type="date" value={this.props.value} onChange={this.props.onDateChange} className="trans-input" id="trans-date-input" name="trans-date" placeholder="date" /*defaultValue="2019-06-19"*//>
        );
    }
}

class DescriptionInput extends React.Component {
    render() {
        return (
            <input type="text" value={this.props.value} onChange={this.props.onDescriptionChange} className="trans-input" id="trans-description-input" name="trans-description" placeholder="description" /*defaultValue="Frei's Fruit Market"*//>
        );
    }
}

class CategoryInput extends React.Component {
    render() {
        const categories = ["Groceries", "Business", "Eating Out", "Shopping", "Treats", "Auto", "Home"];
        const categoryOptions = categories.map((cat, ind) => {
            return (<option key={ind + 1} value={cat}>{cat}</option>)
        });

        return (
            <select type="text" value={this.props.value} onChange={this.props.onCategoryChange} className="trans-input" id="trans-category-input" name="trans-category">
                <option key={0} value={""}> - </option>
                {categoryOptions}
            </select>
        );
    }
}

class AmountInput extends React.Component {
    render() {
        return (
            <input
                type="number"
                value={this.props.value}
                step=".01"
                onChange={this.props.onAmountChange}
                className="trans-input"
                id="trans-amount-input"
                name="trans-amount"
                placeholder="amount" /*defaultValue="29.52"*/
            />
        );
    }
}

export {DateInput, DescriptionInput, CategoryInput, AmountInput}