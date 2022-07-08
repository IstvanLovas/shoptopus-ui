import { getAuthToken, logoutUser } from './auth'

window.axios = require('axios')

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

window.axios.defaults.baseURL = process.env.VUE_APP_BASE_URL+'/api'

window.axios.interceptors.request.use(
    config => {
        const token = getAuthToken()

        return {
            ...config,
            headers: {
                Authorization: token ? `Bearer ${token}` : ''
            }
        }
    },
    error => Promise.reject(error)
);
