import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './componentsUpdate.module.css';
import { IoClose } from "react-icons/io5";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children; 
  }
}

const ComponentsUpdate = ({ item, onUpdateSuccess, onClose }) => {
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryTranslateId, setCategoryTranslateId] = useState(0);
  const [categoryTranslations, setCategoryTranslations] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeLanguage, setActiveLanguage] = useState('az'); // default language is Azerbaijani

  const languages = ['az', 'ru', 'en']; // Azerbaijani, Russian, English

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!item || !item.categoryId) return;

      setLoading(true);

      try {
        const response = await axios.get(
          `https://restartbaku-001-site4.htempurl.com/api/Category/get-category/${item.categoryId}`
        );
        const data = response.data.data;
        console.log(data);

        setCategoryId(data.categoryId || ''); 
        setCategoryTranslations(data.categoryTranslates || []); 
        const translateData = data.categoryTranslates && data.categoryTranslates.length > 0
          ? data.categoryTranslates.find(trans => trans.languageId === getLanguageId(activeLanguage))
          : null;

        if (translateData) {
          setCategoryTitle(translateData.categoryTitle);
          setCategoryTranslateId(translateData.categoryTranslateId);
        }
        
      } catch (error) {
        console.error("Error fetching category data:", error);
        setError('Failed to load category data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [item, activeLanguage]);

  const getLanguageId = (lang) => {
    switch (lang) {
      case 'az': return 1; // Azerbaijani language ID
      case 'ru': return 2; // Russian language ID
      case 'en': return 3; // English language ID
      default: return 1; // Default to Azerbaijani
    }
  };

  const handleUpdate = async () => {
    if (!categoryTitle.trim() || !categoryId) {
      alert('Category title and Category ID are required');
      return;
    }

    const updatedData = {
      categoryId: categoryId,
      parentId: null,
      categoryTranslates: categoryTranslations.map(trans => 
        trans.languageId === getLanguageId(activeLanguage)
          ? { ...trans, categoryTitle: categoryTitle.trim() }
          : trans
      ),
    };

    try {
      setIsSaving(true);
      const response = await axios.post(
        `https://restartbaku-001-site4.htempurl.com/api/Category/update-category`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.isSuccessful) {
        alert('Category updated successfully!');
        onUpdateSuccess({ ...updatedData, categoryTitle: categoryTitle.trim() });
      } else {
        setError('Failed to update the category. Please try again.');
      }
    } catch (error) {
      console.error('Error updating the category:', error.response ? error.response.data : error.message);
      setError('An error occurred while updating the category. Please check your input and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = (e) => {
    if (e.target.className.includes(style.backdrop)) {
      onClose();
    }
  };

  return (
    <ErrorBoundary>
      <div className={style.backdrop} onClick={handleClose}>
        <div className={style.componentsUpdate} onClick={(e) => e.stopPropagation()}>
          <p onClick={onClose} className={style.componentsUpdate_title}>
            Update Component <IoClose className={style.componentsUpdate_title_icon} />
          </p>

          {loading ? (
            <p>Loading category data...</p>
          ) : (
            <>
              <div className={style.languageTabs}>
                {languages.map((lang) => (
                  <button
                    key={lang}
                    className={activeLanguage === lang ? style.activeTab : ''}
                    onClick={() => setActiveLanguage(lang)}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              <input
                name="categoryTitle"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                className={style.componentsUpdate_input}
                placeholder={`Update Category Title (${activeLanguage.toUpperCase()})`}
                required
              />
              <button
                className={style.componentsUpdate_btn}
                onClick={handleUpdate}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </>
          )}

          {error && <p className={style.error}>{error}</p>}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ComponentsUpdate;
