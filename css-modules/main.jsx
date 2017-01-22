import React, {
    Component,
    PropTypes,
} from 'react';
import ReactDOM from 'react-dom';
import styles from './main.less';
import classNames from 'classnames';
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
        let isSmall = this.props.count % 2 === 0;
        let className = classNames(styles.title, {[styles.small]: isSmall, [styles.big]: !isSmall});

        return <h1 className={className}>Styled Components Initial {this.props.count}</h1>;
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
