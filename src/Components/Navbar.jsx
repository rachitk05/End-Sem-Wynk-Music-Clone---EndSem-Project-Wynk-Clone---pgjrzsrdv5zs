import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Navbar = () => {
    return (
        <nav className="text-white py-5 bg-gray-900">
            <div className="container mx-auto flex items-center justify-between px-4">
                <NavLink to="/" className="flex items-center gap-4">
                    <img className="h-14" src="https://wynk.in/_next/static/media/icon-384x384.522e458f.png" alt="Wynk Logo"/>
                    <h2>Wynk Music</h2>
                </NavLink>
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    <NavLink to="/signup" className="mr-4">SignUp</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
