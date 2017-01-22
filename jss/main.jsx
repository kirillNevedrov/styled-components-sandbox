import React, {
    Component,
    PropTypes,
} from 'react';
import ReactDOM from 'react-dom';
import jss from 'jss';
import preset from 'jss-preset-default';
import color from 'color';

// One time setup with default plugins and settings.
jss.setup(preset());

const styles = {
    button: {
        fontSize: 12,
        '&:hover': {
            background: 'blue'
        }
    },
    ctaButton: {
        extend: 'button',
        '&:hover': {
            background: color('blue').darken(0.3).hex()
        }
    },
    '@media (min-width: 1024px)': {
        button: {
            width: 200
        }
    }
};

const {classes} = jss.createStyleSheet(styles).attach();

class Main extends Component {
    render() {
        return (
            <div>
                <h1>Styled Components Initial</h1>
                <button className={classes.button}>Button</button>
                <button className={classes.ctaButton}>CTA Button</button>
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
