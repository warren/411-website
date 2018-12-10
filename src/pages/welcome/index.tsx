import * as React from 'react';
import { Zomato, ProfilePic } from './components';
import styled from 'react-emotion';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { Redirect } from 'react-router';

var config = { // TODO: Make this imported from a separate file
    apiKey: "AIzaSyB7SgUH7cBnAvzy4GCw6LQl1hfPEGxaRjc",
    authDomain: "voltaic-mode-193603.firebaseapp.com",
    databaseURL: "https://voltaic-mode-193603-bf497.firebaseio.com",
    projectId: "voltaic-mode-193603",
    storageBucket: "voltaic-mode-193603.appspot.com",
    messagingSenderId: "356024695903"
};

const FeaturedText = styled('h1')`
    text-align: center;
    color: #555;
    font-size: 50px;
`;

const Container = styled('div')`
    text-align: center;
    margin: 30px;
`;

const SuggestionText = styled('h3')`
    text-align:center;
    color: #555;
    font-size: 15px;
`;

const LogoutButton = styled('button')`
    border: 2px solid white;
    border-radius: 25px;
    background-color: #eee;
    color: #555;
    padding: 10px 30px;
    font-size: 12px;
    margin: 15px;
    margin-top: 25px;
`;

const Navbar = styled('div')`
    font-size: 40px;
    height: 106px;
    border-radius: 10px;
    border-style: solid;
    border-color: white;
    border-width: 5px;
    background-color: #222;
`;

const Section = styled('div')`
    text-align: center;
    margin-bottom: 30%;
`;

const Title = styled('span')`
    text-align: left;
    margin-left: 15px;
    display: inline-block;
    margin-top: 19px;
    color: #eee;
`;

const Wrapper = styled('div')`
    max-width: 150rem;
    font-family: sans-serif;
`;

interface State {
    choice: string;
    errorMsg: string;
    loggedIn: boolean;
}

export default class Welcome extends React.Component<{}, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            choice: '',
            errorMsg: null,
            loggedIn: true,
        };

        this.logout = this.logout.bind(this);
    }

    public componentDidMount() {
        firebase.initializeApp(config);
        const items = firebase.database().ref(window.history.state.state.token);
        items.on('value', (item) => {
            const object = item.val();
            try {
                this.setState({
                    choice: object.Choice
                })
            } catch {
                this.setState({
                    errorMsg: "Sorry we can't find any user data, we'll start tracking now!"
                })

                //Add User Data to the Firebase
                const Items = ["Chinese", "Spanish", "Italian"];
                firebase.database().ref(window.history.state.state.token).set({
                    Array: Items,
                    Choice: Items[Math.floor(Math.random() * Items.length)]
                })
            }
        })
    }

    public logout () {
        localStorage.clear();
        this.setState({
            loggedIn: false
        })
    }

    public render() {
        return (
            <Wrapper>
                <Navbar>
                        <ProfilePic proPicURL={window.history.state.state.image} />
                        <Title>Uber Eats (Out)</Title>
                        <LogoutButton onClick={this.logout} style={{float: 'right'}}>Logout</LogoutButton>
                </Navbar>
                <Container>
                    <FeaturedText>Hello, {window.history.state.state.name}</FeaturedText>
                    {
                        this.state.errorMsg ? <SuggestionText>{this.state.errorMsg}</SuggestionText> : <SuggestionText>We suggest eating: {this.state.choice}</SuggestionText> 
                    }
                    <Section>
                        <Zomato search={this.state.choice}/>
                    </Section>
                    {
                        this.state.loggedIn ? null : <Redirect to={{
                            pathname: "/",
                        }} />
                    }
                </Container>
            </Wrapper>
        );
    }
}
