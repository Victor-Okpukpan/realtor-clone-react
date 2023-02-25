import { getAuth, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { FcHome } from 'react-icons/fc';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData ] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const { name, email } = formData;

  function onChange(e){
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  function onLogout(){
    auth.signOut();
    navigate("/");
  }

  async function onSubmit(){
    try {
      if(auth.currentUser.displayName !== name){
        // Update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Update name in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name
        });
      }
      toast.success("Profile details updated!")
    } catch (error) {
      toast.error("Could not update the profile details!")
    }
  }
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center font-bold mt-6">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* Name Input */}
            <input type="text" id="name" value={name} onChange={onChange} disabled={!changeDetails} className={`${!changeDetails ? "mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out" : "mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-red-200 focus:bg-red-200 border border-gray-300 rounded transition ease-in-out"}`} />

            {/* Email Input */}
            <input type="email" id="email" value={email} disabled className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out" />

            <div className="flex justify-between text-sm sm:text-lg whitespace-nowrap mb-6">
              <p className="flex items-center">Do you want to change your name?
                <span onClick={() => {
                    changeDetails && onSubmit();
                    setChangeDetails((prevState) => !prevState);
                  }} className="text-red-600 hover:text-red-700 cursor-pointer transition ease-in-out duration-200 ml-1">{changeDetails ? "Apply change" : "Edit"}</span>
              </p>
              <p onClick={onLogout} className="text-blue-600 hover:text-blue-800 cursor-pointer transition duration-200 ease-in-out">Sign out</p>
            </div>
          </form>
          <button type="submit" className="w-full bg-blue-600 text-white text-sm font-medium uppercase shadow-md px-7 py-3 rounded hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 focus:bg-blue-800 transition duration-150 ease-in-out">
            <Link to="/create-listing" className="flex justify-center items-center">
              <FcHome className="mr-2 bg-red-200 rounded-full p-1 text-3xl border-2" />
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section>
    </>
  )
}
