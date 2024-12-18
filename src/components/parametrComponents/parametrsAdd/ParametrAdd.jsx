import React, { useEffect, useState } from 'react';
import style from "./parametrAdd.module.css";
import Header from '../../../layout/header/Header';

const ParametrAdd = ({ id }) => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: "",
    parameterTypeId: "",
    isCategory: "", 
    parentParameterId: "",
    parameterLogo: "",
    languageId: 1,
    parameterTitle: ""
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`https://restartbaku-001-site4.htempurl.com/api/Category/get-all-categories`);
        const result = await response.json();
        setData(Array.isArray(result.data) ? result.data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchParameterTypes = async () => {
      try {
        const response = await fetch(`https://restartbaku-001-site4.htempurl.com/api/ParameterType/get-all-parameter-types`);
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

    if (!formData.categoryId) {
      alert("Zəhmət olmasa Kateqoriyanı seçin.");
      return;
    }
    if (!formData.parameterTypeId) {
      alert("Zəhmət olmasa Parametr Tipini seçin.");
      return;
    }

    const payload = {
      categoryId: parseInt(formData.categoryId, 10),
      parameterTypeId: parseInt(formData.parameterTypeId, 10),
      isCategory: formData.isCategory === "Beli" ? 1 : 0,
      parentParameterId: formData.parentParameterId ? parseInt(formData.parentParameterId, 10) : null,
      parameterLogo: formData.parameterLogo,
      parameterTranslates: [
        {
          languageId: 1,
          parameterTitle: formData.parameterTitle
        }
      ]
    };
   
    console.log("Payload being sent:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(`https://restartbaku-001-site4.htempurl.com/api/Parameter/create-parameter`, {
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
      alert("Parameter uğurla əlavə edildi.");
    } catch (error) {
      console.error("Failed to create parameter:", error);
      alert("Parameter əlavə edilərkən xəta baş verdi.");
    }
  };

  return (
    <div className="componentsAdd_container">
      <Header />
      <div className="container">
        <div className={style.componentAdd}>
          <p className={style.componentAdd_title}>Parameter Əlavə edin</p>
          <form className={style.componentAdd_form} onSubmit={handleSubmit}>
            <div className={style.componentAdd_header}>
              <label htmlFor="categorySelect">Kategoriyanı seçin *</label>
              <select
                name="categoryId"
                id="categorySelect"
                className={style.componentAdd_header_input}
                onChange={handleChange}
                value={formData.categoryId}
              >
                <option value="" disabled>
                  --Kateqoriyanı seçin--
                </option>
                {data.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.componentAdd_header}>
              <label htmlFor="parameterTypeId">Parameterin Tipini təyin edin *</label>
              <select
                name="parameterTypeId"
                id="parameterTypeId"
                className={style.componentAdd_header_input}
                onChange={handleChange}
                value={formData.parameterTypeId}
              >
                <option value="" disabled>
                  --Parametr Tipini Seçin--
                </option>
                {data1.map((parameterType) => (
                  <option key={parameterType.parameterTypeId} value={parameterType.parameterTypeId}>
                    {parameterType.parameterTypeTitle}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.componentAdd_header}>
              <label htmlFor="isCategory">Parameteriniz globaldırmı? *</label>
              <select
                name="isCategory"
                id="isCategory"
                className={style.componentAdd_header_input}
                onChange={handleChange}
                value={formData.isCategory}
              >
                <option value="" disabled>
                  --Global parametr seçin--
                </option>
                <option value="Beli">Bəli</option>
                <option value="Xeyir">Xeyir</option>
              </select>
            </div>
            <div className={style.componentAdd_header}>
              <label htmlFor="parentParameterId">ParametrId *</label>
              <input
                id="parentParameterId"
                name="parentParameterId"
                type="text"
                placeholder="Bunu həmişə null daxil edin"
                className={style.componentAdd_header_input}
                onChange={handleChange}
                value={formData.parentParameterId}
              />
            </div>
            <div className={style.componentAdd_header}>
              <label htmlFor="parameterLogo">Parameter üçün link daxil edin *</label>
              <input
                id="parameterLogo"
                name="parameterLogo"
                type="text"
                placeholder="Parameter ünvanı"
                className={style.componentAdd_header_input}
                required
                onChange={handleChange}
                value={formData.parameterLogo}
              />
            </div>
            <div className={style.componentAdd_header}>
              <label htmlFor="languageId">Dili seçin *</label>
              <select
                name="languageId"
                id="languageId"
                className={style.componentAdd_header_input}
                onChange={handleChange}
                value={formData.languageId}
              >
                <option value={1}>English</option>
                <option value={2}>Azerbaijan</option>
                <option value={3}>Russian</option>
              </select>
            </div>
            <div className={style.componentAdd_header}>
              <label htmlFor="parameterTitle">Parameter başlığı daxil edin *</label>
              <input
                id="parameterTitle"
                name="parameterTitle"
                type="text"
                placeholder="Parameter başlığı "
                className={style.componentAdd_header_input}
                required
                onChange={handleChange}
                value={formData.parameterTitle}
              />
            </div>
            <div className={style.componentAdd_bottom}>
              <button type="submit" className={style.componentAdd_bottom_btn}>
                Parameter Əlavə et
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ParametrAdd;
