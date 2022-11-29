import axios from 'axios'
const baseUrl = '/api/players'

//EDIT
const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const initNewChar = async (playerId) => {
  const res = await axios.post(baseUrl + '/new', playerId)
  return res.data
}

const updateChar = async (reqData, charId) => {
  const res = await axios.put(`${baseUrl}/${charId}`, reqData)
  return res.data
}

const deleteChar = async (charId) => {
  const res = await axios.delete(`${baseUrl}/${charId}`, charId)
  return res.data
}
const charService = {
  getAll,
  initNewChar,
  updateChar,
  deleteChar,
}
export default charService