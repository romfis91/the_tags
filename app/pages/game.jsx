import React from 'react';
import Layout from '../components/Layout';
import TheTag from '../components/the-tag/TheTag';
import {getGame, getCombination} from '../http';

const Game = (props) => (
    <Layout>
        <TheTag game={props.game} combination={props.combination} />
    </Layout>
);

Game.getInitialProps = async (context) => {
    const { query: {game_uuid, step_uuid} } = context;
    const game = await getGame(game_uuid);
    const curCombinationId = step_uuid ? step_uuid : game.steps[game.steps.length - 1];
    const combination = await getCombination(curCombinationId);
    return {game, combination};
};

export default Game;