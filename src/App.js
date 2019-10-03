import React from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './containers/Login';
import LogoutButton from './containers/LogoutButton';
import ArticleListScreen from './containers/ArticleListScreen';
import ArticleCreateScreen from './containers/ArticleCreateScreen';
import ArticleDetailScreen from './containers/ArticleDetailScreen';
import ArticleEditScreen from './containers/ArticleEditScreen';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login} />

          {/* other routes only accessible if authenticated */}
          <Route exact path='/articles'>
            <LogoutButton/>
            <ArticleListScreen/>
          </Route>
          <Route exact path='/articles/create'>
            <LogoutButton/>
            <ArticleCreateScreen/>
          </Route>
          <Route exact path='/articles/:id'>
            <LogoutButton/>
            <ArticleDetailScreen/>
          </Route>
          <Route exact path='/articles/:id/edit'>
            <LogoutButton/>
            <ArticleEditScreen/>
          </Route>

          {/* by default, go to login */}
          <Redirect from='/' to='/login'/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
