import axios from 'axios';
import {API_URL, API_KEY} from '@env';

export const fetchAllMovie = (data) => {
  console.log('PARAM DATA ', JSON.stringify(data));
  return axios.get(`${API_URL}/trending/all/day?api_key=${API_KEY}`, data);
};

export const fetchAllMoviePopular = (data) => {
  return axios.get(
    `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    data,
  );
};

export const fetchAllMovieWatch = (data) => {
  return axios.get(
    `${API_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=5`,
    data,
  );
};

export const fetchAllMovieDisplay = (data) => {
  return axios.get(
    `${API_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1-2`,
    data,
  );
};

export const fetchAllMovieGenre = (data) => {
  return axios.get(
    `${API_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    data,
  );
};

export const getMovieById = (itemId) => {
  return axios.get(
    `${API_URL}/movie/${itemId}?api_key=${API_KEY}&language=en-US`,
  );
};

export const getMovieByGenre = (itemId) => {
  return axios.get(
    `${API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${itemId}`,
  );
};

export const getReviewById = (itemId) => {
  return axios.get(
    `${API_URL}/movie/${itemId}/reviews?api_key=${API_KEY}&language=en-US`,
  );
};

export const getVideoById = (itemId) => {
  return axios.get(
    `${API_URL}/movie/${itemId}/videos?api_key=${API_KEY}&language=en-US`,
  );
};

// export const searchMovie = (keyword) => {
//   return axios.get(
//     `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`,
//   );
// };
