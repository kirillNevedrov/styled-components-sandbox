import React, {
    Component,
    PropTypes,
} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { createStore, applyMiddleware } from 'redux';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';

const rootReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
};

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

const Title = styled.h1`
          font-size: 1.5em;
          text-align: center;
          color: palevioletred;
        `;

const INCREMENT_COUNTER = 'INCREMENT';

function increment() {
    return {
        type: INCREMENT_COUNTER
    };
}

const incIfOdd = () => {
    return (dispatch, getState) => {
        const { counter } = getState();

        if (counter % 2 === 0) {
            return;
        }

        dispatch(increment());
    };
}

class Main extends Component {
    render() {
        return (
            <div>
                <Title>Styled Components Initial {this.props.count}</Title>
                <button onClick={this.props.incrementIfOdd}>Increment</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        count: state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        incrementIfOdd: () => {
            dispatch(incIfOdd());
        }
    };
};

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

ReactDOM.render(
    <Provider store={store}>
        <MainContainer/>
    </Provider>,
    document.getElementById('root')
);
