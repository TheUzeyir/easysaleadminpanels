import React, { useState, useEffect } from 'react';
import style from './componentsAdd.module.css';
import Header from '../../../layout/header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router';

const ComponentsAdd = () => {
  const [parentId, setParentId] = useState(''); // Selected parent category ID
  const [categoryTitle, setCategoryTitle] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('az');
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    setParentId(event.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!categoryTitle || !imageBase64) {
      setMessage('Please fill all fields and provide a valid base64 image string.');
      return;
    }

    const payload = {
      parentId: parentId === '' ? null : parseInt(parentId),
      categoryImage: imageBase64,
      categoryTranslates: [
        {
          languageId: language === 'az' ? 1 : language === 'ru' ? 2 : 3,
          categoryTitle: categoryTitle,
        },
      ],
    };

    try {
      const response = await axios.post(
        'https://restartbaku-001-site4.htempurl.com/api/Category/create-category',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        alert('Uğurlu şəkildə kategoriya əlavə edildi!');
        navigate('/category');
      } else {
        setMessage('Failed to create category. Please try again.');
      }
    } catch (error) {
      console.error('Error occurred while creating category:', error);
      setMessage(`An error occurred: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await fetch('https://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=1');
        const data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error('Hata oluştu:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="componentsAdd_container">
      <Header />
      <div className="container">
        <div className={style.componentAdd}>
          <p className={style.componentAdd_title}>Kategoriya əlavə edin</p>
          <form onSubmit={handleFormSubmit}>
            <div className={style.componentAdd_header}>
              <p>Üst Kategoriyanı seçin *</p>
              <select
                value={parentId}
                onChange={handleCategoryChange}
                className={style.componentAdd_header_input}
                disabled={loadingCategories}
              >
                <option value="">Null</option>
                {loadingCategories ? (
                  <option disabled>Yüklənir...</option>
                ) : (
                  categories.map((category) => (
                    <option key={category.categoryId} value={category.categoryId}>
                      {category.categoryTitle}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className={style.componentAdd_header}>
              <p>Dil seçin *</p>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={style.componentAdd_header_input}
              >
                <option value="az">Azərbaycanca</option>
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            </div>
            <div className={style.componentAdd_header}>
              <p>Kategoriya başlığı *</p>
              <input
                type="text"
                placeholder="Kategoriya başlığı"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                className={style.componentAdd_header_input}
                required
              />
            </div>
            <div className={style.componentAdd_main}>
              <p className={style.componentAdd_main_title}>Şəkilin ünvanı *</p>
              <textarea
                placeholder="Şəkilin linkin daxil edin..."
                value={imageBase64}
                onChange={(e) => setImageBase64(e.target.value)}
                className={style.componentAdd_main_textarea}
                required
              />
            </div>
            <div className={style.componentAdd_bottom}>
              <button type="submit" className={style.componentAdd_bottom_btn}>
                Əlavə et
              </button>
            </div>
            {message && <p className={style.componentAdd_message}>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComponentsAdd;
