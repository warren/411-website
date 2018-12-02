import * as React from 'react';
import styled from 'react-emotion';
import { CardActionArea } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const place = 'http://localhost:3000/assets/placeholder.jpg';

interface Props {
    name: string;
    address: string;
    rating: string;
    imageUrl: string;
}

const Details = styled('div')`
    display: flex;
    flex-direction: column;
`;

const CardItem = styled(Card)`
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
`;

const Content = styled(CardContent)`
    flex: 1 0 auto;
    font-size: 15px;
`;

const Cover = styled(CardMedia)`
    height: 250px;
    width: 100%;
`;

const Title = styled(Typography)`
    font-size: 3.0rem;
`

const SubTitle = styled(Typography)`
    font-size: 2.5rem;
`

const CardComponent: React.SFC<Props> = (props) =>{
    const {
        name,
        address,
        rating,
        imageUrl
    } = props

    return(
        <>
            <CardItem>
                <CardActionArea>
                    <Details>
                    <Content>
                        <Title component="h5" variant="h5">
                            Name:
                        </Title>
                        <SubTitle variant="subtitle1" color="textSecondary">
                            {name}
                        </SubTitle>
                        <Title component="h5" variant="h5">
                            Address:
                        </Title>
                        <SubTitle variant="subtitle1" color="textSecondary">
                            {address}
                        </SubTitle>
                        <Title component="h5" variant="h5">
                            Rating:
                        </Title>
                        <SubTitle variant="subtitle1" color="textSecondary">
                            {rating} &#9733;
                        </SubTitle>
                    </Content>
                    </Details>
                </CardActionArea>
                <Cover image={imageUrl ? imageUrl : place} />
            </CardItem>
        </>
    );
};

export default CardComponent;