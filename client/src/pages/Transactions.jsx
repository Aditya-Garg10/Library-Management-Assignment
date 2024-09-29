import React, { useContext, useState } from 'react';
import { Button, DatePicker, Input, Select, Space, Table, message } from 'antd';
import { DataContext } from '../context/context';
import { CREATE_RETURN_TRANSACTION_ROUTE, CREATE_TRANSACTION_ROUTE } from '../utils/constants';
import { createStyles } from 'antd-style';
import { apiClient } from '../lib/Api-client';


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
    width: 150,
  },
  {
    title: 'Person',
    dataIndex: 'userName',
    width: 150,
  },
  {
    title: 'Date of Issue',
    dataIndex: 'issueDate',
    width: 100,
  },
  {
    title: 'Date of Return',
    dataIndex: 'returnDate',
    width: 100,
  },
  {
    title: 'Total Rent',
    dataIndex: 'totalRent',
    width: 100,
  },

];


const Transactions = () => {
  const { userData, allbookData, transactionData } = useContext(DataContext)
  const { styles } = useStyle();
  const [User, setUser] = useState("");
  const [Book, setBook] = useState("");
  const [Date, setDate] = useState("");
  const onChange = (date, dateString) => {
    setDate(dateString)
    // console.log(date,  dateString);
  };

  const handleSubmit = async () => {   
    try {
      const response = await apiClient.put(CREATE_TRANSACTION_ROUTE, { bookName: Book, userName: User, issueDate: Date, returnDate: "" },
        {
          headers: {
            "Access-Control-Allow-Origin": 'http://localhost:5173',
          },
          withCredentials: true
        }
      );
      console.log(response)
      if (response.status === 200 ) {
        message.success("Transaction Created")
      }
      else if(response.status === 204){
        message.error("Book not available")
      }
    } catch (error) {
      console.log(error)
      message.error(error.response.data)
    }
  }

  const handleReturnSubmit = async()=>{
    try {
      const response = await apiClient.put(CREATE_RETURN_TRANSACTION_ROUTE, { bookName: Book, userName: User, returnDate: Date },
        {
          headers: {
            "Access-Control-Allow-Origin": 'http://localhost:5173',
          },
          withCredentials: true
        }
      );
      console.log(response)
      if (response.status === 201) {
        message.success("Return Transaction Created")
      }
      else if(response.status === 503){
        message.error("Book not available")
      }
      else{
        message.error("User or Entry does'nt exists")
      }
    } catch (error) {
      message.error(error.response.data)
      
    }
  }

  return (
    <div className='h-full  w-full'>
      <div className="flex w-5/6 flex-col p-10">
        <h1 className='text-5xl pb-10 text-black font-bold  font-myFont'>Transactions</h1>
        <Table
          className={styles.customTable}
          columns={columns}
          dataSource={transactionData}
          pagination={{
            pageSize: 10,
          }}
          scroll={{
            y: 55 * 5,
          }}
        />
        <div className="flex gap-4 py-8 sm:py-3 flex-col">
          <h1 className='text-xl sm:text-sm text-black  font-myFont'>Create a Entry with date of Issue<span className='text-sm text-gray-500'> ( Please provide Book Name, Person Name, Issued Date )</span></h1>
          <div className="flex gap-3 flex-wrap">
            <Select
              showSearch
              className='w-1/2 rounded-sm'
              placeholder="Select a book"
              optionFilterProp="label"
              onChange={(e) => setBook(e)}
              options={
                allbookData ? allbookData.map((user, i) => {
                  return { value: user.bookName, label: user.bookName, key: i }
                }) : ""
              }
            />
            {/* <Input placeholder='Person Name' className='w-1/2 rounded-none'/> */}
            <Select
              showSearch
              className='w-1/2 rounded-sm'
              placeholder="Select a person"
              optionFilterProp="label"
              onChange={(e) => setUser(e)}
              options={
                userData ? userData.map((user, i) => {
                  return { value: user.fullName, label: user.fullName, key: i }
                }) : ""
              }
            />
            <DatePicker className="" placeholder='Date of Issue' onChange={onChange} />

            <Button onClick={handleSubmit} className='bg-blue-950 text-white font-semibold' >Submit</Button>
          </div>
        </div>


        <div className="flex gap-4 py-8 sm:py-3 flex-col">
          <h1 className='text-xl sm:text-sm text-black  font-myFont'>Create a Entry with date of Return<span className='text-sm text-gray-500'> ( Please provide Book Name, Person Name, Return Date )</span></h1>
          <div className="flex gap-3 flex-wrap">
            <Select
              showSearch
              className='w-1/2 rounded-sm'
              placeholder="Select a book"
              optionFilterProp="label"
              onChange={(e) => setBook(e)}
              options={
                allbookData ? allbookData.map((user, i) => {
                  return { value: user.bookName, label: user.bookName, key: i }
                }) : ""
              }
            />
            {/* <Input placeholder='Person Name' className='w-1/2 rounded-none'/> */}
            <Select
              showSearch
              className='w-1/2 rounded-sm'
              placeholder="Select a person"
              optionFilterProp="label"
              onChange={(e) => setUser(e)}
              options={
                userData ? userData.map((user, i) => {
                  return { value: user.fullName, label: user.fullName, key: i }
                }) : ""
              }
            />
            <DatePicker className="" placeholder='Date of Issue' onChange={onChange} />

            <Button onClick={handleReturnSubmit} className='bg-blue-950 text-white font-semibold' >Submit</Button>
          </div>
        </div>

        <div className="flex gap-4 py-8 sm:py-3 flex-col">
          <h1 className='text-xl sm:text-sm text-black  font-myFont'>List of people who have issued book in the past <span className='text-sm text-gray-500'> ( Please provide Book Name )</span></h1>
          <div className="flex gap-3 flex-wrap">
            <Select
              showSearch
              className='w-1/2 rounded-sm'
              placeholder="Select a book"
              optionFilterProp="label"
              onChange={(e) => setBook(e)}
              options={
                allbookData ? allbookData.map((user, i) => {
                  return { value: user.bookName, label: user.bookName, key: i }
                }) : ""
              }
            />
            {/* <Input placeholder='Person Name' className='w-1/2 rounded-none'/> */}                        


            <Button onClick={handleReturnSubmit} className='bg-blue-950 text-white font-semibold' >Submit</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transactions
