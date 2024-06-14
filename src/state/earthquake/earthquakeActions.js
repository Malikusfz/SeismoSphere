export const SET_SELECTED_EARTHQUAKE = 'SET_SELECTED_EARTHQUAKE';
export const SET_HOVERED_EARTHQUAKE = 'SET_HOVERED_EARTHQUAKE';

export const setSelectedEarthquake = (earthquake) => ({
  type: SET_SELECTED_EARTHQUAKE,
  payload: earthquake,
});

export const setHoveredEarthquake = (earthquake) => ({
  type: SET_HOVERED_EARTHQUAKE,
  payload: earthquake,
});
