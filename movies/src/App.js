import Home from './routes/Home';
import Movies from './routes/Movies';
import Customers from './routes/Customers'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <>
      <div className='nav-container'>
        <Link to="/" className="logo"><img src="MovieFreak.png" alt="logo"></img><h1><strong>MovieFreak</strong></h1></Link>
        <nav>
          <ul className='nav-list-container'>
            <li key="Home">
              <Link to="/" className="link-style">Home</Link>
            </li>
            <li key="Movies">
              <Link to="/movies" className="link-style">Movies</Link>
            </li>
            <li key="Customers">
              <Link to="/customers" className="link-style">Customers</Link>
            </li>
            <li key="Reports">
              <Link to="/" className="link-style">Reports</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className='background'>
        <div className='body'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/customers" element={<Customers/>}/>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
