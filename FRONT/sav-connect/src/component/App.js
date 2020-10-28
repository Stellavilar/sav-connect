import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import '../styles/index.scss';

import Header from './Header';
import Login from './Login';
import DashboardAdmin from './DashboardAdmin';
import DashboardUser from './DashboardUser';
import RepairSheetForm from './RepairSheetForm/RepairSheetForm';
import StepFormOne from './RepairSheetForm/StepFormOne';
import RepairSheet from './RepairSheetInfos/RepairSheet';

const App = () => {

  const token = localStorage.getItem('token');

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

  //Get all customers
  const [ clients, setClients ] = useState([]);
  const allCustomers = () => {
    axios.get('customers')
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      return allCustomers;
  }

  useEffect(repairsSheet, []);
  useEffect(allCustomers, []);



  return (
      <div className='App'>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/dashboardAdmin">
          <Header /> 
          <DashboardAdmin repair={repair} /> 
        </Route>
        <Route exact path="/dashboardUser">
          <Header />
          <DashboardUser repair={repair}/> 
        </Route>
        <Route exact path="/RepairSheetForm" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <StepFormOne clients={clients}/> </>
        }>
        </Route>
        <Route exact path="/RepairSheet/edit/:order_number" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <RepairSheetForm /> </>
        }>
        </Route>
        <Route exact path="/RepairSheet/:id" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <RepairSheet /> </>
        }>
        </Route>
      </div>

  );
}

export default App;
