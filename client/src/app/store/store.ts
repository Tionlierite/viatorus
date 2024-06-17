import { configureStore } from "@reduxjs/toolkit"

import modalReducer from "../../features/SignUpButton/model/SignUpModalSlice.ts"

export const store = configureStore({
	reducer: {
		SignUpModal: modalReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
