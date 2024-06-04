import React, { useEffect } from "react"
import { useState } from "react"

import { validator } from "./utils/validator.ts"

import TextField from "../../shared/TextField"

export const AuthorizationWidget = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
		stayOn: false
	})
	const [errors, setErrors] = useState({})
	const handleChange = (target: object) => {
		setData(prevState => ({
			...prevState,
			[target.name]: target.value
		}))
	}
	const validatorConfig = {
		email: {
			isRequired: {
				message: "Email is required."
			},
			isEmail: {
				message: "Email entered incorrectly."
			}
		},
		password: {
			isRequired: {
				message: "Password is required."
			},
			isCapitalSymbol: {
				message: "The password must contain at least one capital letter."
			},
			isContainDigit: {
				message: "The password must contain at least one digit."
			},
			min: {
				message: "The password must be at least 8 characters long.",
				value: 8
			}
		}
	}
	useEffect(() => {
		validate()
	}, [data])
	const validate = () => {
		const errors = validator(data, validatorConfig)
		setErrors(errors)
		return Object.keys(errors).length === 0
	}
	const isValid = Object.keys(errors).length === 0

	const handleSubmit = e => {
		e.preventDefault()
		const isValid = validate()
		if (!isValid) return
		console.log(data)
	}
	return (
		<form onSubmit={handleSubmit}>
			<TextField
				label='Email'
				name='email'
				value={data.email}
				onChange={handleChange}
				error={errors.email}
			/>
			<TextField
				label='Password'
				type='password'
				name='password'
				value={data.password}
				onChange={handleChange}
				error={errors.password}
			/>
			<button type='submit' disabled={!isValid}>
				Submit
			</button>
		</form>
	)
}
