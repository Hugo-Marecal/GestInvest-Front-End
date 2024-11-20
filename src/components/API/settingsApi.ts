// Get the token from the local storage
const token = localStorage.getItem('token');

// Store the token in the header of the request
export const header = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

// Server deploy
// export const BaseURL = 'http://localhost:8080/api/';
export const BaseURL = 'https://gestinvest-back-sb.onrender.com/api/';
