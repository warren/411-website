import axios from 'axios';
import * as React from 'react';
import Card from './Card';


interface UserRating {
    aggregate_rating: string;
}

interface RestaurantData {
    name: string;
    address: string;
    user_rating: UserRating;
}

interface Restaurant {
    restaurant: RestaurantData
}

interface State {
    restaurant: Restaurant[];
    search: string;
}

class Yelp extends React.Component<{}, State> {

    private config = {
        headers: {
          'user-key': '8edd353f12508deb070e86bf37a9b824',
        },
        params: {
          count: 50, // limit to 50 objects
          entity_id: 289, // Boston
          q: 'tacos', // search keyword
        }
    };

    constructor(props: any) {
        super(props);
        this.state = { 
            restaurant: [],
            search: "tacos"
        }
    } 


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
                {
                    this.state.restaurant.map((item, key) => 
                        <div key={key}>
                            <Card 
                                name={item.restaurant.name} 
                                address={item.restaurant.address} 
                                rating={item.restaurant.user_rating.aggregate_rating}  
                            />
                        </div>
                )}
                <button onClick={this.handleClick}> 
                Click me
                </button>
            </>
        );
    }
}

export default Yelp;
