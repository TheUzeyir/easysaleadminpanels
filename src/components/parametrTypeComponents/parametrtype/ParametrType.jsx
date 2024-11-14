import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Header from '../../../layout/header/Header';
import style from './parametrType.module.css';
import ComponentsUpdate from '../../categoryComonents/componentsUpdate/ComponentsUpdate';
import { useNavigate } from 'react-router';
const ParametrType = () => {
  const [deleteBox, setDeleteBox] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate=useNavigate()
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://restartbaku-001-site4.htempurl.com/api/ParameterType/get-all-parameter-types');
      const { data } = response.data;
      if (Array.isArray(data)) {
        const filteredData = data.filter((item) => !deletedItems.includes(item.categoryId));
        setDataList(filteredData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const clickTrashBox = async (categoryId) => {
    try {
      const response = await axios.delete(`http://restartbaku-001-site4.htempurl.com/api/Category/delete-category/${categoryId}`);
      if (response.data.isSuccessful) {
        setDataList((prevDataList) => prevDataList.filter((item) => item.categoryId !== categoryId));
        setDeletedItems((prevDeletedItems) => [...prevDeletedItems, categoryId]); 
        alert('Category deleted successfully!');
      } else {
        console.error('Failed to delete the category:', response.data);
        alert('Failed to delete category.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response from server:', error.response.data);
        alert(`Error deleting category: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('No response from server:', error.request);
        alert('No response from server. Please try again later.');
      } else {
        console.error('Error setting up request:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleEditClick = (item) => {
    setSelectedItem(item); 
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setSelectedItem(null); 
    setIsModalOpen(false); 
  };

  const handleUpdateSuccess = (updatedItem) => {
    setDataList((prevDataList) => 
      prevDataList.map(item => 
        item.categoryId === updatedItem.categoryId ? updatedItem : item
      )
    ); 
    handleCloseModal(); 
  };

  return (
    <div className={style.componentsPage_container}>
      <Header />
      <div className="container">
        <p className={style.componentsPage_title}>Add Attribute</p>
        <div className={style.componentsPage}>
          <div className={style.componentsPage_header}>
            <input className={style.componentsPage_header_input} type="text" placeholder="Search..." />
            <FaSearch className={style.componentsPage_header_input_icon} />
            <button className={style.componentsPage_header_btn} onClick={() => navigate('/componentsAdd')}>
              <FaPlus /> Add New
            </button>
          </div>
          <div className={style.componentsPage_bottom}>
            <div className={style.componentsPage_bottom_header}>
              <p className={style.componentsPage_bottom_header_title}>parameterTypeId</p>
              <p className={style.componentsPage_bottom_header_title}>parameterTypeTitle</p>
              <p className={style.componentsPage_bottom_header_title}>parameterTypeStatus</p>
              <p className={style.componentsPage_bottom_header_title}>parameterTypeWeight</p>
            </div>
            {loading ? (
              <h4>Loading categories...</h4>
            ) : (
              dataList.map((item, index) => (
                <div key={`${item.categoryId}-${index}`} className={style.componentsPage_bottom_main_container}>
                  <div className={`${style.componentsPage_bottom_main} ${deleteBox ? style.componentsPage_bottom_main_displayNone : ""}`}>
                    <span className={style.componentsPage_bottom_main_productTitle_typeID}>{item.parameterTypeId || 'N/A'}</span>
                    <span className={style.componentsPage_bottom_main_productTitle_typeTitle}>{item.parameterTypeTitle || 'N/A'}</span>
                    <span className={style.componentsPage_bottom_main_productTitle_typeStatus}>{item.parameterTypeStatus || 'N/A'}</span>
                    <span className={style.componentsPage_bottom_main_productTitle_typeWeight}>{item.parameterTypeWeight || 'N/A'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {isModalOpen && selectedItem && (
        <div className={style.modalOverlay}>
          <ComponentsUpdate 
            item={selectedItem} 
            onUpdateSuccess={handleUpdateSuccess}
            onClose={handleCloseModal}                    
          />
        </div>
      )}
    </div>
  );
};

export default ParametrType;