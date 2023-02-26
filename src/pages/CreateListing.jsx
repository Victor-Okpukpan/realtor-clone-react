import React, { useState } from 'react'

export default function CreateListing() {
    const [ formData, setFormData ] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        description: "",
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
    });
    const { type, name, bedrooms, bathrooms, parking, furnished, address, description, offer, regularPrice, discountedPrice } = formData;
    function onChange(){}

  return (
    <main className="px-2 max-w-md mx-auto">
        <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
        <form >
            <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
            <div className="flex">
                <button type="button" id="type" value="sell" onClick={onChange} className={`mr-3 px-7 py-3 font-medium uppercase text-sm shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg w-full transition duration-150 ease-in-out ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"}`}>
                    sell
                </button>
                <button type="button" id="type" value="sell" onClick={onChange} className={`ml-3 px-7 py-3 font-medium uppercase text-sm shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg w-full transition duration-150 ease-in-out ${type === "sale" ? "bg-white text-black" : "bg-slate-600 text-white"}`}>
                    rent
                </button>
            </div>
            <p className="text-lg mt-6 font-semibold">Name</p>
            <input type="text" id="name" value={name} onChange={onChange} placeholder="Name" minLength="10" maxLength="32" required className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6" />
            <div className="flex space-x-6 justify-start mb-6">
                <div>
                    <p className="text-lg font-semibold">Beds</p>
                    <input type="number" id="bedrooms" value={bedrooms} onChange={onChange} min="1" max="50" required className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center w-full" />
                </div>
                <div>
                    <p className="text-lg font-semibold">Baths</p>
                    <input type="number" id="bathrooms" value={bathrooms} onChange={onChange} min="1" max="50" required className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center w-full" />
                </div>
            </div>
            <p className="text-lg mt-6 font-semibold">Parking spot</p>
            <div className="flex">
                <button type="button" id="parking" value={true} onClick={onChange} className={`mr-3 px-7 py-3 font-medium uppercase text-sm shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg w-full transition duration-150 ease-in-out ${!parking ? "bg-white text-black" : "bg-slate-600 text-white"}`}>
                    Yes
                </button>
                <button type="button" id="parking" value={false} onClick={onChange} className={`ml-3 px-7 py-3 font-medium uppercase text-sm shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg w-full transition duration-150 ease-in-out ${parking ? "bg-white text-black" : "bg-slate-600 text-white"}`}>
                    No
                </button>
            </div>
            <p className="text-lg mt-6 font-semibold">Furnished</p>
            <div className="flex">
                <button type="button" id="furnished" value={true} onClick={onChange} className={`mr-3 px-7 py-3 font-medium uppercase text-sm shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg w-full transition duration-150 ease-in-out ${!furnished ? "bg-white text-black" : "bg-slate-600 text-white"}`}>
                    yes
                </button>
                <button type="button" id="furnished" value={false} onClick={onChange} className={`ml-3 px-7 py-3 font-medium uppercase text-sm shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg w-full transition duration-150 ease-in-out ${furnished ? "bg-white text-black" : "bg-slate-600 text-white"}`}>
                    no
                </button>
            </div>
            <p className="text-lg mt-6 font-semibold">Address</p>
            <textarea type="text" id="address" value={address} onChange={onChange} placeholder="Address" required className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6" />
            <p className="text-lg font-semibold">Description</p>
            <textarea type="text" id="description" value={description} onChange={onChange} placeholder="Description" required className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6" />
            <p className="text-lg font-semibold">Offer</p>
            <div className="flex mb-6">
                <button type="button" id="offer" value={true} onClick={onChange} className={`mr-3 px-7 py-3 font-medium uppercase text-sm shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg w-full transition duration-150 ease-in-out ${!offer ? "bg-white text-black" : "bg-slate-600 text-white"}`}>
                    yes
                </button>
                <button type="button" id="offer" value={false} onClick={onChange} className={`ml-3 px-7 py-3 font-medium uppercase text-sm shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg w-full transition duration-150 ease-in-out ${offer ? "bg-white text-black" : "bg-slate-600 text-white"}`}>
                    no
                </button>
            </div>
            <div className="flex items-center mb-6">
                <div>
                    <p className="text-lg font-semibold">Regular Price</p>
                    <div className="flex w-full justify-center items-center space-x-6">
                        <input type="number" id="regularPrice" value={regularPrice} onChange={onChange} min="50" max="400000000" required className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center" />
                        {type === "rent" && (
                            <div className="text-md w-full whitespace-nowrap ">
                                <p>$ / Month</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {offer && (
                <div className="flex items-center mb-6">
                <div>
                    <p className="text-lg font-semibold">Discounted Price</p>
                    <div className="flex w-full justify-center items-center space-x-6">
                        <input type="number" id="discountedPrice" value={discountedPrice} onChange={onChange} min="50" max="400000000" required={offer} className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center" />
                    {type === "rent" && (
                        <div className="text-md w-full whitespace-nowrap ">
                            <p>$ / Month</p>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            )}
            <div className="mb-6">
                <p className="text-lg font-semibold">Images</p>
                <p className="text-gray-600">The first image will be the cover (max 6)</p>
                <input type="file" id="images" onChange={onChange} accept=".jpg,.png,.jpeg" multiple required className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600" />        
            </div>
            {/* Submit button */}
            <button type="submit" className="w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:bg-blue-700 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mb-6">Create List</button>
            <button className='text-red-700'>Omor ohhh!!!</button>
        </form>
    </main>
  )
}
