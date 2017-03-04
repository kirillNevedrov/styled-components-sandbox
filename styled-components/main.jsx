import React, {
    Component,
    PropTypes,
} from 'react';
import styled, {css} from 'styled-components';

const shared = css`
    text-align: center;
    color: palevioletred;
`;

class StyledTitle extends Component {
    render(){
        let fontSize = this.props.count % 2 === 0
            ? '1em'
            : '2em';

        const Title = styled.h1`
            ${shared}
            font-size: ${fontSize};         
        `;

        return <Title>Styled Components Initial {this.props.count}</Title>;
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
