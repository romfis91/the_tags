import React from 'react';
import GameBoard from './GameBoard';
import GameHistory from './GameHistory';
import ToGame from './ToGame';
import PropTypes from 'prop-types';
import {getCombinationBySchema, updateGame} from '../../http/index'

class TheGame extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            game: props.game,
            combination: props.combination
        };
    }

    onNext = async (schema) => {
        const {game} = this.state;
        const combination = await getCombinationBySchema(schema);
        game.steps.push(combination.id);
        updateGame(game.id, game);
        this.setState({game, combination})
    };

    render() {
        const { game, combination } = this.state;
        return (
            <section>
                <header style={{ display: 'flex', margin: '15px auto', justifyContent: 'center'}}>
                    <ToGame />
                </header>
                <article>
                    <GameBoard schema={combination.schema}
                        status={game.status}
                        onNext={(schema) => this.onNext( schema )}
                    />
                </article>
                <aside style={{position: 'fixed', right: 0, top: 0, bottom: 0, width: '300px', borderLeft: '1px solid black', overflow: 'scroll'}}>
                    <GameHistory steps={game.steps} gameId={game.id} currentStep={combination.id} />
                </aside>
            </section>
        )
    }
}

TheGame.propTypes = {
    game: PropTypes.object,
    combination: PropTypes.object
};

TheGame.defaultProps = {
    game: {
        id: null,
        steps: [],
        status: undefined
    },
    combination: {
        id: null,
        schema: []
    }
};

export default TheGame;