import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { Business } from './pages/Business/Business';
import { BusinessDetails } from './pages/BusinessDetails/BusinessDetails';

function App() {
  return (
    <div className="App">
       <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/business" element={<Business />}/>
            <Route path='/business/:id' element={<BusinessDetails />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;