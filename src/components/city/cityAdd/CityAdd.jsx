import React, { useState, useEffect } from 'react';
import style from "./cityAdd.module.css";
import Header from '../../../layout/header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   
import { AiOutlineBars } from "react-icons/ai";
import ParametrBar from '../../../layout/parametrBar/ParametrBar';

const CityAdd = () => {
  const [title, setTitle] = useState('');
  const [orderWeight, setOrderWeight] = useState('0');
  const [cities, setCities] = useState([]); 
  const navigate = useNavigate();
  const [isParametrBarVisible, setIsParametrBarVisible] = useState(true); 

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://restartbaku-001-site4.htempurl.com/api/City/get-cities');
        setCities(response.data.data); 
      } catch (error) {
        console.error('Şəhərlər alınarkən xəta baş verdi:', error);
        toast.error('Şəhərlər alınarkən xəta baş verdi. Yenidən cəhd edin.');
      }
    };

    fetchCities();
  }, []); 

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      toast.error('Zəhmət olmasa bütün sahələri doldurun.');
      return;
    }

    const cityExists = cities.some(city => city.title.toLowerCase() === title.toLowerCase());
    if (cityExists) {
      toast.warn('Bu şəhər artıq əlavə edilib!');
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

      if (response.status === 200 || response.status === 201) {
        toast.success('Şəhər uğurla əlavə edildi!');
        setTitle('');
        setOrderWeight('0');
        const updatedCitiesResponse = await axios.get('https://restartbaku-001-site4.htempurl.com/api/City/get-cities');
        setCities(updatedCitiesResponse.data.data); 

        setTimeout(() => navigate(-1), 2000); 
      } else {
        toast.error('Şəhər əlavə etmək alınmadı. Yenidən cəhd edin.');
      }
    } catch (error) {
      console.error('Xəta baş verdi:', error);
      toast.error('Xəta baş verdi. Yenidən cəhd edin.');
    }
  };

  const toggleParametrBar = () => {
    setIsParametrBarVisible(!isParametrBarVisible); 
  };


  return (
    <div className={style.cityAdd_container}>
      {isParametrBarVisible && <ParametrBar hideBar={() => setIsParametrBarVisible(false)} />}
      <div className={style.cityAdd_main}>
      <AiOutlineBars
        className={style.cityAdd_main_icon}
        onClick={toggleParametrBar}
      />
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
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default CityAdd;
