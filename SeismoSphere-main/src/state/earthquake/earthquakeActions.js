export const SET_SELECTED_EARTHQUAKE = 'SET_SELECTED_EARTHQUAKE';

export const setSelectedEarthquake = (earthquake) => ({
  type: SET_SELECTED_EARTHQUAKE,
  payload: earthquake,
});
