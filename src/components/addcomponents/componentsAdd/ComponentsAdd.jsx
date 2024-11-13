import React, { useState } from 'react';
import style from "./componentsAdd.module.css";
import Header from '../../../layout/header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router';

const ComponentsAdd = () => {
  const [parentId, setParentId] = useState('');  // Use empty string initially
  const [categoryTitle, setCategoryTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('az'); // Language selection
  const navigate=useNavigate()

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file && file.type.startsWith('image/')) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    

    if (!categoryTitle || !selectedFile) {
      setMessage('Please fill all fields and upload a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;

      const payload = {
        parentId: parentId === '' ? null : parseInt(parentId), // Send null if parentId is empty
        categoryImage: base64String,
        categoryTranslates: [
          {
            languageId: 1, // Always sending language ID as 1
            categoryTitle: categoryTitle,
          },
        ],
      };

      try {
        const response = await axios.post(
          'http://restartbaku-001-site4.htempurl.com/api/Category/create-category',
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          setMessage('Category created successfully!');
          setParentId('');
          setCategoryTitle('');
          setSelectedFile(null);
          setPreviewUrl(null);
        } else {
          setMessage('Failed to create category. Please try again.');
        }
      } catch (error) {
        console.error('Error occurred while creating category:', error);
        setMessage(`An error occurred: ${error.message}`);
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="componentsAdd_container">
      <Header />
      <div className="container">
        <div className={style.componentAdd}>
          <p className={style.componentAdd_title}>Add Category</p>
          <form onSubmit={handleFormSubmit}>
            <div className={style.componentAdd_header}>
              <p>Parent Id *</p>
              <select
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                className={style.componentAdd_header_input}
              >
                <option value="">null</option>
              </select>
            </div>
            <div className={style.componentAdd_header}>
              <p>Language *</p>
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
              <p>Category Title *</p>
              <input
                type="text"
                placeholder="Category Title"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                className={style.componentAdd_header_input}
                required
              />
            </div>
            <div className={style.componentAdd_main}>
              <p className={style.componentAdd_main_title}>Upload Image *</p>
              <div className={style.componentAdd_main_uploadBox}>
                <input 
                  type="file" 
                  onChange={handleFileChange} 
                  className={style.componentAdd_main_input} 
                  accept="image/*" 
                />
                {previewUrl && <img className={style.componentAdd_main_img} src={previewUrl} alt="Selected File" />}
              </div>
            </div>
            <div className={style.componentAdd_bottom}>
              <button type="submit" className={style.componentAdd_bottom_btn} onClick={()=>navigate(-1)}>
                Create Category
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
