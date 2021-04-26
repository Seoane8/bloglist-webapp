import axios from 'axios'
const baseUrl = '/api/blogs'

// let token

// const setToken = newToken => { token = `Bearer ${newToken}` }

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

export default { getAll }
