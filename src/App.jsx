import React from 'react';
import { useState } from 'react'
import './App.css'

import Board from './components/Board';
import Statistics from './components/Statistics';

function App() {
    const [history, setHistory] = useState({
        '1': 0,
        '-1': 0,
        '0': 0
    });

    return (
        <div id='game'>
            <section>
                <Statistics statistics={history} />
            </section>  
            <section className='board'>
                <Board recordResult={setHistory} history={history} />
            </section>      
        </div>
    )
};

export default App
