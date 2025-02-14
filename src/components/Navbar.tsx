import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="w-[85%] mx-auto p-2 rounded-xl border border-[#197686] flex items-center justify-between">
      <div>
        <img src="./ticz-logo.svg" alt="" />
      </div>
      <ul className="md:flex items-center gap-4 hidden">
        <li>
          <Link
            to="/"
            className={`${
              location.pathname === "/" ? "text-white" : "text-[#B3B3B3]"
            }`}
          >
            Events
          </Link>
        </li>
        <li>
          <Link
            to="/my-tickets"
            className={`${
              location.pathname === "/my-tickets"
                ? "text-white"
                : "text-[#B3B3B3]"
            }`}
          >
            My Tickets
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`${
              location.pathname === "/about" ? "text-white" : "text-[#B3B3B3]"
            }`}
          >
            About Project
          </Link>
        </li>
      </ul>
      <button className="bg-white rounded-xl w-40 h-12 text-black flex items-center justify-center gap-2 text-sm uppercase hover:cursor-pointer">
        My Tickets <MoveRight />
      </button>
    </nav>
  );
};

export default Navbar;
