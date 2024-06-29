import React from "react";

export default function Overlay(props) {

    return (
        <div className="overlay-container">
            <div className="overlay">
                <h1>{props.message}</h1>
                <button onClick={props.restartGame}>Restart</button>
            </div>
        </div>
    );
};