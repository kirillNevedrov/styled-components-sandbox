import React, {
    Component,
    PropTypes,
} from 'react';
import styles from './main.less';
import classNames from 'classnames';

class StyledTitle extends Component {
    render(){
        let isSmall = this.props.count % 2 === 0;
        let className = classNames(styles.title, {[styles.small]: isSmall, [styles.big]: !isSmall});

        return <h1 className={className}>Styled Components Initial {this.props.count}</h1>;
    }
}

// import start from './app.jsx';
// start({
//     getStyledTitle: (settings) => {
//         return (
//             <StyledTitle key={settings.key} count={settings.count}/>
//         );
//     }
// });

import start from './app.jsx';
start({
    getStyledTitle: (settings) => {
        let isSmall = (settings.count % 2) === 0;
        let className = classNames(styles.title, {[styles.small]: isSmall, [styles.big]: !isSmall});

        return (
            <div className={className}>Styled Components Initial {settings.count}</div>
        );
    }
});