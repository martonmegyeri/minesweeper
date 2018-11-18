import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import Game from './components/Game/Game';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/game/:level" component={Game} />
              <Route path="*" component={Home} />
            </Switch>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}


export default App;
