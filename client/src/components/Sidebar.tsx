import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo.svg"
import angle from "../assets/angle.svg"
import sidebar from "../assets/sidebar.svg"
import { faBook, faBox, faClose, faGear, faKey, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
    const [showNavigation, setShowNavigation] = useState(true);
    const [showUserNavigation, setShowUserNavigation] = useState(true);
    const navigate = useNavigate();

    return (<div className="min-h-full w-[20em] flex flex-col items-center py-10 bg-white shadow-xl relative">
        <div className="flex items-center justify-between w-full px-16">
            <img src={logo} alt="logo" className="h-14"/>

            {/* <img src={sidebar} alt=""  className="h-8"/> */}
        </div>

        <div className="w-full mt-10">
            <div className="px-16 flex items-center justify-between cursor-pointer mb-3"
            onClick={()=> setShowNavigation(!showNavigation)}>
                <h2 className="text-slate-500">Navigation</h2>

                <img src={angle} alt="" className={"h-6 transition-[400ms] " + (showNavigation && "rotate-180")} />
            </div>

            {showNavigation && <ul className="flex flex-col">
                <Link to="/products" className="sidebar-option">
                    <FontAwesomeIcon icon={faBox} className="h-5"/>
                    Products
                </Link>
                
                <Link to="/logs" className="sidebar-option">
                    <FontAwesomeIcon icon={faBook} className="h-5"/>
                    Logs
                </Link>
            </ul>}
        </div>

        <div className="w-full mt-5">
            <div className="px-16 flex items-center justify-between cursor-pointer mb-3"
            onClick={()=> setShowUserNavigation(!showUserNavigation)}>
                <h2 className="text-slate-500">User</h2>

                <img src={angle} alt="" className={"h-6 transition-[400ms] " + (showUserNavigation && "rotate-180")} />
            </div>

            {showUserNavigation && <ul className="flex flex-col">
                <Link to="/tokens" className="sidebar-option">
                    <FontAwesomeIcon icon={faKey} className="h-5"/>
                    Tokens
                </Link>
                
                {/* <li className="sidebar-option">
                    <FontAwesomeIcon icon={faGear} className="h-5"/>
                    Settings
                </li> */}
            </ul>}
        </div>

        <div className="flex items-center gap-x-2 px-16 w-full py-3 mt-10 text-slate-500 select-none cursor-pointer hover:bg-red-50 hover:text-red-500 transition-[400ms]"
        onClick={()=>{
            localStorage.removeItem("token");
            navigate("/login");
        }}>
            <FontAwesomeIcon icon={faRightFromBracket} className="h-5"/>
            <h2 className="font-bold">Log out</h2>
        </div>
    </div>);
}

export default Sidebar;