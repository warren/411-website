import axios from 'axios';
// import * as redis from 'redis';
import * as React from 'react';
import styled from 'react-emotion';
import Card from './Card';

// import { Tedis } from 'tedis';
// import { createHandyClient } from 'handy-redis';

// var redis = require('redis');
// var redisClient = redis.createClient();

// const client = redis.createClient();
// client.on('ready', () => {
//   console.log('redis is ready.')
// });

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

interface Location {
    address: string
}

interface UserRating {
    aggregate_rating: string;
}

interface RestaurantData {
    name: string;
    location: Location;
    user_rating: UserRating;
}

interface Restaurant {
    restaurant: RestaurantData
}

interface State {
    restaurant: Restaurant[];
}

const Section = styled('div')`
    margin: 50px;
`;

const SearchButton = styled('button')`
    border: 2px solid white;
    border-radius: 25px;
    background-color: #00000000;
    color: #FFF;
    padding: 10px 30px;
    font-size: 20px;
`;

const SearchBox = styled('input')`
    border: 2px solid white;
    border-radius: 25px;
    padding: 10px 20px;
    margin: 15px;
    color: gray;
    font-size: 20px;
`;


class Yelp extends React.Component<{}, State> {
    public config = {
        headers: {
          'user-key': API_KEY,
        },
        params: {
          count: 50, // limit to 50 objects
          entity_id: 289, // Boston
          q: 'chinese', // search keyword
        }
    };

    constructor(props: any) {
        super(props);
        this.state = { 
            restaurant: [],
        }
    } 

    public handleClick = () => {
        axios.get('https://developers.zomato.com/api/v2.1/search', this.config).then(response => {
            const key = "data";
            const data = response[key];
            console.log(data);
            console.log("hi");
            // tedis.set("key", "Hellooo").then(() => {
            //   tedis.get("key");
            // });
            this.setState({restaurant: data.restaurants});
            // console.log(response);
            // console.log(response[key]);
            // console.log(data.restaurants);
            // console.log(this.state.restaurant);
            }
        )
    }

    public setSearch = (props: any) => {
        this.config.params.q = props.target.value;
    }

    public render() {
        return (
            <>
                <SearchBox type="text" onChange={this.setSearch} />
                <SearchButton onClick={this.handleClick}> 
                    Search
                </SearchButton>
                {
                    this.state.restaurant.map((item, key) => 
                        <Section key={key}>
                            <Card 
                                name={item.restaurant.name} 
                                address={item.restaurant.location.address} 
                                rating={item.restaurant.user_rating.aggregate_rating}  
                            />
                        </Section>
                )}
            </>
        );
    }
}

export default Yelp;
