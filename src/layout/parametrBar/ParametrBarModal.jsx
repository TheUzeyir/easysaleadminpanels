import React, { useState } from 'react';
import style from './parametrBar.module.css';
import { IoClose } from "react-icons/io5";

const ParametrBarModal = ({ onClose }) => {
  const [categoryTitle, setCategoryTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setIsSaving(false);
    onClose();
  };

  return (
    <div className={style.backdrop} onClick={onClose}>
      <div className={style.componentsUpdate} onClick={(e) => e.stopPropagation()}>
        <p className={style.componentsUpdate_title}>
          Update Component 
          <IoClose className={style.componentsUpdate_title_icon} onClick={onClose} />
        </p>
        <input
          name="categoryTitle"
          value={categoryTitle}
          onChange={(e) => setCategoryTitle(e.target.value)}
          className={style.componentsUpdate_input}
          placeholder="Update Category Title"
          required
        />
        <button 
          className={style.componentsUpdate_btn} 
          onClick={handleSave} 
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default ParametrBarModal;