import React from 'react';
import style from "./header.module.css";
import { AiOutlineBars } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";

const Header = () => {

  return (
    <div className={style.adminPanel_header_container}>
      <div className="container">
        <header className={style.adminPanel_header}>
          <AiOutlineBars
            className={style.adminPanel_header_icon_bar}
          />
          <div className={style.adminPanel_header_inputBox}>
            <input
              type="text"
              placeholder="Search here"
              className={style.adminPanel_header_inputBox_input}
            />
            <CiSearch className={style.adminPanel_header_inputBox_icon} />
          </div>
          <div className={style.adminPanel_header_iconBox}>
            <p>
              <FaBell className={style.adminPanel_header_icon} />
              <span className={style.adminPanel_header_icon_number}>1</span>
            </p>
          </div>
          <div className={style.adminPanel_header_adminBox}>
            <img
              className={style.adminPanel_header_adminBox_img}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsXDDUqQGrByxgFyFDAy8h4qoV-gyEPfnb2A&s"
              alt="Admin"
            />
            <div className={style.adminPanel_header_adminBox_textCard}>
              <p className={style.adminPanel_header_adminBox_textCard_title}>
                Sistem idarə etmesi.
              </p>
              <p>Admin</p>
            </div>
          </div>
        </header>
        <input
          type="text"
          className={style.adminPanel_header_resInput}
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default Header;
