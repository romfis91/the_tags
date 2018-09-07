import axios from 'axios';
import queryString from 'query-string';
import uuidv4 from 'uuid/v4';
import Hashids from 'hashids';
import {generateCombination} from '../utils';
const hashids = new Hashids();
const API_URI = 'http://localhost:3030';

// Games Resource

export const newGame = async () => {
    const randomDice = await getCombinationBySchema(generateCombination());
    const game = {
        id: uuidv4(),
        steps: [randomDice.id],
        status: 'new'
    };
    return axios.post(`${API_URI}/games`, game)
        .then(({data}) => data)
};

export const getGame = (game_uuid = null) =>
    !game_uuid ? newGame() :
        axios.get(`${API_URI}/games/${game_uuid}`)
            .then(({data}) => data ? data : newGame());
    
export const updateGame = (id, game) => 
    axios.put(`${API_URI}/games/${id}`, game)
        .then(({data}) => data);

// Combinations resource

export const getCombinationBySchema = (schema) => {
    if(!schema instanceof Array || schema.length !== 16){
        throw new Error('Invalid combination');
    }
    const params = {
        schema: hashids.encode(schema),
        limit: 1
    };
    const query = queryString.stringify(params);
    return axios.get(`${API_URI}/combinations?${query}`)
        .then(({data}) => data)
        .then(([combination]) => combination ? combination : newCombination(schema))
        .then( ({id, schema}) => ( { id, schema: hashids.decode(schema)} ) );
};
    
export const getCombination = (combination_id) =>
    axios.get(`${API_URI}/combinations/${combination_id}`)
        .then(({data}) => data)
        .then( ({id, schema}) => ( { id, schema: hashids.decode(schema)} ) )
        .catch(console.warn);
    
export const newCombination = (schema) =>
    axios.post(`${API_URI}/combinations`, { id: uuidv4(), schema: hashids.encode(schema) })
        .then(({data}) => data)
        .catch(console.warn);
