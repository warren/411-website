import * as React from 'react';
import Lyft from 'lyft-client';

const lyft = new Lyft(
    process.env.REACT_APP_LYFT_CLIENT_ID,
    process.env.REACT_APP_LYFT_CLIENT_SECRET,
);

const Ride:React.SFC<{}> = () => {
    return (
        <>

        </>
    );
}

export default Ride;