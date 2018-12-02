import * as React from 'react';
import styled from 'react-emotion';
import { CardActionArea } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const place = 'http://localhost:8000/assets/placeholder.jpg';

interface Props {
    name: string;
    address: string;
    rating: string;
    imageUrl: string;
}

const Section = styled('section')`
    margin: auto;
    border: 2px solid white;
    border-radius: 25px;
    background: #FFF;
    width: 50%;
    opacity: 0.5;
`;

const CardComponent: React.SFC<Props> = (props) =>{
    const {
        name,
        address,
        rating,
        imageUrl
    } = props

    return(
        <>
            <Section>
                <h1>{name}</h1>
                <h1>{address}</h1>
                <h1>Rating: {rating} &#9733;</h1>
            </Section>
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography component="h5" variant="h5">
                            Name:
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {name}
                        </Typography>
                        <Typography component="h5" variant="h5">
                            Address:
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {address}
                        </Typography>
                        <Typography component="h5" variant="h5">
                            Rating:
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {rating} &#9733;
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardMedia image={imageUrl ? imageUrl : place} />
            </Card>
        </>
    );
};

export default CardComponent;