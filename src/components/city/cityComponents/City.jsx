import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { FaPenFancy, FaTrash } from 'react-icons/fa6';
import Header from '../../../layout/header/Header';
import style from './cityComponent.module.css';
import { FaMask } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import ParametrBarModal from '../../../layout/parametrBar/ParametrBarModal';
import ParametrsModal from '../../../layout/parametrBar/ParametrBarModal';

const CityComponent = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isParametrModal, setIsParametrModal] = useState(false);
  const [parameters, setParameters] = useState([]);
  const [selectedParameterId, setSelectedParameterId] = useState(null);
  const navigate = useNavigate();

  const handleClickModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleClickParametrModal = (parameterId) => {
    setSelectedParameterId(parameterId); 
    setIsParametrModal(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const CloseParametrModal = () => {
    setIsParametrModal(false);
    setSelectedParameterId(null); 
  };

  const handleDelete = async (parameterId) => {
    const confirmDelete = window.confirm("Bu parametri silmek istediyinize eminsiniz?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://restartbaku-001-site4.htempurl.com/api/Parameter/delete-parameter/${parameterId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setParameters((prevParameters) =>
          prevParameters.filter((param) => param.parameterId !== parameterId)
        );
        alert("Parametr silindi.");
      } else {
        alert("Silmə zamanı xəta baş verdi.");
      }
    } catch (error) {
      console.error("Error deleting parameter:", error);
      alert("Xəta baş verdi, yenidən yoxlayın.");
    }
  };

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const response = await fetch("https://restartbaku-001-site4.htempurl.com/api/City/get-cities");
        const data = await response.json();
        if (data.isSuccessful) {
          setParameters(data.data);
        } else {
          console.error("API Error:", data.messages);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchParameters();
  }, []);

  return (
    <div className={style.componentsPage_container}>
      <Header />
      <div className="container">
        <p className={style.componentsPage_title}>Parameterlər</p>
        <div className={style.componentsPage}>
          <div className={style.componentsPage_header}>
            <input
              className={style.componentsPage_header_input}
              type="text"
              placeholder="Search..."
            />
            <FaSearch className={style.componentsPage_header_input_icon} />
            <button
              className={style.componentsPage_header_btn}
              onClick={() => navigate('/cityAdd')}
            >
              <FaPlus /> Yeni seher əlave et
            </button>
          </div>
          <div className={style.componentsPage_bottom}>
            <div className={style.componentsPage_bottom_header}>
              <p className={style.componentsPage_bottom_header_title}>Seher İd-si</p>
              <p className={style.componentsPage_bottom_header_title}>Seher</p>
              <p className={style.componentsPage_bottom_header_title}>Seher Numarasi</p>
              <p className={style.componentsPage_bottom_header_title}>Action</p>
            </div>
            <div className={style.componentsPage_bottom_main_container}>
              {parameters.map((param) => (
                <div className={style.componentsPage_bottom_main} key={param.parameterId}>
                  <span className={style.componentsPage_bottom_main_productTitle}>{param.cityId}</span>
                  <span className={style.componentsPage_bottom_main_productTitle}>{param.title}</span>
                  <span className={style.componentsPage_bottom_main_productTitle}>{param.orderWeight}</span>
                  <div className={style.componentsPage_bottom_main_iconBox}>
                    <FaPenFancy
                      className={style.componentsPage_bottom_main_iconBox_icon}
                      onClick={handleClickModal}
                    />
                    <FaTrash
                      className={style.componentsPage_bottom_main_iconBox_icon}
                      onClick={() => handleDelete(param.parameterId)}
                    />
                    {param.parameterTypeTitle === "select" && (
                      <FaMask className={style.componentsPage_bottom_main_iconBox_icon} onClick={() => handleClickParametrModal(param.parameterId)}/>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className={style.modalOverlay}>
          <ParametrBarModal onClose={handleCloseModal} />
        </div>
      )}
      {isParametrModal && (
        <div className={style.modalOverlay}>
          <ParametrsModal onClose={CloseParametrModal} parameterId={selectedParameterId} />
        </div>
      )}
    </div>
  );
};

export default CityComponent;
