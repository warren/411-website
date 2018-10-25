import * as React from 'react';
import './App.css';
import { Yelp } from "./pages";

const App: React.SFC = () => {
    return (
      <div className="container">
        <h1>Hello World</h1>
        <Yelp />
      </div>
    );
}

export default App;
