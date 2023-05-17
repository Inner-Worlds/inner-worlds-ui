import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Login from "../Login/Login";
import DreamInput from "../DreamInput/DreamInput";
import DreamList from "../DreamList/DreamList";
import NotFound from "../NotFound/NotFound";
import Nav from "../Nav/Nav";
import GET_USER from "../../queries";
import { useLazyQuery } from "@apollo/client";

const App = () => {
  const [user, setUser] = useState({});
  const [ getUser, {loading, error, data} ] = useLazyQuery(GET_USER)

  useEffect(() => {
    if(data?.user) {
      setUser(data.user);
    }
  }, [data])
  
  if (loading) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>{error.message}</div>
  }

  return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Login loginUser={getUser} />} />
          <Route
            exact
            path="/Home"
            render={() => (
              <>
                <Nav />
                <DreamInput />
              </>
            )}
          />
          <Route
            exact
            path="/Dreams"
            render={() => (
              <>
                <Nav />
                <DreamList dreams={user.dreams} />
              </>
            )}
          />
          <Route
            path="*"
            render={() => (
              <>
                <Nav />
                <NotFound />
              </>
            )}
          />
        </Switch>
      </div>
  );
};

export default App;
