
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './css/fontawesome.css';


import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import GetID from './GetID';

ReactDOM.render(
  <React.StrictMode>
    
    <Router>
      <div>
      
        <Switch>
        <Route exact path="/" render={() => (
  
    <Redirect to="/home"/>
  )
}/>
          
          <Route path="/home">
            <App />
          </Route>
          <Route exact path="/mission/:id" component = {GetID} >

           
          </Route>
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
