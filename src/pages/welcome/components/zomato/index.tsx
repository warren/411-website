import axios from 'axios';
import * as React from 'react';
import styled from 'react-emotion';
import Card from './Card';
import * as NodeCache from 'node-cache';
// import Select from 'react-select';

import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";

// import MenuItem from "@material-ui/core/es/MenuItem";

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
    lat: Number;
    long: Number;
    selectedOption: number;
}

// interface Props {
//     latitude: Number;
//     longitude: Number;
// }

const Section = styled('div')`
    margin: 50px;
`;

const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        fontSize: '20px'
    }
})(Button);

const StyledSelect = withStyles({
    root: {
        fontSize: '20px',
    }
})(Select);


// const SearchButton = styled('button')`
//     border: 2px solid white;
//     border-radius: 25px;
//     background-color: #00000000;
//     color: #FFF;
//     padding: 10px 30px;
//     font-size: 20px;
// `;

// const SearchBox = styled('input')`
//     border: 2px solid white;
//     border-radius: 25px;
//     padding: 10px 20px;
//     margin: 15px;
//     color: gray;
//     font-size: 20px;
// `;

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

    public handleChange = event => {
        console.log(event.target.value);
        this.setState({selectedOption: event.target.value});
        // this.setState({ [event.target.name]: event.target.value });
    }

    public handleClick = () => {

        if (this.state.selectedOption == null) {
            alert("Select a search radius first!");
            return;
        }

        let zamatoCacheKey = String(this.state.lat) + String(this.state.long) + this.config.params.q; // We will use this key to cache API responses

        this.config.params.radius = this.state.selectedOption;

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
      
        // const { selectedOption } = this.state;
        this.config.params.q = this.props.search;
      
        return <>

        <div style={{display: 'flex', justifyContent: 'center'}}>
            <TextField
                id="search-field"
                label="Restaurant Search"
                // className={classes.textField}
                // value={this.state.name}
                onChange={this.setSearch}
                // margin="normal"
                variant="filled"
                style={{display: 'inline-block', height: '10px', margin: '0 10px', fontSize: '20px'}}
            />

            {/*<SearchBox type="text" onChange={this.setSearch} placeholder={this.props.search}/>*/}

            {/*<Select*/}
                {/*value={selectedOption}*/}
                {/*onChange={this.handleChange}*/}
                {/*options={options}*/}
                {/*style={{display: 'inline-block'}}*/}
            {/*/>*/}

            {/*<InputLabel htmlFor="restaurant-search">Age</InputLabel>*/}
            <StyledSelect
                value={this.state.selectedOption}
                onChange={this.handleChange}
                // inputProps={{
                //     name: 'age',
                //     id: 'age-simple',
                // }}
                // input={<MenuItem>How far to go?</MenuItem>}
                // displayEmpty
                // inputProps={{id: 'restaurant-search'}}
                // name={"age"}

                // input={<Input name="age" id="age-auto-width" />}
            >
                {/*<MenuItem value="" disabled>*/}
                    {/*Placeholder*/}
                {/*</MenuItem>*/}

                {/*style={{width: '20%'}}*/}

                <MenuItem value={8046.72}>5 miles (~10 min drive)</MenuItem>
                <MenuItem value={16093.44}>10 miles (~20 min drive)</MenuItem>
                <MenuItem value={24140.16}>15 miles (~30 min drive)</MenuItem>
                <MenuItem value={32186.88}>20 miles (~40 min drive)</MenuItem>
            </StyledSelect>


            <StyledButton onClick={this.handleClick}
                    variant="contained"
                    color="default"
                    style={{display: 'inline-block'}}
            >
                Search
            </StyledButton>
        </div>
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
