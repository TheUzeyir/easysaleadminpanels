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
        const response = await axios.get('http://restartbaku-001-site4.htempurl.com/api/Parameter/get-all-parameters');
        const data = response.data.data;

        const selectParameters = data.filter(param => param.parameterTypeTitle === "select");

        const parametersWithMasks = await Promise.all(
          selectParameters.map(async (param) => {
            try {
              const maskResponse = await axios.get(`http://restartbaku-001-site4.htempurl.com/api/ParameterMask/get-parameter-mask/${param.parameterId}`);
              const masksData = maskResponse.data.data.parameterMaskTranslates || [];
              return { ...param, masks: masksData.map(mask => mask.parameterMaskData) };
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

  return (
    <div className="componentsPage_container">
      <Header />
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h5 className="componentsPage_title" style={{margin:"30px 5px"}}>ParametrMasks</h5>
            <div className="componentsPage">
              <div className="componentsPage_bottom">
                <Accordion>
                  {parameters.length > 0 ? (
                    parameters.map((param) => (
                      <Card key={param.parameterId} className='accordionCard'>
                        <Accordion.Item eventKey={param.parameterId.toString()}>
                          <Accordion.Header>{param.parameterTitle}</Accordion.Header>
                          <Accordion.Body>
                            <div className="componentsPage_bottom_main_maskList">
                              {param.masks.length > 0 ? (
                                param.masks.map((mask, index) => (
                                  <div key={index} className="componentsPage_bottom_main_maskItem mt-2">
                                    <p className="maskTitle">{mask}</p>
                                    <div className="componentsPage_bottom_main_iconBox">
                                      <FaTrash
                                        className="componentsPage_bottom_main_iconBox_icon"
                                        title="Delete"
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
