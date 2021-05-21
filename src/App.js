import { useState, createContext } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DiseaseInput from "./components/DiseaseInput";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/account/Login";
import "./styles/main.css";
import Register from "./components/account/Register";
import Profile from "./components/account/Profile";
import UpdateProfile from "./components/account/UpdateProfile";
import IsLoggedIn from "./components/account/IsLoggedIn";

export const loginContext = createContext({
  loggedIn: false,
});

function App() {
  const isLoggedIn = IsLoggedIn();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  return (
    <div className="App">
      <loginContext.Provider value={loggedIn}>
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
