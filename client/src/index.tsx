import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import App from "./app/App.tsx"
import { Provider } from "react-redux"
import { store } from "./app/store/store.ts"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<React.StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</React.StrictMode>
	</BrowserRouter>
)
