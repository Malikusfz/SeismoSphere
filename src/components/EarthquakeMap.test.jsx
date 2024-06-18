import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import nprogress from 'nprogress';
import EarthquakeMap from './EarthquakeMap';

// Create a mock instance of axios
const mock = new MockAdapter(axios);

describe('EarthquakeMap', () => {
  beforeEach(() => {
    mock.reset();
    nprogress.start = jest.fn();
    nprogress.done = jest.fn();
  });

  test('renders loading spinner initially', () => {
    render(<EarthquakeMap />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  test('fetches and displays earthquake data', async () => {
    // Mock API response
    mock.onGet('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json').reply(200, {
      Infogempa: {
        gempa: [
          {
            DateTime: '2023-06-20T12:34:56+00:00',
            Coordinates: '-2.5489,118.0149',
            Wilayah: 'Test Area',
            Tanggal: '2023-06-20',
            Jam: '12:34:56',
            Magnitude: '5.5',
            Kedalaman: '10 km',
          },
        ],
      },
    });

    render(<EarthquakeMap />);

    // Wait for the earthquake data to be fetched and rendered
    await waitFor(() => expect(screen.getByText(/Gempa Terbaru di Indonesia/i)).toBeInTheDocument());

    // Check if the earthquake information is displayed
    expect(screen.getByText(/Test Area/i)).toBeInTheDocument();
    expect(screen.getByText(/2023-06-20/i)).toBeInTheDocument();
    expect(screen.getByText(/12:34:56/i)).toBeInTheDocument();
    expect(screen.getByText(/5.5 M/i)).toBeInTheDocument();
    expect(screen.getByText(/10 km/i)).toBeInTheDocument();

    // Ensure nprogress is started and stopped
    expect(nprogress.start).toHaveBeenCalled();
    expect(nprogress.done).toHaveBeenCalled();
  });

  test('switches map styles', async () => {
    // Mock API response
    mock.onGet('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json').reply(200, {
      Infogempa: {
        gempa: [],
      },
    });

    render(<EarthquakeMap />);

    // Wait for the map to be rendered
    await waitFor(() => expect(screen.getByText(/Gempa Terbaru di Indonesia/i)).toBeInTheDocument());

    // Check if the button for switching map styles is present and clickable
    const switchButton = screen.getByText(/Switch to Satellite View/i);
    expect(switchButton).toBeInTheDocument();
    switchButton.click();

    // Check if the button text changes after clicking
    expect(screen.getByText(/Switch to Default View/i)).toBeInTheDocument();
  });
});
