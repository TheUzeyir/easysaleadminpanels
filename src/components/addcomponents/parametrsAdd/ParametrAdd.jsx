import React, { useEffect, useState } from 'react';
import style from "./parametrAdd.module.css";
import Header from '../../../layout/header/Header';

const ParametrAdd = ({ id }) => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: 0,
    parameterTypeId: 0,
    isCategory: "Have", 
    parentParameterId: null,
    parameterLogo: '',
    languageId: 1,
    parameterTitle: ''
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://restartbaku-001-site4.htempurl.com/api/Category/get-all-categories`);
        const result = await response.json();
        setData(Array.isArray(result.data) ? result.data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    const fetchParameterTypes = async () => {
      try {
        const response = await fetch(`http://restartbaku-001-site4.htempurl.com/api/ParameterType/get-all-parameter-types`);
        const result = await response.json();
        setData1(Array.isArray(result.data) ? result.data : []);
      } catch (error) {
        console.error("Error fetching parameter types:", error);
      }
    };

    fetchCategories();
    fetchParameterTypes();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      categoryId: parseInt(formData.categoryId),
      parameterTypeId: parseInt(formData.parameterTypeId),
      isCategory: formData.isCategory === "Have" ? 1 : 0,
      parentParameterId: formData.parentParameterId ? parseInt(formData.parentParameterId) : null,
      parameterLogo: formData.parameterLogo,
      parameterTranslates: [
        {
          languageId: formData.languageId,
          parameterTitle: formData.parameterTitle
        }
      ]
    };

    console.log("Payload being sent:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(`http://restartbaku-001-site4.htempurl.com/api/Parameter/create-parameter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Parameter created successfully:", result);
    } catch (error) {
      console.error("Failed to create parameter:", error);
    }
  };

  return (
    <div className="componentsAdd_container">
      <Header />
      <div className="container">
        <div className={style.componentAdd}>
          <p className={style.componentAdd_title}>Add Parameter</p>
          <form className={style.componentAdd_form} onSubmit={handleSubmit}>
            <div className={style.componentAdd_header}>
              <label htmlFor="categorySelect">CategoryId *</label>
              <select name="categoryId" id="categorySelect" className={style.componentAdd_header_input} onChange={handleChange}>
                {data.length > 0 ? (
                  data.map((category) => (
                    <option key={category.categoryId} value={category.categoryId}>
                      {category.categoryTitle}
                    </option>
                  ))
                ) : (
                  <option value="">No categories available</option>
                )}
              </select>
            </div>
            <div className={style.componentAdd_header}>
              <label htmlFor="parameterTypeId">ParametrTypeId *</label>
              <select name="parameterTypeId" id="parameterTypeId" className={style.componentAdd_header_input} onChange={handleChange}>
                {data1.length > 0 ? (
                  data1.map((parameterType) => (
                    <option key={parameterType.parameterTypeId} value={parameterType.parameterTypeId}>
                      {parameterType.parameterTypeTitle}
                    </option>
                  ))
                ) : (
                  <option value="">No parameter types available</option>
                )}
              </select>
            </div>
            <div className={style.componentAdd_header}>
              <label htmlFor="isCategory">Is category *</label>
              <select name="isCategory" id="isCategory" className={style.componentAdd_header_input} onChange={handleChange}>
                <option value="Have">Have</option>
                <option value="Don't Have">Don't Have</option>
              </select>
            </div>
            <div className={style.componentAdd_header}>
              <label htmlFor="parentParameterId">ParametrId *</label>
              <input
                id="parentParameterId"
                name="parentParameterId"
                type="text"
                placeholder="Parent Parameter Id"
                className={style.componentAdd_header_input}
                onChange={handleChange}
              />
            </div>
            <div className={style.componentAdd_header}>
              <label htmlFor="parameterLogo">ParametrLogo *</label>
              <input
                id="parameterLogo"
                name="parameterLogo"
                type="text"
                placeholder="Parameter Logo"
                className={style.componentAdd_header_input}
                required
                onChange={handleChange}
              />
            </div>
            <div className={style.componentAdd_header}>
              <label htmlFor="languageId">LanguageId *</label>
              <select name="languageId" id="languageId" className={style.componentAdd_header_input} onChange={handleChange}>
                <option value={1}>English</option>
                <option value={1}>Azerbaijan</option>
                <option value={1}>Russian</option>
              </select>
            </div>
            <div className={style.componentAdd_header}>
              <label htmlFor="parameterTitle">ParametrTitle *</label>
              <input
                id="parameterTitle"
                name="parameterTitle"
                type="text"
                placeholder="Parameter Title"
                className={style.componentAdd_header_input}
                required
                onChange={handleChange}
              />
            </div>
            <div className={style.componentAdd_bottom}>
              <button type="submit" className={style.componentAdd_bottom_btn}>
                Create Parameter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ParametrAdd;