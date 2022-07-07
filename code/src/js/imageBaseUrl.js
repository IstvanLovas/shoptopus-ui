const IMAGE_BASE_URL = 'st_image_base_url'

export function setImageBaseUrl(url) {
    localStorage.setItem(IMAGE_BASE_URL, url)
}

export function getImageBaseUrl() {
    return localStorage.getItem(IMAGE_BASE_URL) ?? ''
}

export function clearImageBaseUrl() {
    localStorage.removeItem(IMAGE_BASE_URL)
}
