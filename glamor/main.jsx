import React, {
    Component,
    PropTypes,
} from 'react';
import ReactDOM from 'react-dom';
import { css } from 'glamor';

// merge rules for great justice
let mono = css({
    fontFamily: 'monospace'
});

let bolder = css({
    fontWeight: 'bolder'
});

class Main extends Component {
    render() {
        return (
            <div className={`${mono} ${bolder}`}>
                bold code!
            </div>
        );
    }
}

Main.propTypes = {};
Main.defaultProps = {};

ReactDOM.render(
    <Main/>,
    document.getElementById('root')
);
