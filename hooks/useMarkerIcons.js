import { useMemo } from 'react';
import Leaflet from 'leaflet';
import { useTheme } from '@mui/material/styles';

const generateIconHtml = (id, primary, secondary = 'rgba(0,0,0,0.5)') => `
      <div class="icon-wrapper">
        <div class="pulse"></div>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 80" id="marker-${id}">
          <path d=" M 25.06 80 C 23.392 71.46 20.454 64.353 16.894 57.765 C 14.254 52.879 11.195 48.37 8.365 43.631 C 7.42 42.049 6.605 40.378 5.697 38.738 C 3.882 35.455 2.411 31.65 2.504 26.713 C 2.595 21.889 3.932 18.021 5.859 14.858 C 9.028 9.654 14.338 5.388 21.462 4.267 C 27.287 3.351 32.748 4.9 36.621 7.263 C 39.785 9.195 42.236 11.775 44.099 14.815 C 46.043 17.989 47.382 21.738 47.494 26.628 C 47.552 29.134 47.159 31.454 46.605 33.379 C 46.044 35.327 45.143 36.956 44.341 38.695 C 42.776 42.09 40.814 45.202 38.844 48.315 C 32.977 57.587 27.471 67.043 25.06 80 Z " fill="${primary}" stroke-width="4" stroke="rgba(0,0,0,0.5)" stroke-linejoin="miter" stroke-linecap="round" stroke-miterlimit="4"/>
          <path d=" M 15.764 26.466 C 15.764 21.182 19.874 16.891 24.938 16.891 C 30 16.891 34.111 21.182 34.111 26.466 C 34.111 31.75 30 36.042 24.938 36.042 C 19.874 36.042 15.764 31.75 15.764 26.466 Z " fill="${secondary}"/>
        </svg>
      </div>
      `;

const useMarkerIcons = (id) => {
  const theme = useTheme();
  const [icon, selectedIcon, playingIcon] = useMemo(() => {
    const opts = {
      iconUrl: '/marker.svg',
      iconSize: [25, 40],
      iconAnchor: [12, 32],
      tooltipAnchor: [15, -20],
    };
    return [
      Leaflet.divIcon({
        ...opts,
        html: generateIconHtml(id, '#adffb6'),
      }),
      Leaflet.divIcon({
        ...opts,
        html: generateIconHtml(id, theme.palette.primary.main, '#adffb6'),
        className: 'leaflet-div-icon selected',
      }),
      Leaflet.divIcon({
        ...opts,
        html: generateIconHtml(id, '#adffb6'),
        className: 'leaflet-div-icon playing',
      }),
    ];
  }, []);

  return [icon, selectedIcon, playingIcon];
};

export default useMarkerIcons;
