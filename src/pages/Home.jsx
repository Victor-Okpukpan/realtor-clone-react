import React, { useEffect } from 'react'
import Swiper from '../components/Swiper';
import { collection, db, getDocs, limit, orderBy, query } from 'firebase/firestore';

export default function Home() {
  useEffect(() => {
    async function getListings(){
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data()
        });
      });
    }
    getListings();
  }, [])
  return (
    <div>
      <Swiper />
    </div>
 )
}
