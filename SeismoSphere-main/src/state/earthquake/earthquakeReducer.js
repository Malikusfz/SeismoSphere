import { SET_SELECTED_EARTHQUAKE } from './earthquakeActions';

const initialState = {
  selectedEarthquake: null,
};

const earthquakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_EARTHQUAKE:
      return {
        ...state,
        selectedEarthquake: action.payload,
      };
    default:
      return state;
  }
};

export default earthquakeReducer;
