import React, { useState } from 'react';
import style from "./parametrs.module.css";
import { IoCloseCircle } from "react-icons/io5";

const ParametrsModal = ({ onClose, parameterId: initialParameterId }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [parametrId] = useState(initialParameterId || ''); 
  const [parameterMaskData, setParameterMaskData] = useState('');
  const [parentId, setParentId] = useState(null);
  const [language, setLanguage] = useState('Azerbaijan'); 

  const handleSave = async () => {
    setIsSaving(true);

    const data = {
      parameterId: parametrId, 
      parentId,
      parameterMaskTranslates: [
        {
          languageId: 1, 
          parameterMaskData: parameterMaskData
        }
      ]
    };

    try {
      const response = await fetch('https://restartbaku-001-site4.htempurl.com/api/ParameterMask/create-parameter-mask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Parameter Mask əlavə edildi.");
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
          <p>Mask əlavə edin</p>
          <IoCloseCircle className={style.ParametrsModal_header_icon} onClick={onClose} />
        </div>
        <div className={style.ParametrsModal_card}>
          <span className={style.ParametrsModal_card_text}>Parameter İd-si</span>
          <input
            placeholder='Parameter İd-sin daxil edin '
            required
            type="text"
            className={style.ParametrsModal_card_input}
            value={parametrId}
            disabled 
          />
        </div>
        <div className={style.ParametrsModal_card}>
          <span className={style.ParametrsModal_card_text}>Maskın dəyəri</span>
          <input
            placeholder='Maskın dəyərin daxil edin '
            required
            type="text"
            className={style.ParametrsModal_card_input}
            value={parameterMaskData}
            onChange={(e) => setParameterMaskData(e.target.value)}
          />
        </div>
        <div className={style.ParametrsModal_card_form}>
          <label className={style.ParametrsModal_card_text} htmlFor="parentId">Parent İd</label>
          <select
            id="parentId"
            className={style.ParametrsModal_card_input}
            value={parentId || ''}
            onChange={() => setParentId(null)} 
          >
            <option value={null}>None</option>
          </select>
        </div>
        <div className={style.ParametrsModal_card_form}>
          <label className={style.ParametrsModal_card_ftext} htmlFor="language">Dil seçin:</label>
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
          {isSaving ? "yadda saxlanır..." : "Əlavə et"}
        </button>
      </div>
    </div>
  );
}

export default ParametrsModal;
