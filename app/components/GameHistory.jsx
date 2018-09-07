import React from 'react';
import ToGame from './ToGame';

const GameHistory = (props) => {
    const history = [...props.steps];
    const reversed = history.slice(-10);
    const [initialStep] = history;

    return (
        (
            <div>
                <ul style={{padding: 0}}>
                    <li style={{listStyle: 'none', padding: '10px 15px'}}>
                        <ToGame style={{display: 'block'}} gameId={props.gameId} stepId={history[0]}>
                            Undo
                        </ToGame>
                    </li>
                    <li style={{listStyle: 'none', padding: '10px 15px'}}>
                        <ToGame style={{display: 'block'}} gameId={props.gameId} stepId={initialStep}>
                            Reset
                        </ToGame>
                    </li>
                    <li style={{listStyle: 'none', padding: '10px 15px'}}>
                        <h1>Last 10 steps of {history.length}</h1>
                    </li>
                    {
                        reversed.map((step, i) => {
                            if(history.lastIndexOf(step) === 0) {
                                return;
                            }
                            return (
                                <li key={i} style={{
                                    listStyle: 'none',
                                    padding: '10px 15px'
                                }}>
                                    <ToGame style={{display: 'block'}} gameId={props.gameId} stepId={step}>
                                        Step: {history.lastIndexOf(step)}
                                    </ToGame>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        )
    );
};

export default GameHistory;