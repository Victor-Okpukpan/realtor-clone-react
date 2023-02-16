import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    function pathMatchRoute(route){
        if(route === location.pathname){
            return true;
        }
    }

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <header className="flex justify-between px-3 max-w-6xl mx-auto items-center">
            <div>
                <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="logo" className="h-5 cursor-pointer" onClick={()=>navigate("/")} />
            </div>
            <div>
                <ul className="flex space-x-10">
                    <li className={`cursor-pointer py-3 text-gray-400 text-sm border-b-[3px] border-b-transparent ${pathMatchRoute("/") && "text-black border-b-red-500"}`} onClick={()=>navigate("/")}>Home</li>
                    <li className={`cursor-pointer py-3 text-gray-400 text-sm border-b-[3px] border-b-transparent ${pathMatchRoute("/offers") && "text-black border-b-red-500"}`} onClick={()=>navigate("/offers")}>Offers</li>
                    <li className={`cursor-pointer py-3 text-gray-400 text-sm border-b-[3px] border-b-transparent ${pathMatchRoute("/signIn") && "text-black border-b-red-500"}`} onClick={()=>navigate("/signIn")}>Sign-In</li>
                </ul>
            </div>
        </header>
    </div>
  )
}