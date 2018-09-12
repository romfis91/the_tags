import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const ToGame = (props) => {
    const {gameId, stepId} = props;

    let link = '/game';

    if(gameId) {
        link += `/${gameId}`;
        if(stepId) {
            link += `?step_uuid=${stepId}`;
        }
    }

    return (
        <Link href={link}>
            <a style={{
                background: 'none',
                borderRadius: 5,
                border: '1px solid black',
                padding: '10px 15px',
                textDecoration: 'none'
                , ...props.style
            }}>
                { props.children ? props.children : 'New game'}
            </a>
        </Link>
    )
};

ToGame.defaultProps = {
    game_id: null,
    step_id: null
};


ToGame.propTypes = {
    game_id: PropTypes.number,
    step_id: PropTypes.number,
};


export default ToGame;
