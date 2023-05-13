import React, { useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from '../Login/Login';
import DreamInput from '../DreamInput/DreamInput';
import DreamList from '../DreamList/DreamList';
import NotFound from '../NotFound/NotFound';
import Nav from '../Nav/Nav';

import { mockUser1, mockUser2 } from '../../mock-data';

const App = () => {
  const [user, setUser] = useState({});

  const getUser = (userID) => {
    if (userID === '123') {
      setUser(mockUser1.data.user);
    } else if (userID === '456') {
      setUser(mockUser2.data.user);
    };
  };

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Login getUser={getUser}/> } />
        <Route exact path="/Home" render={() => 
        <>
        <Nav />
        <DreamInput />
        </>} />
        <Route exact path="/Dreams" render={() => 
        <>
        <Nav />
        <DreamList />
        </>} />
        <Route path="*" render={() =>
        <>
        <Nav />
        <NotFound />
        </> } />
      </Switch>
    </div>
  );
};

export default App;
