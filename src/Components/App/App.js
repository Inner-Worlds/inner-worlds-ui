import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom/cjs/react-router-dom.min";
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
  const [getUser, { loading, error }] = useLazyQuery(GET_USER, { onCompleted: data => setUser(data.user) });
  const [deleteDream] = useMutation(DELETE_DREAM);
  const history = useHistory();

  useEffect(() => {
    if (user.id) history.push("/home");
  }, [user, history]);

  const tryLogin = () => setLoggedIn(true);

  const updateDreams = newDream => {
    setUser((prevUser) => ({
      ...prevUser,
      dreams: [...prevUser.dreams, newDream],
    }));
  };
  
  const deleteSingleDream = dreamId => {
    deleteDream({ variables: { id: dreamId } });
    setUser(prevUser => ({
      ...prevUser,
      dreams: prevUser.dreams.filter(dream => dream.id !== dreamId)
    }));
  };

  const handleLogOut = () => {
    setUser({});
    setLoggedIn(false);
  };
  
  if (loading && !loggedIn) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>{error.message}</div>
  }

  return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Login loginUser={getUser} tryLogin={tryLogin}/>} />
          <Route
            exact
            path="/home"
            render={() => (
              <>
                <Nav handleLogOut={handleLogOut} />
                <DreamInput user={user} updateDreams={updateDreams} />
              </>
            )}
          />
          <Route
            exact
            path="/dreams"
            render={() => (
              <>
                <Nav handleLogOut={handleLogOut} />
                <DreamList dreams={user.dreams} deleteDream={deleteSingleDream}/>
              </>
            )}
          />
          <Route
            path="*"
            render={() => (
              <>
                <NotFound />
              </>
            )}
          />
        </Switch>
      </div>
  );
};

export default App;
