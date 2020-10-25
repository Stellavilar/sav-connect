import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import '../styles/index.scss';

import Login from './Login';
import DashboardAdmin from './DashboardAdmin';
import DashboardUser from './DashboardUser';


const App = () => {
  //Get all repairs sheet
  const [ repair, setRepair ] = useState([]);
  const repairsSheet = () => {
    axios.get('repairSheets')
      .then((res) => {
        setRepair(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      return repairsSheet;
  };

  useEffect(repairsSheet, []);


  return (
      <div className='App'>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/dashboardAdmin">
          <DashboardAdmin repair={repair} />
        </Route>
        <Route exact path="/dashboardUser">
          <DashboardUser repair={repair}/>
        </Route>
      </div>

  );
}

export default App;
