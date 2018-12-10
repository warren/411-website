import * as React from 'react';
import styled from 'react-emotion';

const SearchBox = styled('input')`
    border: 2px solid white;
    border-radius: 25px;
    padding: 10px 20px;
    margin: 30px;
    color: gray;
    font-size: 30px;
`;

const Container = styled('div')`
    display: flex;           
    flex-direction: column;  
    justify-content: center; 
    align-items: center;     
    height: 1000px;
`;

const Title = styled('h1')`
    color: white;
    text-align: white;
`;

const SearchButton = styled('button')`
    border: 2px solid white;
    border-radius: 25px;
    background-color: #00000000;
    color: #FFF;
    padding: 10px 30px;
    font-size: 20px;
`;

const config = {
    owner: '',
    user1: '',
    user2: '',
    user3: '',
}

const handleClick = () => {
    fetch(`http://localhost:8080/api/sendSMS?url=${window.history.state.state.deepLink}`)
}

const Ride:React.SFC<{}> = () => {

    const setOwner = (props: any) => {
        config.owner = props.target.value;
        console.log(config.owner);
    }

    const setUser1 = (props: any) => {
        config.user1 = props.target.value;
        console.log(config.user1);
    }

    const setUser2 = (props: any) => {
        config.user2 = props.target.value;
        console.log(config.user2);
    }

    const setUser3 = (props: any) => {
        config.user3 = props.target.value;
        console.log(config.user3);

    }

    return (
        <Container>
            <Title>Let's Get Your Friends!</Title>
            <SearchBox type="text" onChange={setOwner} placeholder={'Your Number'} />
            <SearchBox type="text" onChange={setUser1} placeholder={'Friend 1'} />
            <SearchBox type="text" onChange={setUser2} placeholder={'Friend 2'}/>
            <SearchBox type="text" onChange={setUser3} placeholder={'Friend 3'}/>
            <SearchButton onClick={handleClick}>
                Search
            </SearchButton>
        </Container>
    );
}

export default Ride;