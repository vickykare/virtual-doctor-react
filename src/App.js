import React, { useState, createContext } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DiseaseInput from "./components/DiseaseInput";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/account/Login";
import "./styles/main.css";
import Register from "./components/account/Register";
import Profile from "./components/account/Profile";
import UpdateProfile from "./components/account/UpdateProfile";
import IsLoggedIn from "./components/account/IsLoggedIn";
import History from "./components/account/History";
import ResetPassword from "./components/account/ResetPassword";
import NotFound404 from "./components/NotFound404";
import Corona from "./components/diseases/Corona";

export const loginContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
});

function App() {
  const isLoggedIn = IsLoggedIn();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const value = { loggedIn, setLoggedIn };

  return (
    <div className="App">
      <loginContext.Provider value={value}>
        <Router>
          <Header />
          <div className="main-body">
            <Container>
              <Switch>
                <Route path="/" component={DiseaseInput} exact />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/update-profile" component={UpdateProfile} />
                <Route path="/reset-password" component={ResetPassword} />
                <Route path="/history" component={History} />
                <Route path="/predict/corona" component={Corona} />
                <Route path="*" exact={true} component={NotFound404} />
              </Switch>
            </Container>
          </div>
          <Footer />
        </Router>
      </loginContext.Provider>
    </div>
  );
}

export default App;
