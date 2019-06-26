import React from 'react';

function DateUpdateInput(props) {
    return (
        <input type="date" value={props.value} onChange={props.onDateChange} className="trans-input" id="trans-date-input" name="trans-date" placeholder="date" /*defaultValue="2019-06-19"*//>
    )
}

function DescriptionUpdateInput(props) {
    return (
        <input type="text" value={props.value} onChange={props.onDescriptionChange} className="trans-input" id="trans-description-input" name="trans-description" placeholder="description" /*defaultValue="Frei's Fruit Market"*//>
    )
}

class CategoryUpdateInput extends React.Component {
    render() {
        const categories = ["Groceries", "Business", "Eating Out", "Shopping", "Treats", "Auto", "Home"];
        const categoryOptions = categories.map((cat, ind) => {
            return (<option key={ind} value={cat}>{cat}</option>)
        });

        return (
            <select type="text" value={this.props.value} onChange={this.props.onCategoryChange} className="trans-input" id="trans-category-input" name="trans-category">
                {categoryOptions}
            </select>
        );
    }
}

function AmountUpdateInput(props) {
    return (
        <input
            type="number"
            value={props.value}
            step=".01"
            onChange={props.onAmountChange}
            className="trans-input"
            id="trans-amount-input"
            name="trans-amount"
            placeholder="amount" /*defaultValue="29.52"*/
        />
    )
}

export {DateUpdateInput, DescriptionUpdateInput, CategoryUpdateInput, AmountUpdateInput}
