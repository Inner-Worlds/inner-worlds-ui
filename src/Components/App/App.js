import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Login from "../Login/Login";
import DreamInput from "../DreamInput/DreamInput";
import DreamList from "../DreamList/DreamList";
import NotFound from "../NotFound/NotFound";
import Nav from "../Nav/Nav";
import { GET_USER, DELETE_DREAM, UPDATE_DREAM } from "../../queries";
import { useLazyQuery, useMutation } from "@apollo/client";


const App = () => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [getUser, { client, loading }] = useLazyQuery(GET_USER, { onCompleted: data => setUser(data.user) });
  const [deleteDream] = useMutation(DELETE_DREAM);
  const [updateDream] = useMutation(UPDATE_DREAM);
  const history = useHistory();

  const error = { message: "This is a test" };
 
  useEffect(() => {
    if (user.id && history.location.pathname !== '/dreams') {
      history.push("/home");
    } else if (!user.id) {
      history.push("/")
    }
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

  const updateSingleDream = (dreamId, dreamUpdates) => {
    updateDream({ variables: { id: dreamId, ...dreamUpdates } });
    setUser((prevUser) => {
      const updatedDreams = prevUser.dreams.map((dream) => {
        if (dream.id === dreamId) {
          return { ...dream, ...dreamUpdates };
        }
        return dream;
      });
      return { ...prevUser, dreams: updatedDreams };
    });
  };

  const handleLogOut = async () => {
    await client.resetStore();
    setUser({});
    setLoggedIn(false);
  };
  
  if (loading && !loggedIn) {
    return <div>Loading...</div>
  }

  return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Login loginUser={getUser} tryLogin={tryLogin} error={error}/>} />
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
                <DreamList dreams={user.dreams} deleteDream={deleteSingleDream} updateDream={updateSingleDream} />
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
