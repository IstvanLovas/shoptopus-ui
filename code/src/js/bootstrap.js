import { getAuthToken, logoutUser } from './auth'

window.axios = require('axios')

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

window.axios.defaults.baseURL = process.env.NODE_ENV === 'development'
    ? process.env.MIX_API_BASE_URL
    : process.env.MIX_API_BASE_URL_PROD

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
