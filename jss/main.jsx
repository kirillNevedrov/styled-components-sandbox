import React, {
    Component,
    PropTypes,
} from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';
import L from './layout/layout.jsx';

jss.setup(preset());

let cache = {};

class StyledTitle extends Component {
    getStyles(input) {
        let inputString = input.toString();

        let cachedStyles = cache[inputString];

        if (cachedStyles) {
            return cachedStyles;
        }
        else {
            let isSmall = input === 0;

            const styles = {
                title: {
                    textAlign: 'center',
                    color: 'palevioletred',
                    fontSize: isSmall ? '1em' : '2em'
                }
            };

            let dynamicStyles = jss.createStyleSheet(styles).attach();

            cache[inputString] = dynamicStyles;//TODO: add counter of style usage and remove style on componentwillunmount if it is not used anymore

            return dynamicStyles;
        }
    }

    render() {
        const {classes} = this.getStyles(this.props.count % 2);
        return <h1 className={classes.title}>Styled Components Initial {this.props.count}</h1>;
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

        return (
            <L
                cache='global'
                stylesProps={{
                    width: isSmall ? 300 : 600
                }}
                styles={{
                    backgroundColor: 'blue',
                    display: 'block',
                    margin: '20px',
                    width: p => `${p.width}px`,
                    '&:hover': {
                      width: p => `${p.width / 2}px`
                    }
                }}
            >
                Styled Components Initial {settings.count}
            </L>
        );
    }
});

