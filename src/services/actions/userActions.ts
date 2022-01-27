import {
  fetchLogIn,
  fetchLogOut,
  fetchGetUserData,
  fetchRefreshTokens,
  fetchUserRegistration,
  fetchRequestResetCode,
  fetchResetPassword,
  fetchChangeUserData,
} from '../../utils/api-fetch';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';
import { TUserForm, TLoginForm } from '../../utils/types';
import { AppDispatch, AppThunk } from '../store';

export const LOGIN_SUCCESSFUL: 'LOGIN_SUCCESSFUL' = 'LOGIN_SUCCESSFUL';
export const SET_USER_DATA: 'SET_USER_DATA' = 'SET_USER_DATA';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';
export const LOGOUT_SUCCESSFUL: 'LOGOUT_SUCCESSFUL' = 'LOGOUT_SUCCESSFUL';
export const ALLOW_RESET_PASSWORD: 'ALLOW_RESET_PASSWORD' = 'ALLOW_RESET_PASSWORD';
export const HAS_RESET_PASSWORD: 'HAS_RESET_PASSWORD' = 'HAS_RESET_PASSWORD';

export interface ILoginSuccessful {
  readonly type: typeof LOGIN_SUCCESSFUL;
  readonly name: string,
  readonly email: string
}

export const LoginSuccessful = (name: string, email: string): ILoginSuccessful => {
  return {
    type: LOGIN_SUCCESSFUL,
    name,
    email,
  };
}

export interface ISetUserData {
  readonly type: typeof SET_USER_DATA;
  readonly name: string,
  readonly email: string,
}

export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}

export interface ILogoutSuccessful {
  readonly type: typeof LOGOUT_SUCCESSFUL;
}

export interface IAllowResetPassword {
  readonly type: typeof ALLOW_RESET_PASSWORD;
}

export interface IHasResetPassword {
  readonly type: typeof HAS_RESET_PASSWORD;
}

export type TUserActionsUnion = ILoginSuccessful | ISetUserData | ILoginFailed | ILogoutSuccessful | IAllowResetPassword | IHasResetPassword;

export const registerNewUserThunk: AppThunk = (data: TUserForm) => {

  return function (dispatch: AppDispatch) {
    fetchUserRegistration(data)
      .then(({ user, accessToken, refreshToken }) => {
        dispatch({
          type: LOGIN_SUCCESSFUL,
          name: user.name,
          email: user.email,
          isLoggedIn: true,
        });
        setCookie("accessToken", accessToken, { expires: 20 * 60 });
        localStorage.setItem('refreshToken', refreshToken);
      })
      .catch(err => {
        return;
      });
  }
}

export const logInAppThunk: AppThunk = (data: TLoginForm) => {

  return function (dispatch: AppDispatch) {
    fetchLogIn(data)
      .then(({ user, accessToken, refreshToken, success }) => {
        if (success === true) {
          dispatch({
            type: LOGIN_SUCCESSFUL,
            name: user.name,
            email: user.email,
          });

          setCookie("accessToken", accessToken, { expires: 20 * 60 });
          localStorage.setItem('refreshToken', refreshToken);
        }
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAILED,

        });
      });
  };
}

export const logOutThunk: AppThunk = () => {

  return function (dispatch: AppDispatch) {

    fetchLogOut()
      .then((res) => {
        if (res.success === true) {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');

          dispatch({
            type: LOGOUT_SUCCESSFUL,
          });
        }
      })
      .catch(err => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch({
          type: LOGOUT_SUCCESSFUL,
        });
      });
  };
}

export const requestResetCodeThunk: AppThunk = (email: string) => {

  return function (dispatch: AppDispatch) {
    fetchRequestResetCode(email)
      .then(res => {

        if (res.success === true) {
          dispatch({
            type: ALLOW_RESET_PASSWORD,
          });
          setCookie('canResetPassword', 'yes', { expires: 60 * 60 * 1 });
        }
      })
      .catch(err => {
      })
  }
}

export const setNewPasswordThunk: AppThunk = (newPassword: string, resetCode: string) => {

  return function (dispatch: AppDispatch) {

    fetchResetPassword(newPassword, resetCode)
      .then(res => {
        if (res.success === true) {
          dispatch({
            type: HAS_RESET_PASSWORD,
          });

          setCookie('canResetPassword', 'no', { expires: -1 });
        }
      })
      .catch(err => {
      })
  }
}

export const patchUserDataThunk: AppThunk = (form: TUserForm, setFormValues) => {

  return function (dispatch: AppDispatch) {
    fetchChangeUserData(form)
      .then(res => {

        dispatch({
          type: SET_USER_DATA,
          name: res.user.name,
          email: res.user.email,
        });

        setFormValues({ name: res.user.name, email: res.user.email, password: '' });
      })
  }
}

export const refreshAccessTokenThunk: AppThunk = (safetyCounter: number) => {

  return function (dispatch: AppDispatch | AppThunk) {
    fetchRefreshTokens()
      .then(({ accessToken, refreshToken }) => {
        setCookie("accessToken", accessToken, { expires: 20 * 60 });
        localStorage.setItem('refreshToken', refreshToken);

        dispatch(getUserThunk(safetyCounter));
      })
      .catch((err) => {
        return;
      })
  }
}

export const getUserThunk: AppThunk = (safetyCounter: number) => {

  safetyCounter++;
  if (safetyCounter > 2) {
    return function () {
    }
  }

  return function (dispatch: AppDispatch | AppThunk) {
    fetchGetUserData()
      .then(({ user, success }) => {
        if (success === true) {

          dispatch({
            type: SET_USER_DATA,
            name: user.name,
            email: user.email,
          });
        }
      })
      .catch((err) => {
        if (err.message === 'jwt expired') {
          dispatch(refreshAccessTokenThunk(safetyCounter)); // сюда пробрасываем safetyCounter
        } else {
        }

      });
  }
}

export const confirmAuthThunk: AppThunk = () => {

  return async function (dispatch: AppDispatch | AppThunk) {
    const hasAccessCookie = (getCookie('accessToken') != null);
    const hasRefreshToken = (localStorage.getItem('refreshToken') != null);

    if (hasAccessCookie) {
      const safetyCounter = 0;
      dispatch(getUserThunk(safetyCounter));
      return 'has logged in';
    }

    if (!hasAccessCookie && hasRefreshToken) {
      const safetyCounter = 1;
      dispatch(refreshAccessTokenThunk(safetyCounter));
      return 'has refreshed tokens, than logged in';
    }

  }
}


