import React from "react"
import { SearchResult } from "./SearchResult"

import "./SearchResultsList.css"

export const SearchResultsList = results => {
	return (
		<>
			<div className='search-results'>
				<div>
					{results.results.map((result, id) => {
						return <SearchResult result={result.city} key={id} />
					})}
				</div>
			</div>
		</>
	)
}
