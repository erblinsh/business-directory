import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import { Navbar } from './Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { Business } from './pages/Business/Business';
import { BusinessDetails } from './pages/BusinessDetails/BusinessDetails';
import Dashboard from './admin/Dashboard';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import { Login } from './pages/Register/Login';
import { Logout } from './pages/Register/Logout';
import { SignUp } from './pages/Register/SignUp';
import BusinessList from './admin/business/BusinessList';
import UpdateBusiness from './admin/business/UpdateBusiness';
import CreateBusiness from './admin/business/CreateBusiness';
import CategoryList from './admin/category/CategoryList';
import CreateCategory from './admin/category/CreateCategory';
import UpdateCategory from './admin/category/UpdateCategory';
import ReviewList from './admin/review/ReviewList';

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
            <Route path='/admin/business' element={<BusinessList />} />
            <Route path='/admin/updatebusiness/:id' element={<UpdateBusiness />} />
            <Route path='/admin/createbusiness' element={<CreateBusiness/>}></Route>
            <Route path='/admin/category' element={<CategoryList/>}></Route>
            <Route path='/admin/createcategory' element={<CreateCategory/>}></Route>
            <Route path='/admin/updatecategory/:id' element={<UpdateCategory/>}></Route>
            <Route path='/admin/reviews' element={<ReviewList/>}></Route>
            {isLoggedIn
              ? <Route path='/logout' element={<Logout />}/>
              : <>
                  <Route path='/login' element={<Login />}/>
                  <Route path='/signup' element={<SignUp />}/>
                </>
            }
            {isLoggedIn && role && role.toLowerCase() === "admin" && 
              <Route path='/admin' element={<Dashboard />} />
            }
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
