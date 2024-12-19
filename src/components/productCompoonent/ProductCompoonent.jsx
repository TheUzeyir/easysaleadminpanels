import React, { useState, useEffect } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import { FcOk } from "react-icons/fc";
import Header from "../../layout/header/Header";
import style from "./productCompoonent.module.css";
import { PiWarningCircleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductComponent = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const clickTrashBox = (productId) => {
    setData((prevData) => prevData.filter((item) => item.productId !== productId));
  };

  useEffect(() => {
    axios
      .get(
        "https://restartbaku-001-site4.htempurl.com/api/Product/search"
      )
      .then((response) => {
        if (response.data.isSuccessful && response.data.data.items) {
          setData(response.data.data.items);
        } else {
          console.error("API başarısız:", response.data.message);
        }
      })
      .catch((error) => console.error("API hatası:", error));
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product-detail/${productId}`);

  };

  return (
    <div className={style.componentsPage_container}>
      <Header />
      <div className="container">
        <p className={style.componentsPage_title}>Add Attribute</p>
        <div className={style.componentsPage}>
          <div className={style.componentsPage_header}>
            <input
              className={style.componentsPage_header_input}
              type="text"
              placeholder="Search products..."
            />
            <FaSearch className={style.componentsPage_header_input_icon} />
          </div>
          <div className={style.componentsPage_bottom}>
            <div className={style.componentsPage_bottom_header}>
              <p className={style.componentsPage_bottom_header_title}>Product</p>
              <p className={style.componentsPage_bottom_header_title}>Status</p>
              <p className={style.componentsPage_bottom_header_title}>Action</p> 
            </div>
            {data.map((item) => (
              <div
                key={item.productId}
                className={style.componentsPage_bottom_main}
                onClick={() => handleProductClick(item.productId)}
              >
                <p className={style.componentsPage_bottom_main_productParentId}>
                  {item.productTitle}
                </p>
                {item.productStatusId === 1 && (
                  <button className={style.componentsPage_bottom_main_btn}>
                    <PiWarningCircleFill /> Pedding
                  </button>
                )}
                {item.productStatusId === 2 && (
                  <button className={style.detailPage_main_head_right_btn_ok}>
                    <FcOk /> Testiq edildi
                  </button>
                )}
                <div className={style.componentsPage_bottom_main_iconBox}>
                  <FaTrash
                    className={style.componentsPage_bottom_main_iconBox_icon}
                    onClick={(e) => {
                      e.stopPropagation();
                      clickTrashBox(item.productId);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
