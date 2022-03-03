import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import GlobalStyles from "./globalStyles";
import AppInner from "./components/core/AppInner/AppInner";
import {Navbar} from "./components";

function App(): JSX.Element {
  return (
    <Router basename='/'>
      <GlobalStyles/>
      <Navbar/>
      <AppInner/>
    </Router>
  );
}

export default App;
