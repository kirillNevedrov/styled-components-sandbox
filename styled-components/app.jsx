import React, {
    Component,
    PropTypes,
} from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';

const INCREMENT_COUNTER = 'INCREMENT';

function increment() {
    return {
        type: INCREMENT_COUNTER
    };
}

const rootReducer = (state = 0, action) => {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return state + 1;
        default:
            return state;
    }
};

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

const startIncrement = () => {
    return (dispatch, getState) => {
        setInterval(() => {
            dispatch(increment());
        });
    };
}

class Main extends Component {
    render() {
        let titles = [];

        for (let i = 0; i <= 100; i++) {
            titles.push(this.props.getStyledTitle({key: i, count: this.props.count + i}));
        }

        return (
            <div>
                <button onClick={this.props.startIncrement}>Increment</button>
                {titles}
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        console.log(`updated ${this.props.count} ${new Date()}`);
    }

    componentWillMount() {
        console.log(`will mount ${new Date()}`);
    }

    componentDidMount() {
        console.log(`did mount ${new Date()}`);
    }
}

const mapStateToProps = (state) => {
    return {
        count: state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startIncrement: () => {
            dispatch(startIncrement());
        }
    };
};

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default (mainContainerProps) => {
    ReactDOM.render(
        <Provider store={store}>
            <MainContainer {...mainContainerProps}/>
        </Provider>,
        document.getElementById('root')
    );
}
