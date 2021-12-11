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

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const SET_USER_DATA = 'SET_USER_DATA';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_SUCCESSFUL = 'LOGOUT_SUCCESSFUL';
export const ALLOW_RESET_PASSWORD = 'ALLOW_RESET_PASSWORD';
export const HAS_RESET_PASSWORD = 'HAS_RESET_PASSWORD';

export function registerNewUser(data) {
  console.log('Начинаем регистрацию нового пользователя');
  console.log('data: ', data);
  return function (dispatch) {
    fetchUserRegistration(data)
      .then(({ user, accessToken, refreshToken }) => {
        dispatch({
          type: LOGIN_SUCCESSFUL,
          name: user.name,
          email: user.email,
        });
        setCookie("accessToken", accessToken, { expires: 20 * 60 });
        localStorage.setItem('refreshToken', refreshToken);
      })
      .catch(err => {
        console.log('Ошибка при попытке зарегистрироваться');
        return console.log(err);
      });
  }
}

export function logInApp(data) {
  return function (dispatch) {
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

        console.log('Ошибка при авторизации по логину и паролю');
        return console.log(err);
      });
  };
}

export function logOut() {
  return function (dispatch) {
    console.log('Logging you out, Shepard'); // ;-)

    fetchLogOut()
      .then((res) => {
        console.log('res in logOut: ', res)
        console.log('res.success', res.success)
        if (res.success === true) {
          console.log('Now deleting tokens');
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');

          dispatch({
            type: LOGOUT_SUCCESSFUL
          });
          console.log('Logged out successfully');
        }
      })
      .catch(err => {
        console.log('Ошибка при разлогинивании');
        return console.log(err);
      });
  };
}

export function requestResetCode(email) {
  return function (dispatch) {
    console.log(`Запрашиваем код для смены пароля для email: ${email}`);

    fetchRequestResetCode(email)
      .then(res => {
        console.log('res in fn requestResetCode: ', res);

        if (res.success === true) {
          dispatch({
            type: ALLOW_RESET_PASSWORD,
          });

          setCookie('canResetPassword', 'yes', { expires: 60 * 60 * 1 });
        }
      })
      .catch(err => {
        console.log('Smth went wrong while requesting for reset code');
        console.log(err);
      })
  }
}

export function setNewPassword(newPassword, resetCode) {
  return function (dispatch) {
    console.log('newPassword', newPassword);
    console.log('resetCode', resetCode);

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
        console.log('Smth went wrong while requesting for password change');
        console.log(err);
      })
  }
}

export function patchUserData(form, setFormValues) {
   
  return function (dispatch) {
    fetchChangeUserData(form)
    .then(res => {
      console.log(res);

      dispatch({
        type: SET_USER_DATA,
        name: res.user.name,
        email: res.user.email,
      });

      setFormValues({ name: res.user.name, email: res.user.email, password: '' });
    })
  }
}

export function confirmAuth() {
  return async function (dispatch) {
    const hasAccessCookie = (getCookie('accessToken') != null);
    const hasRefreshToken = (localStorage.getItem('refreshToken') != null);

    if (hasAccessCookie) {
      let safetyCounter = 0;
      dispatch(getUser(safetyCounter));
      return 'has logged in';
    }

    if (!hasAccessCookie && hasRefreshToken) {
      let safetyCounter = 1;
      dispatch(refreshAccessToken(safetyCounter));
      return 'has refreshed tokens, than logged in';
    }

    return console.log('fn confirmAuth found no tokens. You may want to enter your login and password on a /login page');
  }
}

export function getUser(safetyCounter) {
  console.log('Starting fn getUser with accessToken');

  safetyCounter++;
  console.log('safetyCounter in getUser: ', safetyCounter);

  if (safetyCounter > 2) {
    return function (dispatch) {
      console.log('Вошли в рекурсию в fn getUser. Заканчиваем это безобразие.');

    }
  }

  return function (dispatch) {
    fetchGetUserData()
      .then(({ user, success }) => {
        if (success === true) {
          console.log('Access granted. Welcome aboard, Commander!');

          dispatch({
            type: SET_USER_DATA,
            name: user.name,
            email: user.email,
          });
        }
      })
      .catch((err) => {
        if (err.message === 'jwt expired') {
          console.log('Не получилось добыть юзердату через accessToken. Попробуем обновить токены');
          dispatch(refreshAccessToken(safetyCounter));
        } else {
          console.log(err);
        }
      });
  }
}

export function refreshAccessToken(safetyCounter) {
  console.log('Refreshing tokens now');
  return function (dispatch) {
    fetchRefreshTokens()
      .then(({ accessToken, refreshToken }) => {
        console.log('Setting refreshed tokens');
        setCookie("accessToken", accessToken, { expires: 20 * 60 });
        localStorage.setItem('refreshToken', refreshToken);

        dispatch(getUser(safetyCounter));
      })
      .catch((err) => {
        console.log('.catch case in fn refreshAccessToken: ');
        return console.log(err);
      })
  }
}