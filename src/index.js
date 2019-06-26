import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Headers from './headers.js';
import Title from './title.js';
import Loader from './loader.js';
import Transaction from './transaction.js';
import TransactionInputFields from './transaction-input-fields';
import Uploader from './uploader';
import EditModal from './edit-modal';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            transactions: [],
            showModal: false,
            sortDirection: true,
            sortField: "date",
        };
    }

    componentDidMount() {
        this.setTransactions()
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
    }

    closeModal() {
        this.setState({
            ...this.state,
            showModal: false,
        })
    }

    createTransactionComponents() {
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
        return trans
    }

    sortTransactions(headerField, e) {
        var transactions = [...this.state.transactions];
        var desc = this.state.sortDirection;
        var sorted = transactions.sort((a, b) => {
            return desc ?
                ((a[headerField] < b[headerField]) ? 1 : -1) :
                ((a[headerField] > b[headerField]) ? 1 : -1);
        });

        this.setState({
            ...this.state,
            transactions: sorted,
            sortDirection: !this.state.sortDirection,
        });
    }

    toggleCaret = (name, e) => {
        console.log("e: " + e);
        console.log("name: " + name);
    };

    render() {
        return (
            <div id="container">
                <Title />
                <TransactionInputFields refreshTransactions={this.setTransactions.bind(this)}/>
                <Headers sort={this.sortTransactions.bind(this)} toggleCaret={this.toggleCaret.bind(this)} />

                <div id="transactions-container">
                    {this.createTransactionComponents()}
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
