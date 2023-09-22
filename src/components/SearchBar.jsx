import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"

import "./SearchBar.css"

export const SearchBar = ({ setResults }) => {
	const [data, setData] = useState("")

	const fetchData = value => {
		fetch("/api")
			.then(response => response.json())
			.then(json => {
				const results = json.filter(town => {
					return (
						value &&
						town &&
						town.city &&
						town.city.toLowerCase().includes(value.toLowerCase())
					)
				})
				setResults(results)
			})
	}

	const handleChange = value => {
		setData(value)
		fetchData(value)
	}

	return (
		<div className='search-bar'>
			<FaSearch id='search-icon' />
			<input
				placeholder='Type to search...'
				value={data}
				onChange={e => handleChange(e.target.value)}
			/>
		</div>
	)
}
