import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ListReservationsComponent from './components/ListReservationsComponent';

function App ()
{
  return (
    <div>


      <Router>
        <Routes>
          <Route exact path="/" element={ <ListReservationsComponent /> } />
          <Route exact path="/reservations" element={ <ListReservationsComponent /> } />
        </Routes>
      </Router>
    </div>

  );
}

export default App;