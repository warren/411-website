import * as React from 'react';

const handleClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        console.log(lat,lng);
    })
}

const Ride:React.SFC<{}> = () => {

    return (
        <>
            <h1>HELLO WORLD</h1>
            <button onClick={handleClick}>something</button>
        </>
    );
}

export default Ride;