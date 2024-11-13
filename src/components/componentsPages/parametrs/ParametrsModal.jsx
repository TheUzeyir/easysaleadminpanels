import React,{useState} from 'react'
import style from "./parametrs.module.css"
import { IoCloseCircle } from "react-icons/io5";

const ParametrsModal = ({ onClose }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('');


    const handleSave = () => {
        setIsSaving(true);
        setIsSaving(false);
        onClose();
      };
  return (
    <div className={style.backdrop} onClick={onClose}>
        <div className={style.ParametrsModal} onClick={(e) => e.stopPropagation()}>
        <div className={style.ParametrsModal_header}>
            <p>Update Component</p>
            <IoCloseCircle className={style.ParametrsModal_header_icon} onClick={onClose}/>
        </div>
        <div className={style.ParametrsModal_card}>
            <span className={style.ParametrsModal_card_text}>ParametrId</span>
            <input 
                placeholder='Enter ParametrId' 
                required type="text"
                className={style.ParametrsModal_card_input}
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
            />
        </div>
        <div className={style.ParametrsModal_card}>
            <span className={style.ParametrsModal_card_text}>MaskName</span>
            <input 
                placeholder='Enter MaskName' 
                required type="text"
                className={style.ParametrsModal_card_input}
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
            />
        </div>
        <div className={style.ParametrsModal_card}>
            <span className={style.ParametrsModal_card_text}>ParentId </span>
            <input 
                placeholder='Enter ParentId' 
                required type="text" 
                className={style.ParametrsModal_card_input}
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
            />
        </div>
        <form action="" className={style.ParametrsModal_card_form}>
        <label className={style.ParametrsModal_card_ftext} for="cars">Choose Language:</label>
        <select name="" id="" className={style.ParametrsModal_card_input}>
            <option value="saab">Azerbaijan</option>
            <option value="opel">Russian</option>
            <option value="audi">English</option>
        </select>
        </form>
        <button 
          className={style.ParametrsModal_btn}
          onClick={handleSave} 
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
        </div>
    </div>
  )
}

export default ParametrsModal
