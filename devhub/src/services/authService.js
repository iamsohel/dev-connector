import jwtDecode from "jwt-decode";
import axios from "axios";
//import { apiUrl } from "../config.json";
const tokenKey = "token";

// const token = getJwt();
// if(token){
//   axios.defaults.headers.common["Authorization"] = "Bearer " + token;
// }

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const setAuthToken = token => {
  if(token){
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default {
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  setAuthToken
};
