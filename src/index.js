import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

class TransactionInputFields extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const categories = ["Groceries", "Business", "Eating Out", "Shopping", "Treats", "Auto", "Home"];
        const categoryOptions = categories.map((cat, ind) => {
            return (<option key={ind} value={cat}>{cat}</option>)
        });

        return (
            <div id="transaction-input-fields">
                <input type="date" className="trans-input" id="trans-date-input" name="trans-date" placeholder="date" defaultValue="2019-06-19"/>
                <input type="text" className="trans-input" id="trans-description-input" name="trans-description" placeholder="description" defaultValue="Frei's Fruit Market"/>
                <input type="number" step=".01" className="trans-input" id="trans-amount-input" name="trans-amount" placeholder="amount" defaultValue="29.52"/>
                <select type="text" className="trans-input" id="trans-category-input" name="trans-category">
                    {categoryOptions}
                </select>
                <button id="add-transaction" onClick={() => null} className="btn btn-primary">+</button>
            </div>
        );
    }
}

function Headers() {
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

function Title(props) {
    return (
        <div id="title">
            <h2>Budgeteer</h2>
        </div>
    )
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
                        <img id="pencil" src={editIcon} alt="pencil"/>
                    </div>

                    <div id="destroy" className="icon">
                        <img id="trash" src={deleteIcon} alt="pencil"/>
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
            // transactions: [
            //     {id: 1, date: "2019-06-24", description: "Swig Treats", category: "Treats", amount: 6.90},
            //     {id: 2, date: "2019-06-23", description: "Lowes", category: "Home", amount: 96.09},
            //     {id: 3, date: "2019-06-27", description: "George's Corner", category: "Eating Out", amount: 43.72},
            //     {id: 4, date: "2019-06-18", description: "Ledge's Golf Club", category: "Fun", amount: 52.44},
            // ],
            // transactions: fetchTransactions()
        };

    }

    componentDidMount() {
        fetchTransactions()
            .then((json) => {
                return json.data;
            })
            .then((resp) => {
                this.setState({
                    isLoaded: true,
                    transactions: resp,
                });
                console.log(resp)
            })
    }

    render() {
        var trans;
        // if (this.state.isLoaded) {
        //     trans = this.state.transactions.map((tran) => {
        //         return <Transaction key={tran.id} transactions={tran}/>
        //     });
        // } else {
            trans = <div id="loader"><img src="images/tail-spin.svg" width="50" alt=""/></div>;
        // }

        return (
            <div id="container">
                <Title />
                <TransactionInputFields />
                <Headers/>
                <div id="transactions-container">
                    {trans}
                </div>
            </div>
        );
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
