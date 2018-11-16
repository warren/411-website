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

const BlackBackground = styled('div')`
    background-color: #606060
`;

const App: React.SFC = () => {
    return (
      <>
        <BlackBackground>
            <h1>Uber Eats (Out!)</h1>

            <span>
                <button>Log in with Google</button>
                <button>Sign Up</button>
            </span>
            <h3>*Uber account required (duh)</h3>
        </BlackBackground>


        <FeaturedText>Zomato API</FeaturedText>
        <Section>
          <Yelp />
        </Section>
      </>
    );
}

export default App;
