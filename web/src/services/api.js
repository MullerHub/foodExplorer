import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://foodexplorer-br.onrender.com/'
  // baseURL : 'http://localhost:3333/' // para teste
})
