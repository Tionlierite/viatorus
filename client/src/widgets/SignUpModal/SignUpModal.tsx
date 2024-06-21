import React, { useEffect, useState } from "react"
import { boolean, object, ref, string, ValidationError } from "yup"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

import { SignUpModalFields } from "../../features/SignUpModalFields"
import { LandingPageModalView } from "../../shared/ui/Modals/LandingPageModalView"

import { RootState } from "../../app/store/store.ts"
import { closeModal } from "../../features/SignUpButton/model/SignUpModalSlice.ts"
import { httpService } from "../../shared/services/http-service"

interface formData {
	username: string
	email: string
	password: string
	passwordRepeat: string
	terms: boolean
}

export const SignUpModal = () => {
	const [data, setData] = useState<formData>({
		username: "",
		email: "",
		password: "",
		passwordRepeat: "",
		terms: false
	})
	const [errors, setErrors] = useState<Partial<formData>>({})
	const isValid: boolean = Object.keys(errors).length === 0
	const isModalOpen = useSelector(
		(state: RootState) => state.SignUpModal.isOpen
	)
	const validateSchema = object({
		terms: boolean().isTrue("You must agree to the terms"),
		passwordRepeat: string()
			.oneOf([ref("password")], "Passwords must match")
			.required("Repeat password is required"),
		password: string()
			.matches(
				/(?=.*[A-Z])/,
				"The password must contain at least one capital letter"
			)
			.matches(/(?=.*[0-9])/, "The password must contain at least one number")
			.matches(
				/(?=.*[!@#$%^&*])/,
				"Password must contain at least one special symbol: !@#$%^&*"
			)
			.matches(/(?=.{8,})/, "The password must be at least 8 characters long")
			.required("Password is required"),
		email: string()
			.matches(/^\S+@\S+\.\S+$/g, "Email is incorrect")
			.required("Email is required"),
		username: string().required("Username is required")
	})

	const dispatch = useDispatch()
	const handleCloseModal = () => {
		dispatch(closeModal())
	}

	const handleChange = (target: { name: string; value: string | boolean }) => {
		setData(prevState => ({
			...prevState,
			[target.name]: target.value
		}))
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isValid = validate()
		if (!isValid) return

		const { username, email, password } = data
		const payload = { username, email, password }
		const toastId = toast.loading("Please wait patiently...", {
			position: "top-center"
		})

		httpService
			.post("http://localhost:8080/api/v1/register", { payload })
			.then(res => {
				console.log(res.data)
				toast.update(toastId, {
					render: "Successfully!",
					position: "top-center",
					type: "success",
					isLoading: false,
					autoClose: 3000
				})
			})
			.catch(error => {
				console.error("Error during registration:", error)
				toast.update(toastId, {
					render: "Error during registration",
					position: "top-center",
					type: "error",
					isLoading: false,
					autoClose: 3000
				})
			})
	}

	useEffect(() => {
		validate()
	}, [data])

	const validate = () => {
		validateSchema
			.validate(data, { abortEarly: false })
			.then(() => setErrors({}))
			.catch((err: ValidationError) => {
				const validationErrors: Record<string, string> = {}
				err.inner.forEach((error: ValidationError) => {
					if (error.path !== undefined) {
						validationErrors[error.path] = error.message
					}
				})
				setErrors(validationErrors)
			})
		return Object.keys(errors).length === 0
	}

	return (
		<LandingPageModalView isOpen={isModalOpen} onClose={handleCloseModal}>
			<SignUpModalFields
				data={data}
				errors={errors}
				onChange={handleChange}
				onSubmit={handleSubmit}
				isValid={isValid}
			/>
		</LandingPageModalView>
	)
}
