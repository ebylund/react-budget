import React from 'react';
import UpdateTransactionInputFields from './transaction-update-fields';

export default class EditModal extends React.Component {
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