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
  const history = useHistory();
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const [getUser, { client, loading, error }] = useLazyQuery(GET_USER, { onCompleted: data => setUser(data.user) });
  const [deleteDream] = useMutation(DELETE_DREAM, {
    refetchQueries: [{ query: GET_USER, variables: { id: user.id } }],
});
  const [updateDream] = useMutation(UPDATE_DREAM, {
    refetchQueries: [{ query: GET_USER, variables: { id: user.id } }],
});

  useEffect(() => {
    if (user.id && history.location.pathname !== '/dreams') {
      history.push("/home");
    } else if (!user.id && (history.location.pathname === '/Dreams' || history.location.pathname === '/Home' || history.location.pathname === '/dreams' || history.location.pathname === '/home')) {
      history.push("/");
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
    setUser(prevUser => {
      const prevDreams = [...prevUser.dreams];
      const updatedDream = {...prevUser.dreams.find(dream => dream.id === dreamId)};

      updatedDream.dreamDate = dreamUpdates.dreamDate;
      updatedDream.title = dreamUpdates.title;
      updatedDream.description = dreamUpdates.description;
      updatedDream.lucidity = dreamUpdates.lucidity;

      return {
        ...prevUser,
        dreams: prevDreams.map(dream => {
          if (dream.id === dreamId) {
            return updatedDream;
          } else {
            return dream;
          }
        })
      };
    });
  };

  const updateEmotionsAndTags = (dreamId, emotions, tags) => {
    setUser(prevUser => {
      const prevDreams = [...prevUser.dreams];
      const newDream = {...prevUser.dreams.find(dream => dream.id === dreamId)};

      newDream.emotions = emotions;
      newDream.tags = tags;

      return {
        ...prevUser,
        dreams: prevDreams.map(dream => {
          if (dream.id === dreamId) {
            return newDream;
          } else {
            return dream;
          }
        }),
      };
    });
  };

  const handleLogOut = async () => {
    await client.resetStore();
    setUser({});
    setLoggedIn(false);
  };
  
  if (loading && !loggedIn) {
    return (
    <div className="loading-msg">
      <span className="loading-text">Loading...</span>
    </div>
    )
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
                <Nav handleLogOut={handleLogOut} currentlyEditing={currentlyEditing} />
                <DreamList userID={user.id} dreams={user.dreams} deleteDream={deleteSingleDream} updateDream={updateSingleDream} updateEmotionsAndTags={updateEmotionsAndTags} setEditing={setCurrentlyEditing} currentlyEditing={currentlyEditing}/>
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