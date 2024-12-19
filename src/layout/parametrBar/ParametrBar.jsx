import React from 'react';
import { BiSolidCategory } from 'react-icons/bi';
import { FaBarsStaggered } from 'react-icons/fa6';
import style from './parametrBar.module.css';
import { useNavigate } from 'react-router';
import { FaUser } from "react-icons/fa";
import { IoSettings } from 'react-icons/io5';
import { MdReportProblem } from "react-icons/md";
import { FaMask } from "react-icons/fa";
import { FaCity } from "react-icons/fa";

const ParametrBar = ({ hideBar }) => {
    const navigate=useNavigate()
    
  return (
    <div className={style.headerSideBar}>
    <div className={style.headerSideBar_header}>
      <span className={style.headerSideBar_logo}>JetEvimAdmin</span>  
      <FaBarsStaggered className={style.headerSideBar_header_icon} onClick={hideBar}/> 
    </div>
    <p className={style.headerSideBar_title}>Bütün səhifələr</p>
    <div className={style.headerSideBar_title_card}> 
        <div className={style.headerSideBar_title_box} onClick={()=>navigate("/category")}><BiSolidCategory className={style.categoryBox_card_box_icon} />Kategoriyalar</div>
        <div className={style.headerSideBar_title_box} onClick={()=>navigate("/users")}><FaUser className={style.categoryBox_card_box_icon} />İstifadəçilər</div>
        <div className={style.headerSideBar_title_box} onClick={()=>navigate("/parametrs")}><IoSettings className={style.categoryBox_card_box_icon} />Parameterlər</div>
        <div className={style.headerSideBar_title_box} onClick={()=>navigate("/parametrType")}><IoSettings className={style.categoryBox_card_box_icon} />Parameter Tipləri</div>
        {/* <div className={style.headerSideBar_title_box} onClick={()=>navigate("/")}><MdReportProblem className={style.categoryBox_card_box_icon} />Report</div> */}
        <div className={style.headerSideBar_title_box} onClick={()=>navigate("/mask")}><FaMask className={style.categoryBox_card_box_icon} />Parameter Masklar</div>
        <div className={style.headerSideBar_title_box} onClick={()=>navigate("/city")}><FaCity className={style.categoryBox_card_box_icon} />Şəhərlər</div>
    </div>
  </div>
  )
}

export default ParametrBar