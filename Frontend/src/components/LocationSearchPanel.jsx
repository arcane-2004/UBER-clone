import React from 'react'

const LocationSearchPanel = ({ suggestions, setPickup, setDestination, activeField, findTrip }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
        // setVehiclePanel(true)
        // setPanelOpen(false)
    }

    return (
        <div >
            <button onClick={findTrip}
                className='bg-black text-white px-4 py-2 rounded-lg mb-2 w-full'>
                Find Trip
            </button>

            <div className=' h-110 overflow-auto'>
                {/* Display fetched suggestions */}
                {
                    suggestions.map((elem, idx) => (

                        <div key={idx} onClick={() => handleSuggestionClick(elem.description)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                            <div>
                                <h2 className='bg-[#eee] h-8 w-8 flex items-center justify-center rounded-full'><i className="ri-map-pin-fill"></i></h2>
                            </div>
                            <div>
                                <h4 className='font-medium'>{elem.description}</h4>
                            </div>

                        </div>
                    ))

                }
            </div>
        </div>
    )
}

export default LocationSearchPanel