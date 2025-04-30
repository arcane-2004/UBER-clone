import React, { Children, createContext } from 'react'
import { useState } from 'react'

export const CaptainDataContext = createContext();

const CaptainContext = ({children})=>{
    const [captain, setCaptain] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const updateCaptain = (captainData)=>{
        setCaptain(captainData);
    }

    const values = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    }

    return (
        <div>
            <CaptainDataContext.Provider value={values}>
                {children}
            </CaptainDataContext.Provider>
        </div>
    )
}   

export default CaptainContext