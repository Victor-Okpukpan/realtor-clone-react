import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';
import { db } from '../firebase';

export default function Category() {
  const [ listings, setListings ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ lastFetchListing, setLastFetchListing ] = useState(null);
  const params = useParams();
  useEffect(() => {
    async function fetchListings(){
      try {
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, where("type", "==", params.categoryName), orderBy("timestamp", "desc"), limit(8));
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchListing(lastVisible);
        const listings = [];
        querySnap.forEach((docs) => {
          listings.push({
            id: docs.id,
            data: docs.data()
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings!")
      }
    }
    fetchListings();
  }, [params.categoryName]);

  async function onFetchMoreListings(){
    try {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, where("type", "==", params.categoryName), orderBy("timestamp", "desc"), startAfter(lastFetchListing), limit(4));
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchListing(lastVisible);
      const listings = [];
      querySnap.forEach((docs) => {
        listings.push({
          id: docs.id,
          data: docs.data()
        });
      });
      setListings((prev) => [...prev, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listings!")
    }
  }

  if(loading){
    return <Spinner />
  }
  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="text-3xl text-center mt-6 font-bold mb-6">
        {params.categoryName === "rent" ? "Places for rent" : "Places for sale"}
      </h1>
      {listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
              ))}
            </ul>
          </main>
          {lastFetchListing && (
            <div className="flex justify-center items-center">
              <button onClick={onFetchMoreListings} className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 transition duration-150 ease-in-out rounded">Load more</button>
            </div>
          )}
        </>
      ) : (
        <p>There are no current {params.categoryName === "rent" ? "places for rent" : "places for sale"}</p>
      )}
    </div>
  )
}
