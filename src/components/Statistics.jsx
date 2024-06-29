import React from "react";

export default function Statistics(props) {
    const statistics = props.statistics
    return (
        <div className="statistics">
            <p>Wins: {statistics[1]}</p>
            <p>Losses: {statistics[-1]}</p>
            <p>Draws: {statistics[0]}</p>
        </div>
    );
};