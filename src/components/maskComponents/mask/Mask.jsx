import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Header from "../../../layout/header/Header";
import { Accordion, Card } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Mask = () => {
  const navigate = useNavigate();
  const [parameters, setParameters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParameters = async () => {
      setLoading(true);
      try {
        // Parametreleri al
        const response = await axios.get('http://restartbaku-001-site4.htempurl.com/api/Parameter/get-all-parameters');
        const data = response.data.data;

        // Select parametreleri filtrele
        const selectParameters = data.filter(param => param.parameterTypeTitle === "select");

        // Parametreler ve maskeleri almak için
        const parametersWithMasks = await Promise.all(
          selectParameters.map(async (param) => {
            try {
              // Maskeleri al
              const maskResponse = await axios.get(`http://restartbaku-001-site4.htempurl.com/api/ParameterMask/get-all-parameter-masks-by-parameter/${param.parameterId}`);
              
              // Konsolda API cevabını yazdır
              console.log(`API Response for parameter ${param.parameterId}:`, maskResponse.data);

              const masksData = maskResponse.data.data || [];
              // Parametreye maskeleri ekle
              return { ...param, masks: masksData.map(mask => ({ id: mask.parameterMaskId, title: mask.parameterMaskTitle })) };
            } catch (error) {
              console.error(`Error fetching masks for parameter ${param.parameterId}:`, error);
              return { ...param, masks: [] };
            }
          })
        );

        // Parametreleri state'e kaydet
        setParameters(parametersWithMasks);
      } catch (error) {
        console.error('Error fetching parameters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParameters();
  }, []);

  const handleDeleteMask = async (parameterId, maskId) => {
    try {
      // Maskeyi sil
      const deleteResponse = await axios.delete(`http://restartbaku-001-site4.htempurl.com/api/ParameterMask/delete-parameter-mask/${maskId}`);
      
      // Silme işleminden sonra parametreyi güncelle
      setParameters(prevParameters =>
        prevParameters.map(param => {
          if (param.parameterId === parameterId) {
            return {
              ...param,
              masks: param.masks.filter(mask => mask.id !== maskId) // Silinen maskeyi array'den çıkar
            };
          }
          return param;
        })
      );

      console.log(`Mask with id ${maskId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting mask:', error);
    }
  };

  return (
    <div className="componentsPage_container">
      <Header />
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h5 className="componentsPage_title" style={{ margin: "30px 5px" }}>ParametrMasks</h5>
            <div className="componentsPage">
              <div className="componentsPage_bottom">
                <Accordion>
                  {parameters.length > 0 ? (
                    parameters.map((param) => (
                      <Card key={param.parameterId} className="accordionCard">
                        <Accordion.Item eventKey={param.parameterId.toString()}>
                          <Accordion.Header>{param.parameterTitle}</Accordion.Header>
                          <Accordion.Body>
                            <div className="componentsPage_bottom_main_maskList">
                              {param.masks.length > 0 ? (
                                param.masks.map((mask, index) => (
                                  <div key={index} className="componentsPage_bottom_main_maskItem mt-2">
                                    <p className="maskTitle">{mask.title}</p>
                                    <div className="componentsPage_bottom_main_iconBox">
                                      <FaTrash
                                        className="componentsPage_bottom_main_iconBox_icon"
                                        title="Delete"
                                        onClick={() => handleDeleteMask(param.parameterId, mask.id)} // Silme işlemi
                                      />
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p>No masks available for this parameter.</p>
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Card>
                    ))
                  ) : (
                    <p>No parameters found.</p>
                  )}
                </Accordion>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Mask;
