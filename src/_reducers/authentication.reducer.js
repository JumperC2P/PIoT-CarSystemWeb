import { userConstants } from '../_constants';

const initialState = false?{
  user:{
    email: "ys17ygg@gmail.com",
    first_name: "Frank",
    last_name: "Mike",
    password: "ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f",
    role: "Admin",
    user_id: 1,
    username: "Frank"
    // email: "ys17ygg@gmail.com",
    // first_name: "Zack",
    // last_name: "Sam",
    // password: "ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f",
    // role: "Engineer",
    // user_id: 6,
    // username: "Zack"
  }
}:{};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        user: action.user
      };
    case userConstants.REGISTER_REQUEST:
      return {
        user: action.user
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        user: action.user,
        role: action.role
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        user: action.user,
        role: action.role
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    case userConstants.REGISTER_CHECK_USERNAME:
      return {
        check_user_name: action.result
        // user: state.user
      };
    case userConstants.LOGOUT:
      return {};
    case userConstants.UPDATE:
      return {
        user: action.user
    };
    case userConstants.EMAIL:
      return {
        email: action.email
    };
    case userConstants.ADDRESS:
      return {
        street: action.street, 
        suburb: action.suburb, 
        postcode: action.postcode,
        state: action.state
    };
    default:
      return state
  }
}