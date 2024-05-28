import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Table, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EarthquakeContext from '../state/EarthquakeContext';
import { actions } from '../state/earthquake';
import '../index.css'; 

function EarthquakeTable() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useContext(EarthquakeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const cachedData = localStorage.getItem('earthquakes');
        if (cachedData) {
          setEarthquakes(JSON.parse(cachedData));
          setLoading(false);
        } else {
          const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json');
          setEarthquakes(response.data.Infogempa.gempa);
          localStorage.setItem('earthquakes', JSON.stringify(response.data.Infogempa.gempa));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchEarthquakes();
  }, []);

  const handleRowClick = (gempa) => {
    dispatch(actions.setSelectedEarthquake(gempa));
    navigate('/map');
  };

  return (
    <div className="earthquake-table-container">
      <h2 className="text-center mb-4">Daftar Gempa di Indonesia</h2>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <ProgressBar animated now={100} label="Loading..." style={{ width: '50%' }} />
        </div>
      ) : (
        <Table responsive bordered hover className="earthquake-table">
          <thead className="thead-dark">
            <tr>
              <th>Tanggal</th>
              <th>Waktu</th>
              <th>Magnitude</th>
              <th>Kedalaman</th>
              <th>Lokasi</th>
            </tr>
          </thead>
          <tbody>
            {earthquakes.map((gempa) => (
              <tr key={gempa.DateTime} onClick={() => handleRowClick(gempa)}>
                <td>{gempa.Tanggal}</td>
                <td>{gempa.Jam}</td>
                <td>{gempa.Magnitude}</td>
                <td>{gempa.Kedalaman}</td>
                <td>{gempa.Wilayah}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default EarthquakeTable;
