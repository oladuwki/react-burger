export const baseUrl = 'https://norma.nomoreparties.space/api';

export const urlApiGetIngridients = baseUrl + '/ingredients';
export const urlApiPostOrder = baseUrl + '/orders';

export const urlLoginRout = baseUrl + '/auth/login';
export const urlLogoutRout = baseUrl + '/auth/logout';
export const urlUserDataEndpoint = baseUrl + '/auth/user';
export const urlApiToken = baseUrl + '/auth/token';
export const urlUserRegistration = baseUrl + '/auth/register';

export const urlResetPassword = baseUrl + '/password-reset';
export const urlSetNewPassword = baseUrl + '/password-reset/reset';

export const wsOrders: string = 'wss://norma.nomoreparties.space/orders'
export const wsAllOrders: string = wsOrders + '/all';