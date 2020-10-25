import React from 'react';
import { Route } from 'react-router-dom';
// import axios from 'axios';

import '../styles/index.scss';

import Login from './Login';
import DashboardAdmin from './DashboardAdmin';
import DashboardUser from './DashboardUser';


const App = () => {


  return (
      <div className='App'>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/dashboardAdmin">
          <DashboardAdmin />
        </Route>
        <Route exact path="/dashboardUser">
          <DashboardUser />
        </Route>
      </div>

  );
}

export default App;
