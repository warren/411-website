import * as React from 'react';
import styled from 'react-emotion';
import { CardActionArea } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router';

const place = 'http://localhost:3000/assets/placeholder.jpg';

const UBER_CLIENT_ID = process.env.REACT_APP_UBER_CLIENT_ID;

interface Props {
    name: string;
    address: string;
    rating: string;
    imageUrl: string;
}

interface State {
    selected: boolean;
    deepLink: string;
}

const Details = styled('div')`
    display: flex;
    flex-direction: column;
`;

const CardItem = styled(Card)`
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
    width: 90%;
    margin: auto;
`;

const Content = styled(CardContent)`
    flex: 1 0 auto;
    font-size: 15px;
    margin-bottom: 0;
`;

const Cover = styled(CardMedia)`
    height: 250px;
    width: 100%;
`;

const Title = styled(Typography)`
    text-align: left;
    font-size: 30px;
`;

const SubTitle = styled(Typography)`
    text-align: left;
    font-size: 20px;
`;


class CardComponent extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            selected: false,
            deepLink: ''
        }
        this.makeUberDeepLink = this.makeUberDeepLink.bind(this);
    }

    public URLify(string) {
        return string.trim().replace(/\s/g, '%20');
    }
    
    public makeUberDeepLink(addressName) {
    
        let URLifiedAddress = this.URLify(addressName);
    
        let deepLink = "https://m.uber.com/ul/?action=setPickup&client_id=" + UBER_CLIENT_ID + "&pickup=my_location&dropoff[formatted_address]=" + URLifiedAddress;
        console.log(deepLink);
        this.setState({
            selected: true,
            deepLink: deepLink
        })
    }

    public render () {
        const {
            name,
            address,
            rating,
            imageUrl
        } = this.props
        return(
            <>
                <CardItem>
                    <CardActionArea onClick={() => this.makeUberDeepLink(address)}>
                        <Details>
                        <Content>
                            <Title component="h5" variant="h5">
                            {name}
                            </Title>
                        <SubTitle variant="subtitle1" color="textSecondary">
                            {address}
                        </SubTitle>

                        <div style={{display: 'flex', marginTop: '50px'}}>
                            <SubTitle style={{display: 'inline-block'}} variant="subtitle1" color="textSecondary">
                                {rating} &#9733;
                            </SubTitle>
                        </div>
                        </Content>
                        </Details>
                    </CardActionArea>
                    <Cover image={imageUrl ? imageUrl : place} />
                </CardItem>
                {
                    this.state.selected ? <Redirect to={{
                        pathname: "ride",
                        state: {
                            deepLink: this.state.deepLink,
                        }
                    }} /> : null
                }
            </>
        );
    }
};

export default CardComponent;