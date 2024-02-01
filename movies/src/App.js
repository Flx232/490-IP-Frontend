import Home from './routes/Home';
import Movies from './routes/Movies';
import { Routes, Route, Link } from 'react-router-dom';
// import {useState, useEffect} from 'react'
// import axios from 'axios';
// const backendURL = `http://localhost:8000`;

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li key="Home">
            <Link to="/">Home</Link>
          </li>
          <li key="Movies">
            <Link to="/movies">Movies</Link>
          </li>
          <li key="Customers">
            <Link to="/">Customers</Link>
          </li>
          <li key="Reports">
            <Link to="/">Reports</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </div>
  );
}

export default App;
