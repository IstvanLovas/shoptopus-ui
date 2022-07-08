import moment from "moment"

export default class Product {
	constructor(attributes = {}) {
		Object.assign(this, attributes)
	}

	get path() {
		let getUrl = window.location

		return getUrl.protocol + "//" + getUrl.host + "/products/" + this.slug
	}

	get imageObj() {
		let photo = JSON.parse(this.cover_photo)

		if (!photo) return false

		return {
			url: photo.url,
			file_name: photo.file_name,
			caption: photo.alt ?? photo.file_name
		}
	}
}
