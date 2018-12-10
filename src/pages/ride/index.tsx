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
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
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

const handleClick = () => {
    fetch('http://localhost:8080/api/sendSMS')
}

const Ride:React.SFC<{}> = () => {
    return (
        <Container>
            <Title>Let's Get Your Friends!</Title>
            <SearchBox type="text"/>
            <SearchBox type="text"/>
            <SearchBox type="text"/>
            <SearchButton onClick={handleClick}>
                Search
            </SearchButton>
        </Container>
    );
}

export default Ride;