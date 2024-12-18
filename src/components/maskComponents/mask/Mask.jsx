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
        const response = await axios.get('https://restartbaku-001-site4.htempurl.com/api/Parameter/get-all-parameters');
        const data = response.data.data;

        const selectParameters = data.filter(param => param.parameterTypeTitle === "select");

        const parametersWithMasks = await Promise.all(
          selectParameters.map(async (param) => {
            try {
              const maskResponse = await axios.get(`https://restartbaku-001-site4.htempurl.com/api/ParameterMask/get-all-parameter-masks-by-parameter/${param.parameterId}`);
              
              console.log(`API Response for parameter ${param.parameterId}:`, maskResponse.data);
              const masksData = maskResponse.data.data || [];
              return { ...param, masks: masksData.map(mask => ({ id: mask.parameterMaskId, title: mask.parameterMaskTitle })) };
            } catch (error) {
              console.error(`Error fetching masks for parameter ${param.parameterId}:`, error);
              return { ...param, masks: [] };
            }
          })
        );

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
      const deleteResponse = await axios.delete(`https://restartbaku-001-site4.htempurl.com/api/ParameterMask/delete-parameter-mask/${maskId}`);
      
      setParameters(prevParameters =>
        prevParameters.map(param => {
          if (param.parameterId === parameterId) {
            return {
              ...param,
              masks: param.masks.filter(mask => mask.id !== maskId) 
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
            <h5 className="componentsPage_title" style={{ margin: "30px 5px" }}>Parametr Maskları</h5>
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
                                        onClick={() => handleDeleteMask(param.parameterId, mask.id)} 
                                      />
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p>Uyğun parametere maskımız yoxdur.</p>
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Card>
                    ))
                  ) : (
                    <p>Parameter tapılmadlı.</p>
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
