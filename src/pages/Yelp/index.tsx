import axios from 'axios';
import * as React from 'react';
import styled from 'react-emotion';
import Card from './Card';


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
    search: string;
}

const Section = styled('div')`
    margin: 50px;
`;

const SearchButton = styled('button')`
    border: 2px solid white;
    border-radius: 25px;
    background-color: #00000000;
    color: #FFF;
    padding: 30px 45px;
    font-size: 20px;
`;

class Yelp extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = { 
            restaurant: [],
            search: "tacos"
        }
    } 

    public config = {
        headers: {
          'user-key': '8edd353f12508deb070e86bf37a9b824',
        },
        params: {
          count: 50, // limit to 50 objects
          entity_id: 289, // Boston
          q: "tacos", // search keyword
        }
    };



    public handleClick = () => {
        axios.get('https://developers.zomato.com/api/v2.1/search', this.config).then(response => {
            const key = "data";
            const data = response[key];
            this.setState({restaurant: data.restaurants});
            console.log(response);
            console.log(response[key]);
            console.log(data.restaurants);
            console.log(this.state.restaurant);
            }
        )
    }

    public render() {
        return (
            <>
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
