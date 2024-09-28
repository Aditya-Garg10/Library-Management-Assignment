import React, { createContext,useEffect,useState } from 'react'



export const DataContext = createContext(null);

const DataContextProvider = (props) =>{
    const [userData, setUserData] = useState(null);
    const [bookData, setBookData] = useState(null);
    const [rangeData, setRangeData] = useState(null);
    
    const contextValue = {userData, setUserData,bookData, rangeData, setRangeData, setBookData}

    return(
        <DataContext.Provider value={contextValue}>
            {props.children}
        </DataContext.Provider>
    )
}



export default DataContextProvider;
