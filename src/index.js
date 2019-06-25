import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Headers from './headers.js';
import Title from './title.js';
import Loader from './loader.js';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: "USD",
    minimumFractionDigits: 2
});

// var transactionList = [];
//
// function validateFields() {
//     var v = fetchInputValues();
//     return v.inputDate.value !== "" &&
//         v.inputDescription.value !== "" &&
//         v.inputCategory.value !== "" &&
//         v.inputAmount.value !== ""
// }
//
// function resetFields() {
//
// }
//
// function fetchInputValues() {
//     return {
//         inputDate: document.getElementById("trans-date-input"),
//         inputDescription: document.getElementById("trans-description-input"),
//         inputAmount: document.getElementById("trans-amount-input"),
//         inputCategory: document.getElementById("trans-category-input")
//     };
// }
//
// function updateTransactionHandler(event) {
//     var transNode = event.target.parentNode.parentNode.parentNode;
//     var dataId = Number(transNode.getAttribute("data-id"));
//     var trans = transactionList.find(trans => trans.id === dataId);
//     destroyTransaction(dataId)
//         .then(function () {
//             var inputValues = fetchInputValues();
//             inputValues.inputDate.value = trans.date.split("T")[0];
//             inputValues.inputDescription.value = trans.description;
//             inputValues.inputCategory.value = trans.category;
//             inputValues.inputAmount.value = trans.amount;
//         })
// }
//
// function destroyTransactionHandler(event) {
//     var dataId = event.target.parentNode.parentNode.parentNode.getAttribute("data-id");
//     destroyTransaction(dataId)
//         .then(function () {
//             console.log("destroyed!")
//         })
//
// }
//
// function createTransactionFromTemplate(t) {
//     var newTransaction = document
//         .getElementById("transaction-template")
//         .content
//         .cloneNode(true)
//         .querySelector(".transaction");
//
//     newTransaction.setAttribute("data-id", t.id);
//     newTransaction.setAttribute("data-created-on", t.createdOn);
//     newTransaction.querySelector(".trans-date").innerText = new Date(t.date).toLocaleDateString();
//     newTransaction.querySelector(".trans-description").innerText = t.description;
//     newTransaction.querySelector(".trans-category").innerText = t.category;
//     newTransaction.querySelector(".trans-amount").innerText = "-" + formatter.format(t.amount);
//     newTransaction.querySelector("#update").addEventListener("click", updateTransactionHandler);
//     newTransaction.querySelector("#destroy").addEventListener("click", destroyTransactionHandler);
//
//     return newTransaction;
// }
//
// function removeDisplayedTransactions() {
//     var transactionContainer = document.getElementById("transactions-container");
//     while (transactionContainer.firstChild) {
//         transactionContainer.removeChild(transactionContainer.firstChild);
//     }
// }
//
// function refreshTransactions() {
//     removeDisplayedTransactions();
//     var transactionContainer = document.getElementById("transactions-container");
//     transactionList.forEach(transaction => {
//         var newTransaction = createTransactionFromTemplate(transaction);
//         transactionContainer.appendChild(newTransaction);
//     });
// }
//
// function addTransaction() {
//     var inputValues = fetchInputValues();
//     Object.values(inputValues).forEach(input => input.classList.remove("input-error"));
//     if (!validateFields()) {
//         var inputs = Object.values(inputValues);
//         var invalidInputs = inputs.filter(input => input.value === "");
//         invalidInputs.forEach(input => input.classList.add("input-error"));
//         return;
//     }
//     postTransaction({
//         date: inputValues.inputDate.value,
//         description: inputValues.inputDescription.value,
//         category: inputValues.inputCategory.value,
//         amount: inputValues.inputAmount.value
//     });
// }
//
// function fetchTransactions() {
//     return fetch("http://localhost:5225/transactions")
//         .then(function (response) {
//             return response.json();
//         })
// }
//
// function fetchTransactionsAndPopulateList() {
//     return fetchTransactions()
//         .then(function(transactions) {
//             transactionList = transactions;
//         })
// }
//
// function postTransaction(transaction) {
//     fetch("http://localhost:5225/transactions", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(transaction)
//     }).then(function () {
//         fetchTransactionsAndPopulateList()
//             .then(function() {
//                 refreshTransactions();
//             });
//     })
// }
//
// function destroyTransaction(id) {
//     return fetch(`http://localhost:5225/transactions/${id}`, {method: "DELETE"})
//         .then(function () {
//             fetchTransactionsAndPopulateList()
//                 .then(function() {
//                     refreshTransactions();
//                     return true;
//                 });
//             return true;
//         })
// }
//
// function uploadcsv(item) {
//     if (item.files === undefined || item.files.length === 0) return;
//     var file = item.files[0];
//     if (file === undefined) return;
//
//     //eslint-disable-next-line
//     if (confirm(`Confirm import for file: ${file.name}`)) {
//         var formData = new FormData();
//         formData.append('file', file);
//         fetch("http://localhost:5225/transactions/upload-csv", {
//             method: "POST",
//             body: formData
//         })
//             .then(function () {
//                 fetchTransactionsAndPopulateList()
//                     .then(function() {
//                         refreshTransactions();
//                     });
//             })
//     }
//     item.value = "";
// }
//
// fetchTransactionsAndPopulateList()
//     .then(function() {
//         refreshTransactions();
//     });
//
// ["date", "description", "category", "amount"].forEach(column => {
//     document.getElementById(`header-${column}`).addEventListener("click", function() {
//         document.querySelectorAll(".header > img").forEach(header => header.className = []);
//         let caret = this.querySelector("img");
//         let direction = caret.getAttribute("data-direction");
//         switch (direction) {
//             case "off":
//                 caret.setAttribute("data-direction", "desc");
//                 caret.classList.add("direction-desc");
//                 transactionList.sort(function (a, b) {
//                     return (a[column] < b[column]) ? 1 : -1;
//                 });
//                 refreshTransactions();
//                 break;
//             case "desc":
//                 caret.setAttribute("data-direction", "asc");
//                 caret.classList.add("direction-asc");
//                 transactionList.sort(function (a, b) {
//                     return (a[column] > b[column]) ? 1 : -1;
//                 });
//                 refreshTransactions();
//                 break;
//             case "asc":
//                 caret.setAttribute("data-direction", "desc");
//                 caret.classList.add("direction-desc");
//                 transactionList.sort(function (a, b) {
//                     return (a[column] < b[column]) ? 1 : -1;
//                 });
//                 refreshTransactions();
//                 break;
//         }
//     })
// });

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
            return (<option key={ind} value={cat}>{cat}</option>)
        });

        return (
            <select type="text" value={this.props.value} onChange={this.props.onCategoryChange} className="trans-input" id="trans-category-input" name="trans-category">
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

class TransactionInputFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateInput: "",
            descriptionInput: "",
            categoryInput: "",
            amountInput: 0,
        }
    }

    onDateChange = (e) => {
        this.setState({dateInput: e.target.value});
    };

    onDescriptionChange = (e) => {
        this.setState({descriptionInput: e.target.value});
    };

    onCategoryChange = (e) => {
        this.setState({categoryInput: e.target.value});
    };

    onAmountChange = (e) => {
        this.setState({amountInput: e.target.value});
    };

    render() {
        return (
            <div id="transaction-input-fields">
                <DateInput value={this.state.dateInput} onDateChange={this.onDateChange}/>
                <DescriptionInput value={this.state.descriptionInput} onDescriptionChange={this.onDescriptionChange}/>
                <CategoryInput value={this.state.categoryInput} onCategoryChange={this.onCategoryChange}/>
                <AmountInput value={this.state.amountInput} onAmountChange={this.onAmountChange}/>
                <button id="add-transaction" onClick={this.addTransaction.bind(this)} className="btn btn-primary">+</button>
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


class Transaction extends React.Component {
    render() {
        const editIcon = "images/pencil-blue.svg";
        const deleteIcon = "images/trash-red.svg";
        const trans = this.props.transactions;
        return (
            <div className="transaction">
                <div className="item trans-date">{trans.date}</div>
                <div className="item trans-description">{trans.description}</div>
                <div className="item trans-category">{trans.category}</div>
                <div className="item trans-amount">{"-" + formatter.format(trans.amount)}</div>
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

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            transactions: [],
            showModal: false,
        };
    }

    deleteTransaction(id) {
        var that = this;
        fetch(`http://localhost:4000/api/transactions/${id}`, {method: "DELETE"})
            .then(function () {
                that.setTransactions();
            })
    }

    setTransactions() {
        fetchTransactions()
            .then((json) => {
                return json.data;
            })
            .then((resp) => {
                var sorted = resp.sort(function (a, b) {
                    return (a.date > b.date) ? 1 : -1;
                });
                this.setState({
                    isLoaded: true,
                    transactions: sorted,
                });
            })
    }

    uploadFile(e) {
        var that = this;
        console.log(e.target.files[0]);
        const files = e.target.files;

        if (files === undefined || files.length === 0) return;
        var file = files[0];
        if (file === undefined) return;

        //eslint-disable-next-line
        if (confirm(`Confirm import for file: ${file.name}`)) {
            var formData = new FormData();
            formData.append('transactions-file', file);

            console.log(formData);
            fetch("http://localhost:4000/api/transactions/upload", {
                method: "POST",
                body: formData
            })
                .then(function() {
                    that.setTransactions()
                })
        }
        // e.target.files = undefined;
        // item.value = "";
    }

    updateTransaction(id) {
        console.log(id);
        this.setState({
            ...this.state,
            showModal: true,
            updateId: id,
        })
        // ReactDOM.render(
            // document.getElementById("root")
    }

    componentDidMount() {
        this.setTransactions()
    }

    closeModal() {
        this.setState({
            ...this.state,
            showModal: false,
        })
    }

    render() {
        var trans;
        if (this.state.isLoaded) {
            trans = this.state.transactions.map((tran) => {
                return <Transaction
                    key={tran.id}
                    transactions={tran}
                    remove={this.deleteTransaction.bind(this)}
                    update={this.updateTransaction.bind(this)}
                />
            });
        } else {
            trans = <Loader />
        }

        return (
            <div id="container">
                <Title />
                <TransactionInputFields refreshTransactions={this.setTransactions.bind(this)}/>
                <Headers/>
                <div id="transactions-container">
                    {trans}
                </div>
                <Uploader
                    refreshTransactions={this.setTransactions.bind(this)}
                    uploadFile={this.uploadFile.bind(this)}
                />
                {/*<button><img id="download-icon" src="images/data-transfer-download.svg" alt="download-icon"/></button>*/}
                <EditModal
                    show={this.state.showModal}
                    updateId={this.state.updateId}
                    refreshTransactions={this.setTransactions.bind(this)}
                    closeModal={this.closeModal.bind(this)}
                />
            </div>
        );
    }
}

class Uploader extends React.Component {
    render() {
        return (
            <div className="fileUpload btn btn-primary">
                <span>Upload <img width="12px" id="upload-icon" src="images/data-transfer-upload-white.svg" alt="pencil"/></span>
                <input
                    type="file"
                    className="upload"
                    id="uploader"
                    accept="text/csv, .csv"
                    onChange={this.props.uploadFile.bind(this)}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="csv file with format of: date, description, category, amount"
                />
            </div>


        )
    }
}

class UpdateTransactionInputFields extends React.Component {
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
        var that = this;
        fetch(`http://localhost:4000/api/transactions/${this.props.updateId}`)
            .then(function (response) {
                return response.json();
            })
            .then(function(json) {
                console.log(json);
                var transaction = json.data;
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

    componentDidMount() {
        this.fetchAndPopulateInputValues()
    }

    onDateChange = (e) => {
        this.setState({dateUpdateInput: e.target.value});
    };

    onDescriptionChange = (e) => {
        this.setState({descriptionUpdateInput: e.target.value});
    };

    onCategoryChange = (e) => {
        this.setState({categoryUpdateInput: e.target.value});
    };

    onAmountChange = (e) => {
        this.setState({amountUpdateInput: e.target.value});
    };

    render() {
        if (!this.state.fetchedResponse) {
            return (<div>Loading...</div>)
        } else {
            return (
                <div id="transaction-input-fields">
                    {/*<DateInput value={this.state.dateInput} onDateChange={this.onDateChange}/>*/}
                    <input type="date" value={this.state.dateUpdateInput} onChange={this.onDateChange} className="trans-input" id="trans-date-input" name="trans-date" placeholder="date" /*defaultValue="2019-06-19"*//>
                    <input type="text" value={this.state.descriptionUpdateInput} onChange={this.onDescriptionChange} className="trans-input" id="trans-description-input" name="trans-description" placeholder="description" /*defaultValue="Frei's Fruit Market"*//>
                    {/*<DescriptionInput value={this.state.descriptionUpdateInput} onDescriptionChange={this.onDescriptionChange}/>*/}
                    <CategoryUpdateInput value={this.state.categoryUpdateInput} onCategoryChange={this.onCategoryChange}/>
                    <input
                        type="number"
                        value={this.state.amountUpdateInput}
                        step=".01"
                        onChange={this.onAmountChange}
                        className="trans-input"
                        id="trans-amount-input"
                        name="trans-amount"
                        placeholder="amount" /*defaultValue="29.52"*/
                    />
                    <button id="update-transaction" onClick={this.updateTransaction.bind(this)} className="btn btn-primary">update</button>
                </div>
            );
        }
    }

    updateTransaction() {
        var props = this.props;
        var trans = {
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
        fetch(`http://localhost:4000/api/transactions/${this.props.updateId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(trans)
        }).then(function (data) {
            props.refreshTransactions();
            props.closeModal();
        });
    }
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

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     show: false
        // }
    }

    closeModal() {
        this.setState({
            ...this.state,

        })
    }
    render() {
        if (!this.props.show) {
            return null;
        } else {
            return (
                <div id="modal-background">
                    <div id="edit-modal">
                        {/*{this.props.updateId}*/}
                        <UpdateTransactionInputFields
                            updateId={this.props.updateId}
                            refreshTransactions={this.props.refreshTransactions.bind(this)}
                            closeModal={this.props.closeModal.bind(this)}
                        />
                    </div>
                </div>
            )
        }
    }
}

function fetchTransactions() {
    return fetch("http://localhost:4000/api/transactions")
        .then(function (response) {
            return response.json();
        })
}

ReactDOM.render(
    <Main />,
    document.getElementById("root")
);
