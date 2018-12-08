import axios from 'axios';
import * as React from 'react';
import styled from 'react-emotion';
import Card from './Card';
import * as NodeCache from 'node-cache';

const API_KEY = process.env.REACT_APP_ZOMATO_API_KEY;

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
    featured_image : string;
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
        let zamatoCacheKey = String(this.config.params.entity_id) + this.config.params.q; // We will use this key to cache API responses

        myCache.get( zamatoCacheKey, ( err:any, value:any ) => { // Before calling API, first try to get json response from cache
            if ( !err ) {
                if (value == undefined) { // If response is not found in the cache...
                    console.log("Cache miss for key " + zamatoCacheKey + ". Querying Zamato API...");

                    // Do the API call:
                    axios.get('https://developers.zomato.com/api/v2.1/search', this.config).then(response => {
                            const zamatoResponse = response["data"];
                            console.log("Got response from Zamato:", zamatoResponse, "\nNow attempting to store in cache...");

                            const obj = { "jsonResponse": zamatoResponse }; // Put into cache
                            myCache.set( zamatoCacheKey, obj, function( err, success ){
                                if( !err && success ){
                                    console.log("Successfully stored Zamato response in cache. Rendering restaurants...");
                                }
                            });

                            this.setState({restaurant: zamatoResponse.restaurants}); // Render the found response
                            console.log("Finished rendering restaurants from Zamato query.");
                        }
                    )

                } else { // If response is found in cache
                    console.log("Cache hit for key " + zamatoCacheKey + ". Got response ", value, "\nRendering restaurants...");

                    this.setState({restaurant: value.jsonResponse.restaurants}); // Render the found response
                    console.log("Finished rendering restaurants from cache.")
                }
            } else {
                console.log("Error occurred when trying to access cache with key " + zamatoCacheKey + ". Error:", err);
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
                                imageUrl={item.restaurant.featured_image}  
                            />
                        </Section>
                )}
            </>
        );
    }
}

export default Yelp;
