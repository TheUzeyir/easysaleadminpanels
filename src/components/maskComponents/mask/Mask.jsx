import React from 'react'
import style from "./mask.module.css"
import { FaPlus, FaSearch } from 'react-icons/fa';


const Mask = () => {
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
            <p className={style.componentsPage_bottom_header_title}>ID</p>
            <p className={style.componentsPage_bottom_header_title}>Title</p>
            <p className={style.componentsPage_bottom_header_title}>Parent ID</p>
            <p className={style.componentsPage_bottom_header_title}>Image</p>
            <p className={style.componentsPage_bottom_header_title}>Action</p>
          </div>
          {loading ? (
            <h4>Loading categories...</h4>
          ) : (
            dataList.map((item, index) => (
              <div key={`${item.categoryId}-${index}`} className={style.componentsPage_bottom_main_container}>
                <div className={`${style.componentsPage_bottom_main} ${deleteBox ? style.componentsPage_bottom_main_displayNone : ""}`}>
                  <p className={style.componentsPage_bottom_main_productTitle}>{item.categoryId}</p>
                  <p className={style.componentsPage_bottom_main_productTitle}>{item.categoryTitle}</p>
                  <p className={style.componentsPage_bottom_main_productParentId}>{item.parentId || 'N/A'}</p>
                  <div className={style.componentsPage_bottom_main_productImageBox}>
                    <img 
                      src={item.categoryImage}
                      alt={item.categoryTitle} 
                      className={style.componentsPage_bottom_main_productImage}
                    />
                  </div>
                  <div className={style.componentsPage_bottom_main_iconBox}>
                    <FaPenFancy className={style.componentsPage_bottom_main_iconBox_icon} 
                      onClick={() => handleEditClick(item)} 
                    />
                    <FaTrash 
                      className={style.componentsPage_bottom_main_iconBox_icon} 
                      onClick={() => clickTrashBox(item.categoryId)} 
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>

    {isModalOpen && selectedItem && (
      <div className={style.modalOverlay}>
        <ComponentsUpdate 
          item={selectedItem} 
          onUpdateSuccess={handleUpdateSuccess}
          onClose={handleCloseModal}                    
        />
      </div>
    )}
  </div>
  )
}

export default Mask
