import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import { Navbar } from './Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { Business } from './pages/Business/Business';
import { BusinessDetails } from './pages/BusinessDetails/BusinessDetails';
import Dashboard from './admin/Dashboard';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';

function App() {
  const { isLoggedIn, role }= useSelector(state => state.userAuthSlice)

  return (
    <div className="App">
       <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/business" element={<Business />}/>
            <Route path='/business/:id' element={<BusinessDetails />} />
            {isLoggedIn
              ?<Route path='/logout' element={<Logout />}/>
              :
              <>
                <Route path='/login' element={<Login />}/>
                <Route path='/signup' element={<SignUp />}/>
              </>
            }
            {
              JSON.parse(role.toLowerCase()) === "admin" &&
              <Route path='/admin' element={<Dashboard />} />
            }
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;