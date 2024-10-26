import axios from 'axios'

axios.defaults.withCredentials = true

const getConfig = () => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access')}`,
  },
})

export default axios
export { getConfig }
