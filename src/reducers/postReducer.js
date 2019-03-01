import { FETCH_POST, FETCH_COMMENTS, NEW_COMMENT, NEW_POST, UPDATE_POST, DELETE_POST } from '../actions/types';

const initialState = {
  coments: [],
  postss: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POST:
      return {
        ...state,
        postss: action.payload
      };
    case FETCH_COMMENTS:
      return {
        ...state,
        coments: action.payload
      }; 
    case NEW_COMMENT:
      return {
        ...state,
        postss: state.postss.map(item => item._id === action.payload._id ? action.payload : item )
      };
    case NEW_POST:
      return {
        ...state,
        //state.postss.concat(action.payload)
        postss: [...state, action.payload]
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
    case DELETE_POST:
      return {
        ...state,
        postss: state.postss.filter(item => item._id !== action.payload._id)
      };
    default:
      return state;
  }
}
