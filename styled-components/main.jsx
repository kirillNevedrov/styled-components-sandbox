import React, {
    Component,
    PropTypes,
} from 'react';
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';
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

const shared = css`
    text-align: center;
    color: palevioletred;
`;

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

const INCREMENT_COUNTER = 'INCREMENT';

function increment() {
    return {
        type: INCREMENT_COUNTER
    };
}

const incIfOdd = () => {
    return (dispatch, getState) => {
        // const { counter } = getState();
        //
        // if (counter % 2 === 0) {
        //     return;
        // }

        setInterval(() => {
            dispatch(increment());
        });
    };
}

class StyledTitle extends Component {
    render(){
        let fontSize = this.props.count % 2 === 0
            ? '1em'
            : '2em';

        const Title = styled.h1`
            ${shared}
            font-size: ${fontSize};         
        `;

        const Reset = styled(Title)`
            line-height: 16px;      
            
            .test-nesting{
                width: 100px;
            }
        `;

        return <Reset>Styled Components Initial {this.props.count}</Reset>;
    }
}

class Main extends Component {
    render() {
        let titles = [];

        for(let i = 0; i <= 1000; i++){
            titles.push(<StyledTitle key={i} count={this.props.count + i}/>);
        }

        return (
            <div>
                <button onClick={this.props.incrementIfOdd}>Increment</button>
                {titles}
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        console.log(`updated ${this.props.count} ${new Date()}`);
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

//https://github.com/styled-components/styled-components/issues/134
