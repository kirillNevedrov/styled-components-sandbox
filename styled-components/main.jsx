import React, {
    Component,
    PropTypes,
} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Title = styled.h1`
          font-size: 1.5em;
          text-align: center;
          color: palevioletred;
        `;

class Main extends Component {
    render() {
        return (
            <Title>Styled Components Initial</Title>
        );
    }
}

Main.propTypes = {};
Main.defaultProps = {};

ReactDOM.render(
    <Main/>,
    document.getElementById('root')
);
