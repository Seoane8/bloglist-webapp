import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const getConfig = () => ({
  headers: {
    Authorization: token
  }
})

const setToken = newToken => { token = `Bearer ${newToken}` }

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const create = async blog => {
  const { data } = await axios.post(baseUrl, blog, getConfig())
  return data
}

const update = async ({ id, ...blog }) => {
  const { data } = await axios.put(`${baseUrl}/${id}`, blog, getConfig())
  return data
}

export default { getAll, setToken, create, update }
