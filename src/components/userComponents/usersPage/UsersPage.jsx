import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { FaPenFancy, FaTrash } from 'react-icons/fa6';
import Header from '../../../layout/header/Header';
import style from './usersPage.module.css';
import { useNavigate } from 'react-router';
import { AiOutlineBars } from "react-icons/ai";
import ParametrBar from '../../../layout/parametrBar/ParametrBar';
import ParametrBarModal from '../../../layout/parametrBar/ParametrBarModal';

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
      const [isParametrBarVisible, setIsParametrBarVisible] = useState(false); 

  const navigate = useNavigate();

  const handleCloseModal = () => { 
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://restartbaku-001-site4.htempurl.com/api/User/get-site-users');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`https://restartbaku-001-site4.htempurl.com/api/User/delete-user/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== id));
      alert('İstifadəçi uğurla silindi!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('İstifadəçini silmək mümkün olmadı.');
    }
  };

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userLastName.toLowerCase().includes(searchTerm.toLowerCase())
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
          <p className={style.componentsPage_title}>Istifadəçilər</p>
          <div className={style.componentsPage}>
            <div className={style.componentsPage_header}>
              <input
                className={style.componentsPage_header_input}
                type="text"
                placeholder="Axtarış..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className={style.componentsPage_header_input_icon} />
            </div>
            <div className={style.componentsPage_bottom}>
              <div className={style.componentsPage_bottom_header}>
                <p className={style.componentsPage_bottom_header_title}>ID</p>
                <p className={style.componentsPage_bottom_header_title}>İstifadəçi Adı</p>
                <p className={style.componentsPage_bottom_header_title}>İstifadəçinin Adı</p>
                <p className={style.componentsPage_bottom_header_title}>İstifadəçinin Soyadı</p>
                <p className={style.componentsPage_bottom_header_title}>E-Poçt</p>
                <p className={style.componentsPage_bottom_header_title}>Dəyişiklər</p>
              </div>
              <div className={style.componentsPage_bottom_main_container}>
                {filteredUsers.map((user) => (
                  <div key={user.userId} className={style.componentsPage_bottom_main}>
                    <p className={style.componentsPage_bottom_main_productTitle}>{user.userId}</p>
                    <p className={style.componentsPage_bottom_main_productTitle}>{user.userName}</p>
                    <p className={style.componentsPage_bottom_main_productTitle}>{user.userFirstName}</p>
                    <p className={style.componentsPage_bottom_main_productTitle}>{user.userLastName}</p>
                    <p className={style.componentsPage_bottom_main_productTitle}>{user.userEmail}</p>
                    <div className={style.componentsPage_bottom_main_iconBox}>
                      <FaTrash
                        className={style.componentsPage_bottom_main_iconBox_icon}
                        onClick={() => handleDeleteUser(user.userId)}
                      />
                    </div>
                  </div>
                ))}
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
