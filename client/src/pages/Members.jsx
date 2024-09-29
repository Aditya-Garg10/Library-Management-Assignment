import React, { useContext } from 'react';
import { Table } from 'antd';
import { createStyles } from 'antd-style';
import { DataContext } from '../context/Context';

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
          }
        }
      }
    `,
  };
});
const columns = [
  {
    title: 'Name',
    dataIndex: 'fullName',
    width: 300,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 300,
  },
  {
    title: 'Contact Info',
    dataIndex: 'contactNo',
    width: 200,
  },
];

const Members = () => {
  const { styles } = useStyle();

  const dataSource = Array.from({
    length: 100,
  }).map((_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  }));
  
  const { userData  } = useContext(DataContext) 
  return (
    <div className='w-5/6 h-screen sm:w-full sm:h-full sm:p-5 p-20'>

<h1 className='text-3xl py-10 text-black font-semibold font-myFont'>Members Registered!</h1>

    <Table
      className={styles.customTable}
      columns={columns}
      dataSource={userData}
      pagination={{
        pageSize: 5,
      }}
      scroll={{
        y: 55 * 5,
      }}
    />
    </div>
  );
};
export default Members;