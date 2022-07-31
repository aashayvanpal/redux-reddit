import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from './LoginPage'
import HomeComponent from './HomeComponent'

let App = () => (
  <div>
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route exact path="/home" element={<HomeComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
);


export default App;
