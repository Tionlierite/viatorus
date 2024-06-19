import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import * as Sentry from "@sentry/react"

import App from "./app/App.tsx"
import { Provider } from "react-redux"
import { store } from "./app/store/store.ts"

Sentry.init({
	dsn: "https://675dfd8c94bb4b3b7647b2540544a506@o4507468272566272.ingest.de.sentry.io/4507468323160144",
	integrations: [
		Sentry.browserTracingIntegration(),
		Sentry.replayIntegration()
	],
	// Performance Monitoring
	tracesSampleRate: 1.0, //  Capture 100% of the transactions
	// Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
	tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
	// Session Replay
	replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
	replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<React.StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</React.StrictMode>
	</BrowserRouter>
)
