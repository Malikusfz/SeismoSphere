import React from 'react';
import { render } from '@testing-library/react';
import { MapContainer, TileLayer } from 'react-leaflet';
import CenterMapOnPopupOpen from './CenterMapOnPopupOpen';

jest.mock('react-leaflet', () => ({
  ...jest.requireActual('react-leaflet'),
  useMap: jest.fn(),
}));

const mockedUseMap = require('react-leaflet').useMap;

describe('CenterMapOnPopupOpen', () => {
  let mapInstance;

  beforeEach(() => {
    mapInstance = {
      getCenter: jest.fn(() => ({ lat: -2.5489, lng: 118.0149 })),
      getZoom: jest.fn(() => 5),
      setView: jest.fn(),
    };
    mockedUseMap.mockReturnValue(mapInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sets the view to initial center and zoom if position is not provided', () => {
    render(
      <MapContainer>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <CenterMapOnPopupOpen />
      </MapContainer>,
    );

    expect(mapInstance.setView).toHaveBeenCalledWith([-2.5489, 118.0149], 5, {
      animate: true,
      pan: { duration: 0.5 },
    });
  });

  it('sets the view to the provided position if position is provided', () => {
    const position = [10, 20];

    render(
      <MapContainer>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <CenterMapOnPopupOpen position={position} />
      </MapContainer>,
    );

    expect(mapInstance.setView).toHaveBeenCalledWith(position, 5, {
      animate: true,
      pan: { duration: 0.5 },
    });
  });

  it('does not set the view if the map is already centered on the provided position', () => {
    const position = [-2.5489, 118.0149];

    render(
      <MapContainer>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <CenterMapOnPopupOpen position={position} />
      </MapContainer>,
    );

    expect(mapInstance.setView).not.toHaveBeenCalled();
  });
});
