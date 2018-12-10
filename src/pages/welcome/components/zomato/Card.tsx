import * as React from 'react';
import styled from 'react-emotion';
import { CardActionArea } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// import { sendSMS } from './../../../../api/send-sms';


const place = 'http://localhost:3000/assets/placeholder.jpg';

const UBER_CLIENT_ID = process.env.REACT_APP_UBER_CLIENT_ID;

// const TWILIO_ACCOUNT_SID = process.env.REACT_APP_TWILIO_SID;
// const TWILIO_AUTH_TOKEN = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
// const TWILIO_CLIENT = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);



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
    width: 70%;
    margin: auto;

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
`;

const SubTitle = styled(Typography)`
    font-size: 2.5rem;
`;

function URLify(string) {
    return string.trim().replace(/\s/g, '%20');
}

function makeUberDeepLink(addressName) {

    let URLifiedAddress = URLify(addressName);

    let deepLink = "https://m.uber.com/ul/?action=setPickup&client_id=" + UBER_CLIENT_ID + "&pickup=my_location&dropoff[formatted_address]=" + URLifiedAddress;
    console.log(deepLink);

    // sendSMS('+18001234567');
}

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

                    <button onClick={() => makeUberDeepLink(address)}>Go</button>
                    </Details>
                </CardActionArea>
                <Cover image={imageUrl ? imageUrl : place} />
            </CardItem>
        </>
    );
};

export default CardComponent;