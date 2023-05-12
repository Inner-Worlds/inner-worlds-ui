import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login  from '../Login/Login';
import DreamInput from '../DreamInput/DreamInput';
import DreamList from '../DreamList/DreamList';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Login /> } />
        <Route exact path="/Home" render={() => <DreamInput />} />
        <Route exact path="/Dreams" render={() => <DreamList />} />
      </Switch>
    </div>
  );
};

export default App;
