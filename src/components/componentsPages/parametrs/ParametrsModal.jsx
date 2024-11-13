import React, { useState } from 'react';
import style from "./parametrs.module.css";
import { IoCloseCircle } from "react-icons/io5";

const ParametrsModal = ({ onClose, parameterId: initialParameterId }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [parametrId] = useState(initialParameterId || ''); // Read-only parameterId
  const [parameterMaskData, setParameterMaskData] = useState('');
  const [parentId, setParentId] = useState(null); // Allow selection in dropdown
  const [language, setLanguage] = useState('Azerbaijan'); // Default selection

  const handleSave = async () => {
    setIsSaving(true);

    const data = {
      parameterId: parametrId, // Uses the fixed id from initial state
      parentId,
      parameterMaskTranslates: [
        {
          languageId: 1, 
          parameterMaskData: parameterMaskData
        }
      ]
    };

    try {
      const response = await fetch('http://restartbaku-001-site4.htempurl.com/api/ParameterMask/create-parameter-mask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Parameter mask saved successfully.");
        onClose(); 
      } else {
        alert("Error saving parameter mask.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Xəta baş verdi, yenidən yoxlayın.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={style.backdrop} onClick={onClose}>
      <div className={style.ParametrsModal} onClick={(e) => e.stopPropagation()}>
        <div className={style.ParametrsModal_header}>
          <p>Update Component</p>
          <IoCloseCircle className={style.ParametrsModal_header_icon} onClick={onClose} />
        </div>
        <div className={style.ParametrsModal_card}>
          <span className={style.ParametrsModal_card_text}>ParametrId</span>
          <input
            placeholder='Enter ParametrId'
            required
            type="text"
            className={style.ParametrsModal_card_input}
            value={parametrId}
            disabled // Makes parameterId input read-only
          />
        </div>
        <div className={style.ParametrsModal_card}>
          <span className={style.ParametrsModal_card_text}>parameterMaskData</span>
          <input
            placeholder='Enter parameterMaskData'
            required
            type="text"
            className={style.ParametrsModal_card_input}
            value={parameterMaskData}
            onChange={(e) => setParameterMaskData(e.target.value)}
          />
        </div>
        <div className={style.ParametrsModal_card_form}>
          <label className={style.ParametrsModal_card_text} htmlFor="parentId">ParentId</label>
          <select
            id="parentId"
            className={style.ParametrsModal_card_input}
            value={parentId || ''}
            onChange={() => setParentId(null)} // Keeps parentId null
          >
            <option value={null}>None</option>
          </select>
        </div>
        <div className={style.ParametrsModal_card_form}>
          <label className={style.ParametrsModal_card_ftext} htmlFor="language">Choose Language:</label>
          <select
            id="language"
            className={style.ParametrsModal_card_input}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Russian">Russian</option>
            <option value="English">English</option>
          </select>
        </div>
        <button
          className={style.ParametrsModal_btn}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}

export default ParametrsModal;
