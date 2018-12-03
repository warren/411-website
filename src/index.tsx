import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Welcome, Ride } from './pages'

const Index: React.SFC<{}> = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/pages/welcome" component={Welcome} />
        <Route path="/pages/ride" component={Ride} />
      </div>
    </Router>
  );
}

ReactDOM.render(
  <Index />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
