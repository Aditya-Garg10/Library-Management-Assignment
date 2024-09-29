import React, { useContext, useEffect } from 'react'
import { MdBook } from 'react-icons/md'
import { GiBlackBook } from "react-icons/gi";
import { FaUserGroup, FaUserPlus } from 'react-icons/fa6';
import { GrHelpBook } from "react-icons/gr";
import { PieChart } from '@mui/x-charts/PieChart';
// import {  Label, Pie, PieChart } from 'recharts'
import { DataContext } from '../context/Context';
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


const Dashboard = () => {
  const { allbookData  } = useContext(DataContext); 
  const { styles } = useStyle();
const columns = [
  {
    title: 'Books',
    dataIndex: "bookName",
    width: 150,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    width: 150,
  },
  {
    title: 'Rent for the Day',
    dataIndex: 'rentPerDay',
    width: 200,
  }, 
  {
    title: 'Last Modified',
    dataIndex: 'updatedAt',        
    width: 200,
  },

];
  return (
    <>
      <div className='p-10 h-auto sm:w-full w-5/6 '>
        <h1 className='text-4xl sm:text-xl  font-semibold font-myFont'>Dashboard</h1>
        <div className='flex p-10 sm:flex-row   w-full flex-col '>
          <div className="flex gap-5 flex-row sm:hidden bg-[#eeeeee]  w-full h-[15vh] justify-evenly items-center">
            <div className="flex justify-center items-center gap-3">
              <div className='bg-[#2b2be8] p-4  rounded-full'>
                <GiBlackBook className='text-2xl   sm:text-xl  text-white' />
              </div>
              <div className="flex flex-col">
                <h1 className='text-sm font-myFont'>Borrowed</h1>
                <h1 className='text-xl font-bold'>142</h1>
              </div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <div className='bg-[#2b2be8] p-4  rounded-full'>
                <GrHelpBook className='text-2xl  sm:text-xl  text-white' />
              </div>
              <div className="flex flex-col">
                <h1 className='text-sm font-myFont'>Overdue</h1>
                <h1 className='text-xl font-bold'>8</h1>
              </div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <div className='bg-[#2b2be8] p-4  rounded-full'>
                <FaUserGroup className='text-2xl   sm:text-xl  text-white' />
              </div>
              <div className="flex flex-col">
                <h1 className='text-sm font-myFont'>Visitors</h1>
                <h1 className='text-xl font-bold'>532</h1>
              </div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <div className='bg-[#2b2be8] p-4 rounded-full'>
                <FaUserPlus className='text-2xl   sm:text-xl text-white' />
              </div>
              <div className="flex  flex-col">
                <h1 className='text-sm  text-wrap  font-myFont'>New Member</h1>
                <h1 className='text-xl font-bold'>42</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full items-center justify-center">
          {/* <Label value="Pages of my website" offset={0} position="insideBottom" />
          <PieChart height={600} width={800}>
            <Pie data={allbookData} dataKey="rentPerDay" label="category" nameKey="category" cx="50%" cy="50%" outerRadius={200} fill="blue" />            
          </PieChart> */}
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'The Great Adventure ' },
                  { id: 1, value: 15, label: 'The Haunted Mansion' },
                  { id: 2, value: 20, label: 'Treasure Island Quest' },
                ],
              },
            ]}            
            colors={["#D1E751","#000000","#4DBCE9","#26ADE4"]}
            width={700}
            height={300}
          />

        </div>
        <div className="flex flex-col">
          <div>
            <h1 className='text-3xl font-semibold font-myFont py-5'>Books Available!</h1>
          </div>
          <div className='w-full sm:w-full sm:h-full sm:p-5 py-10 px-20'>
      
    <Table
      className={styles.customTable}
      columns={columns}
      dataSource={allbookData ? allbookData : ""}
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
    </>
  )
}

export default Dashboard
