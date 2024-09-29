import React, { useContext, useEffect, useState } from 'react'
import { GET_ALLBOOK_ROUTE, GET_ALL_TRANSACTIONS, GET_BOOK_BY_NAME_ROUTE, GET_USER_ROUTE } from './utils/constants'
import { apiClient } from './lib/Api-client'
import Sidebar from './components/Sidebar'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'
import Members from './pages/Members'
import { DataContext } from './context/Context'
import Transactions from './pages/Transactions'



const App = () => {

  const { userData , setUserData ,allbookData, setAllBookData , transactionData , setTransactionData } = useContext(DataContext) 

  
  const getUserData = async() =>{
    try {
      const response = await apiClient.get(GET_USER_ROUTE );
      setUserData(response.data)
      // console.log(response.data)
    } catch (error) {
      
    }
    
  } 
  
  const getBookData = async() =>{
    try {
      const response = await apiClient.get(GET_ALLBOOK_ROUTE );
      setAllBookData(response.data)
      // console.log(response.data)
    } catch (error) {
      
    }
    
  } 
  
  const getTransactionData = async() =>{
    try {
      const response = await apiClient.get(GET_ALL_TRANSACTIONS );
      setTransactionData(response.data)
      // console.log(response.data)
    } catch (error) {
      
    }
  }
  
  useEffect(()=>{
    if(!userData){
      getUserData()
    }
    
    
    // console.log(userData);   
  },[userData])
  useEffect(()=>{
    if(!allbookData){
      getBookData()
    }
    
    
    // console.log(userData);   
  },[allbookData])

  useEffect(()=>{
    if(!transactionData){
      getTransactionData()
    }
    
    
    // console.log(userData);   
  },[transactionData])
  return (
    <>
    <div className='h-full flex sm:flex-col flex-row w-full'>
      <BrowserRouter>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/books' element={<Books/>}></Route>
        <Route path='/users' element={<Members/>}></Route>
        <Route path='/transactions' element={<Transactions/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
