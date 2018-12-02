import * as React from 'react';
import styled from 'react-emotion';
import './buttons.css';
import './App.css';
import { Yelp } from "./pages";

const FeaturedText = styled('h1')`
    text-align: center;
    color: #FFF;
    font-size: 50px;
`;

const Section = styled('div')`
    text-align: center;
    margin-bottom: 30%;
`;

const TitleSection = styled('div')`
    text-align: center;
    margin-top: 15%;
`;

const MainHeaderWhite = styled('h1')`
    color: white;
    display: inline;
    font-size: 60px;
`;

const MainHeaderGreen = styled('h1')`
    color: green;
    display: inline;
    font-size: 60px;
`;

const MainHeaderBlue = styled('h1')`
    color: blue;
    display: inline;
    font-size: 60px;
`;



const App: React.SFC = () => {
    return (
      <>
        <div className='black-background'>
            <TitleSection>
                <MainHeaderWhite>Uber</MainHeaderWhite>
                <MainHeaderGreen>Eats</MainHeaderGreen>
                <MainHeaderBlue>(Out!)</MainHeaderBlue>
            </TitleSection>

            <Section>
                <div className="col-md-3 col-sm-3 col-xs-6"></div>
                <div className="col-md-3 col-sm-3 col-xs-6">
                    <a href="#"
                       className="btn btn-sm animated-button thar-three"
                       onClick={() => { alert('Google button clicked') }}>
                       Log in with Google
                    </a>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6">
                    <a href="#"
                       className="btn btn-sm animated-button thar-three"
                       onClick={() => { alert('Sign up button clicked') }}>
                       Sign up
                    </a>
                </div>

                <div className="col-md-3 col-sm-3 col-xs-6"></div>

            </Section>

            <h3>*Uber account required (duh)</h3>
        </div>


        <FeaturedText>Zomato API</FeaturedText>
        <Section>
          <Yelp />
        </Section>
      </>
    );
}

export default App;
