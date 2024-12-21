import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { FaPenFancy, FaTrash } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Header from '../../../layout/header/Header';
import ParametrBar from '../../../layout/parametrBar/ParametrBar';
import style from './component.module.css';
import ComponentsUpdate from '../componentsUpdate/ComponentsUpdate';
import { AiOutlineBars } from "react-icons/ai";

const ComponentsPage = () => {
  const [deleteBox, setDeleteBox] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletedItems, setDeletedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isParametrBarVisible, setIsParametrBarVisible] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://restartbaku-001-site4.htempurl.com/api/Category/get-all-categories?LanguageCode=az&page=1&limit=10');
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
      const response = await axios.delete(`https://restartbaku-001-site4.htempurl.com/api/Category/delete-category/${categoryId}`);
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredDataList = dataList.filter(
    (item) =>
      item.categoryTitle.toLowerCase().includes(searchTerm) ||
      item.parentId?.toLowerCase().includes(searchTerm) ||
      item.categoryId.toString().includes(searchTerm)
  );

  const toggleParametrBar = () => {
    setIsParametrBarVisible(!isParametrBarVisible); 
  };

  return (
    <div className={style.componentsPage_container}>
        {isParametrBarVisible && <ParametrBar hideBar={() => setIsParametrBarVisible(false)} />}
      <div className={style.componentsPage_main}>
        <AiOutlineBars
          className={style.componentsPage_main_icon}
          onClick={toggleParametrBar}
        />
        <Header />
        <div className="container">
          <p className={style.componentsPage_title}>Kategoriyalar</p>
          <div className={style.componentsPage}>
            <div className={style.componentsPage_header}>
              <input
                className={style.componentsPage_header_input}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className={style.componentsPage_header_input_icon} />
              <button
                className={style.componentsPage_header_btn}
                onClick={() => navigate('/componentsAdd')}
              >
                <FaPlus /> Yeni kategoriya əlave et
              </button>
            </div>
            <div className={style.componentsPage_bottom}>
              <div className={style.componentsPage_bottom_header}>
                <th className={style.componentsPage_bottom_header_title}>Kategoriya İd-si</th>
                <th className={style.componentsPage_bottom_header_title}>Kategoriya başlığı</th>
                <th className={style.componentsPage_bottom_header_title}>Üst kategoriya adı</th>
                <th className={style.componentsPage_bottom_header_title}>Şəkil</th>
                <th className={style.componentsPage_bottom_header_title}>Dəyişiklık</th>
              </div>
              {loading ? (
                <h4>Loading categories...</h4>
              ) : (
                filteredDataList.map((item, index) => (
                  <div
                    key={`${item.categoryId}-${index}`}
                    className={style.componentsPage_bottom_main_container}
                  >
                    <div
                      className={`${style.componentsPage_bottom_main} ${deleteBox ? style.componentsPage_bottom_main_displayNone : ''}`}
                    >
                      <p className={style.componentsPage_bottom_main_productTitle}>{item.categoryId}</p>
                      <p className={style.componentsPage_bottom_main_productTitle}>{item.categoryTitle}</p>
                      <p className={style.componentsPage_bottom_main_productParentId}>{item.parentId || 'Yoxdur'}</p>
                      <div className={style.componentsPage_bottom_main_productImageBox}>
                        <img
                          src={item.categoryImage}
                          alt={item.categoryTitle}
                          className={style.componentsPage_bottom_main_productImage}
                        />
                      </div>
                      <div className={style.componentsPage_bottom_main_iconBox}>
                        <FaPenFancy
                          className={style.componentsPage_bottom_main_iconBox_icon}
                          onClick={() => handleEditClick(item)}
                        />
                        <FaTrash
                          className={style.componentsPage_bottom_main_iconBox_icon}
                          onClick={() => clickTrashBox(item.categoryId)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
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

export default ComponentsPage;
