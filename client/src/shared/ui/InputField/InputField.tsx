import React from "react"

import { createTheme, TextField, ThemeProvider } from "@mui/material"

const theme = createTheme({
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiOutlinedInput-root": {
						"& fieldset": {
							borderColor: "#A9B5CC"
						},
						"&:hover fieldset": {
							borderColor: "#2D3648"
						},
						"&.Mui-focused fieldset": {
							borderColor: "#2D3648"
						},
						"& .MuiInputBase-input": {
							backgroundColor: "#FFFFFF"
						},
						"&.Mui-error": {
							"& fieldset": {
								borderColor: "#FF0000"
							},
							"&:hover fieldset": {
								borderColor: "#FF0000"
							},
							"&.Mui-focused fieldset": {
								borderColor: "#FF0000"
							}
						}
					}
				}
			}
		}
	}
})

interface InputField {
	label: string
	type?: string
	value: string
	name: string
	error: string | undefined
	onChange: (event: { name: string; value: string }) => void
}

export const InputField = ({
	label,
	type = "text",
	value,
	name,
	error,
	onChange
}: InputField) => {
	const handleChange = ({
		target
	}: React.ChangeEvent<HTMLInputElement>): void => {
		onChange({ name: target.name, value: target.value })
	}
	return (
		<ThemeProvider theme={theme}>
			<TextField
				label={label}
				name={name}
				type={type}
				value={value}
				error={!!error}
				helperText={error ? error : ""}
				onChange={handleChange}
				variant='outlined'
				fullWidth
			/>
		</ThemeProvider>
	)
}
