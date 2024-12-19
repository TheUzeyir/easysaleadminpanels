import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { FaPenFancy, FaTrash } from 'react-icons/fa6';
import Header from '../../../layout/header/Header';
import style from './cityComponent.module.css';
import { FaMask } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import ParametrBarModal from '../../../layout/parametrBar/ParametrBarModal';
import ParametrsModal from '../../../layout/parametrBar/ParametrBarModal';
import 'react-toastify/dist/ReactToastify.css';

const CityComponent = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isParametrModal, setIsParametrModal] = useState(false);
  const [parameters, setParameters] = useState([]);
  const [filteredParameters, setFilteredParameters] = useState([]); // Süzügənmiş siyahı
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParameterId, setSelectedParameterId] = useState(null);
  const navigate = useNavigate();

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
        setFilteredParameters((prevFiltered) =>
          prevFiltered.filter((param) => param.parameterId !== parameterId)
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
          setFilteredParameters(data.data); // Başlanğıc siyahı
        } else {
          console.error("API Error:", data.messages);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchParameters();
  }, []);

  useEffect(() => {
    // Süzmə funksiyası
    const filtered = parameters.filter((param) =>
      param.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredParameters(filtered);
  }, [searchQuery, parameters]);

  return (
    <div className={style.componentsPage_container}>
      <Header />
      <div className="container">
        <p className={style.componentsPage_title}>Şəhərlər</p>
        <div className={style.componentsPage}>
          <div className={style.componentsPage_header}>
            <input
              className={style.componentsPage_header_input}
              type="text"
              placeholder="Axtar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className={style.componentsPage_header_input_icon} />
            <button
              className={style.componentsPage_header_btn}
              onClick={() => navigate('/cityAdd')}
            >
              <FaPlus /> Yeni şəhər əlave et
            </button>
          </div>
          <div className={style.componentsPage_bottom}>
            <div className={style.componentsPage_bottom_header}>
              <th className={style.componentsPage_bottom_header_title}>Şəhər İd-si</th>
              <th className={style.componentsPage_bottom_header_title}>Şəhər Adı</th>
              <th className={style.componentsPage_bottom_header_title}>Şəhər Nömrəsi</th>
              <th className={style.componentsPage_bottom_header_title}>Dəyişiklik</th>
            </div>
            <div className={style.componentsPage_bottom_main_container}>
              {filteredParameters.map((param) => (
                <div className={style.componentsPage_bottom_main} key={param.parameterId}>
                  <span className={style.componentsPage_bottom_main_productTitle}>{param.cityId}</span>
                  <span className={style.componentsPage_bottom_main_productTitle}>{param.title}</span>
                  <span className={style.componentsPage_bottom_main_productTitle}>
                    {param.orderWeight === 0 ? 'Azərbaycan' : param.orderWeight === 1 ? 'Türkiyə' : 'Digər'}
                  </span>
                  <div className={style.componentsPage_bottom_main_iconBox}>
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
