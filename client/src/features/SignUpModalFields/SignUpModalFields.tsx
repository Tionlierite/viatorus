import React from "react"

import { LandingPageModalLayout } from "../../shared/ui/Layouts/LandingPageModalLayout"
import { InputField } from "../../shared/ui/InputField"
import { CheckField } from "../../shared/ui/CheckField"
import { ButtonContained } from "../../shared/ui/Buttons/ButtonContained"

// TODO: Do something with it.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Logo from "../../shared/media/ViatorusLogo.svg"

interface SignUpFormProps {
	data: {
		username: string
		email: string
		password: string
		passwordRepeat: string
		terms: boolean
	}
	errors: Partial<{
		username: string
		email: string
		password: string
		passwordRepeat: string
		terms: boolean
	}>
	onChange: (target: { name: string; value: string | boolean }) => void
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	isValid: boolean
}

export const SignUpModalFields = ({
	data,
	errors,
	onChange,
	onSubmit,
	isValid
}: SignUpFormProps) => {
	const signUpFields: Array<{
		label: string
		name: keyof Omit<SignUpFormProps["data"], "terms">
		type: string
	}> = [
		{
			label: "Username",
			name: "username",
			type: "text"
		},
		{
			label: "Email",
			name: "email",
			type: "email"
		},
		{
			label: "Password",
			name: "password",
			type: "password"
		},
		{
			label: "Repeat password",
			name: "passwordRepeat",
			type: "password"
		}
	]
	return (
		<>
			<div className='col-span-10 col-start-2'>
				<img src={Logo} alt='Viatorus Logo' className='h-10 w-auto' />
			</div>
			<LandingPageModalLayout message='Come Join Us'>
				<form className='flex flex-col space-y-4' onSubmit={onSubmit}>
					{signUpFields.map(field => (
						<InputField
							key={field.name}
							{...field}
							value={data[field.name]}
							error={errors[field.name]}
							onChange={onChange}
						/>
					))}
					<CheckField
						label='I agree with Terms & Conditions'
						name='terms'
						value={data.terms}
						error={errors.terms}
						onChange={onChange}
					/>
					<ButtonContained label='Sign Up' disabled={!isValid} />
				</form>
			</LandingPageModalLayout>
		</>
	)
}
