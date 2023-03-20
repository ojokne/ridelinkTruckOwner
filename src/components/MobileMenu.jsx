import { signOut } from "firebase/auth";
import { FaSignOutAlt, FaTasks, FaTruckMoving } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";

const MobileMenu = ({ handleShowMenu }) => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await signOut(auth);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="py-1">
      <ul className="p1 m-1 list-unstyled">
        <Link
          className="text-decoration-none"
          to="/"
          onClick={() => handleShowMenu()}
        >
          <li className="py-2 border-bottom liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">Dashboard</span>
            <span>
              <FaTasks className="icon iconMenu" />
            </span>
          </li>
        </Link>

        {/* <Link
          className="text-decoration-none"
          to="trucks"
          onClick={() => handleShowMenu()}
        >
          <li className="py-2 border-bottom d-flex align-items-center liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">Trucks</span>
            <span>
              <FaTruckMoving className="icon iconMenu" />
            </span>
          </li>
        </Link> */}
        <Link
          className="text-decoration-none"
          to="add_truck"
          onClick={() => handleShowMenu()}
        >
          <li className="py-2 border-bottom d-flex align-items-center liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">Add Truck</span>
            <span>
              <FaTruckMoving className="icon iconMenu" />
            </span>
          </li>
        </Link>
        <li
          className="py-2 d-flex align-items-center liMenu d-flex justify-content-between align-items-center"
          onClick={(e) => handleLogout(e)}
        >
          <span className="text-muted">Logout</span>
          <span>
            <FaSignOutAlt className="icon iconMenu" />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
