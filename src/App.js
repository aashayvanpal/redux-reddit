import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connect } from 'react-redux';
import LoginForm from './components/LoginForm.js';
import HomeComponent from './components/HomeComponent.js';
import { increaseCounter, decreaseCounter } from './redux/Counter/counter.actions';

function App(props) {
  return (
    <div className='App'>
      <div>Count: {props.count}</div>
      <button onClick={() => props.increaseCounter()}>Increase Count</button>
      <button onClick={() => props.decreaseCounter()}>Decrease Count</button>
      <button onClick={() => props.decreaseCounter()}>Login to Reddit</button>

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
}

const mapStateToProps = (state) => {
  console.log('state:', state);
  return {
    count: state.counter.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseCounter: () => dispatch(increaseCounter()),
    decreaseCounter: () => dispatch(decreaseCounter()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
