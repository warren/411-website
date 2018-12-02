import * as React from 'react';
import { Zomato } from './components';
import styled from 'react-emotion';

const FeaturedText = styled('h1')`
    text-align: center;
    color: #FFF;
    font-size: 50px;
`;

const Section = styled('div')`
    text-align: center;
    margin-bottom: 30%;
`;

const Container = styled('div')`
    text-align: center;
    margin: 30px;
`;

const Welcome: React.SFC<{}> = () => {
    return (
        <Container>
            <FeaturedText>Zomato API</FeaturedText>
            <Section>
                <Zomato />
            </Section>
        </Container>
    );
}

export default Welcome;