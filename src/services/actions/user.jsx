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
import { MAIN_API, setCookies, getCookie, retriableFetch } from '../../utils/constants';

export const register = ({ email, password, name, history }) => {
  return dispatch => {
    dispatch({
      type: REGISTER_REQUEST
    });
    fetch(`${MAIN_API}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password, name: name })
    })
      .then(res => {
        if (res.ok) return res.json();
        else return res.json().then(err => Promise.reject(err));
      })
      .then(res => {
        if (res.success) {
          dispatch({ type: REGISTER_SUCCESS });
          history.push('/login');
        } else Promise.reject(res);
      })
      .catch(() => dispatch({ type: REGISTER_FAILED }));
  };
};

export const login = ({ email, password, history }) => {
  return dispatch => {
    dispatch({ type: AUTH_REQUEST });
    fetch(`${MAIN_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(res => {
        if (res.ok) return res.json();
        else return res.json().then(err => Promise.reject(err));
      })
      .then(res => {
        if (res.success) {
          setCookies(res);
          dispatch({ type: AUTH_SUCCESS, payload: res.user });
          history.push('/');
        } else Promise.reject(res);
      })
      .catch(() => dispatch({ type: AUTH_FAILED }));
  };
};

export const refresh = () => {
  const refreshToken = getCookie('refreshToken');
  return fetch(`${MAIN_API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ token: `${refreshToken}` })
  }).then(res => {
    if (res.ok) return res.json();
    else return res.json().then(err => Promise.reject(err));
  });
};

export const logout = () => {
  const refreshToken = getCookie('refreshToken');
  return dispatch => {
    dispatch({ type: LOGOUT_REQUEST });
    fetch(`${MAIN_API}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ token: `${refreshToken}` })
    })
      .then(res => {
        if (res.ok) return res.json();
        else return res.json().then(err => Promise.reject(err));
      })
      .then(res => {
        if (res.success) dispatch({ type: LOGOUT_SUCCESS });
        else Promise.reject(res);
      })
      .catch(() => dispatch({ type: LOGOUT_FAILED }));
  };
};

export const getUser = () => {
  const accessToken = getCookie('accessToken');
  return dispatch => {
    dispatch({ type: GET_USER_REQUEST });
    retriableFetch(`${MAIN_API}/auth/user`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => {
        if (res.success) dispatch({ type: GET_USER_SUCCESS, payload: res.user });
        else Promise.reject(res);
      })
      .catch(() => dispatch({ type: GET_USER_FAILED }));
  };
};

export const updateUser = ({ email, password, name }) => {
  const accessToken = getCookie('accessToken');
  return dispatch => {
    dispatch({ type: USER_UPDATE_REQUEST });
    retriableFetch(`${MAIN_API}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ email: email, password: password, name: name })
    })
      .then(res => {
        if (res.success) dispatch({ type: USER_UPDATE_SUCCESS, payload: res.user });
        else Promise.reject(res);
      })
      .catch(() => dispatch({ type: USER_UPDATE_FAILED }));
  };
};
