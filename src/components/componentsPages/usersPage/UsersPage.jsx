import React, { useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { FaPenFancy, FaTrash } from 'react-icons/fa6';
import Header from '../../../layout/header/Header';
import style from './usersPage.module.css';
import { useNavigate } from 'react-router';
import ParametrBarModal from '../../../layout/parametrBar/ParametrBarModal';

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  return (
    <div className={style.componentsPage_container}>
      <Header />
      <div className="container">
        <p className={style.componentsPage_title}>Add Attribute</p>
        <div className={style.componentsPage}>
          <div className={style.componentsPage_header}>
            <input className={style.componentsPage_header_input} type="text" placeholder="Search..." />
            <FaSearch className={style.componentsPage_header_input_icon} />
            <button className={style.componentsPage_header_btn} onClick={() => navigate('/parametrAdd')}>
              <FaPlus /> Add New
            </button>
          </div>
          <div className={style.componentsPage_bottom}>
            <div className={style.componentsPage_bottom_header}>
              <p className={style.componentsPage_bottom_header_title}>Users</p>
              <p className={style.componentsPage_bottom_header_title}>Name</p>
              <p className={style.componentsPage_bottom_header_title}>SurName</p>
              <p className={style.componentsPage_bottom_header_title}>Gmail</p>
              <p className={style.componentsPage_bottom_header_title}>PassWord</p>
              <p className={style.componentsPage_bottom_header_title}>Actions</p>
            </div>
            <div className={style.componentsPage_bottom_main_container}>
              <div className={style.componentsPage_bottom_main}>
                <p className={style.componentsPage_bottom_main_productTitle}>55</p>
                <p className={style.componentsPage_bottom_main_productTitle}>lorek</p>
                <p className={style.componentsPage_bottom_main_productTitle}>lorem</p>
                <p className={style.componentsPage_bottom_main_productTitle}>lorem@gamil.com</p>
                <p className={style.componentsPage_bottom_main_productTitle}>55lorem15</p>
                <div className={style.componentsPage_bottom_main_iconBox}>
                  <FaPenFancy className={style.componentsPage_bottom_main_iconBox_icon} onClick={handleClickModal} />
                  <FaTrash className={style.componentsPage_bottom_main_iconBox_icon} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {isModalOpen && (
        <div className={style.modalOverlay}>
          <ParametrBarModal onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
};

export default UsersPage;