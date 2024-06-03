import React, { useState } from "react"

export const TextField = ({
	label,
	type = "text",
	name,
	value,
	error,
	onChange
}: {
	label: string
	type?: string
	name: string
	value: string
	error: string
	onChange: (value: string) => void
}) => {
	const [showPassword, setShowPassword] = useState(false)
	const toggleShowPassword = () => {
		setShowPassword(prevState => !prevState)
	}
	const handleChange = ({ target }: { target: object }) => {
		onChange(target.value)
	}
	return (
		<div className='mb-4'>
			<label htmlFor={name}>{label}</label>
			<div className=''>
				<input
					type={showPassword ? "text" : type}
					id={name}
					value={value}
					onChange={handleChange}
					name={name}
				/>
				{type === "password" && (
					<button type='button' onClick={toggleShowPassword}>
						show
					</button>
				)}
				{error && <div className='invalid-feedback'>{error}</div>}
			</div>
		</div>
	)
}
