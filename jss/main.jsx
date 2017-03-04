import React, {
    Component,
    PropTypes,
} from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';

jss.setup(preset());

let cache = {};

class StyledTitle extends Component {
    getStyles(input){
        let inputString = input.toString();

        let cachedStyles = cache[inputString];

        if(cachedStyles){
            return cachedStyles;
        }
        else{
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

    render(){
        const {classes} = this.getStyles(this.props.count % 2);
        return <h1 className={classes.title}>Styled Components Initial {this.props.count}</h1>;
    }
}

import start from './app.jsx';
start({
    getStyledTitle: (settings) => {
        return (
            <StyledTitle key={settings.key} count={settings.count}/>
        );
    }
});
