import { NavLink } from "react-router";

function NavLinks() {
  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center justify-center gap-4 font-semibold">
        <li>
          <NavLink
            className={"hover:text-accent-500 nav-link relative duration-300"}
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={"hover:text-accent-500 nav-link relative duration-300"}
            to={"/rooms"}
          >
            Rooms / Hotels
          </NavLink>
        </li>
        <li>
          <NavLink
            className={"hover:text-accent-500 nav-link relative duration-300"}
            to={"/About us"}
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            className={"hover:text-accent-500 nav-link relative duration-300"}
            to={"/Contact"}
          >
            Contact Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavLinks;
