import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import '../styles/index.scss';

import Header from './Header';
import Login from './Login';
import Dashboard from './Dashboard';
import RepairSheetForm from './RepairSheetForm/RepairSheetForm';
import StepFormOne from './RepairSheetForm/StepFormOne';
import RepairSheet from './RepairSheetInfos/RepairSheet';
import AdminMenu from './AdminMenu';
import WorkerMenu from './WorkerMenu';

const App = () => {

  const token = localStorage.getItem('token');
  const isAdmin =localStorage.getItem('isAdmin');
  
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
        <Route exact path="/dashboard">
          <Header />
          <div className='main-page'> 
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <Dashboard repair={repair} /> 
          </div>
        </Route>
        <Route exact path="/RepairSheetForm" render={()=>!token ? <Redirect to='/'/> :  <>
        <Header />
        <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <StepFormOne clients={clients}/> 
          </div>
          </>
        }>
        </Route>
        <Route exact path="/RepairSheet/edit/:order_number" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <RepairSheetForm /> 
          </div>
          </>
        }>
        </Route>
        <Route exact path="/RepairSheet/:id" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <RepairSheet /> 
          </div>
          </>
        }>
        </Route>
      </div>

  );
}

export default App;
