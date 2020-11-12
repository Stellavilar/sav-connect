import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './component/App';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:9090/';
// axios.defaults.baseURL = `http://ec2-18-208-219-38.compute-1.amazonaws.com:9090/`;

const rootReactElement = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const target = document.getElementById('root');
render(rootReactElement(), target);

