import * as React from 'react';
import { Zomato, ProfilePic } from './components';
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
    background-color: #aaa;
    font-size: 40px;
`;

type WelcomeProps = {
    history: any,
    match: any,
    location: any
}


class Welcome extends React.Component<WelcomeProps> {

    public render() {

        console.log("PROPS FROM WELCOME!", this.props);

        return(
            <div>
                <Navbar>
                    <span style={{textAlign: 'left'}}>Uber Eats Out</span>
                    {/*<Zomato latitude={42.350560} longitude={-71.100470}/> /!*TODO: Get lat long dynamically*!/*/}
                    <Zomato /> {/*TODO: Get lat long dynamically*/}
                    <ProfilePic proPicURL={this.props.location.state.image} />
                </Navbar>

                <Container>
                    <FeaturedText>Hello, {window.history.state.state.name}</FeaturedText>
                </Container>
            </div>
        );
    }
}



export default Welcome;