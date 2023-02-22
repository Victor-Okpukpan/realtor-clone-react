import { getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setformData ] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const { name, email } = formData;

  function onLogout(){
    auth.signOut();
    navigate("/");
  }
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center font-bold mt-6">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* Name Input */}
            <input type="text" id="name" value={name} disabled className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out" />

            {/* Email Input */}
            <input type="email" id="email" value={email} disabled className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out" />

            <div className="flex justify-between text-sm sm:text-lg whitespace-nowrap mb-6">
              <p className="flex items-center">Do you want to change your name?
                <span className="text-red-600 hover:text-red-700 cursor-pointer transition ease-in-out duration-200 ml-1">Edit</span>
              </p>
              <p onClick={onLogout} className="text-blue-600 hover:text-blue-800 cursor-pointer transition duration-200 ease-in-out">Sign out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
