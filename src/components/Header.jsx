import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { MdMenu, MdClose } from 'react-icons/md'
export default function Header() {
    const [pageState, setPageState] = useState("Sign In");
    const [ toggle, setToggle ] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) =>{
            if(user){
                setPageState("Profile")
            }else{
                setPageState("Sign In")
            }
        })
    }, [auth])
    

    function pathMatchRoute(route){
        if(route === location.pathname){
            return true;
        }
    }

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <header className="flex justify-between px-3 max-w-6xl mx-auto items-center">
            <div>
                <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="logo" className="h-5 cursor-pointer" onClick={()=>navigate("/")} />
            </div>
            <div>
                <ul className="hidden sm:flex space-x-10">
                    <li className={`cursor-pointer py-3 text-sm font-semibold  border-b-[3px]  ${pathMatchRoute("/") ? "text-black border-b-red-500" : "text-gray-400 border-b-transparent"}`} onClick={()=>navigate("/")}>Home</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${pathMatchRoute("/offers") ? "text-black border-b-red-500" : "text-gray-400 border-b-transparent"}`} onClick={()=>navigate("/offers")}>Offers</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) ? "text-black border-b-red-500" : "text-gray-400 border-b-transparent"}`} onClick={()=>navigate("/profile")}>{pageState}</li>
                </ul>
            </div>
            <div className="sm:hidden flex flex-1 justify-end items-center py-3">
                {toggle ? <MdClose onClick={() => setToggle(!toggle)} className="w-[28px] h-[28px] object-contain cursor-pointer transition duration-200 ease-in-out"/> : <MdMenu onClick={() => setToggle(!toggle)} className="w-[28px] h-[28px] object-contain cursor-pointer transition duration-200 ease-in-out" /> }

                <div className={`${!toggle ? "hidden" : "flex"} p-6 bg-gradient-to-r from-gray-600 via-gray-700 to-black absolute top-12  right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl transition duration-200 ease-in-out`}>
                <ul className="flex justify-end items-start flex-col ">
                    <li className={`cursor-pointer py-3 text-sm font-semibold  border-b-[3px]  ${pathMatchRoute("/") ? "text-black border-none" : "text-gray-400 border-b-transparent"}`} onClick={()=>{navigate("/"); setToggle(false)}}>Home</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${pathMatchRoute("/offers") ? "text-black border-none" : "text-gray-400 border-b-transparent"}`} onClick={()=>{navigate("/offers"); setToggle(false)}}>Offers</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) ? "text-black border-none" : "text-gray-400 border-b-transparent"}`} onClick={()=>{navigate("/profile"); setToggle(false)}}>{pageState}</li>
                </ul>
                </div>
            </div>
        </header>
    </div>
  )
}