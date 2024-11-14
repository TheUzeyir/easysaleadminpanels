import React from 'react'
import style from "./mask.module.css"
import { FaPlus, FaSearch } from 'react-icons/fa';
import { FaPenFancy, FaTrash } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import Header from "../../../layout/header/Header"


const Mask = () => {

  const navigate=useNavigate()

  return (
    <div className={style.componentsPage_container}>
    <Header />
    <div className="container">
      <p className={style.componentsPage_title}>Add Attribute</p>
      <div className={style.componentsPage}>
        <div className={style.componentsPage_header}>
          <input className={style.componentsPage_header_input} type="text" placeholder="Search..." />
          <FaSearch className={style.componentsPage_header_input_icon} />
          <button className={style.componentsPage_header_btn} onClick={() => navigate('/componentsAdd')}>
            <FaPlus /> Add New
          </button>
        </div>
        <div className={style.componentsPage_bottom}>
          <div className={style.componentsPage_bottom_header}>
            <p className={style.componentsPage_bottom_header_title}>lorem</p>
            <p className={style.componentsPage_bottom_header_title}>lorem</p>
            <p className={style.componentsPage_bottom_header_title}>lorem</p>
            <p className={style.componentsPage_bottom_header_title}>lorem</p>
            <p className={style.componentsPage_bottom_header_title}>lorem</p>
          </div>
              <div className={style.componentsPage_bottom_main_container}>
                <div className={style.componentsPage_bottom_main}>
                  <p className={style.componentsPage_bottom_main_productTitle}></p>
                  <p className={style.componentsPage_bottom_main_productTitle}></p>
                  <p className={style.componentsPage_bottom_main_productParentId}></p>
                  <div className={style.componentsPage_bottom_main_productImageBox}>
                    <img 
                      className={style.componentsPage_bottom_main_productImage}
                    />
                  </div>
                  <div className={style.componentsPage_bottom_main_iconBox}>
                    <FaPenFancy className={style.componentsPage_bottom_main_iconBox_icon} 
                    />
                    <FaTrash 
                      className={style.componentsPage_bottom_main_iconBox_icon} 
                    />
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Mask
