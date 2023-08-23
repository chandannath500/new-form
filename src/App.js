import React, { useState } from 'react';
import { Button } from 'antd';
import FormPage from './components/FormPage';
import TablePage from './components/TablePage';
import './App.css';
import logo from './components/logo.jpeg'

const App = () => {
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [formDataList, setFormDataList] = useState([]);
  const [showCreateFormButton, setShowCreateFormButton] = useState(true);

  const handleFormSubmit = formData => {
    setFormDataList([...formDataList, formData]);
    localStorage.setItem('formData', JSON.stringify([...formDataList, formData]));
    setFormModalVisible(false);
    setShowCreateFormButton(false);
  };

  return (
    <div className="App">
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'black',
          padding: '10px 20px',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}>
          <img src={logo} alt="Logo" style={{ width: '40px', marginRight: '10px', height:'40px' }} />
          <div style={{ fontWeight: 'bold',fontSize: '45px' }}>EazyTaxes</div>
        </div>
        {showCreateFormButton && (
          <Button
            style={{
              fontSize: '20px',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              paddingBottom: '15px',
              background: 'black',
              color: 'white',
            }}
            onClick={() => setFormModalVisible(true)}
          >
            Create Form
          </Button>
        )}
      </nav>
      <FormPage
        visible={formModalVisible}
        onClose={() => setFormModalVisible(false)}
        onSubmit={handleFormSubmit}
      />
      {formDataList.length > 0 && <TablePage formDataList={formDataList} />}
    </div>
  );
};

export default App;
