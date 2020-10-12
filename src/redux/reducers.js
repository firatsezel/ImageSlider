
import {UPDATE_IMG} from './actions';

const initialState = { 
    image_array: [5]
};

function imageItemsReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_IMG:
      return  {...state, image_array: action.payload};

    default:
      return state;
  }
}

export default imageItemsReducer;