import React,{useState}from 'react'
import style from "./header.module.css"
import { AiOutlineBars } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { FaMessage } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import ParametrBar from '../parametrBar/ParametrBar';

const Header = () => {

  const showParametrBar = () => {
    setParametrBarOpen((prev) => !prev);  
};
const [isParametrBarOpen, setParametrBarOpen] = useState(false); 

  return ( 
    <div className={style.adminPanel_header_container}>
        <div className="container">
        <div className={style.adminPanel_header}>
          <div className={style.adminPanel_header_inputBox}>
              <input type="text" name="" id="" placeholder='Search here' className={style.adminPanel_header_inputBox_input}/>
              <CiSearch  className={style.adminPanel_header_inputBox_icon}/>
          </div>
          <div className={style.adminPanel_header_iconBox}>
            <BiSolidCategory className={style.adminPanel_header_icon}/>
             <p> <FaMessage className={style.adminPanel_header_icon}/><span className={style.adminPanel_header_icon_nubmer1}>1</span></p>
             <p> <FaBell className={style.adminPanel_header_icon}/><span className={style.adminPanel_header_icon_nubmer2}>1</span></p>
          </div>
          <div className={style.adminPanel_header_adminBox}>
              <img className={style.adminPanel_header_adminBox_img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsXDDUqQGrByxgFyFDAy8h4qoV-gyEPfnb2A&s" alt="" />
              <div className={style.adminPanel_header_adminBox_textCard}>                
              <p className={style.adminPanel_header_adminBox_textCard_title}>Lorem, ipsum.</p>
              <p>Admin</p>
              </div>
          </div>
          <AiOutlineBars className={style.adminPanel_header_icon} onClick={showParametrBar}/>
        </div>
        <input type="text" className={style.adminPanel_header_resInput} placeholder='Search'/>
      </div>
      {isParametrBarOpen && <ParametrBar hideBar={showParametrBar}/>}
    </div>
  )
}

export default Header