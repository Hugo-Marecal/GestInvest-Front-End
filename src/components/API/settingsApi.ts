// Get the token from the local storage
const token = localStorage.getItem('token');

// Store the token in the header of the request
export const header = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

// Server deploy
// export const BaseURL = 'https://gestinvest-1-c6d9743eb2ea.herokuapp.com/api/';
export const BaseURL = 'http://localhost:5000/api/';
