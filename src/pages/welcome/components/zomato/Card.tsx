import * as React from 'react';
import styled from 'react-emotion';

interface Props {
    name: string;
    address: string;
    rating: string;
}

const Section = styled('section')`
    margin: auto;
    border: 2px solid white;
    border-radius: 25px;
    background: #FFF;
    width: 50%;
    opacity: 0.5;
`;

const Card: React.SFC<Props> = (props) =>{
    return(
        <>
            <Section>
                <h1>{props.name}</h1>
                <h1>{props.address}</h1>
                <h1>Rating: {props.rating} &#9733;</h1>
            </Section>
        </>
    );
};

export default Card;