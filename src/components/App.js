import React from 'react';
import Button from '../containers/Button';
import NewsItem from '../containers/NewsItem'
import Loading from '../containers/Loading'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoginForm from './LoginPage'
import HomeComponent from './HomeComponent'

let App = () => (
  <div>
    <Button />
    <Loading />
    <NewsItem />

    <div>
      for reddit clone application<br />
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
