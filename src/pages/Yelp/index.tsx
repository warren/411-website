import axios from 'axios';
import * as React from 'react';

const config = {
  headers: {
    'user-key': '8edd353f12508deb070e86bf37a9b824',
  },
  params: {
    count: 50, // limit to 50 objects
    entity_id: 289, // Boston
    q: 'tacos', // search keyword
  }
};

class Yelp extends React.Component<{}> {

    handleClick = () => {
        axios.get('https://developers.zomato.com/api/v2.1/search', config).then(response => console.log(response))
    }

    render() {
        return (
            <>
                <button onClick={this.handleClick}> 
                Click me
                </button>
            </>
        );
    }
}

export default Yelp;
