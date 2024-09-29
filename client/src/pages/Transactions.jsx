import React, { useContext, useEffect, useState } from 'react';
import { Button, DatePicker, Input, Select, Space, Table, message } from 'antd';
import { DataContext } from '../context/Context';
import { BOOKS_ISSUED_TO_PERSON, BOOK_TOTAL_RENT, CREATE_RETURN_TRANSACTION_ROUTE, CREATE_TRANSACTION_ROUTE, ENTRIES_BTW_DATE_RANGE, GET_PERSONS_BOOKS } from '../utils/constants';
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
    dataIndex: "bookName",
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

const columns2 = [
  {
    title: 'Books',    
    width: 150,
  },

];

const columns3 = [
  {
    title: 'Book', 
    dataIndex:"bookName",   
    width: 200,
    
  },
  {
    title: 'Person', 
    dataIndex:"userName",   
    width: 200,
    
  },
];

const Transactions = () => {
  const { userData, allbookData, transactionData, personList, setPersonList } = useContext(DataContext)
  const { styles } = useStyle();
  const [User, setUser] = useState("");
  const [Book, setBook] = useState("");
  const [Date, setDate] = useState("");
  const [startDate, setstartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [ListOfBooks, setListOfBooks] = useState([]);
  const [DateRangeData, setDateRangeData] = useState([]);
  const onChange = (date, dateString) => {
    setDate(dateString)
    
    // console.log(date,  dateString);
  };

  const handleStartOnchange = (date, dateString) => {
    setstartDate(dateString)    
    // console.log(date,  dateString);
  };
  const handleEndDate = (date, dateString) => {
    setEndDate(dateString)    
    // console.log(date,  dateString);
  };
  const handleSubmit = async () => {
    try {
      const response = await apiClient.put(CREATE_TRANSACTION_ROUTE, { bookName: Book, userName: User, issueDate: Date, returnDate: "" },
        {
          headers: {
            "Access-Control-Allow-Origin": '*',
          },
          withCredentials: true
        }
      );
      console.log(response)
      if (response.status === 200) {
        message.success("Transaction Created")
      }
      else if (response.status === 204) {
        message.error("Book not available")
      }
    } catch (error) {
      console.log(error)
      message.error(error.response.data)
    }
  }

  const handleReturnSubmit = async () => {
    try {
      const response = await apiClient.put(CREATE_RETURN_TRANSACTION_ROUTE, { bookName: Book, userName: User, returnDate: Date },
        {
          headers: {
            "Access-Control-Allow-Origin": '*',
          },
          withCredentials: true
        }
      );
      console.log(response)
      if (response.status === 201) {
        message.success("Return Transaction Created")
      }
      else if (response.status === 503) {
        message.error("Book not available")
      }
      else {
        message.error("User or Entry does'nt exists")
      }
    } catch (error) {
      message.error(error.response.data)

    }
  }

  const [totalRentByBook, settotalRentByBook] = useState(null);
  const handleBookDetailSubmit = async () => {
    try {
      const response = await apiClient.post(GET_PERSONS_BOOKS, { bookName: Book },

        {
          headers: {
            "Access-Control-Allow-Origin": '*',
          },
          withCredentials: true
        }
      );


      if (response.status === 200) {
        message.success("Details Fetched")
        setPersonList(response.data)
      }
      else if (response.status === 204) {
        message.error("Book not available")
      }
      else {
        message.error("User or Entry does'nt exists")
      }

      const response2 = await apiClient.post(BOOK_TOTAL_RENT, { bookName: Book })

      if (response2.status === 200) {
        settotalRentByBook(response2.data)
      }
    } catch (error) {
      message.error(error.response.data)

    }
  }

  const handleBookPersonSubmit = async() =>{
    try {
      const response = await apiClient.post(BOOKS_ISSUED_TO_PERSON, { bookName: Book, userName: User, returnDate: Date },
        {
          headers: {
            "Access-Control-Allow-Origin": '*',
          },
          withCredentials: true
        }
      );
      if (response.status === 200) {
        setListOfBooks(response.data);
        message.success("Users Fetched")
      }
      else if (response.status === 503) {
        message.error("Book not available")
      }
      else {
        message.error("User or Entry does'nt exists")
      }
    } catch (error) {
      message.error(error.response.data)

    }
  }

  const handleDateRangeSubmit = async() =>{

    try {
      const response = await apiClient.post(ENTRIES_BTW_DATE_RANGE, { startDate,endDate:EndDate },
        {
          headers: {
            "Access-Control-Allow-Origin": '*',
          },
          withCredentials: true
        }
      );
      if (response.status === 200) {
        setDateRangeData(response.data.entries);
        message.success("Entries Fetched")
      }
      else if (response.status === 503) {
        message.error("Empty")
      }
      else {
        message.error("Empty")
      }
    } catch (error) {
      message.error(error.response.data)

    }
  }

  useEffect(()=>{
    console.log(DateRangeData)
  })

  return (
    <div className='h-full  w-full'>
      <div className="flex sm:w-full w-5/6 flex-col p-10">
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


            <Button onClick={handleBookDetailSubmit} className='bg-blue-950 text-white font-semibold' >Submit</Button>
          </div>
          {personList ? <div className="flex gap-3 w-full flex-col flex-wrap">
            <div className="flex justify-center items-start border-solid border-1 border-black rounded-md  flex-col">
              <h1 className='font-semibold text-center bg-gray-100 py-2  w-1/2 sm:w-full h-full p-0'>Users</h1>
              {personList ? personList.users.map((user, i) => {
                return <p key={i} className='p-2'>{i + 1}. {user}</p>
              }) : ""}
            </div>

            <div className="flex gap-10 p-3 bg-gray-100 justify-center sm:flex-col sm:bg-transparent">
              <div className="flex h-full flex-row justify-start items-center border-solid border-1 border-black rounded-md gap-3">
                <h1 className='font-semibold '>Total Persons:</h1>
                <p>{personList ? personList.totalCount : ""}</p>
              </div>

              <div className="flex h-full flex-row justify-start items-center border-solid border-1 border-black rounded-md gap-3">
                <h1 className='font-semibold text-center '>Active User:</h1>
                <p>{personList ? personList.activeUser : "0"}</p>
              </div>

              <div className="flex h-full flex-row justify-start items-center border-solid border-1 border-black rounded-md gap-3">
                <h1 className='font-semibold text-center '>Total Rent:</h1>
                <p>{totalRentByBook ? totalRentByBook.total_rent : ""}</p>
              </div>
            </div>



          </div> : ""}

        </div>


        <div className="flex gap-4 py-8 sm:py-3 flex-col">
          <h1 className='text-xl sm:text-sm text-black  font-myFont'>List of Books issued to a Person <span className='text-sm text-gray-500'> ( Please provide User Name )</span></h1>
          <div className="flex gap-3 flex-wrap">
            <Select
              showSearch
              className='w-1/2 rounded-sm'
              placeholder="Select a book"
              optionFilterProp="label"
              onChange={(e) => setUser(e)}
              options={
                userData ? userData.map((user, i) => {
                  return { value: user.fullName, label: user.fullName, key: i }
                }) : ""
              }
            />
            {/* <Input placeholder='Person Name' className='w-1/2 rounded-none'/> */}


            <Button onClick={handleBookPersonSubmit} className='bg-blue-950 text-white font-semibold' >Submit</Button>
          </div>
          <Table
          className={styles.customTable} 
          columns={columns2}         
          dataSource={ListOfBooks.map((book)=>{
            return book;
          })}
          pagination={{
            pageSize: 10,
          }}
          scroll={{
            y: 55 * 5,
          }}
        />

        </div>


        <div className="flex gap-4 py-8 sm:py-3 flex-col">
          <h1 className='text-xl sm:text-sm text-black  font-myFont'>List of Books between Date Range <span className='text-sm text-gray-500'> ( Please provide Date Range )</span></h1>
          <div className="flex gap-3 flex-wrap">
          <DatePicker className="" placeholder='Starting Date' onChange={handleStartOnchange} />
          <DatePicker className="" placeholder='Ending Date' onChange={handleEndDate} />
            {/* <Input placeholder='Person Name' className='w-1/2 rounded-none'/> */}


            <Button onClick={handleDateRangeSubmit} className='bg-blue-950 text-white font-semibold' >Submit</Button>
          </div>
          <Table
          className={styles.customTable} 
          columns={columns3}         
          dataSource={DateRangeData}
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
  )
}

export default Transactions
