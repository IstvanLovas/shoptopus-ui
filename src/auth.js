import axios from 'axios'

const AUTH_TOKEN_KEY = 'st_access_token'
const AUTH_EMAIL_VERIFIED_KEY = 'st_email_verified'

export function logoutUser() {
    clearAuthToken()
    clearVerifiedToken()
}

export function setAuthToken(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function clearAuthToken() {
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function isLoggedIn() {
    return !! getAuthToken()
}

export function clearVerifiedToken() {
    localStorage.removeItem(AUTH_EMAIL_VERIFIED_KEY)
}

// General helper functions
export function setVerifiedToken(verified) {
    localStorage.setItem(AUTH_EMAIL_VERIFIED_KEY, JSON.stringify(verified))
}

export function isVerified() {
    let token = JSON.parse(localStorage.getItem(AUTH_EMAIL_VERIFIED_KEY))
    return token !== '' && !! token
}
