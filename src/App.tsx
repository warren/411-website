import * as React from 'react';
import styled from 'react-emotion';
import { Col } from 'reactstrap';
import './buttons.css';
import { Zomato } from "./components";
import { Welcome } from './pages';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
    color: #aaa;
    display: inline;
    font-size: 60px;
`;

const App: React.SFC = () => {
    return (
      <Router>
        <div>
            <TitleSection>
                <MainHeaderWhite>Uber</MainHeaderWhite>
                <MainHeaderGreen>Eats</MainHeaderGreen>
                <MainHeaderBlue>(Out!)</MainHeaderBlue>
            </TitleSection>

            <Section>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <a href="#"
                        className="btn btn-sm animated-button thar-three"
                        onClick={() => { alert('Google button clicked') }}>
                        Log in with Google
                    </a>
                </Col>
            </Section>
            <Link to="/pages/welcome/">About</Link>
            <Route path="/pages/welcome/" component={Welcome} />

            <FeaturedText>Zomato API</FeaturedText>
            <Section>
            <Zomato />
            </Section>
        </div>
      </Router>
    );
}

export default App;
