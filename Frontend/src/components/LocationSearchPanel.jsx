import React from 'react'

const locations = [
    "VIT Bhopal, University, Kothri",
    "De Paul School, Vindhyanagar, Singrauli",
    "VIT Bhopal, University, Kothri",
    "De Paul School, Vindhyanagar, Singrauli"
]

const LocationSearchPanel = (props) => {

    return (
        <div>
            {/* sample search locations */}
            {
                locations.map(function (element,idx) {
                    return <div key={idx} onClick={() => {
                        props.setVehiclePanel(true)
                        props.setPanelOpen(false)
                    }} className='border-2 border-white active:border-black rounded-2xl p-3 flex gap-2 items-center mb-2'>
                        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'><i className="ri-map-pin-line"></i></h2>
                        <h4 className='font-medium'>{element}</h4>
                    </div>
                })
            }
        </div>
    )
}

export default LocationSearchPanel
