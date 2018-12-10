import axios from 'axios';
import * as React from 'react';
import styled from 'react-emotion';
import Card from './Card';
import * as NodeCache from 'node-cache';
import Select from 'react-select';
// import MenuItem from "@material-ui/core/es/MenuItem";

const API_KEY = process.env.REACT_APP_ZOMATO_API_KEY;

const myCache = new NodeCache();

const options = [ // Units are in meters for Zomato
    { value: 8046.72, label: '5 miles (~10 min drive)' },
    { value: 16093.44, label: '10 miles (~20 min drive)' },
    { value: 24140.16, label: '15 miles (~30 min drive)' },
    { value: 32186.88, label: '20 miles (~40 min drive)' }
];

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
    lat: Number;
    long: Number;
    selectedOption: {
        value: number;

    };
}

// interface Props {
//     latitude: Number;
//     longitude: Number;
// }

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

interface Props {
    search: string;
}

class Zomato extends React.Component<Props, State> {

    public config = {
        headers: {
          'user-key': API_KEY,
        },
        params: {
          count: 50, // limit to 50 objects
          // entity_id: 289, // Boston
          lat: -999,
          long: -999,
          radius: 9999999,
          q: `${this.props.search}`, // search keyword
        }
    };

    constructor(props: any) {
        super(props);
        this.state = {
            restaurant: [],
            lat: -999,
            long: -999,
            selectedOption: null
        }
    }

    public componentDidMount() {
        this.setLatLongInState();
    }

    public setLatLongInState() {
        const location = window.navigator && window.navigator.geolocation;

        if (location) {
            location.getCurrentPosition((position) => {
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                });
                
                this.config.params.lat = position.coords.latitude;
                this.config.params.long = position.coords.longitude;
                
            }, (error) => {
                this.setState({ lat: 999, long: 999 });
            })
        }
    }

    public handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    public handleClick = () => {

        if (this.state.selectedOption == null) {
            alert("Select a search radius first!");
            return;
        }

        let zamatoCacheKey = String(this.state.lat) + String(this.state.long) + this.config.params.q; // We will use this key to cache API responses

        this.config.params.radius = this.state.selectedOption.value;

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
      
        const { selectedOption } = this.state;
        this.config.params.q = this.props.search;
      
        return <>
        <SearchBox type="text" onChange={this.setSearch} placeholder={this.props.search}/>

        <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
        />

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
        </>;
    }
}

export default Zomato;
