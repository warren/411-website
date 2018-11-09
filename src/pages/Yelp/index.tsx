import axios from 'axios';
import * as React from 'react';
import styled from 'react-emotion';
import Card from './Card';
import * as NodeCache from 'node-cache';


const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const myCache = new NodeCache();

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

    public makeZamatoQuery = () => {
        axios.get('https://developers.zomato.com/api/v2.1/search', this.config).then(response => {
                const key = "data";
                const data = response[key];
                console.log(data);

                return data;
                // this.setState({restaurant: data.restaurants});

                // console.log(response);
                // console.log(response[key]);
                // console.log(data.restaurants);
                // console.log(this.state.restaurant);
            }
        )
    }

    public handleClick = () => {

        // console.log(this.config);
        // console.log(this.config.params);

        let zamatoCacheKey = String(this.config.params.entity_id) + this.config.params.q;

        myCache.get( zamatoCacheKey, ( err:any, value:any ) => { // Try to get json response from cache
            if ( !err ) {
                if (value == undefined) { // If it's not in the cache...
                    console.log("Cache miss for key " + zamatoCacheKey);


                    let zamatoReply = this.makeZamatoQuery();
                    console.log(zamatoReply);

                    // this.makeZamatoQuery().then((zamatoReply) => {console.log(zamatoReply)});



                    const obj = { "jsonResponse": zamatoReply }; // Put into cache
                    console.log(obj);
                    myCache.set( zamatoCacheKey, obj, function( err, success ){
                        if( !err && success ){
                            console.log("Successfully added object to node-cache: " + obj);
                        }
                    });

                    myCache.get(zamatoCacheKey)

                    console.log("TODO: Set state here.");
                    // this.setState({restaurant: zamatoReply.restaurants});

                } else {
                    console.log("Cache hit for key " + zamatoCacheKey);
                    console.log( value );

                    console.log("TODO: Set state here.");
                    // this.setState({restaurant: value.restaurants});
                }
            } else {
                console.log("Error occurred when trying to access cache with key " + zamatoCacheKey + ". Printing error log below:");
                console.log(err);
            }
        });

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
