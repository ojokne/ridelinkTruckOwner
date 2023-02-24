import { FaTasks, FaTruckMoving } from "react-icons/fa";
import { Link } from "react-router-dom";

const DesktopMenu = () => {
  return (
    <div className="p-3 m-3">
      <ul className="p1 m-1 list-unstyled">
        <Link className="text-decoration-none" to="/">
          <li className="py-2 border-bottom liMenu">
            <span>
              <FaTasks className="icon iconMenu" />
            </span>
            <span className="text-muted">Dashboard</span>
          </li>
        </Link>

        <Link className="text-decoration-none" to="trucks">
          <li className="py-2 border-bottom liMenu">
            <span>
              <FaTruckMoving className="icon iconMenu" />
            </span>
            <span className="text-muted">Trucks</span>
          </li>
        </Link>
        <Link className="text-decoration-none" to="add_truck">
          <li className="py-2 border-bottom liMenu">
            <span>
              <FaTruckMoving className="icon iconMenu" />
            </span>
            <span className="text-muted">Add Truck</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default DesktopMenu;
