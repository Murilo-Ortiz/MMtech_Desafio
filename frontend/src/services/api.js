import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

/**
 * @param {string} [searchterm='']
 * @returns {Promise}
 */
export const getAllData = (searchterm='') => {
  return api.get(`/data?search = ${searchterm}`);
};

/**
 * @param {string} id
 * @returns {Promise} 
**/
export const getbyId =(id) =>{
    return api.get(`/data/${id}`, id);
};

/**
 * @param {object} newData
 * @returns {Promise}
 */
export const postNewContato = (newData) =>{
    return api.post('/data', newData);
};

/**
 * @param {string} id 
 * @returns {Promise}
 */
export const deleteContato = (id) =>{
    return api.delete(`/data/${id}`, id);
};

/**
 * @param {string} id
 * @param {object} updatedData
 * @returns {Promise}
 */
export const updateContato = (id, updatedData) =>{
    return api.put(`/data/${id}`, updatedData)
};