import React, {
  useContext, useEffect, useState, useRef,
} from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import EarthquakeContext from '../state/EarthquakeContext';
import 'leaflet/dist/leaflet.css';
import '../index.css'; // Import custom styles

// Custom icon for pinpoint
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

function EarthquakeMap() {
  const [earthquakes, setEarthquakes] = useState([]);
  const { state: { selectedEarthquake } } = useContext(EarthquakeContext);
  const mapRef = useRef();
  const popupRefs = useRef({});

  const getCoordinates = (locationString) => {
    if (!locationString) return [0, 0];
    const coords = locationString.split(',');
    if (coords.length !== 2) return [0, 0];
    const latitude = parseFloat(coords[0]);
    const longitude = parseFloat(coords[1]);
    return [latitude, longitude];
  };

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        nprogress.start();
        const cachedData = localStorage.getItem('earthquakes');
        if (cachedData) {
          setEarthquakes(JSON.parse(cachedData));
        } else {
          const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json');
          setEarthquakes(response.data.Infogempa.gempa);
          localStorage.setItem('earthquakes', JSON.stringify(response.data.Infogempa.gempa));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        nprogress.done();
      }
    };

    fetchEarthquakes();
  }, []);

  useEffect(() => {
    if (selectedEarthquake && mapRef.current) {
      const coordinates = getCoordinates(selectedEarthquake.Coordinates);
      const map = mapRef.current;
      if (map && map.setView) {
        map.setView(coordinates, 10, { animate: true });

        const popupRef = popupRefs.current[selectedEarthquake.DateTime];
        if (popupRef && popupRef._map) {
          setTimeout(() => {
            popupRef.openOn(map);
          }, 0);
        }
      }
    }
  }, [selectedEarthquake]);

  // Extend bounds a bit further out of Indonesia
  const indonesiaBounds = [
    [-15, 90], // Southwest coordinates (extended)
    [10, 145], // Northeast coordinates (extended)
  ];

  return (
    <div className="earthquake-map-container">
      <h2 className="text-center mb-4">Pinpoint Gempa di Indonesia</h2>
      <MapContainer
        center={[-2.5489, 118.0149]}
        zoom={5}
        minZoom={5}
        maxZoom={15}
        className="map"
        maxBounds={indonesiaBounds}
        maxBoundsViscosity={1.0}
        whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>
          OpenStreetMap</a> contributors"
        />
        {earthquakes.map((gempa) => {
          const coordinates = getCoordinates(gempa.Coordinates);
          if (coordinates[0] === 0 && coordinates[1] === 0) return null;
          return (
            <Marker
              key={gempa.DateTime}
              position={coordinates}
              icon={customIcon}
              eventHandlers={{
                click: () => mapRef.current.setView(coordinates, 10, { animate: true }),
              }}
            >
              <Popup
                autoPan
                keepInView
                autoPanPadding={[50, 50]}
                className="custom-popup"
                ref={(ref) => {
                  if (ref) {
                    popupRefs.current[gempa.DateTime] = ref;
                    if (selectedEarthquake && selectedEarthquake.DateTime === gempa.DateTime) {
                      setTimeout(() => {
                        if (ref._map) {
                          ref.openOn(mapRef.current);
                        }
                      }, 0);
                    }
                  }
                }}
              >
                <div className="popup-content">
                  <h4>{gempa.Wilayah}</h4>
                  <div>
                    <strong>Tanggal:</strong>
                    {' '}
                    {gempa.Tanggal}
                  </div>
                  <div>
                    <strong>Waktu:</strong>
                    {' '}
                    {gempa.Jam}
                  </div>
                  <div>
                    <strong>Magnitude:</strong>
                    {' '}
                    {gempa.Magnitude}
                  </div>
                  <div>
                    <strong>Kedalaman:</strong>
                    {' '}
                    {gempa.Kedalaman}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default EarthquakeMap;
