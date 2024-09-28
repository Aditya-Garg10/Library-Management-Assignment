import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/context';
import { apiClient } from '../lib/Api-client';
import { GET_BOOK_BY_NAME_ROUTE } from '../utils/constants';

const Books = () => {
  const { bookData, setBookData } = useContext(DataContext)

  const [bookName, setBookName] = useState("");
  console.log(bookName)
  const handleSubmit = async() =>{
    try {
      const response = await apiClient.get(GET_BOOK_BY_NAME_ROUTE,{bookName:bookName},
        { headers : {
          "Access-Control-Allow-Origin": 'http://localhost:5173',          
        },
          withCredentials : true}
      );
      setBookData(response.data)
      console.log(response.data)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    console.log(bookData)
  })
  return (
    <div>
      <div className="flex flex-col p-10">
        <h1 className='text-3xl text-black font-semibold font-myFont'>Manage your Books here!</h1>

        <div className="flex gap-5 pt-10 flex-row">
          <input value={bookName} onChange={(e)=>setBookName(e.target.value)} type="text" className='px-2 border-2 border-black py-1' placeholder='Search a Book name' />
          <button onClick={handleSubmit} className='bg-blue-950 px-3 py-1 text-white font-semibold rounded-sm'>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Books
