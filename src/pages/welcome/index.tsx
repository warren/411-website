import * as React from 'react';
import { Zomato } from './components';
import styled from 'react-emotion';

const FeaturedText = styled('h1')`
    text-align: center;
    color: #FFF;
    font-size: 50px;
`;

const Container = styled('div')`
    text-align: center;
    margin: 30px;
`;

const Navbar = styled('div')`
    text-align: left;
    background-color: #aaa;
    font-size: 40px;
`;

const Welcome: React.SFC<{}> = () => {
    console.log(window.history.state.state)
    return (
        <div>
            <Navbar>Uber Eats Out
                <Zomato />
            </Navbar>

            <Container>
                <FeaturedText>Hello, {window.history.state.state.name}</FeaturedText>
            </Container>
        </div>
    );
}

export default Welcome;