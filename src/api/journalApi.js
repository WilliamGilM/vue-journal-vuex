
import { config } from '@vue/test-utils'
import axios from 'axios'

const journalApi = axios.create({
  baseURL: 'https://vue-demos-9c74b-default-rtdb.firebaseio.com'
})

// se ejecuta cuando se intercepte una peticion http que use la instancia de axios.
journalApi.interceptors.request.use( (config) => {

  config.params = {
    auth: localStorage.getItem('idToken')
  }

  return config
})

// console.log( process.env.NODE_ENV ) // TEST durante testing.

export default journalApi