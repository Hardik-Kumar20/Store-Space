import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="sidebar">

      <nav className="nav-links">
        <NavLink to="/dashboard" end>
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/create-listing">
          Add Space
        </NavLink>

        <NavLink to="/dashboard/my-listings">
          My Listings
        </NavLink>

        <NavLink to="/dashboard/bookings">
          Bookings
        </NavLink>
      </nav>
    </aside>
    );
};

export default Sidebar;