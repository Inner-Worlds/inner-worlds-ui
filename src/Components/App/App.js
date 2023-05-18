import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Login from "../Login/Login";
import DreamInput from "../DreamInput/DreamInput";
import DreamList from "../DreamList/DreamList";
import NotFound from "../NotFound/NotFound";
import Nav from "../Nav/Nav";
import { GET_USER, DELETE_DREAM } from "../../queries";
import { useLazyQuery, useMutation } from "@apollo/client";

const App = () => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [getUser, { loading, error, data }] = useLazyQuery(GET_USER);
  const [deleteDream] = useMutation(DELETE_DREAM);

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }
  }, [data]);

  const tryLogin = () => setLoggedIn(true);

  const deleteSingleDream = dreamId => {
    deleteDream({ variables: { id: dreamId } });
    setUser(prevUser => ({
      ...prevUser,
      dreams: prevUser.dreams.filter(dream => dream.id !== dreamId)
    }));
  };
  
  if (loading && !loggedIn) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>{error.message}</div>
  };

  return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Login loginUser={getUser} tryLogin={tryLogin}/>} />
          <Route
            exact
            path="/Home"
            render={() => (
              <>
                <Nav />
                <DreamInput user={user}/>
              </>
            )}
          />
          <Route
            exact
            path="/Dreams"
            render={() => (
              <>
                <Nav />
                <DreamList dreams={user.dreams} deleteDream={deleteSingleDream}/>
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
