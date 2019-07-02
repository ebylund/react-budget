import React from "react";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:4000";

export default function Downloader() {
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