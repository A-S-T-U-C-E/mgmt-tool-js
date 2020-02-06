import axios from 'axios'
import env from '../utils/env'

const instance = axios.create({
  baseURL: env.get("ARROWHEAD_EH_URL") || process.env.REACT_APP_ARROWHEAD_EH_URL,
  timeout: 10000
})

export default instance