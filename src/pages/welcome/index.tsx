import * as React from 'react';
import { Zomato } from './components';
import styled from 'react-emotion';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { Redirect } from 'react-router';

var config = {
    apiKey: "AIzaSyB7SgUH7cBnAvzy4GCw6LQl1hfPEGxaRjc",
    authDomain: "voltaic-mode-193603.firebaseapp.com",
    databaseURL: "https://voltaic-mode-193603-bf497.firebaseio.com",
    projectId: "voltaic-mode-193603",
    storageBucket: "voltaic-mode-193603.appspot.com",
    messagingSenderId: "356024695903"  
};

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

const SuggestionText = styled('h3')`
    color: #FFF;
`;

const LogoutButton = styled('button')`
    border: 2px solid white;
    border-radius: 25px;
    background-color: #00000000;
    color: #FFF;
    padding: 10px 30px;
    font-size: 20px;
    margin: 15px;
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
            <Container>
                <FeaturedText>Hello, {window.history.state.state.name}</FeaturedText>
                {
                    this.state.errorMsg ? <SuggestionText>{this.state.errorMsg}</SuggestionText> : <SuggestionText>We suggest eating: {this.state.choice}</SuggestionText> 
                }
                <LogoutButton onClick={this.logout}>Logout</LogoutButton>
                <Section>
                    <Zomato search={this.state.choice}/>
                </Section>
                {
                    this.state.loggedIn ? null : <Redirect to={{
                        pathname: "/",
                      }} />
                }
            </Container>
        );
    }
}
