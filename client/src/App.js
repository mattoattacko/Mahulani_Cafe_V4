import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        {/* This decides when we render the home component, and what address will trigger the render */}
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/posts/pages/:page" exact component={Home} />
        <Route path="/search/:searchQuery" exact component={Home} />
        <Route path="/posts/:id" exact component={PostDetails} />
        <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
