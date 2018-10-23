import * as React from "react";
import { Fetch } from "react-request";
import YelpKey from "static/keys/yelpKey.txt"; // Todo: Make this work
import "./App.css";


import logo from "./logo.svg";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to UberEatsOut</h1>
          <h3>~ Making great API calls since 1969 ~</h3>
        </header>

        <Fetch url="https://api.yelp.com/v3/businesses/search" // Todo: make me work
               credentials="same-origin"
               headers={{
                   'Access-Control-Allow-Origin': '*',
                   'csrf-token': {YelpKey},
               }}>
          {({ fetching, failed, data }: any) => {
            if (fetching) {
              return <div>Loading data...</div>;
            }

            if (failed) {
              return <div>The request did not succeed.</div>;
            }

            if (data) {
              return (
                <div className="App-intro">
                  <div>Post ID: {data.id}</div>
                  <div>Post Title: {data.title}</div>
                </div>
              );
            }

            return null;
          }}
        </Fetch>
          <p>{YelpKey}</p>
      </div>
    );
  }
}

export default App;
