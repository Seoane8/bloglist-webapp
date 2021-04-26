import axios from 'axios'
// const baseUrl = '/api/users'

const login = async (credentials) => {
  const { data } = await axios.post('/api/login', credentials)
  return data
}

export default { login }
