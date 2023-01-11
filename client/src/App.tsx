import React from 'react';
import './App.css';
import AppRoutes from "./routes";
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
