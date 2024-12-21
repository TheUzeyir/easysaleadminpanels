import React from 'react';
import { BiSolidCategory } from 'react-icons/bi';
import { FaBars, FaUser, FaMask, FaCity } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { useNavigate } from 'react-router';
import style from './parametrBar.module.css';

const ParametrBar = ({ hideBar }) => {
  const navigate = useNavigate();

  const navItems = [
    { path: "/category", icon: <BiSolidCategory />, label: "Kategoriyalar" },
    { path: "/users", icon: <FaUser />, label: "İstifadəçilər" },
    { path: "/parametrs", icon: <IoSettings />, label: "Parameterlər" },
    { path: "/parametrType", icon: <IoSettings />, label: "Parameter Tipləri" },
    { path: "/ProductCompoonent", icon: <MdOutlineProductionQuantityLimits />, label: "Mehsullar" },
    { path: "/mask", icon: <FaMask />, label: "Parameter Masklar" },
    { path: "/city", icon: <FaCity />, label: "Şəhərlər" },
  ];

  return (
    <div className={style.headerSideBar}>
      <div className={style.headerSideBar_header}>
        <span className={style.headerSideBar_logo}>JetEvimAdmin</span>
        <FaBars
          className={style.headerSideBar_header_icon}
          onClick={hideBar}
        />
      </div>
      <p className={style.headerSideBar_title}>Bütün səhifələr</p>
      <div className={style.headerSideBar_title_card}>
        {navItems.map((item, index) => (
          <div
            key={index}
            className={style.headerSideBar_title_box}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParametrBar;
