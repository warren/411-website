import * as React from 'react';
import styled from 'react-emotion';

import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import {Redirect} from "react-router";

// import withStyles from "@material-ui/core/styles/withStyles";

// const SearchBox = styled('input')`
//     border: 2px solid white;
//     border-radius: 25px;
//     padding: 10px 20px;
//     margin: 30px;
//     color: gray;
//     font-size: 30px;
// `;

const Container = styled('div')`
    display: flex;           
    flex-direction: column;  
    justify-content: center; 
    align-items: center;     
    height: 1000px;
`;

const Title = styled('h1')`
    color: #555;
    text-align: white;
`;

// const SearchButton = styled('button')`
//     border: 2px solid white;
//     border-radius: 25px;
//     background-color: #00000000;
//     color: #FFF;
//     padding: 10px 30px;
//     font-size: 20px;
// `;

const config = {
    owner: '',
    user1: '',
    user2: '',
    user3: '',
};

interface State {
    redirect: boolean;
}


class Ride extends React.Component<{}, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            redirect: false,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    public handleClick = () => {
        fetch(`http://localhost:8080/api/sendSMS?url=${window.history.state.state.deepLink}`)
        this.setState({redirect: true});
    }

    public setOwner = (props: any) => {
        config.owner = props.target.value;
        console.log(config.owner);
    }

    public setUser1 = (props: any) => {
        config.user1 = props.target.value;
        console.log(config.user1);
    }

    public setUser2 = (props: any) => {
        config.user2 = props.target.value;
        console.log(config.user2);
    }

    public setUser3 = (props: any) => {
        config.user3 = props.target.value;
        console.log(config.user3);

    }

    public render() {
        return (
            <Container>
                <Title>Let's Get Your Friends!</Title>
                <TextField type="text" onChange={this.setOwner} placeholder={'Your Number'}/>
                <br/>
                <TextField type="text" onChange={this.setUser1} placeholder={'Friend 1'}/>
                <br/>
                <TextField type="text" onChange={this.setUser2} placeholder={'Friend 2'}/>
                <br/>
                <TextField type="text" onChange={this.setUser3} placeholder={'Friend 3'}/>
                <br/>
                <Button onClick={this.handleClick}>
                    Invite
                </Button>
                {
                    this.state.redirect ? <Redirect to={{
                        pathname: "/"
                    }}/> : null
                }
            </Container>
        );
    }
}

export default Ride;