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

require('dotenv').config();

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:4000";

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
        fetch(`${baseUrl}/api/transactions/${id}`, {method: "DELETE"})
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
            fetch(`${baseUrl}/api/transactions/upload`, {
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
            // TODO: transaction is inserted at selected sorted location
            // TODO: calling sort here results in: Maximum update call exceeded error
            // this.sortTransactions(this.state.sortField)
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
            sortField: headerField,
            sortDirection: !this.state.sortDirection,
        });
    }

    render() {
        return (
            <div id="container">
                <Title />
                <TransactionInputFields refreshTransactions={this.setTransactions.bind(this)}/>
                <Headers
                    sort={this.sortTransactions.bind(this)}
                    sortDirection={this.state.sortDirection}
                    sortField={this.state.sortField}
                />

                <div id="transactions-container">
                    {this.createTransactionComponents()}
                </div>

                <Downloader />

                <Uploader
                    refreshTransactions={this.setTransactions.bind(this)}
                    uploadFile={this.uploadFile.bind(this)}
                />

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

function Downloader() {
    return (
        <a href={`${baseUrl}/api/transactions.csv`}>
            <div className="starLoad btn btn-primary">
                        <span>
                            <img id="download-icon" src="images/data-transfer-download-white.svg" alt="download-icon"/>
                        </span>
            </div>
        </a>
    )
}

function fetchTransactions() {
    return fetch(`${baseUrl}/api/transactions`)
        .then(function (response) {
            return response.json();
        })
}

ReactDOM.render(
    <Main />,
    document.getElementById("root")
);
