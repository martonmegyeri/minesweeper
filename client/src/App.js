import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Settings from './components/common/Settings/Settings';
import Toast from './components/common/Toast/ToastContainer';
import Home from './components/Home/Home';
import Game from './components/Game/Game';


class App extends Component {
  state = {
    showSettings: false,
    showLogin: false
  }

  settingsClickHandler = () => {
    this.setState({ showSettings: !this.state.showSettings });
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header
              settingsClickHandler={this.settingsClickHandler}
              loginClickHandler={this.loginClickHandler}
            />

            <Toast />
            <Settings show={this.state.showSettings} showHandler={this.settingsClickHandler} />

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
