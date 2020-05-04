import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Admin from './components/Admin';
import './App.scss';
import Header from './components/Header';
import Home from './components/Home';

const App: React.FC = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/">
          <div>
            <Header isAdmin={false} />
            <Home />
          </div>
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
