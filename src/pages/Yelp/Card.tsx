import * as React from 'react';

interface Props {
    name: string;
    address: string;
    rating: string;
}

const Card: React.SFC<Props> = (props) =>{
    return(
        <>
            <h1>{props.name}</h1>
            <h1>{props.address}</h1>
            <h1>{props.rating}</h1>
        </>
    );
};

export default Card;