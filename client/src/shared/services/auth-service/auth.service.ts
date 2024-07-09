import { jwtDecode } from "jwt-decode"

import { DecodedToken } from "../../../entities/user/model/types.ts"
import {
	setAccessToken,
	setUser
} from "../../../entities/user/model/UserSlice.ts"

import { store } from "../../../app/store/store.ts"
import { httpService } from "../http-service"

const registerEndpoint = "register"
const loginEndpoint = "login"

export const authService = {
	register: async (content: {
		username: string
		email: string
		password: string
	}) => {
		const { data } = await httpService.post(registerEndpoint, content)
		localStorage.setItem("access_token", data.access_token)

		const decodedToken: DecodedToken = jwtDecode(data.access_token)
		const user = {
			id: decodedToken.user_id,
			username: decodedToken.username,
			email: decodedToken.email,
			roles: decodedToken.roles
		}

		store.dispatch(setUser(user))
		store.dispatch(setAccessToken(data.access_token))
		return data.message
	},
	login: async (content: { email: string; password: string }) => {
		const { data } = await httpService.post(loginEndpoint, content)
		localStorage.setItem("access_token", data.access_token)

		const decodedToken: DecodedToken = jwtDecode(data.access_token)
		const user = {
			id: decodedToken.user_id,
			username: decodedToken.username,
			email: decodedToken.email,
			roles: decodedToken.roles
		}

		store.dispatch(setUser(user))
		store.dispatch(setAccessToken(data.access_token))
		return data.message
	}
}
