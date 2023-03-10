import { getAuth, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { FcHome } from 'react-icons/fc';
import ListingItem from '../components/ListingItem';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      console.log(listings)
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);
  async function onDelete(listingID){
    if(window.confirm("Are you sure you want to delete?")){
      await deleteDoc(doc(db, "listings", listingID));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updatedListings);
      toast.success("Successfully deleted the listing")
    }
  }
  function onEdit(listingID) {
      navigate(`/edit-listing/${listingID}`)
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
      <div className="max-x-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 &&(
          <>
            <h2 className="text-2xl text-center font-semibold mb-6">My Listings</h2>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6">
            {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}
