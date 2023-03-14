import React, { useEffect, useState } from 'react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import Spinner from './Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/bundle";
import SwiperCore, {EffectFade, Autoplay, Navigation, Pagination } from 'swiper';
import { useNavigate } from 'react-router-dom';

export default function Slider() {
  const navigate = useNavigate();
  const [ listings, setListings ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  SwiperCore.use([EffectFade, Autoplay, Navigation, Pagination])
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
      setListings(listings);
      setLoading(false);
      console.log(listings);
    }
    getListings();
  }, []);

  if(loading){
    return <Spinner />
  };
  if(listings.length === 0){
    return <></>;
  };

  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{type: "progressbar"}}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{delay: 3000}}
        >
          {listings.map(({data, id}) => (
        <SwiperSlide
          key={id}
          onClick={() => {
            navigate(`category/${data.type}/${id}`)
          }}
        >
          <div 
            style={{background: `url(${data.imgUrls[0]}) center no-repeat`, backgroundSize: "cover"}}
            className="relative w-full overflow-hidden h-[300px]"
          ></div>
          <p className="absolute left-1 top-3 text-[#f1faee] font-medium bg-[#457b9d] max-w-[90%] shadow-lg opacity-90 p-2 rounded-br-3xl">{data.name}</p>
          <p className="absolute left-1 bottom-1 text-[#f1faee] font-semibold bg-[#e63946] max-w-[90%] shadow-lg opacity-90 p-2 rounded-tr-3xl">
            ${data.discountedPrice ?? data.regularPrice}
            {data.type === "rent" ? " / month" : ""}
          </p>
        </SwiperSlide>
      )) }
        </Swiper>
      </>  
    )
  )
}
