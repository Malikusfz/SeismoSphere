import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

function CenterMapOnPopupOpen({ position }) {
  const map = useMap();
  const initialCenter = [-2.5489, 118.0149];
  const initialZoom = 5;

  useEffect(() => {
    if (position) {
      const currentCenter = map.getCenter();
      if (currentCenter.lat !== position[0] || currentCenter.lng !== position[1]) {
        map.setView(position, map.getZoom(), {
          animate: true,
          pan: {
            duration: 0.5,
          },
        });
      }
    } else {
      map.setView(initialCenter, initialZoom, {
        animate: true,
        pan: {
          duration: 0.5,
        },
      });
    }
  }, [position, map]);

  return null;
}

CenterMapOnPopupOpen.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
};

CenterMapOnPopupOpen.defaultProps = {
  position: null,
};

export default CenterMapOnPopupOpen;
