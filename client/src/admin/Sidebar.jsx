import { Link } from "react-router-dom";
import '../styles/sidebar.css';
import { IoBusinessOutline } from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";


const Sidebar = () => {

  return (
    <div className="sidebar">
      <hr />
      <div className="center">
        <ul className="nav flex-column">
          <p className="title">MAIN</p>
          <li className="nav-item">
            <AiOutlineDashboard/>
            <Link to="/admin" className="nav-link">
              Dashboard
            </Link>
          </li>
          <hr width='280px'/>
          <p className="title">LISTS</p>
          <li className="nav-item">
          <IoBusinessOutline />
            <Link to="/admin/business" className="nav-link">
              Businesses
            </Link>
          </li>
          <li className="nav-item">
          <BiCategoryAlt/>
            <Link to="/admin/category" className="nav-link">
              Categories
            </Link>
          </li>
          <li className="nav-item">
          <MdOutlineRateReview />
            <Link to="/admin/reviews" className="nav-link">
              Reviews
            </Link>
          </li>
          <hr width='280px'/>
          <p className="title">USER</p>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/logout" className="nav-link">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;