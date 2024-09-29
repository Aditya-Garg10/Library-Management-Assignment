import React, { createContext,useEffect,useState } from 'react'



export const DataContext = createContext(null);

const DataContextProvider = (props) =>{
    const [userData, setUserData] = useState(null);
    const [bookData, setBookData] = useState(null);
    const [allbookData, setAllBookData] = useState(null);
    const [rangeData, setRangeData] = useState(null);
    const [bookDetailsData, setBookDetailsData] = useState(null);
    const [transactionData , setTransactionData] = useState(null);
    const [personList , setPersonList] = useState(null);
    
    const contextValue = {userData, transactionData ,personList , setPersonList, setTransactionData, setUserData,bookData,allbookData, setAllBookData,bookDetailsData, setBookDetailsData, rangeData, setRangeData, setBookData}

    return(
        <DataContext.Provider value={contextValue}>
            {props.children}
        </DataContext.Provider>
    )
}



export default DataContextProvider;
