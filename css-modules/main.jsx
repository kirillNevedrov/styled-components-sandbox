import React, {
    Component,
    PropTypes,
} from 'react';
import ReactDOM from 'react-dom';
import styles from './main.less';

class Main extends Component {
    render() {
        return (
            <h1 className={styles.title}>Styled Components Initial</h1>
        );
    }
}

Main.propTypes = {};
Main.defaultProps = {};

ReactDOM.render(
    <Main/>,
    document.getElementById('root')
);
