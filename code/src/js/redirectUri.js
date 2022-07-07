const REDIRECT_URI = 'st_redirect_uri'

export function setRedirectUri(uri) {
    localStorage.setItem(REDIRECT_URI, uri)
}

export function getRedirectUrl() {
    return localStorage.getItem(REDIRECT_URI)
}

export function clearRedirectUri() {
    localStorage.removeItem(REDIRECT_URI)
}
