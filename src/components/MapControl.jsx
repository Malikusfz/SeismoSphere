import { useEffect, useState, useRef } from 'react';
import { useMap } from 'react-leaflet';
import PropTypes from 'prop-types';
import L from 'leaflet';

/**
 * Component that handles map interaction controls like zoom behavior
 * 
 * @param {object} props - Component properties
 * @param {Function} props.toast - Toast notification function from Chakra UI
 * @param {boolean} props.showZoomControl - Whether to show zoom control buttons
 * @param {string} props.zoomPosition - Position for zoom control ('topleft', 'topright', 'bottomleft', 'bottomright')
 */
function MapControl({ toast, showZoomControl = true, zoomPosition = 'topright' }) {
  const map = useMap();
  const [showToast, setShowToast] = useState(true);
  const [notificationDismissed, setNotificationDismissed] = useState(false);
  const notificationShown = useRef(false);
  const touchDevice = useRef('ontouchstart' in window);
  const isMobile = useRef(window.innerWidth < 768);
  const zoomControlRef = useRef(null);
  // Add zoom control buttons
  useEffect(() => {
    if (showZoomControl && !zoomControlRef.current) {
      zoomControlRef.current = L.control.zoom({
        position: 'topright', // Selalu kanan atas untuk desktop maupun mobile
        zoomInTitle: 'Perbesar',
        zoomOutTitle: 'Perkecil'
      }).addTo(map);
    }

    return () => {
      if (zoomControlRef.current) {
        zoomControlRef.current.remove();
        zoomControlRef.current = null;
      }
    };
  }, [map, showZoomControl]);useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      
      if (isMobile.current !== newIsMobile) {
        isMobile.current = newIsMobile;
        
        // Reposition zoom controls on screen size change
        if (zoomControlRef.current) {
          zoomControlRef.current.remove();
          zoomControlRef.current = L.control.zoom({
            position: 'topright', // Selalu kanan atas, untuk desktop dan mobile
            zoomInTitle: 'Perbesar',
            zoomOutTitle: 'Perkecil'
          }).addTo(map);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);

  useEffect(() => {
    // On mobile devices, we allow pinch-zoom but disable scroll-zoom by default
    const disableScrollZoom = () => {
      map.scrollWheelZoom.disable();
    };

    const enableScrollZoom = () => {
      map.scrollWheelZoom.enable();
    };

    // For mobile devices, enable pinch zoom but disable scroll wheel zoom
    if (touchDevice.current) {
      map.touchZoom.enable();
      disableScrollZoom();
    } else {
      // For desktop, disable scroll zoom initially but allow with Ctrl key
      disableScrollZoom();
    }

    const handleMouseWheel = (e) => {
      // Skip notification on touch devices (they use pinch to zoom)
      if (touchDevice.current) return;
      
      if (!e.ctrlKey && !e.metaKey) { // Support for both Ctrl (Windows/Linux) and Command (Mac)
        disableScrollZoom();
        if (showToast && !notificationShown.current) {
          toast({
            title: 'Tekan Ctrl untuk Zoom',
            description: 'Gunakan tombol Ctrl untuk mengaktifkan zoom pada peta.',
            status: 'info',
            duration: 4000,
            isClosable: true,
            position: 'top',
            variant: 'subtle',
            containerStyle: {
              backdropFilter: 'blur(8px)',
            },
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
      if (e.ctrlKey || e.metaKey) {
        enableScrollZoom();
      }
    };

    const handleKeyUp = (e) => {
      if (!e.ctrlKey && !e.metaKey) {
        disableScrollZoom();
      }
    };

    const handleMapClick = () => {
      // Reset notification state when clicking the map
      if (notificationDismissed) {
        notificationShown.current = false;
      }
    };

    const mapContainer = map.getContainer();
    mapContainer.addEventListener('wheel', handleMouseWheel);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    mapContainer.addEventListener('click', handleMapClick);

    return () => {
      mapContainer.removeEventListener('wheel', handleMouseWheel);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      mapContainer.removeEventListener('click', handleMapClick);
    };
  }, [map, toast, showToast]);

  useEffect(() => {
    if (notificationDismissed) {
      setShowToast(true);
    }
  }, [notificationDismissed]);  // Menghapus indikator bantuan sesuai permintaan pengguna
  // Teks "Ctrl+Scroll untuk zoom" telah dihapus

  return null;
}

MapControl.propTypes = {
  toast: PropTypes.func.isRequired,
  showZoomControl: PropTypes.bool,
  zoomPosition: PropTypes.string
};

export default MapControl;
