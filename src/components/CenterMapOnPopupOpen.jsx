import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

function CenterMapOnPopupOpen({ position }) {
  const map = useMap();
  const initialCenter = [-2.5489, 118.0149];
  const initialZoom = 5;

  useEffect(() => {
    if (!position) {
      // Only set to initial view if we're really far from it
      const currentCenter = map.getCenter();
      const distance = map.distance([currentCenter.lat, currentCenter.lng], initialCenter);
      if (distance > 1000000) { // 1000km
        map.setView(initialCenter, initialZoom, {
          animate: true,
          pan: { duration: 0.5 },
        });
      }
      return;
    }

    const currentCenter = map.getCenter();
    const currentBounds = map.getBounds();

    // Only center if the point is outside the current viewport or near the edges
    if (!currentBounds.contains(position)
        || Math.abs(currentCenter.lat - position[0]) > currentBounds.getNorth() - currentBounds.getSouth() / 4
        || Math.abs(currentCenter.lng - position[1]) > currentBounds.getEast() - currentBounds.getWest() / 4) {
      map.setView(position, map.getZoom(), {
        animate: true,
        pan: { duration: 0.5 },
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
