import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED
} from '../types';

const initialState = {
  registerRequest: false,
  registerError: false,
  authRequest: false,
  authError: false,
  logoutRequest: false,
  logoutError: false,
  errorText: null,
  getUserRequest: false,
  getUserError: false,
  getUserLoaded: false,
  userUpdateRequest: false,
  userUpdateError: false,
  isAuth: false,
  user: {}
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerError: false,
        errorText: ''
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerError: true,
        errorText: 'Ошибка при регистрации'
      };
    }
    case AUTH_REQUEST: {
      return {
        ...state,
        authRequest: true
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authError: false,
        user: action.payload,
        isAuth: true,
        errorText: ''
      };
    }
    case AUTH_FAILED: {
      return {
        ...state,
        authRequest: false,
        authError: true,
        errorText: 'Ошибка при авторизации',
        isAuth: false
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutError: false,
        isAuth: false,
        user: {},
        errorText: ''
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutError: true,
        errorText: 'Ошибка при выходе пользователя'
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserError: false,
        user: action.payload,
        isAuth: true,
        getUserLoaded: true,
        errorText: ''
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserError: true,
        errorText: 'Ошибка при получении данных пользователя',
        getUserLoaded: false
      };
    }
    case USER_UPDATE_REQUEST: {
      return {
        ...state,
        userUpdateRequest: true
      };
    }
    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        userUpdateRequest: false,
        userUpdateError: false,
        user: action.payload,
        errorText: ''
      };
    }
    case USER_UPDATE_FAILED: {
      return {
        ...state,
        userUpdateRequest: false,
        userUpdateError: true,
        errorText: 'Ошибка при обновлении данных пользователя'
      };
    }
    default: {
      return state;
    }
  }
};
