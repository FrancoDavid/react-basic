import './App.css';
import List from './components/List';
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light mb-4">
          <div className="nav navbar-nav">
              <Link className="nav-item nav-link active" to={"/"}>Sistema<span className="sr-only"></span></Link>
          </div>
      </nav>
      <div className="container">
        <Route exact path="/" component={List}></Route>
        <Route path="/create" component={Create}></Route>
        <Route path="/edit/:id" component={Edit}></Route>
      </div>
    </Router>
  );
}

export default App;
