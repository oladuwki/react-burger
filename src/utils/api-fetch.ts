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
      const response = await res.json();
      return Promise.reject(response);
    })
    .then((res) => {
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
      return res;
    })
}

export function fetchRequestResetCode(userEmail: string) {
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
      return Promise.reject(await res.json());
    })
    .then((res) => {
      if (res["success"] === false) {
      }
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
      return Promise.reject(await res.json());
    })
    .then((res) => {
      if (res["success"] === false) {
      }
      return res;
    })
}

export function fetchRefreshTokens() {
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
      return Promise.reject(await res.json());
    })
    .then((res) => {
      if (res["success"] === false) {
        return false;
      }
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
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(await res.json());
    })
    .then((res) => {
      if (res["success"] === false) {
      }
      return res;
    })
}