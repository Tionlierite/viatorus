import React from "react"

import { LandingPageModalLayout } from "../../shared/ui/Layouts/LandingPageModalLayout"
import { InputField } from "../../shared/ui/InputField"
import { ButtonContained } from "../../shared/ui/Buttons/ButtonContained"

// TODO: Do something with it.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Logo from "../../shared/media/ViatorusLogo.svg"

interface SignInFormProps {
	data: {
		email: string
		password: string
	}
	errors: Partial<{
		email: string
		password: string
	}>
	onChange: (target: { name: string; value: string }) => void
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	isValid: boolean
}

export const SignInModalFields: React.FC<SignInFormProps> = ({
	data,
	errors,
	onChange,
	onSubmit,
	isValid
}) => {
	const signUpFields: Array<{
		label: string
		name: keyof SignInFormProps["data"]
		type: string
	}> = [
		{
			label: "Email",
			name: "email",
			type: "email"
		},
		{
			label: "Password",
			name: "password",
			type: "password"
		}
	]
	return (
		<>
			<div className='col-span-10 col-start-2'>
				<img src={Logo} alt='Viatorus Logo' className='h-10 w-auto' />
			</div>
			<LandingPageModalLayout message='Log inside your story'>
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
					<ButtonContained label='Sign In' disabled={!isValid} />
				</form>
			</LandingPageModalLayout>
		</>
	)
}
