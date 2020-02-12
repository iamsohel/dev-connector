import http from "./httpService";
//import {apiUrl} from "../config.json";
const tokenKey = "token";


const apiEndpoint = "/users/register";

export async function login(user) {
  const { data } = await http.post('/users/login', user);
  localStorage.setItem(tokenKey, data);
  //setAuthToken(data);
  return data;
}

export function register(user) {
  return http.post(apiEndpoint, user);
}

export function updateUser(userData) {
  return http.put('users', userData);
}

export function upload(image) {
  return http.post('/users/upload', image)
}

export function me() {
  return http.get('/users/me');
}

export default {
  register,
  login,
  updateUser,
  me,
  upload
};

