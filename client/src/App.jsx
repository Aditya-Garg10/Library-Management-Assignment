import React, { useContext, useEffect, useState } from 'react'
import { GET_BOOK_BY_NAME_ROUTE, GET_USER_ROUTE } from './utils/constants'
import { apiClient } from './lib/Api-client'
import Sidebar from './components/Sidebar'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'
import Members from './pages/Members'
import { DataContext } from './context/context'
import Transactions from './pages/Transactions'



const App = () => {

  const { userData , setUserData } = useContext(DataContext) 

  
  const getUserData = async() =>{
    try {
      const response = await apiClient.get(GET_USER_ROUTE );
      setUserData(response.data)
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
