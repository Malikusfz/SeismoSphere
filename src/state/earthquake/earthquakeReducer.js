import { SET_SELECTED_EARTHQUAKE, SET_HOVERED_EARTHQUAKE } from './earthquakeActions';

const initialState = {
  selectedEarthquake: null,
  hoveredEarthquake: null,
};

const earthquakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_EARTHQUAKE:
      return {
        ...state,
        selectedEarthquake: action.payload,
      };
    case SET_HOVERED_EARTHQUAKE:
      return {
        ...state,
        hoveredEarthquake: action.payload,
      };
    default:
      return state;
  }
};

export default earthquakeReducer;
