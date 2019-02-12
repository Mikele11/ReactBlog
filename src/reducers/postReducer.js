import { FETCH_COMMENTS, NEW_COMMENT, NEW_POST, UPDATE_POST } from '../actions/types';

const initialState = {
  coments: [],
  postss: []
};

export default function(state = initialState, action) {

  switch (action.type) {
    case FETCH_COMMENTS:
      return {
        ...state,
        coments: action.payload
      };
    case NEW_COMMENT:
      return {
        ...state,
        coments: action.payload
        //postss: state.postss[].comment.concat(action.payload._id)
      };
    case NEW_POST:
      return {
        ...state,
        postss: state.postss.concat(action.payload)
      };  
    case UPDATE_POST:
      return {
        ...state,
        postss: state.postss.map( (item, index) => {
          if(index !== action.payload._id) {
            return item;
        }
        return {
            ...item,
            ...action.payload
        }; 
        })
      };
    default:
      return state;
  }
}
