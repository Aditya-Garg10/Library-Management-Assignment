import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/context';
import { apiClient } from '../lib/Api-client';
import { GET_BOOK_BY_DETAILS_ROUTE, GET_BOOK_BY_NAME_ROUTE, GET_BOOK_BY_PRICERANGE_ROUTE } from '../utils/constants';
import { Table } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: unset;
            column-title : bold;
          }
        }
      }
    `,
  };
});
const columns = [
  {
    title: 'Books',
    dataIndex: 'bookName',
    width: 300,
  },
  
];

const Books = () => {
  const { styles } = useStyle();
  const { bookData, setBookData , rangeData, setRangeData ,bookDetailsData, setBookDetailsData} = useContext(DataContext);

const [minPrice, setminPrice] = useState(0);
const [maxPrice, setmaxPrice] = useState(0);
const [category, setCategory] = useState("");


  const [bookName, setBookName] = useState("");
  
  const handleSubmit = async() =>{
    try {
      const response = await apiClient.post(GET_BOOK_BY_NAME_ROUTE,{bookName:bookName},
        { headers : {
          "Access-Control-Allow-Origin": 'http://localhost:5173',          
        },
          withCredentials : true}
      );
      setBookData(response.data)
      
    } catch (error) {
      
    }
  }
  const handleRangeSubmit = async(req,res)=>{
    try {
      const response = await apiClient.post(GET_BOOK_BY_PRICERANGE_ROUTE,{minRent:minPrice,maxRent:maxPrice},
        { headers : {
          "Access-Control-Allow-Origin": 'http://localhost:5173',          
        },
          withCredentials : true}
      );
      setRangeData(response.data)
      
    } catch (error) {
      
    }
  }
  const handleDetailsSubmit = async() =>{
    try {
      const response = await apiClient.post(GET_BOOK_BY_DETAILS_ROUTE,{minRent:minPrice,maxRent:maxPrice,category:category,bookName:bookName},
        { headers : {
          "Access-Control-Allow-Origin": 'http://localhost:5173',          
        },
          withCredentials : true}
      );
      setBookDetailsData(response.data)
      
    } catch (error) {
      
    }
  }
  // useEffect(()=>{
  //   console.log(rangeData)
  // })
  return (
    <div className='w-5/6 h-auto sm:w-full'>
      <div className="flex flex-col  p-10">
        <h1 className='text-3xl sm:text-xl text-black font-semibold font-myFont'>Manage your Books here!</h1>

        <div className="flex pt-10 flex-col">
        <h1 className='text-xl sm:text-sm text-black  font-myFont'>Search a Book By its Name <span className='text-sm text-gray-500'>(or Term in the name of the book)</span></h1>
          <div className='flex  gap-5 py-5 flex-row'>
          <input value={bookName} onChange={(e)=>setBookName(e.target.value)} type="text" className='px-2 border-2 border-black py-1' placeholder='Search a Book name' />
          <button onClick={handleSubmit} className='bg-blue-950 px-3 py-1 text-white font-semibold rounded-sm'>Submit</button>
          </div>
        </div>
        <div className='w-5/6 sm:w-full sm:h-full sm:p-5 py-10 px-20'>
      
    <Table
      className={styles.customTable}
      columns={columns}
      dataSource={bookData}
      pagination={{
        pageSize: 10,
      }}
      scroll={{
        y: 55 * 5,
      }}
    />
    </div>

    <div className="flex  flex-col">
        <h1 className='text-xl sm:text-sm text-black  font-myFont'>Give a Price range of the rent <span className='text-sm text-gray-500'>(select any range from 200 to 1500)</span></h1>
          <div className='flex gap-5 py-5 flex-row'>
          <input value={minPrice} onChange={(e)=>setminPrice(e.target.value)} type="number" className='px-2 border-2 border-black py-1' placeholder='Minimum Price' />
          <input value={maxPrice} onChange={(e)=>setmaxPrice(e.target.value)} type="number" className='px-2 border-2 border-black py-1' placeholder='Maximum Price' />
          <button onClick={handleRangeSubmit} className='bg-blue-950 px-3 py-1 text-white font-semibold rounded-sm'>Submit</button>
          </div>

          <div className='w-5/6 sm:w-full sm:h-full sm:p-5 py-10 px-20'>
      
    <Table
      className={styles.customTable}
      columns={columns}
      dataSource={rangeData}
      pagination={{
        pageSize: 10,
      }}
      scroll={{
        y: 55 * 5,
      }}
    />
    </div>
        </div>


        
    <div className="flex  flex-col">
        <h1 className='text-xl sm:text-sm text-black  font-myFont'>Provide  Category, Name/Term, Rent/day <span className='text-sm text-gray-500'>(some categories include: Non-Fiction, Mystery & Biography)</span></h1>
          <div className='flex flex-wrap gap-5 py-5 flex-row'>
          <input value={bookName} onChange={(e)=>setBookName(e.target.value)} type="text" className='px-2 border-2 border-black py-1' placeholder='Name of the Book' />
          <input value={category} onChange={(e)=>setCategory(e.target.value)} type="text" className='px-2 border-2 border-black py-1' placeholder='Category' />
          <input value={minPrice} onChange={(e)=>setminPrice(e.target.value)} type="number" className='px-2 border-2 border-black py-1' placeholder='Minimum Price' />
          <input value={maxPrice} onChange={(e)=>setmaxPrice(e.target.value)} type="number" className='px-2 border-2 border-black py-1' placeholder='Maximum Price' />
          <button onClick={handleDetailsSubmit} className='bg-blue-950 px-3 py-1 text-white font-semibold rounded-sm'>Submit</button>
          </div>

          <div className='w-5/6 sm:w-full sm:h-full sm:p-5 py-10 px-20'>
      
    <Table
      className={styles.customTable}
      columns={columns}
      dataSource={bookDetailsData}
      pagination={{
        pageSize: 10,
      }}
      scroll={{
        y: 55 * 5,
      }}
    />
    </div>
        </div>
      </div>
    </div>
  )
}

export default Books
