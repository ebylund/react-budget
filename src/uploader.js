import React from 'react';

export default class Uploader extends React.Component {
    render() {
        return (
            <div className="starLoad fileUpload btn btn-primary">
                <span><img id="upload-icon" src="images/data-transfer-upload-white.svg" alt="pencil"/></span>
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
