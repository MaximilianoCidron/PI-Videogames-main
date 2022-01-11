import "./App.css";
import { Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/landing.jsx";
import NavBar from "./components/NavBar/navbar.jsx";
import Home from "./components/Home/home.jsx";
import About from "./components/About/about.jsx";
import Detail from "./components/Detail/detail.jsx";
import Form from "./components/Form/form.jsx";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/landing" component={Landing} />
        <Route path="/">
          <NavBar />
          <Route exact path="/home" component={Home} />
          <Route exact path="/videogame/:id" component={Detail} />
          <Route exact path="/videogame" component={Form} />
          <Route exact path="/about" component={About} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
