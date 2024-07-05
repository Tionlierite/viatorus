import { useState } from "react"
import { TextField, Button } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"

import { httpService } from "../../../shared/services/http-service"
import { AutocompleteField } from "../../../shared/ui/AutocompleteField"

interface Country {
	id: number
	name: string
}

interface City {
	id: number
	name: string
	countryId: number
}

interface FieldsData {
	countries: Country[]
	cities: City[]
	selectedCountry: Country | null
	selectedCity: City | null
	countrySearchTerm: string
	citySearchTerm: string
	comment: string
	selectedDate: Dayjs | null
	serviceLink: string
	isServiceLinkVisible: boolean
}

export const AddToListModalFields = () => {
	const [data, setData] = useState<FieldsData>({
		countries: [],
		cities: [],
		selectedCountry: null,
		selectedCity: null,
		countrySearchTerm: "",
		citySearchTerm: "",
		comment: "",
		selectedDate: null,
		serviceLink: "",
		isServiceLinkVisible: false
	})

	const handleChange = (target: {
		name: string
		value: string | Country | City | null | Dayjs | boolean
	}) => {
		setData(prevState => ({
			...prevState,
			[target.name]: target.value
		}))
		if (target.name === "selectedCountry") {
			setData(prevState => ({
				...prevState,
				selectedCity: null,
				cities: []
			}))
		}
	}

	const handleSearch = async (searchTerm: string, type: "country" | "city") => {
		try {
			if (type === "country") {
				const response = await httpService.get(`countries?search=${searchTerm}`)
				setData(prevState => ({
					...prevState,
					countries: response.data
				}))
			} else if (type === "city" && data.selectedCountry) {
				const response = await httpService.get(
					`cities?search=${searchTerm}&countryId=${data.selectedCountry.id}`
				)
				setData(prevState => ({
					...prevState,
					cities: response.data
				}))
			}
		} catch (error) {
			console.error(`Error searching ${type}:`, error)
		}
	}

	return (
		<>
			<div className='col-span-6'>
				<AutocompleteField
					options={data.countries}
					label='Country'
					value={data.selectedCountry}
					searchTerm={data.countrySearchTerm}
					onSearchTermChange={event => {
						handleChange({
							name: "countrySearchTerm",
							value: event.target.value
						})
						handleSearch(event.target.value, "country")
					}}
					onValueChange={newValue =>
						handleChange({ name: "selectedCountry", value: newValue })
					}
				/>
			</div>
			<div className='col-span-6'>
				<AutocompleteField
					options={data.cities}
					label='City'
					value={data.selectedCity}
					searchTerm={data.citySearchTerm}
					onSearchTermChange={event => {
						handleChange({ name: "citySearchTerm", value: event.target.value })
						handleSearch(event.target.value, "city")
					}}
					onValueChange={newValue =>
						handleChange({ name: "selectedCity", value: newValue })
					}
					disabled={!data.selectedCountry}
				/>
			</div>
			<div className='col-span-12'>
				<TextField
					label='Comment'
					variant='outlined'
					multiline
					rows={4}
					fullWidth
					value={data.comment}
					onChange={event =>
						handleChange({ name: "comment", value: event.target.value })
					}
				/>
			</div>
			<div className='col-span-12 mt-4 flex items-center space-x-4'>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						label='Select Date'
						value={data.selectedDate}
						onChange={newValue =>
							handleChange({ name: "selectedDate", value: newValue })
						}
					/>
				</LocalizationProvider>
				{data.isServiceLinkVisible ? (
					<TextField
						label='Service Link'
						variant='outlined'
						fullWidth
						value={data.serviceLink}
						onChange={event =>
							handleChange({ name: "serviceLink", value: event.target.value })
						}
					/>
				) : (
					<Button
						variant='contained'
						color='primary'
						onClick={() =>
							handleChange({ name: "isServiceLinkVisible", value: true })
						}
					>
						Add Service Link
					</Button>
				)}
			</div>
			<div className='col-span-12 mt-8 flex justify-end'>
				<Button
					variant='contained'
					color='primary'
					className='bg-viat-primary text-white font-bold py-2 px-4 rounded'
					onClick={() => {
						console.log(data)
					}}
				>
					Send
				</Button>
			</div>
		</>
	)
}
