import React from 'react';
import PropTypes from 'prop-types';
import { isValidStep, getAvailableValues, isWin } from '../../games/theTag';

const BOARD_WIDTH = 400;
const BOARD_HEIGHT = 400;

class GameBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            highligthEnabled: false,
            available: []
        }
    }

    componentDidMount(){
        const {schema} = this.props;
        this.calculateHighligth(schema);
    }

    handleClick = (e, item) => {
        const {schema} = this.props;
        if(isValidStep(schema, item)) {
            this.swap(item);
        } else {
            this.highlightAvailableStep();
        }
    };

    highlightAvailableStep = () => {
        this.setState({highligthEnabled: true})
        setTimeout(() => {
            this.setState({highligthEnabled: false})
        }, 500)
    }

    calculateHighligth = (items) => {
        const available = getAvailableValues(items)
        this.setState({available});
    }

    swap = (target) => {
        const { schema } = this.props;
        const newSchema = schema.map((value) => {
            if(!value) {
                return target;
            } else if( value === target){
                return 0;
            } else {
                return value;
            }
        });
        this.calculateHighligth(newSchema);
        this.props.onNext(newSchema);
    };

    check = (status, schema) => {
        return isWin(schema) || status === 'done';
    };

    render(){
        const { schema, status } = this.props;
        const { highligthEnabled, available } = this.state;
        const isWin = this.check(status, schema);
        return (
            <div style={styles.board}>
                {
                    isWin &&
                    <div style={styles.congratulation}>
                        <hgroup>
                            <h2 style={{textAlign: 'center'}}>You are win!!!</h2>
                            <h4 style={{textAlign: 'center'}}>Can you repeat?</h4>
                        </hgroup>
                    </div>
                }
                {
                    schema.map((item, i) => {
                        return (
                            <div key={i} 
                                ref={ref => {
                                    if(!item) {
                                        this.emptyElement = ref
                                    }
                                }}
                                style={{
                                    ...styles.dice, 
                                    color: highligthEnabled && !available.some((v) => v === item) ? 
                                        '#e7e7e7' : 
                                        'black',
                                    borderRadius: !item ? '0' : '5%',
                                    backgroundColor: !item ? '#e7e7e7' : null,
                                    boxShadow: highligthEnabled && available.some((v) => v === item) ? 
                                        'inset 0 0 15px green' : 
                                        'none' 
                                }} 
                                onClick={(e) => isWin || this.handleClick(e, item, i)}>
                                {!!item && item}
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}

const styles = {
    board: {
        display: 'flex',
        border: '2px solid black',
        width: BOARD_WIDTH,
        height: BOARD_HEIGHT,
        boxShadow: '0 5px 5px black',
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'relative'
    },
    dice: {
        display: 'flex',
        width: BOARD_WIDTH / 4,
        height: BOARD_HEIGHT / 4,
        boxShadow: 'inset 0 0 2px #e1e1e1',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.7em',
        cursor: 'pointer',
        transition: '0.25s'
    },
    congratulation: {
        display: 'flex',
        position: 'absolute',
        zIndex: '10',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

GameBoard.propTypes = {
    schema: PropTypes.array
};

GameBoard.defaultProps = {
    schema: []
};

export default GameBoard;