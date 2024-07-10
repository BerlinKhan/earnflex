import { Switch, Route, Redirect } from "react-router-dom";
import Tables from "./pages/Tables";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import React from "react";
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
        <Main>
          <Route exact path="/tables" component={Tables} />
          <Redirect from="*" to="/tables" />
        </Main>
  
    </div>
  );
}

export default App;
