import {createContext, useState} from "react"
import React from 'react'

export const DataContext  = createContext(null);

const DataProvider = ({children}) => {

    const [accountDetails, setAccountDetails] = useState({username: '', name: ''})
    // const [accountDetails, setAccountDetails] = useState({name: '', username: ''})

  return (
    <DataContext.Provider value ={{
        accountDetails,
        setAccountDetails
    }} >
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider