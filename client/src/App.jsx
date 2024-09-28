import React, { useEffect } from 'react'
import { GET_USER_ROUTE } from './utils/constants'
import { apiClient } from './lib/Api-client'

const App = () => {
  const getUserData = async() =>{
    try {
      const response = await apiClient.get(GET_USER_ROUTE  )
      console.log(response)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    getUserData()
  })
  return (
    <div className=''>
      hi
    </div>
  )
}

export default App
