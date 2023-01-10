import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRoutes from "./shared/auth";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <div className="app-container">
          <AppRoutes/>
        </div>
      </BrowserRouter>
  );
}

export default App;
