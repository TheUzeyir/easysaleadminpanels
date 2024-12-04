import React, { useState } from 'react';
import { FaPlus,FaSearch ,FaTrash} from "react-icons/fa";
import { FaPenFancy } from "react-icons/fa6";
import { useNavigate } from 'react-router';
import Header from '../../layout/header/Header';
import style from "./productCompoonent.module.css"
import { PiWarningCircleFill } from "react-icons/pi";

const ProductCompoonent = () => {
  const [deleteBox, setDeleteBox] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editDataList, setEditDataList] = useState([
    { id: '54', status: 'true', weight: '526', img: 'true', slug: 'true' },
  ]);

  const clickTrashBox = (id) => {
    setEditDataList(prevDataList => prevDataList.filter(item => item.id !== id));
  };

  const handleEditClick = (id) => {
    setIsEditing(id);
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setEditDataList(prevDataList =>
      prevDataList.map(item =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const navigate = useNavigate();

  return (
    <div className={style.componentsPage_container}>
      <Header />
      <div className="container">
        <p className={style.componentsPage_title}>Add Atribute</p>
        <div className={style.componentsPage}>
          <div className={style.componentsPage_header}>
            <input className={style.componentsPage_header_input} type="text" />
            <FaSearch className={style.componentsPage_header_input_icon} />
          </div>
          <div className={style.componentsPage_bottom}>
            <div className={style.componentsPage_bottom_header}>
              <p className={style.componentsPage_bottom_header_title}>Product</p>
              <p className={style.componentsPage_bottom_header_title}>Status</p>
              <p className={style.componentsPage_bottom_header_title}>Action</p>
            </div>
            <div className={style.componentsPage_bottom_main}>
                <p className={style.componentsPage_bottom_main_productParentId}>lorem</p>
                <button className={style.componentsPage_bottom_main_btn}><PiWarningCircleFill/>Pedding</button>
                <div className={style.componentsPage_bottom_main_iconBox}>
                    <FaTrash className={style.componentsPage_bottom_main_iconBox_icon} onClick={() => clickTrashBox(item.id)} />
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ProductCompoonent;