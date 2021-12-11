import { getCookie } from './cookie';
import {
  urlLoginRout,
  urlLogoutRout,
  urlUserDataEndpoint,
  urlApiToken,
  urlUserRegistration,
  urlResetPassword,
  urlSetNewPassword,
} from './api-url';

type TRegistrationData = {
  'email': string,
  'password': string,
  'name': string,
}

export function fetchUserRegistration(data: TRegistrationData) {
  return fetch(urlUserRegistration, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data), // email, password, name
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      console.log('Возникли проблемы при регистрации нового пользователя:')
      const response = await res.json();
      return Promise.reject(response);
    })
    .then((res) => {
      console.log('Результаты успешного запроса о регистрации:')
      console.log(res);
      return res;
    })
}

type TLogInData = {
  'email': string,
  'password': string,
}

export function fetchLogIn(data: TLogInData) {
  return fetch(urlLoginRout, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(await res.json());
    })
    .then((res) => {
      console.log('Результаты успешного запроса об авторизации:')
      console.log(res);
      return res;
    })
}

export function fetchRequestResetCode(userEmail: string) {
  console.log('body', JSON.stringify({ email: userEmail }))
  return fetch(urlResetPassword, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email: userEmail }),
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(await res.json());
    })
    .then((res) => {
      console.log('Результаты запроса о коде восстановления пароля:')
      console.log(res);
      return res;
    })
}

export function fetchResetPassword(newPassword: string, resetCode: string) {
  return fetch(urlSetNewPassword, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "password": newPassword,
      "token": resetCode
    }),
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(await res.json());
    })
    .then((res) => {
      console.log('Результаты запроса об установке нового пароля:')
      console.log(res);
      return res;
    })
}

export function fetchGetUserData() {
  return fetch(urlUserDataEndpoint, {
    headers: {
      method: 'GET',
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken') as string,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      console.log('Ошибка при попытке получить данные пользователя через accessToken. Возможно, так и должно быть, если токен просрочен.');
      return Promise.reject(await res.json());
    })
    .then((res) => {
      if (res["success"] === false) {
        console.error('Getting user data with accessToken failed:', res);
      }
      console.log('Getting user data with accessToken was successfull')
      console.log(res);
      return res;
    })
}

type TChangeUserDataArg = {
  "name": string,
  "email": string,
  "password": string,
}

export function fetchChangeUserData(form: TChangeUserDataArg) {
  return fetch(urlUserDataEndpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': getCookie('accessToken') as string,
    },
    body: JSON.stringify({
      "name": form.name,
      "email": form.email,
      "password": form.password,
    })
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      console.log('Ошибка при попытке обновить данные пользователя');
      return Promise.reject(await res.json());
    })
    .then((res) => {
      if (res["success"] === false) {
        console.error('Updating user data failed:', res);
      }
      console.log('Updating user data was successfull');
      return res;
    })
}

export function fetchRefreshTokens() {
  console.log('начало фетча за рефрешем токенов')
  return fetch(urlApiToken, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      console.log('Ошибка при попытке обновить токены через refreshToken. Возможно, так и должно быть, если токены уже были обновлены в параллельной сессии.');
      return Promise.reject(await res.json());
    })
    .then((res) => {
      if (res["success"] === false) {
        console.error('Could`t refresh tokens: ', res);
        return false;
      }
      console.log('Got fresh tokens: ', res);
      return res;
    });
}

export function fetchLogOut() {
  return fetch(urlLogoutRout, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken'), }),
  })
    .then(async (res) => {
      console.log('response from server: ', res)
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(await res.json());
    })
    .then((res) => {
      if (res["success"] === false) {
        console.error('Didn`t logout properly', res);
      }
      console.log('Body of response: ')
      console.log(res);
      return res;
    })
}