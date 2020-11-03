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
import TagForm from'./TagForm';
import TagList from './TagList';
import PanneForm from './PanneForm';
import PanneList from './PanneList';
import ClientList from './Customer/ClientList';
import Client from './Customer/Client';
import ClientForm from './Customer/ClientForm';
import ClientEdit from './Customer/ClientEdit';
import WorkerForm from './Worker/WorkerForm';
import WorkerList from './Worker/WorkerList';
import Worker from './Worker/Worker';
import WorkerEdit from './Worker/WorkerEdit';
import Actionlist from './Actionlist';
import ActionForm from './ActionForm';
import ArchiveList from './ArchiveList';

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
  };

  //Get all workers
  const [ workers, setWorkers ] = useState([]);
  const allWorkers = () => {
    axios.get('users')
      .then((res) => {
        setWorkers(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      return allWorkers;
  };

  //Get all archives Repair sheets
  const [ archive, setArchive ] = useState([]);
  const allArchives = () => {
    axios.get('archivedRepairSheets')
      .then((res) => {
        setArchive(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
      return allArchives;
  }

  useEffect(repairsSheet, []);
  useEffect(allCustomers, []);
  useEffect(allWorkers, []);
  useEffect(allArchives, []);


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
        <Route exact path="/TagForm" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <TagForm /> 
          </div>
          </>
        }>
        </Route>
        <Route exact path="/TagList" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <TagList /> 
          </div>
          </>
        }>
        </Route>
        <Route exact path="/PanneForm" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <PanneForm /> 
          </div>
          </>
        }>
        </Route>
        <Route exact path="/PanneList" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <PanneList /> 
          </div>
          </>
        }>
        </Route>
        <Route exact path="/ClientList" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <ClientList  clients={clients}/> 
          </div>
          </>
        }>
        </Route>
        <Route exact path="/client/:id" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <Client/> 
          </div>
          </>
        }>
        </Route>
        <Route exact path="/clientform" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <ClientForm/> 
          </div>
          </>
        }>
        </Route>
        <Route exact path="/clientEdit/:id" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <ClientEdit/> 
          </div>
          </>
        }>
        </Route>
        <Route exact path="/workerForm" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <WorkerForm/> 
          </div>
          </>
        }>
        </Route>
        <Route exact path="/workerList" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <WorkerList workers={workers}/> 
          </div>
          </>
        }>
        </Route>
        <Route exact path="/user/:id" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <Worker /> 
          </div>
          </>
        }>
        </Route>
        <Route exact path="/workerEdit/:id" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <WorkerEdit /> 
          </div>
          </>
        }>
        </Route>
        <Route exact path="/actions" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <Actionlist /> 
          </div>
          </>
        }>
        </Route>
        <Route exact path="/actionForm" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <ActionForm/> 
          </div>
          </>
        }>
        </Route>
        <Route exact path="/archives" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <ArchiveList archive={archive}/> 
          </div>
          </>
        }>
        </Route>
      </div>

  );
}

export default App;
