import React, { useState } from 'react';
import style from "./cityAdd.module.css";
import Header from '../../../layout/header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router';

const CityAdd = () => {
  const [title, setTitle] = useState('');
  const [orderWeight, setOrderWeight] = useState('0');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      setMessage('Zəhmət olmasa bütün sahələri doldurun.');
      return;
    }

    const payload = {
      title: title,
      orderWeight: parseInt(orderWeight, 10), 
    };

    try {
      const response = await axios.post(
        'https://restartbaku-001-site4.htempurl.com/api/City/add-city',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setMessage('Şəhər uğurla əlavə edildi!');
        setTitle('');
        setOrderWeight('0'); 
        navigate(-1); 
      } else {
        setMessage('Şəhər əlavə etmək alınmadı. Yenidən cəhd edin.');
      }
    } catch (error) {
      console.error('Xəta baş verdi:', error);
    }
  };

  return (
    <div className="cityAdd_container">
      <Header />
      <div className="container">
        <div className={style.cityAdd}>
          <p className={style.cityAdd_title}>Şəhər əlavə edin</p>
          <form onSubmit={handleFormSubmit}>
            <div className={style.cityAdd_header}>
              <p>Şəhərin adı *</p>
              <input
                type="text"
                placeholder="Şəhərin adını daxil edin"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={style.cityAdd_header_input}
                required
              />
            </div>
            <div className={style.cityAdd_header}>
              <p>Ölkə seçin *</p>
              <select
                value={orderWeight}
                onChange={(e) => setOrderWeight(e.target.value)}
                className={style.cityAdd_header_input}
                required
              >
                <option value="0">Azərbaycan</option>
                <option value="1">Türkiyə</option>
              </select>
            </div>
            <div className={style.cityAdd_bottom}>
              <button type="submit" className={style.cityAdd_bottom_btn}>
                Əlavə et
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CityAdd;
