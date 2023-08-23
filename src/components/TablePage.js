import React, { useState, useEffect } from 'react';
import { Table, Button, Input } from 'antd';

const TablePage = ({ formDataList }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData')) || [];
    setData(storedData);
  }, []);

  const handleChildrenButtonClick = (record) => {
    const newData = data.map(item => {
      if (item.key === record.key) {
        return {
          ...item,
          childrenToggle: !item.childrenToggle,
          numberOfChildren: !item.childrenToggle && record.maritalStatus === 'Married' ? item.numberOfChildren : undefined,
        };
      }
      return item;
    });
    setData(newData);
  };

  const handleDependenciesButtonClick = (record) => {
    const newData = data.map(item => {
      if (item.key === record.key) {
        return {
          ...item,
          dependenciesToggle: !item.dependenciesToggle,
          nameOfDependencies: !item.dependenciesToggle && record.maritalStatus === 'Unmarried' ? item.nameOfDependencies : undefined,
        };
      }
      return item;
    });
    setData(newData);
  };

  const handleNumberOfChildrenChange = (key, value) => {
    const newData = data.map(item => {
      if (item.key === key) {
        return { ...item, numberOfChildren: value.replace(/\D/g, '') };
      }
      return item;
    });

    setData(newData);
  };

  const handleNameOfDependenciesChange = (key, value) => {
    const newData = data.map(item => {
      if (item.key === key) {
        return { ...item, nameOfDependencies: value.replace(/\d/g, '') }; 
      }
      return item;
    });

    setData(newData);
  };

  const columns = [
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'SSN No.', dataIndex: 'ssn', key: 'ssn' },
    { title: 'Marital Status', dataIndex: 'maritalStatus', key: 'maritalStatus' },
    {
      title: data.some(item => item.maritalStatus === 'Married') ? 'Children?' : '',
      dataIndex: 'children',
      key: 'children',
      render: (children, record) => (
        record.maritalStatus === 'Married' && (
          <Button
            type="primary"
            style={{
              background: 'none',
              border: '1px solid black', // Added border style for visibility
              borderRadius: 2,
              boxShadow: 'none',
              color: 'black',              
            }}     
            onClick={() => handleChildrenButtonClick(record)}
          >
            {record.childrenToggle ? 'Click if No' : 'Click if Yes'}
          </Button>
        )
      ),
    },
    {
      title: data.some(item => item.childrenToggle) && data.some(item => item.maritalStatus === 'Married') ? 'Number of Children' : '',
      dataIndex: 'numberOfChildren',
      key: 'numberOfChildren',
      render: (numberOfChildren, record) =>
        record.childrenToggle && record.maritalStatus === 'Married' ? (
          <Input
            value={numberOfChildren}
            onChange={e => handleNumberOfChildrenChange(record.key, e.target.value)}
          />
        ) : null,
    },
    {
      title: data.some(item => item.maritalStatus === 'Unmarried') ? 'Dependencies?' : '',
      dataIndex: 'dependencies',
      key: 'dependencies',
      render: (dependencies, record) => (
        record.maritalStatus === 'Unmarried' && (
          <Button
            type="primary"
            style={{
              background: 'none',
              border: '1px solid black', // Added border style for visibility
              borderRadius: 2,
              boxShadow: 'none',
              color: 'black',              
            }}          
            onClick={() => handleDependenciesButtonClick(record)}
          >
            {record.dependenciesToggle ? 'Click if No' : 'Click if Yes'}
          </Button>
        )
      ),
    },
    {
      title: data.some(item => item.dependenciesToggle) && data.some(item => item.maritalStatus === 'Unmarried') ? 'Name of Dependencies' : '',
      dataIndex: 'nameOfDependencies',
      key: 'nameOfDependencies',
      render: (nameOfDependencies, record) =>
        record.dependenciesToggle && record.maritalStatus === 'Unmarried' ? (
          <Input
            value={nameOfDependencies}
            onChange={e => handleNameOfDependenciesChange(record.key, e.target.value)}
          />
        ) : null,
    },
  ];

  return (
    <div>
      <h2>Submitted Form Data</h2>
      <Table dataSource={data} columns={columns} rowKey="key" pagination={false} />
    </div>
  );
};

export default TablePage;
