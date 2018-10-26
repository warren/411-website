import * as React from 'react';
import styled from 'react-emotion';
import './App.css';
import { Yelp } from "./pages";

const FeaturedText = styled('h1')`
    text-align: center;
    color: #FFF;
    font-size: 50px;
`;

const Section = styled('div')`
    text-align: center;
`;

const App: React.SFC = () => {
    return (
      <>
        <FeaturedText>Zomato API</FeaturedText>
        <Section>
          <Yelp />
        </Section>
      </>
    );
}

export default App;
