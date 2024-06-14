import { useEffect, useState, useRef } from 'react';
import { useMap } from 'react-leaflet';
import PropTypes from 'prop-types';

function MapControl({ toast }) {
  const map = useMap();
  const [showToast, setShowToast] = useState(true);
  const [notificationDismissed, setNotificationDismissed] = useState(false);
  const notificationShown = useRef(false);

  useEffect(() => {
    const disableScrollZoom = () => {
      map.scrollWheelZoom.disable();
    };

    const enableScrollZoom = () => {
      map.scrollWheelZoom.enable();
    };

    disableScrollZoom();

    const handleMouseWheel = (e) => {
      if (!e.ctrlKey) {
        disableScrollZoom();
        if (showToast && !notificationShown.current) {
          toast({
            title: 'Press Ctrl to Zoom',
            description: 'Use the Ctrl key to enable zooming on the map.',
            status: 'info',
            duration: 3000,
            isClosable: true,
            position: 'top',
            onCloseComplete: () => {
              setShowToast(true);
              setNotificationDismissed(true);
              notificationShown.current = false;
            },
          });
          setShowToast(false);
          notificationShown.current = true;
        }
      } else {
        enableScrollZoom();
      }
    };

    const handleKeyDown = (e) => {
      if (e.ctrlKey) {
        enableScrollZoom();
      }
    };

    const handleKeyUp = (e) => {
      if (!e.ctrlKey) {
        disableScrollZoom();
      }
    };

    map.getContainer().addEventListener('wheel', handleMouseWheel);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      map.getContainer().removeEventListener('wheel', handleMouseWheel);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [map, toast, showToast]);

  useEffect(() => {
    if (notificationDismissed) {
      setShowToast(true);
    }
  }, [notificationDismissed]);

  return null;
}

MapControl.propTypes = {
  toast: PropTypes.func.isRequired,
};

export default MapControl;
