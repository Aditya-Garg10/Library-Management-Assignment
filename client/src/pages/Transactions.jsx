import React, { useContext, useState } from 'react';
import { Button, DatePicker, Input, Select, Space, message } from 'antd';
import { DataContext } from '../context/context';
import { CREATE_TRANSACTION_ROUTE } from '../utils/constants';

const Transactions = () => {
  const { userData ,allbookData } = useContext(DataContext) 
const [User, setUser] = useState("");
const [Book, setBook] = useState("");
const [Date, setDate] = useState("");
  const onChange = (date, dateString) => {
    setDate(dateString)
    // console.log(date,  dateString);
  };

  const handleSubmit = async() =>{
    try {
      const response = await apiClient.put(CREATE_TRANSACTION_ROUTE,{bookName:Book,userName:User,issueDate: Date},
        { headers : {
          "Access-Control-Allow-Origin": 'http://localhost:5173',          
        },
          withCredentials : true}
      );
      if(response){
        message.success("Transaction Created")
      }
    } catch (error) {
      
    }
  }
  
  return (
    <div className='h-screen'>
      <div className="flex flex-col p-10">
        <h1 className='text-5xl text-black font-bold  font-myFont'>Transactions</h1>
        <div className="flex gap-4 py-8 sm:py-3 flex-col">
        <h1 className='text-xl sm:text-sm text-black  font-myFont'>Create a Entry with date of Issue<span className='text-sm text-gray-500'> ( Please provide Book Name, Person Name, Issued Date )</span></h1>
        <div className="flex gap-3 flex-wrap">
        <Select
    showSearch
    className='w-1/2 rounded-sm'    
    placeholder="Select a book"
    optionFilterProp="label"
    onChange={(e)=>setBook(e)}         
    options={
      allbookData ? allbookData.map((user,i)=>{
        return {value: user.bookName,label: user.bookName,key:i}
      }) :""
      } 
  />
        {/* <Input placeholder='Person Name' className='w-1/2 rounded-none'/> */}
        <Select
    showSearch
    className='w-1/2 rounded-sm'    
    placeholder="Select a person"
    optionFilterProp="label"
    onChange={(e)=>setUser(e)}        
    options={
     userData ? userData.map((user,i)=>{
        return {value: user.fullName,label: user.fullName,key:i}
      }) :""
      } 
  />
        <DatePicker className="" placeholder='Date of Issue' onChange={onChange} />

        <Button className='bg-blue-950 text-white font-semibold' onClick={handleSubmit}>Submit</Button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Transactions
