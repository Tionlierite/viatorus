import axios, { AxiosError } from "axios"
import { logger } from "../logging-service"
axios.interceptors.response.use(
	res => res,
	function (error: AxiosError) {
		const expectedErrors =
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500

		if (!expectedErrors) {
			logger.log(error)
			console.log("Unexpected Error")
		}
		return Promise.reject(error)
	}
)

export const httpService = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete
}
